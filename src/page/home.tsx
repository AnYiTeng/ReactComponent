import React, { useState, useEffect } from 'react'
import { DropList } from '../global/globalType'
import AButton from '../components/button'
import AModal from '../components/modal'
import ALoad from '../components/load'
import AInput from '../components/input'
import {AMessage} from '../components/message'
import AInplaceEditor from '../components/inplaceEditor'
import ACollapse from '../components/collapse'
import AComment from '../components/comment'
import ADropdown from '../components/dropdown'
import ACarousel from '../components/carousel'
import Rate from '../components/rates'
import './home.css'
import { Link } from 'react-router-dom'
// import { MuxMessage } from '@alife/mux-components'
import ClassTest from './classTest'
import FnTest from './fnTest'

export default function HomePage () {
  const [ modalVisible, setModalVisible ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ inputValue, setInputValue ] = useState('123')
  const [ inplaceEditorValue1, setInplaceEditorValue1 ] = useState(100)
  const [ inplaceEditorValue2, setInplaceEditorValue2 ] = useState(100)
  const [ inplaceEditorValue3, setInplaceEditorValue3 ] = useState('200元')
  const [ dropList, setDropList ] = useState<DropList[]>([])
  const [info, setInfo] = useState(0)

  useEffect(() => {
    setDropList([
      {value: 0, label: '选项1'},
      {value: 1, label: '选项2'},
      {value: 3, label: '选项3'},
      {value: 4, label: '选项4'},
    ])
  }, [])

  const toOpeanModal = () => {
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

  const openSuccessMessage = () => {
    // return AMessage({}).success
  }

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

  return (
    <div className="main">
      <Link to="/test">
        去往测试页面
      </Link>

      {/* <div className="text">以铜为镜，可以正衣冠；以史为镜，可以知兴替；以人为镜，可以明得失。</div> */}
      <AButton
        classname="invalid-btn"
        canClick={false}
        children="禁用按钮"
      />
      <AButton
        onClick={toOpeanModal}
        classname="open-btn"
        children="打开弹窗"
      />
      <AButton
        classname="invalid-btn"
        children="链接按钮"
        types="link"
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
        placeHolder="请输入你想输入的内容"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <AInput
        classname="input"
        placeHolder="请输入你想输入的内容"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        size="small"
      />
      <AInput
        classname="input"
        placeHolder="请输入你想输入的内容"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        size="big"
      />
      <br/>
      <AButton
        style={{marginTop: "10px"}}
        onClick={openSuccessMessage}
        children="成功提示"
      />
      <br/>
      <div className="inplace-wrapper">
        只能输入数字:
        <AInplaceEditor
          style={{marginLeft: "10px"}}
          format={inplaceEditorValue1 => (+inplaceEditorValue1).toFixed(2)}
          value={inplaceEditorValue1}
          onChange={(v) => setInplaceEditorValue1(v)}
        />
      </div>
      <div className="inplace-wrapper">
        中英混合:
        <AInplaceEditor
          className="inplace-editor"
          value={inplaceEditorValue2}
          onChange={(v) => setInplaceEditorValue2(v)}
        /> 
      </div>
      <div className="inplace-wrapper">
        禁止更改:
        <AInplaceEditor
          style={{marginLeft: "10px"}}
          value={inplaceEditorValue3}
          disable={true}
        />
      </div>
      <ACollapse
        titleText="点击展开"
        contentText="展开的内容"
        isUnfold={true}
        className="collapse-wrapper"
      />
      <ACollapse
        titleText="点击展开"
        contentText="展开的内容"
      />
      <AComment 
        className="mt10"
        nameProps="lisangzhuo"
      />
      {/* <ADropdown className="mt10" dropList={dropList}/> */}

      <ACarousel isAutoPlay={false} />

      <Rate />

      <ClassTest info={info} />

      <FnTest info={info} />
      <div onClick={() => setInfo(info + 1)}>父组件的info: {info}</div>
    </div>
  )
}


// q1.
new Promise(resolve => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
  .then(data => 2)
  .then(data => console.log(data)) // 2
  .catch(err => console.error(err))
  .finally(() => {
    console.log('hello world')
  })  // hello world

// q2.
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 1000)),
  new Promise(resolve => setTimeout(() => resolve(2), 2000)),
  new Promise(resolve => setTimeout(() => resolve(3), 3000)),
])
  .then(datas => console.log(datas))  // [1, 2, 3]

// answer
class IPromise {
  constructor () {

  }
  static all () {

  }
}


// q3.
const version = ['1.4.5', '2.1.1', '2.3.0', '1.15.0', '6.1', '3', '3.3.3.3.3.3', '7']
// ['1.4.5', '1.15.0', '2.1.1', '2.3.0', '3', '3.3.3.3.3.3', '6.1', '7']

// version sort
const sortVersion = (versions: string[]) => {
  // 
}