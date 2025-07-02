import React, { CSSProperties, ReactNode } from 'react'
import './button.css'
import classnames from 'classnames'

interface IABtn extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classname?: string
  style?: CSSProperties
  children?: ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  canClick?: boolean
  types?: 'normal' | 'link'
  height?: string | number // 新增高度自定义
}

export default function AButton({
  classname,
  style,
  children = '按钮',
  onClick,
  canClick = true,
  types = 'normal',
  height = '26px',
  ...otherProps
}: IABtn) {
  // 禁用时阻止点击
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!canClick) {
      e.preventDefault()
      return
    }
    onClick && onClick(e)
  }

  const cls = classnames(
    'a-button',
    classname,
    {
      'a-button-lose-efficacy': !canClick,
      'a-button-link': types === 'link',
    }
  )

  return (
    <button
      {...otherProps}
      style={{ ...style, ['--mine-height' as any]: height }}
      className={cls}
      onClick={handleClick}
      disabled={!canClick}
    >
      {children}
    </button>
  )
}