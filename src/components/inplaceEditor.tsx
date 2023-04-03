import React, { CSSProperties, useState } from 'react'
import './inplaceEditor.css'
import classnames from 'classnames'
import AInput from '../components/input'
import AButton from '../components/button'

interface IAInplaceEditor {
  className?: string
  style?: CSSProperties
  value: number | string
  onChange?: (v: any) => void
  format?: (v: any) => void
  disable?: Boolean
}

export default function AInplaceEditor (props: IAInplaceEditor) {
  const {
    className,
    style,
    value,
    onChange,
    format,
    disable = false
  } = props
  const [ isInput, setIsInput ] = useState(false)
  const [ inputValue, setInputValue ] = useState(value)

  const cls = classnames(
    'a-inplace-editor',
    className,
  )
  const showcls = classnames(
    'a-inplace-show-wrapper',
    {
      'a-inplace-show': !disable,
      'a-inplace-disable': disable
    }
  )

  const toChangeValue = () => {
    setIsInput(true)
  }
  const confirmValue = () => {
    setIsInput(false)
    onChange && onChange(inputValue)
  }

  return(
    <div style={style} className={cls}>
      {
        isInput ?
        <div>
          <AInput
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <AButton
            style={{marginLeft: '10px'}}
            children="确定"
            onClick={confirmValue}
          />
        </div> :
        <div className={showcls} onClick={disable ? () => {} : toChangeValue}>
          <>
            { format ? format(value) : value }
          </>
        </div>
      }
    </div>
  )
}