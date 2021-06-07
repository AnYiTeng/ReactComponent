import React, { useState, useMemo, useEffect, useCallback, useLayoutEffect, useRef } from 'react'
import SecondTestView from './secondTestView'
import First from './testChild/first'
import {TestContext} from '../App'
import AButton from '../components/button'
import useTextHoxModel from '../common/hox/test'

const nameList = ['apple', 'peer', 'banana', 'lemon']

export default function TestView () {
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('apple')
  const [count, setCount] = useState(0)
  const [secondNum, setSecondNum] = useState(0)
  let [num, setNum] = useState(0)

  const {testHox, decrement, increment} = useTextHoxModel()

  const getProductName = () => {
    return name
  }

  const h1Ref = useRef(null)
  const secondTestViewRef = useRef(null)

  useEffect(() => {
    getProductName()
  }, [name])

  useEffect(() => {
  }, [price])

  // useEffect是在浏览器重绘之后才异步执行的，所以点击按钮之后按钮上的数字会先变成0再变成一个随机数；而useLayoutEffect是在浏览器重绘之前同步执行的，所以两次setCount合并到300ms后的重绘里了
  useLayoutEffect(() => {
    const start = +new Date()
    while (+new Date() - start <= 300) {
      continue
    }
    if (count === 0) {
      setCount(Math.random())
    }
  }, [count])

  const handleClick = useCallback(() => setCount(0), [])

  const memo_getProductName = useMemo(() => {
    return () => name // 返回一个函数
  }, [name])

  useEffect(() => {
    console.log(secondNum, 'secondNum')
  }, [secondNum])

  useEffect(() => {
    console.log(secondTestViewRef.current, 'secondTestViewRef')
  }, [])

  const add = () => {
    setNum(num++)
  }

  return (
    <>
      <p>{name}</p>
      <p>{price}</p>
      <p>普通的name: {getProductName()}</p>
      <p>memo化的name: {memo_getProductName()}</p>
      <button onClick={() => setPrice(price+1)}>价钱+1</button>
      <button onClick={() => setName(nameList[Math.round(Math.random()*nameList.length)])}>修改名字</button>
      <button onClick={handleClick}>{count}</button>

      <SecondTestView ref={secondTestViewRef} secondNum={secondNum} setSecondNum={setSecondNum} />
      {secondNum}

      <h1 ref={h1Ref}>
        我是一个h1标签
      </h1>

      <TestContext.Provider value={num}>
        <First/>
        <AButton onClick={() => add()}>
          context测试加
        </AButton>
      </TestContext.Provider>
      {/* hox练习 */}
      <p>---HOX练习---</p>
      <p>{testHox}</p>
      <AButton onClick={decrement}>
        hox测试减
      </AButton>
      <p>---HOX练习---</p>
    </>
  )
}