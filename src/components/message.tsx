import React, { CSSProperties, useEffect, useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
import './message.css'
import classnames from 'classnames'

interface IAMessage { 
  className?: string
  style?: CSSProperties
  content?: string
  type?: string
  visible?: boolean
}

export default function AMessage (props: IAMessage) {
  const {
    className,
    style,
    content = "提示信息",
    type = "success",
    visible: visibleFromProps = true
  } = props

  const [ visible, setVisible ] = useState(visibleFromProps)

  const cls = classnames(
    'a-message',
    className,
    {
      'a-message-hidden': !visible,
      'a-message-success': type === "success",
      'a-message-error': type === "error",
      'a-message-warn': type === "warn",
      'a-messgae-warning': type === "warning"
    }
  )

  const message = document.getElementById('a-message')
  const closeMessage = useCallback(() => {
    // message && message.style.right = "-500px"
    setVisible(false)
  }, [message])

  return ReactDOM.createPortal(
      <div id="a-message" style={style} className={cls}>
        <div className="a-message-content">{content}</div>
        <span className="a-message-close" onClick={closeMessage}>X</span>
      </div>
    , document.body)
}