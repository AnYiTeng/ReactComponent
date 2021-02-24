import React, { CSSProperties, ReactNode } from 'react'
import './button.css'
import classnames from 'classnames'

// button: DetailedHTMLFactory<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
// input:  DetailedHTMLFactory<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface IABtn extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classname?: string
  style?: CSSProperties
  children?: string
  onChange?: () => void
  canClick?: boolean
  types?: 'normal' | 'link'
}

export default function AButton (props: IABtn) {
  const { 
    classname,
    style, 
    children = '按钮',
    onChange,
    canClick = true,
    types = 'normal',
    ...otherProps
  } = props

  const clickBtn = () => {
    onChange && onChange()
  }

  const cls = classnames(
    'a-button', 
    classname,
    {
      'a-button-lose-efficacy': !canClick,
      'a-button-link': types === 'link'
    }
  )
  return (
    <>
      <button {...otherProps} style={style} className={cls} onClick={clickBtn}>{children}</button>
    </>
  )
}