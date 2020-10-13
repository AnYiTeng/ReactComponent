import React, { CSSProperties, ReactNode } from 'react'
import './modal.css'
import classnames from 'classnames'
import ReactDom from 'react-dom'
import AButton from './button'

interface IAModal {
  classname?: string
  style?: CSSProperties
  titleText?: string
  children?: ReactNode
  visible?: boolean
  onConfirm?: () => void
  onCancle?: () => void
  canMaskClose?: boolean
  hasConfirmBtn?: boolean
  confirmText?: string
  cancleText?: string
}

export default function AModal (props: IAModal) {
  const { 
    classname, 
    style, 
    titleText = '我是标题',
    children = <div>我是内容</div>,
    visible = false,
    onConfirm: onConfirm,
    onCancle,
    canMaskClose = true,
    hasConfirmBtn = true,
    confirmText = "确定",
    cancleText = "取消"
  } = props

  const toConfirm = () => {
    onConfirm && onConfirm()
  }

  const toCancle = () => {
    onCancle && onCancle()
  }

  const cls = classnames(
    'a-modal-wrapper', 
    classname
  )

  return ReactDom.createPortal(
    <>
      {
        visible &&
        <div style={style} className={cls}>
          <div className="a-modal">
            <div className="a-modal-title">{titleText}</div>
            <div className="a-modal-body">{children}</div>
            <div className="a-modal-footer">
              {
                hasConfirmBtn  && <AButton onChange={toConfirm} classname="modal-btn" children={confirmText}/>
              }
              <AButton onChange={toCancle} classname="modal-btn" children={cancleText}/>
            </div>
          </div>
          <div onClick={canMaskClose ? toCancle : () => {return}} className={classnames("a-modal-mask", {'a-modal-mask-none': !visible})}></div>
        </div>
      }
    </>
  , document.body)
}