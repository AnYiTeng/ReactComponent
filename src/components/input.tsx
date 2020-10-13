import React, { CSSProperties } from 'react'
import classnames from 'classnames'
import './input.css'

interface IAInput<T> {
  classname?: string
  style?: CSSProperties
  onChange?: (v: T) => void
  canInput?: boolean
  placeHolder?: string
}

export default function AInput <T>(props: IAInput<T>) {
  const { 
    classname,
    style,
    onChange,
    canInput = true,
    placeHolder = "请输入内容"
  } = props
  const cls = classnames(
    'a-input', 
    classname,
  )

  const inputChange = () => {
    const inputValue = document.getElementById("a-input")
    console.log(inputValue?.innerText, 'inputValue')
    // onChange && onChange(inputValue)
  }
  return (
    <>
      <input
        id="a-input"
        style={style}
        className={cls}
        type="text"
        disabled={canInput ? false : true}
        onBlur={inputChange}
        placeholder={placeHolder}
      />
    </>
  )
} 