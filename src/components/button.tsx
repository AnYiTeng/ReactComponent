import React, { CSSProperties, ReactNode } from 'react'
import './button.css'
import classnames from 'classnames'

interface IABtn {
  classname?: string
  style?: CSSProperties
  children?: string
  onChange?: () => void
  canClick?: boolean
}

export default function AButton (props: IABtn) {
  const { 
    classname,
    style, 
    children = '按钮',
    onChange,
    canClick = true
  } = props

  const clickBtn = () => {
    onChange && onChange()
  }

  const cls = classnames(
    'a-button', 
    classname,
    {
      'a-button-lose-efficacy': !canClick
    }
  )
  return (
    <>
      <button style={style} className={cls} onClick={clickBtn}>{children}</button>
    </>
  )
}