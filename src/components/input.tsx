import React, { CSSProperties } from 'react'
import classnames from 'classnames'
import './input.css'

type SizeType = 'small' | 'big'

interface IAInput<T> {
  classname?: string
  style?: CSSProperties
  value: any
  onChange: (v: any) => void
  canInput?: boolean
  placeHolder?: string
  size?: SizeType
}

export default function AInput <T>(props: IAInput<T>) {
  const { 
    classname,
    style,
    value,
    onChange,
    canInput = true,
    placeHolder = "请输入内容",
    size
  } = props
  const cls = classnames(
    'a-input', 
    classname,
    {
      'a-input-small': size === 'small',
      'a-input-big': size === 'big'
    }
  )

  return (
    <>
      <input
        id="a-input"
        style={style}
        className={cls}
        type="text"
        value={value}
        onChange={onChange}
        disabled={canInput ? false : true}
        placeholder={placeHolder}
      />
    </>
  )
} 