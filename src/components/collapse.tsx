import React, { CSSProperties, useState } from 'react'
import './collapse.css'
import classnames from 'classnames'

interface IACollapse {
  className?: string
  style?: CSSProperties
  titleText?: string
  contentText?: string
  isUnfold?: boolean
}

export default function ACollapse (props: IACollapse) {
  const {
    className,
    style,
    titleText = '默认标题',
    contentText = '默认内容',
    isUnfold = false
  } = props

  const [ hasClick, setHasClick ] = useState(isUnfold)

  const cls = classnames(
    'a-collapse-wrapper',
    className
  )

  const arrowCls = classnames(
    'a-collapse-arrows',
    {
      'a-collapse-arrows': !hasClick,
      'a-collapse-arrows-active': hasClick
    }
  )

  const contentCls = classnames(
    'a-collapse-innerwrapper',
    {
      'a-collapse-innerwrapper-none': !hasClick
    }
  )

  const toShow = () => {
    setHasClick(!hasClick)
  }

  return (
    <div style={style} className={cls}>
      <div className="a-collapse-outwrapper" onClick={toShow}>
        <span className={arrowCls}> {'>'} </span>
        <span>{titleText}</span>
      </div>
      <div className={contentCls}>
        {contentText}
      </div>
    </div>
  )
}