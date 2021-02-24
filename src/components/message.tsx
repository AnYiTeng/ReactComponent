import React, { CSSProperties, useEffect, useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
import './message.css'
import classnames from 'classnames'

type MessageType = 'success' | 'error' | 'warn' | 'warning'

interface IAMessage { 
  className?: string
  style?: CSSProperties
  content?: string
  type?: string
  visible?: boolean
  onClose?: () => void
}

function notice (props: IAMessage) {
  const {
    className,
    style,
    content = "提示信息",
    type = "success",
    onClose
  } = props

    const cls = classnames(
      'a-message',
      className,
      {
        'a-message-success': type === "success",
        'a-message-error': type === "error",
        'a-message-warn': type === "info",
        'a-messgae-warning': type === "warning"
      }
    )

  return (
    <div id="a-message" style={style} className={cls}>
      <div className="a-message-content">{content}</div>
      <span className="a-message-close" onClick={onClose}>X</span>
    </div>
  )
}

const api: any = {
  open: notice
}

export function AMessage (originalApi: any, type: string) {
  originalApi[type] = (content: string, onClose: () => void) => {
    return originalApi.open({ content, onClose, type })
  }
}

['success', 'info', 'warning', 'error', 'loading'].forEach(type => AMessage(api, type));

// export default function AMessage (props: IAMessage) {
//   const {
//     className,
//     style,
//     content = "提示信息",
//     type = "success",
//     visible: visibleFromProps = true
//   } = props

//   const [ visible, setVisible ] = useState(visibleFromProps)

//   const cls = classnames(
//     'a-message',
//     className,
//     {
//       'a-message-hidden': !visible,
//       'a-message-success': type === "success",
//       'a-message-error': type === "error",
//       'a-message-warn': type === "warn",
//       'a-messgae-warning': type === "warning"
//     }
//   )

//   const message = document.getElementById('a-message')
//   const closeMessage = useCallback(() => {
//     setVisible(false)
//   }, [message])

//   const success = () => {
//     return (
//       <div id="a-message" style={style} className={cls}>
//         <div className="a-message-content">{content}</div>
//         <span className="a-message-close" onClick={closeMessage}>X</span>
//       </div>
//     )
//   }

//   return (
//     {
//       success: success()
//     }
//   )
// }