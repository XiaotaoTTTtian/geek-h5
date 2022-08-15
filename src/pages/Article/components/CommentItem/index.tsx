import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import classnames from 'classnames'

import Icon from '@/components/Icon'

import styles from './index.module.scss'
// import { ArtComment } from '@/types/data'

const CommentItem = () => {
  // 回复按钮
  const replyJSX = true ? (
    <span className="replay">
      回复
      <Icon type="iconbtn_right" />
    </span>
  ) : null

  return (
    <div className={styles.root}>
      <div className="avatar">
        <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
      </div>
      <div className="comment-info">
        <div className="comment-info-header">
          <span className="name">aut_name</span>
          {/* 文章评论、评论的回复 */}
          {true && (
            <span className="thumbs-up">
              like_count
              <Icon type={true ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            </span>
          )}
          {/* 要回复的评论 */}
          {true && (
            <span className={classnames('follow', true ? 'followed' : '')}>
              {true ? '已关注' : '关注'}
            </span>
          )}
        </div>
        <div className="comment-content">content</div>
        <div className="comment-footer">
          {replyJSX}
          {/* 非评论的回复 */}
          {true && <span className="comment-time">pubdate</span>}
          {/* 文章的评论 */}
          {true && (
            <span className="thumbs-up">
              10
              <Icon type={true ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
