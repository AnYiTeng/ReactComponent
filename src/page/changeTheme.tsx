import React, { CSSProperties } from 'react'
import classnames from 'classnames'
import AModal from '../components/modal'

interface IProps {
  className?: string
  style?: CSSProperties
  visible: boolean
  toClose: (T: boolean) => void
}

export default function ChangeTheme(props: IProps) {
  const { className, style, visible, toClose } = props
  const colorList = [
    { label: '红色', value: 'red' },
    { label: '蓝色', value: 'blue' },
  ]

  const toChangeTheme = (value: string) => {
    const root = document.querySelector(':root')
    root?.setAttribute('theme-color', value)
    toClose(false)
  }

  const cls = classnames('change-theme-wrapper', className)
	return (
		<AModal
      classname={cls}
      style={style}
      visible={visible}
      onCancle={() => toClose(false)}
      titleText="请选择主题色"
    >
      {
        colorList.map(item => {
          return (
            <div
              style={{ cursor: 'pointer' }}
              key={item.value}
              onClick={() => toChangeTheme(item.value)}
            >
              {item.label}
            </div>
          )
        })
      }
    </AModal>
	)
}