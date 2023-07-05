import React, { useEffect, useState } from 'react'

export default function Playground() {
  const [test, setTest] = useState<any>()

  useEffect(() => {
    const init = {
      a: 1,
      b: 2
    }
    setTest(init)
  }, [])

  return (
    <div onClick={() => {
      const second = {
        a: 4,
        b: 5
      }
      console.log(test)
      setTest(second)
    }}>按钮</div>
  )
}