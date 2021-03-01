import React, { useState, useRef, Dispatch, SetStateAction, useEffect, forwardRef, useImperativeHandle } from 'react'

interface ISecond {
  secondNum: number
  setSecondNum: Dispatch<SetStateAction<number>>
}

const SecondTestView = (props: ISecond, ref: any) => {
  let {secondNum, setSecondNum} = props
  let [childNum, setChildNum] = useState(100)

  useImperativeHandle(ref, () => addChildNum)

  const addChildNum = () => {
    setChildNum(childNum++)
  }

  return (
    <>
      <div>
        <button onClick={() => setSecondNum(secondNum += 1)}>+1  {secondNum}</button>
      </div>
    </>
  )
}

export default forwardRef(SecondTestView)