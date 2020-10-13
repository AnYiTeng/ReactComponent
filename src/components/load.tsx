import React, { CSSProperties } from 'react'
import './load.css'
import classNames from 'classnames'
import ReactDom from 'react-dom'

interface IALoad { 
  classname?: string
  style?: CSSProperties
  visible?: boolean
}

export default function ALoad (props: IALoad) {
  const { classname, style, visible = false } = props
  const cls = classNames(
    'a-load-item', 
    classname
  )
  return ReactDom.createPortal(
    <>
      {
        visible &&
        <div className="a-load-wrapper">
          <div style={ style } className="a-load">
            <div className={ cls }></div>
            <div className={`${cls} a-load-item-rect2`}></div>
            <div className={`${cls} a-load-item-rect3`}></div>
            <div className={`${cls} a-load-item-rect4`}></div>
            <div className={`${cls} a-load-item-rect5`}></div>
          </div>
          <div className="a-load-mask"></div>
        </div>
      }
    </>
  , document.body)
}