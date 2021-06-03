import {useState} from 'react'
import {createModel} from 'hox'

function useTestHox() {
  const [testHox, setTestHox] = useState(0)
  const increment = () => {
    setTestHox(testHox + 1)
  }
  const decrement = () => {
    setTestHox(testHox - 1)
  }
  return {
    testHox,
    increment,
    decrement,
  }
}

export default createModel(useTestHox)