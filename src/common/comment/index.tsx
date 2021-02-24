import React, { CSSProperties } from 'react'
import './index.css'
import classnames from 'classnames'

interface ICommentCard {
  className?: string
  style?: CSSProperties
  avator?: string
  name?: string
  time?: string
  content?: string
  onDelete?: () => void
}

export default function CommentCard (props: ICommentCard) {
  const {
    className,
    style,
    avator = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    name = "Han Solo",
    time = "几秒前",
    content = "评论内容",
    onDelete
  } = props

  const cls = classnames(
    'comment-card-wrapper',
    className
  )

  return (
    <div style={style} className={cls}>
      <img className="comment-card-avator" src={avator} alt=""/>
      <div>
        <div className="comment-card-author">
          <span className="comment-card-author-name">{name}</span>
          <span className="comment-card-author-time">{time}</span>
          {
            onDelete && <span className="comment-card-author-delete" onClick={() => onDelete && onDelete()}>删除</span>
          }
        </div>
        <div className="comment-card-content">{content}</div>
      </div>
    </div>
  )
} 