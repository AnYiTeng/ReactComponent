import React, { CSSProperties } from 'react'
import classnames from 'classnames'

interface IProps {
	className?: string
	style?: CSSProperties
}

export default function ModalInput(props: IProps) {
	const { className, style } = props

	const cls = classnames('a-modal-input', className)
	return (
		<div className={cls} style={style} >
			多模态输入框组件
		</div>
	)
}