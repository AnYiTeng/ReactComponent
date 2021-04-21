import React, {useContext} from 'react'
import {TestContext} from '../../App'

export default function Second() {
  const value = useContext(TestContext)
  console.log(value, 'value')
  return(
    <>
      
    </>
  )
}