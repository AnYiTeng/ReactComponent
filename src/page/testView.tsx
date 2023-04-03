import React, { useState } from 'react'
import classnames from 'classnames'
import './testView.css'

export default function TestView() {
  const [checkList, setCheckList] = useState<Number[]>([])

  const clickBox = (index: number) => {
    let resList = [...checkList]
    if (resList.includes(index)) {
      resList = resList.filter(item => item !== index)
      setCheckList(resList)
    } else {
      resList.push(index)
      setCheckList(resList)
    }
  }

  const renderBox = () => {
    return [1, 2, 3, 4, 5, 6].map((_item, index) => {
      return (
        <div
          key={index}
          className={classnames('box', {
            'box--height-light-green': checkList.includes(index) && Boolean(index % 2),
            'box--height-light-red': checkList.includes(index) && !Boolean(index % 2),
          })}
          onClick={() => clickBox(index)}
        >
        </div>
      )
    })
  }

  return (
    <div className="wrapper">
      {renderBox()}
    </div>
  )
}
