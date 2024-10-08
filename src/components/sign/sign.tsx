import React, { useRef, useEffect } from 'react'
import './sign.css';

interface IProps {
  /**
   * @description   画布宽度
   * @default       400
   */
  width?: number;
  /**
   * @description   画布高度
   * @default       200
   */
  height?: number;
  /**
   * @description   线宽
   * @default       4
  */
  lineWidth?: number;
  /**
   * @description   线段颜色
   * @default       'red'
  */
  strokeColor?: string;
  /**
   * @description   设置线条两端圆角
   * @default       'round'
  */
  lineCap?: CanvasLineCap;
  /**
   * @description   线条交汇处圆角
   * @default       'round'
  */
  lineJoin?: CanvasLineJoin;
  /**
   * @description   画布背景颜色
   * @default       'transparent'
  */
  bgColor?: string;
  /**
   * @description   true
  */
  showBtn?: boolean;
  /**
  * @description   当保存时的回调, blob为生成的图片bob
  * @default       -
  */
  onSave?: (blob: Blob) => void;
 /**
  * @description   当画布清空时的回调, 参数为画布的上下文对象,可以直接使用canvas的api
  * @default       -
  */
  onClear?: (canvasContext: CanvasRenderingContext2D) => void;
  /**
  * @description   当画布结束时的回调
  * @default       -
  */
  onDrawEnd?: (canvas: HTMLCanvasElement) => void;
}

const ASign: React.FC<IProps> = ({
  width = 400,
  height = 200,
  lineWidth = 4,
  strokeColor = 'green',
  lineCap = 'round',
  lineJoin = 'round',
  bgColor = 'transparent',
  showBtn = true,
  onSave,
  onClear,
  onDrawEnd
}) => {
  const canvasRef: any = useRef(null);
  const ctxRef: any = useRef(null);

  // 取消-清空画布
  const cancel = () => {
    // 清空当前画布上的所有绘制内容
    if(ctxRef.current) {
      ctxRef.current.clearRect(0, 0, width, height)
      onClear && onClear(ctxRef.current)
    }
  }

  // 保存-将画布内容保存为图片
  const save = () => {
    // 将canvas上的内容转成blob流
    canvasRef.current?.toBlob((blob: any) => {
      // 获取当前时间并转成字符串，用来当做文件名
      const date = Date.now().toString()
      // 创建一个 a 标签
      const a = document.createElement('a')
      // 设置 a 标签的下载文件名
      a.download = `${date}.png`
      // 设置 a 标签的跳转路径为 文件流地址
      a.href = URL.createObjectURL(blob)
      // 手动触发 a 标签的点击事件
      a.click()
      // 移除 a 标签
      a.remove()

      onSave && onSave(blob);
    })
  }

  useEffect(() => {
    // 获取canvas 实例
    const canvas:HTMLCanvasElement = canvasRef.current as any;
    if(!canvas) {
      return
    }
    const { x, y } = canvas.getBoundingClientRect();
    // 设置宽高
    canvas.width = width;
    canvas.height = height;
    // 创建上下文
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctxRef.current = ctx;
      // 设置填充背景色
      ctx.fillStyle = bgColor;
      // 绘制填充矩形
      ctx.fillRect(
        0, // x 轴起始绘制位置
        0, // y 轴起始绘制位置
        width, // 宽度
        height // 高度
      );
    }
    // 保存上次绘制的 坐标及偏移量
    const client = {
      offsetX: 0, // 偏移量
      offsetY: 0,
      endX: 0, // 坐标
      endY: 0
    };

    // 判断是否为移动端
    const mobileStatus = (/Mobile|Android|iPhone/i.test(navigator.userAgent));

    // 初始化
    const init = (event: Event) => {
      // 获取偏移量及坐标
      const { offsetX, offsetY, pageX, pageY } = mobileStatus ? (event as any).changedTouches[0] : event;


      // 修改上次的偏移量及坐标
      client.offsetX = offsetX
      client.offsetY = offsetY
      client.endX = pageX
      client.endY = pageY

      // 清除以上一次 beginPath 之后的所有路径，进行绘制
      if (ctx) {
        ctx.beginPath()
        // 根据配置文件设置相应配置
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = strokeColor
        ctx.lineCap = lineCap
        ctx.lineJoin = lineJoin
        // 设置画线起始点位
        ctx.moveTo(client.endX - x, client.endY - y)
      }
      // 监听 鼠标移动或手势移动
      window.addEventListener(mobileStatus ? "touchmove" : "mousemove", draw)
    };

    // 绘制
    const draw = (event: Event) => {
      // 获取当前坐标点位
      const { pageX, pageY } = mobileStatus ? (event as any).changedTouches[0] : event
      // 修改最后一次绘制的坐标点
      client.endX = pageX
      client.endY = pageY

      if (ctx) {
        // 根据坐标点位移动添加线条
        ctx.lineTo(pageX - x, pageY - y)

        // 绘制
        ctx.stroke()
      }
    };

    // 结束绘制
    const closeDraw = () => {
      if (ctx) {
        // 结束绘制
        ctx.closePath()
      }
      // 移除鼠标移动或手势移动监听器
      window.removeEventListener("mousemove", draw)
      onDrawEnd && onDrawEnd(canvasRef.current)
    };

    // 创建鼠标/手势按下监听器
    window.addEventListener(mobileStatus ? "touchstart" : "mousedown", init);
    // 创建鼠标/手势 弹起/离开 监听器
    window.addEventListener(mobileStatus ? "touchend" : "mouseup", closeDraw);
  }, [width, height, lineWidth, strokeColor, lineCap, lineJoin, bgColor, onDrawEnd])

  return (
    <div className="xi-sign-wrap" style={{width, height}}>
      <canvas ref={canvasRef}></canvas>
      {
        showBtn && 
        <div className="xi-sign-btnWrap">
          <span onClick={cancel} className="xi-sign-btn">清除</span>
          <span onClick={save} className="xi-sign-btn primary">保存</span>
        </div>
      }
    </div>
  )
}

export default ASign
