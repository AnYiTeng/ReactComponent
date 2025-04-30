import { useCallback, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Recorder from 'recorder-core';
import useTimer from './use-timer';
import { message } from 'antd'

/** 录音状态 */
export enum RECORD_STATUS {
  /** 初始 */
  DEFAULT = 1,
  /** 录音中 */
  RECORDING = 2,
  /** 暂停 */
  PAUSED = 3,
}

const hideRecorderLog = true;
if (hideRecorderLog) {
  Recorder.CLog = () => {};
}

const WEBSOCKET_URL = 'wss://pre-flamingo.cainiao-inc.com/ws/asr';

const textBuffer: {
  messageId: string,
  current: string,
  data: any[]
} = {
  messageId: '',
  current: '',
  data: [],
};

/** 获取到文本后的填充模式 */
export enum FILL_MODE {
  /** 填充到消息 */
  MESSAGE = 'message',
  /** 填充到输入框 */
  INPUT = 'input',
}

/** 录音回调消息 */
export interface IRecordMessage {
  /** id */
  id?: string;
  /** 是否格式化 */
  format?: boolean;
  /** 转译的文本 */
  text: string;
  /** 消息类型，add表示新增消息，update表示更新消息，setInputText表示填充输入框文本 */
  method: 'add' | 'update' | 'setInputText';
}

/** 开始录音的参数 */
interface StartRecordOptions {
  /** 会话id，用于唯一标识会话，必填 */
  conversationId: string;
  /** 填充模式，input表示填充进输入框, message表示填充进消息气泡 */
  fillMode: 'input' | 'message';
  /** 高亮关键字 */
  keywords?: string[];
  /** 收音的最小音量，1-100 */
  minPowerLevel?: number;
  /** 收音的最大音量，1-100 */
  maxPowerLevel?: number;
}

/** 录音信息 */
export interface RecordInfo {
  /** 录音状态 */
  recordStatus: RECORD_STATUS;
  /** 当前录音时长 */
  recordTime: string;
  /** 开始录音 */
  startRecord: (options: StartRecordOptions) => void;
  /** 停止录音 */
  stopRecord: () => void;
  /** 暂停录音 */
  pauseRecord: () => void;
  /** 继续录音 */
  continueRecord: () => void;
}

export default function useRecord({
  onRecordMessage,
  onStartRecord,
  onContinueRecord,
  onPauseRecord,
  onStopRecord,
}: {
  onRecordMessage: (params: IRecordMessage) => void;
  onStartRecord?: () => void;
  onContinueRecord?: () => void;
  onPauseRecord?: () => void;
  onStopRecord?: () => void;
}): RecordInfo {
  const [recordStatus, setRecordStatus] = useState<RECORD_STATUS>(RECORD_STATUS.DEFAULT);
  const { startTimer, stopTimer, resetTimer, formattedTime } = useTimer();
  const [conversationId, setConversationId] = useState('');
  const [keywords, setKeywords] = useState<any[]>([]);
  const [fillMode, setFillMode] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  // recorder-core的实例
  const recorderRef: any = useRef(null);
  // ws连接，用于实时转译接口
  const wsRef = useRef<WebSocket | null>(null);
  let sampleBuf = new Int16Array();

  const hightlightText = useCallback(
    async (messageId, text) => {
      if (!text) return;
      // TODO: 待实现文本替换

      onRecordMessage({
        id: messageId,
        text,
        method: 'update',
        format: true,
      });
    },
    [keywords, onRecordMessage],
  );

  const onSocketMessage = useCallback(
    (event, _fillMode) => {
      if (typeof event.data === 'string' && event.data.indexOf('[Info]') >= 0) {
        return;
      }
      let msg = null;
      try {
        msg = JSON.parse(event.data);
      } catch (error) {
        return;
      }

      const { text } = msg;
      if (!text) return;

      // 如果当前没有消息，则将当前消息推入消息列表
      if (!textBuffer.data.length) {
        textBuffer.data.push(msg);
      } else if (textBuffer.data[textBuffer.data.length - 1].isSentenceEnd) {
        textBuffer.data.push(msg);
      } else {
        textBuffer.data[textBuffer.data.length - 1].text = text;
        textBuffer.data[textBuffer.data.length - 1].isSentenceEnd = msg.isSentenceEnd;
      }

      // 将data中的text拼接成当前文本
      textBuffer.current = textBuffer.data.map((item) => item.text).join('');

      // 填充文本模式，直接抛出事件
      if (_fillMode === FILL_MODE.INPUT) {
        onRecordMessage({
          text: textBuffer.current,
          method: 'setInputText',
        });
      } else if (!textBuffer.messageId) {
        const messageId = uuidv4();
        textBuffer.messageId = messageId;
        onRecordMessage({
          id: messageId,
          text: textBuffer.current,
          method: 'add',
        });
      } else {
        hightlightText(textBuffer.messageId, textBuffer.current);
      }
    },
    [onRecordMessage, hightlightText],
  );

  const recProcess = useCallback((buffer, powerLevel, bufferDuration, bufferSampleRate) => {
    const data_48k = buffer[buffer.length - 1];
    const array_48k = new Array(data_48k);
    const data_16k = Recorder?.SampleData(array_48k, bufferSampleRate, 16000).data;

    if (!wsRef.current) {
      return;
    }
    if (wsRef.current.readyState !== WebSocket.OPEN) {
      return;
    }
    wsRef.current.send(Int16Array.from(data_16k));

    // sampleBuf = Int16Array.from([...sampleBuf, ...data_16k]);
    // const chunk_size = 960; // for asr chunk_size [5, 10, 5]
    // while (sampleBuf.length >= chunk_size) {
    //   const sendBuf = sampleBuf.slice(0, chunk_size);
    //   sampleBuf = sampleBuf.slice(chunk_size, sampleBuf.length);
    //   if (!wsRef.current) {
    //     return;
    //   }
    //   if (wsRef.current.readyState !== WebSocket.OPEN) {
    //     return;
    //   }
    //   wsRef.current.send(sendBuf);
    // }
  }, []);

  // 停止录音
  const stopRecord = useCallback(() => {
    if (!recorderRef.current) {
      return;
    }
    recorderRef.current.close();

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      if (sampleBuf.length > 0) {
        wsRef.current.send(sampleBuf);
        sampleBuf = new Int16Array();
      }
    }

    // wsRef.current.send(JSON.stringify(endWSParams));

    // 停止录音时，更新当前消息的文本
    if (fillMode === FILL_MODE.MESSAGE && textBuffer.current && textBuffer.messageId) {
      hightlightText(textBuffer.messageId, textBuffer.current);
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      if (fillMode === FILL_MODE.INPUT) {
        wsRef.current.close();
        wsRef.current = null;
      } else {
        setTimeout(() => {
          wsRef.current?.close();
          wsRef.current = null;
        }, 3000);
      }
    }

    stopTimer();
    setRecordStatus(RECORD_STATUS.DEFAULT);
    if (typeof onStopRecord === 'function') {
      onStopRecord();
    }
  }, [conversationId, stopTimer, hightlightText, fillMode]);

  // 开始录音
  const startRecord = useCallback(
    (options: StartRecordOptions) => {
      const {
        conversationId: _conversationId = '',
        keywords: _keywords = [],
        fillMode: _fillMode = FILL_MODE.MESSAGE,
        minPowerLevel = 1,
        maxPowerLevel = 100,
      } = options;

      if (wsRef.current) {
        // 如果存在旧的WebSocket连接，先关闭它
        if (wsRef.current.readyState === WebSocket.CONNECTING) {
          wsRef.current.close();
        }
        wsRef.current = null;
      }

      // 初始化recorder实例
      if (!recorderRef.current) {
        recorderRef.current = Recorder({
          type: 'pcm',
          bitRate: 16,
          sampleRate: 16000,
          onProcess: (buffer: any, powerLevel: any, bufferDuration: any, bufferSampleRate: any) => {
            if (powerLevel >= minPowerLevel && powerLevel <= maxPowerLevel) {
              recProcess(buffer, powerLevel, bufferDuration, bufferSampleRate);
            }
          },
          audioTrackSet: {
            echoCancellation: true,
            noiseSuppression: true,
          },
        });
      }

      // 开始录音，调用录音api
      recorderRef.current.open(() => {
        recorderRef.current.start();
      });

      // 创建 WebSocket 连接
      wsRef.current = new WebSocket(WEBSOCKET_URL); // 替换为你的 WebSocket URL

      wsRef.current.onclose = (event) => {
        if (!event.wasClean) {
          messageApi.error('连接异常关闭');
          console.error('websocket error closed', event);
          stopRecord();
        }
      };

      wsRef.current.onerror = (event) => {
        messageApi.error('连接失败');
        console.error('websocket error', event);
        stopRecord();
      };

      // 处理消息
      wsRef.current.onmessage = (event) => {
        onSocketMessage(event, _fillMode);
      };

      wsRef.current.onopen = () => {
        const hotwords: any = {};
        _keywords.forEach((k) => {
          hotwords[`${k}`] = 10;
        });
      };
      setConversationId(_conversationId);
      setKeywords(_keywords);
      setFillMode(_fillMode);

      textBuffer.messageId = '';
      textBuffer.current = '';
      textBuffer.data = [];
      resetTimer();
      startTimer();
      setRecordStatus(RECORD_STATUS.RECORDING);
      if (typeof onStartRecord === 'function') {
        onStartRecord();
      }
    },
    [recProcess, onSocketMessage, startTimer, resetTimer, onStartRecord, stopRecord],
  );

  // 继续录音
  const continueRecord = useCallback(() => {
    // 开始录音，调用录音api
    recorderRef.current.open(() => {
      recorderRef.current.start();
    });
    startTimer();
    setRecordStatus(RECORD_STATUS.RECORDING);
    if (typeof onContinueRecord === 'function') {
      onContinueRecord();
    }
  }, [startTimer, onContinueRecord]);

  // 暂停录音
  const pauseRecord = useCallback(() => {
    if (!recorderRef.current) {
      return;
    }
    recorderRef.current.close();
    stopTimer();
    setRecordStatus(RECORD_STATUS.PAUSED);
    if (typeof onPauseRecord === 'function') {
      onPauseRecord();
    }
  }, [stopTimer, onPauseRecord]);

  return {
    recordStatus,
    recordTime: formattedTime,
    startRecord,
    pauseRecord,
    continueRecord,
    stopRecord,
  };
}
