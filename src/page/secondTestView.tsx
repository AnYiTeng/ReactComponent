import React, { useState, useRef, Dispatch, SetStateAction, useEffect, forwardRef, useImperativeHandle } from 'react'
import useTextHoxModel from '../common/hox/test'
import AInput from '../components/input'

interface ISecond {
  secondNum: number
  setSecondNum: Dispatch<SetStateAction<number>>
}

const SecondTestView = (props: ISecond, ref: any) => {
  let {secondNum, setSecondNum} = props
  let [childNum, setChildNum] = useState(100)

  const {testHox, decrement, increment} = useTextHoxModel()

  useImperativeHandle(ref, () => {
    return {
      addChildNum
    }
  })

  const addChildNum = () => {
    setChildNum(childNum++)
  }

  return (
    <>
      <div>
        <button onClick={() => setSecondNum(secondNum += 1)}>+1  {secondNum}</button>
        <p>---HOX测试的第二个页面---</p>
        <AInput value={testHox} onChange={increment}/>
        <p>---HOX测试的第二个页面---</p>
      </div>
    </>
  )
}

export default forwardRef(SecondTestView)