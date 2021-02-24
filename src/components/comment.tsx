import React, { CSSProperties, useEffect, useState, useCallback, useRef } from 'react'
import './comment.css'
import classnames from 'classnames'
import AButton from './button'
import AModal from './modal'
import CommentCard from '../common/comment/index'
import { CommentCardType } from '../global/globalType'

interface IAComment {
  className?: string
  style?: CSSProperties
  avatorProps?: string
  nameProps?: string
}

export default function AComment (props: IAComment) {
  const [ commentList, setCommentList ] = useState<CommentCardType[]>([])
  const [ commentContent, setCommentContent ] = useState('')
  const [ commentId, setCommentId ] = useState(0)
  const [ modalVisible, setModalVisible ] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  
  const {
    className,
    style,
    avatorProps = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    nameProps = 'Han Solo'
  } = props


  const cls = classnames(
    'a-comment-wrapper',
    className
  )

  const onChange = useCallback(() => {
    if (inputRef && inputRef.current) {
      setCommentContent(inputRef.current.value)
    }
  }, [commentContent])
  
  const addComment = useCallback(() => {

    if (!commentContent) {
      setModalVisible(true)
      return 
    }
    
    let data= new Date()
    setCommentId(commentId + 1)
    commentList.push({
      id: commentId,
      avator: avatorProps,
      name: nameProps,
      time: `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`,
      content: commentContent
    })
    setCommentList(commentList => commentList.concat([]))
    setCommentContent('')
  }, [commentList, commentContent])

  const deleteComment = (id: number) => {
    const filterCommen = commentList.filter((item) => {
      return item.id !== id
    })
    setCommentList(filterCommen)
  }

  return (
    <div style={style} className={cls}>
      <ul>
        {
          commentList.map((item) => {
            return (
              <CommentCard
                key={item.id}
                avator={item.avator}
                name={item.name}
                time={item.time}
                content={item.content}
                onDelete={() => deleteComment(item.id)}
              />
            )
          })
        }
      </ul>
      <div className="a-comment-input-wrapper">
        <img className="a-comment-avator" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt=""/>
        <div className="a-comment-textarea-wrapper">
          <textarea ref={inputRef} value={commentContent} onChange={onChange} className="a-comment-textarea" rows={4}></textarea>
          <AButton
            classname="a-comment-addbutton" 
            children="Add Comment"
            onChange={addComment}
          />
        </div>
      </div>
      <AModal 
        visible={modalVisible} 
        titleText=""
        children="请输入评论内容"
        hasConfirmBtn={false}
        cancleText="确定"
        onCancle={() => setModalVisible(false)}
      />
    </div>
  )
}


// interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
//   children: string
// }
// const Foo = (props: IProps) => {
//   const { children } = props
//   return <div {...props}>
//     {children + 1}
//   </div>
// }

// const App = () => {
//   return <Foo onClick={ foo } children={'1'} />
// }