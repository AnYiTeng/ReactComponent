import React, { useState, useRef } from "react";
import AInput from "../../components/input";
import AButton from "../../components/button";
import { useCreateAgent, modelName } from "../../mcp/agent";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow, solarizedlight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import './index.css'

interface IMessage {
	role: string,
	content: string
}

const CodeBlock = ({ code, className }: any) => {
  return (
    <SyntaxHighlighter 
      language="javascript" 
      style={solarizedlight}
      showLineNumbers
      className={className}
			customStyle={{ overflowX: 'auto', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }} // 启用自动换行
    >
      {code}
    </SyntaxHighlighter>
  );
}

const AiPage = () => {
	const [userInput, setUserInput] = useState('');
	const [loading, setLoading] = useState(false)
	const [messages, setMessages] = useState<IMessage[]>([]);
	const responseRef = useRef('')
	const { chatLoop, connectToServer, abortControllerRef } = useCreateAgent({
    inputValue: userInput,
    responseRef,
  });

	// 提交请求
	const onsubmit = async () => {
		console.info('value:', userInput)
		if (!userInput.trim()) return;
		setLoading(true)
		// 拼装展示的 message 信息
		const userMessage = {
      role: 'user',
      content: userInput
    };
		const updatedMessages = [...messages, userMessage];
		setMessages(updatedMessages);
    setUserInput('');
		
		try {
			await connectToServer();
			const response = await chatLoop();
      console.info('这里的回答内容:', response)
			setLoading(false)
      if (response) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response
        }]);
      }
		} catch (err) {
			console.error(err)
		}
	}

	// 取消请求
	const abortFetch = () => {
    if (abortControllerRef.current) {
      const updatedMessages = [...messages, {
        role: 'system',
        content: '请求已取消'
      }];
      setMessages(updatedMessages);
      setLoading(false)
      responseRef.current = ''
      abortControllerRef.current.abort(); // 
      abortControllerRef.current = null; // 清除引用
    }
  };

	const renderMessageContent = (msg: IMessage, index: number) => {
    if (msg.role === 'user') {
      return (
        <>
          <div key={index} className="user-wrapper">
            <strong>User:</strong>
            <div className="user-message">
              {msg.content}
            </div>
          </div>
          <div>
            <strong>{modelName}:</strong>
            {index === messages.length - 1 && loading && (
              <div className="system-message">
                <span className="loading-text">加载中...</span>
              </div>
            )}
          </div>
        </>
      )
    } else {
      return (
        // <CodeBlock className="system-message" code={msg.content} />
        <div className="system-message">{msg.content}</div>
      )
    }
  }

	return (
		<div className="ai-page-wrapper">
			<AInput value={userInput} onChange={(e) => setUserInput(e.target.value)} />
			{
        loading ? (
          <AButton onClick={() => abortFetch()}>停止</AButton>
        ) : (
          <AButton onClick={() => onsubmit()}>提交</AButton>
        )
      }

			<div className="message-wrapper">
				{messages.map((msg, index) => {
					return renderMessageContent(msg, index)
				})}
			</div>
		</div>
	)
}

export default AiPage
