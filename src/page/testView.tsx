import React, { useState, useMemo, useEffect, useCallback, useLayoutEffect } from 'react'

const nameList = ['apple', 'peer', 'banana', 'lemon']

export default function TestView () {
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('apple')

  const [count, setCount] = useState(0)

  const getProductName = () => {
    console.log('getProductName函数触发')
    return name
  }

  useEffect(() => {
    console.log('name effect触发')
    getProductName()
  }, [name])

  useEffect(() => {
    console.log('price effect触发')
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
    console.log('name memo 触发')
    return () => name // 返回一个函数
  }, [name])

  return (
    <>
      <p>{name}</p>
      <p>{price}</p>
      <p>普通的name: {getProductName()}</p>
      <p>memo化的name: {memo_getProductName()}</p>
      <button onClick={() => setPrice(price+1)}>价钱+1</button>
      <button onClick={() => setName(nameList[Math.round(Math.random()*nameList.length)])}>修改名字</button>
      <button onClick={handleClick}>{count}</button>
    </>
  )
}