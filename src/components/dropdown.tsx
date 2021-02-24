import React, { useState, useEffect, CSSProperties, ReactNode } from 'react'
import AButton from './button'
import classnames from 'classnames'
import './dropdown.css'

interface IDropdown {
  className?: string
  style?: CSSProperties
  dropList: any[]
  emptyValue?: string
  overlay?: ReactNode | string
  placement?: string
}

export default function ADropdown (props: IDropdown) {
  const {
    className,
    style,
    dropList,
    emptyValue = '下拉按钮',
    overlay = '下拉内容',
    placement = 'center'
  } = props

  const [ isHover, setIsHover ] = useState(false)

  const cls = classnames(
    'a-dropdown',
    className
  )

  const mouseOverBtn = () => {
    setIsHover(true)
  }

  const mouseLeaveBtn = () => {
    setIsHover(false)
  }

  return (
    <div style={style} className={cls}  onMouseEnter={mouseOverBtn} onMouseLeave={mouseLeaveBtn}>
      <AButton classname="drop-btn" children={emptyValue} />
      {
        isHover && 
        <div className="drop-content-wrapper">
          {overlay}
        </div>
      }
    </div>
  )
}
