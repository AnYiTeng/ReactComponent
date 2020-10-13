import React, { useState } from 'react'
import AButton from '../components/button'
import AModal from '../components/modal'
import ALoad from '../components/load'
import AInput from '../components/input'
import AMessage from '../components/message'
import './home.css'

export default function HomePage () {
  const [ modalVisible, setModalVisible ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const toOpeanModal = () => {
    console.log('打开弹窗')
    setModalVisible(true)
  }

  const modalCancle = () => {
    setModalVisible(false)
  }
  const modalConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      setModalVisible(false)
      setLoading(false)
    }, 1000)
  }

  const openSuccessMessage = () => <AMessage type="success" />

  const modalChildren = () => {
    return (
      <div>
        <div className="skill-container">
          <div className="skill-code">Q</div>
          <div className="skill-name">寒冰碎片</div>
        </div>
        <div className="skill-container">
          <div className="skill-code">W</div>
          <div className="skill-name">冰霜之环</div>
        </div>
        <div className="skill-container">
          <div className="skill-code">E</div>
          <div className="skill-name">寒冰之径</div>
        </div>
        <div className="skill-container">
          <div className="skill-code">R</div>
          <div className="skill-name">冰封陵墓</div>
        </div>
      </div>
    )
  }

  function onchange<T>(e: T) {
    console.log(e, '!!!')
  }

  return (
    <div>
      <AButton
        classname="invalid-btn"
        canClick={false}
        children="禁用按钮"
      />
      <AButton
        onChange={toOpeanModal}
        classname="open-btn"
        children="打开弹窗"
      />
      <AModal 
        visible={modalVisible}
        titleText="冰霜女巫丽桑卓技能介绍"
        children={modalChildren()}
        onCancle={modalCancle}
        onConfirm={modalConfirm}
        canMaskClose={false}
        confirmText="确定"
        cancleText="关闭"
      />
      <ALoad 
        classname="load" 
        visible={loading}
      />
      <AInput
        classname="input"
        onChange={onchange}
        placeHolder="请输入你想输入的内容"
      />
      <AMessage
        type="error"
        content="错误信息"
      />
      <br/>
      <AButton
        style={{marginTop: "10px"}}
        onChange={openSuccessMessage}
        children="成功提示"
      />
    </div>
  )
}