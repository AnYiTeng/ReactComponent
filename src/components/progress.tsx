import React from 'react'
import './progress.css'

interface ProgressProps {
  /** 进度百分比，0-100 */
  percent: number
  /** 进度条颜色 */
  color?: string
  /** 进度条高度 */
  height?: string | number
  /** 是否显示百分比文本 */
  showText?: boolean
  /** 自定义样式 */
  style?: React.CSSProperties
  /** 自定义类名 */
  className?: string
}

const Progress: React.FC<ProgressProps> = ({
  percent,
  color = '#1890ff',
  height = 20,
  showText = true,
  style,
  className
}) => {
  const barStyle: React.CSSProperties = {
    width: `${Math.min(Math.max(percent, 0), 100)}%`,
    background: color,
    height: '100%',
    borderRadius: 100,
    transition: 'width 0.3s',
    position: 'relative',
  }
  return (
    <div
      className={['progress-container', className].filter(Boolean).join(' ')}
      style={{ height, ...style }}
    >
      <div className="progress-bar progress-bar-animated" style={barStyle} />
      {showText && (
        <span className="progress-text">{`${Math.round(percent)}%`}</span>
      )}
    </div>
  )
}

export default Progress 