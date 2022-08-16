import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import classnames from 'classnames'
import { ArtComment } from '@/types/data'
import Icon from '@/components/Icon'

import styles from './index.module.scss'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
// import { ArtComment } from '@/types/data'
type ArticleComments = {
  type?: 'normal' | 'reply' | 'origin'
  item: ArtComment
  onThumbsUp?: () => void
  onReply?: () => void
}
const CommentItem = ({
  item,
  onThumbsUp,
  onReply,
  type = 'normal',
}: ArticleComments) => {
  // 回复按钮
  const replyJSX =
    type === 'normal' ? (
      <span className="replay" onClick={() => onReply && onReply()}>
        {item.reply_count === 0 ? '' : item.reply_count} 回复
        <Icon type="iconbtn_right" />
      </span>
    ) : null

  return (
    <div className={styles.root}>
      <div className="avatar">
        <img
          src={item.aut_photo || 'http://geek.itheima.net/images/user_head.jpg'}
          alt=""
        />
      </div>
      <div className="comment-info">
        <div className="comment-info-header">
          <span className="name">aut_name</span>
          {/* 文章评论、评论的回复 */}
          {(type === 'normal' || type === 'reply') && (
            <span className="thumbs-up">
              {item.like_count}
              <Icon
                type={item.is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'}
              />
            </span>
          )}
          {/* 要回复的评论 */}
          {type === 'origin' && (
            <span
              className={classnames(
                'follow',
                item.is_followed ? 'followed' : ''
              )}
            >
              {item.is_followed ? '已关注' : '关注'}
            </span>
          )}
        </div>
        <div className="comment-content">{item.content}</div>
        <div className="comment-footer">
          {replyJSX}
          {/* 非评论的回复 */}
          {type !== 'reply' && (
            <span className="comment-time">
              {dayjs().to(dayjs(item.pubdate))}
            </span>
          )}
          {/* 文章的评论 */}
          {type === 'origin' && (
            <span className="thumbs-up" onClick={onThumbsUp}>
              {item.like_count}
              <Icon
                type={item.is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'}
              />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
