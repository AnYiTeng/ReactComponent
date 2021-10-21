import React, { CSSProperties, ReactNode } from 'react'
import './button.css'
import classnames from 'classnames'

// button: DetailedHTMLFactory<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
// input:  DetailedHTMLFactory<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface IABtn extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classname?: string
  style?: CSSProperties
  children?: string
  onClick?: () => void
  canClick?: boolean
  types?: 'normal' | 'link'
}

export default function AButton (props: IABtn) {
  const { 
    classname,
    style, 
    children = '按钮',
    onClick,
    canClick = true,
    types = 'normal',
    ...otherProps
  } = props

  const clickBtn = () => {
    onClick && onClick()
  }

  const cls = classnames(
    'a-button', 
    classname,
    {
      'a-button-lose-efficacy': !canClick,
      'a-button-link': types === 'link'
    }
  )
  const a = '26px'
  return (
    <>
      <button {...otherProps} style={{ ['--mine-height' as any]: a }} className={cls} onClick={clickBtn}>{children}</button>
    </>
  )
}