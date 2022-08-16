import Icon from '@/components/Icon'
import styles from './index.module.scss'

type Props = {
  // normal 普通评论
  // reply 回复评论
  type?: 'normal' | 'reply'
  onShowComment?: () => void
  comment?: number
  is_collected?: boolean
  onCollected?: () => void
  attitude?: number
  onLike?: () => void
  onOpenReply: () => void
  placeholder?: string
}

const CommentFooter = ({
  type = 'normal',
  onShowComment,
  comment,
  is_collected,
  onCollected,
  attitude,
  onLike,
  onOpenReply,
  placeholder,
}: Props) => {
  return (
    <div className={styles.root}>
      <div className="input-btn" onClick={onOpenReply}>
        <Icon type="iconbianji" />
        <span>抢沙发</span>
      </div>

      {type === 'normal' && (
        <>
          <div className="action-item" onClick={onShowComment}>
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {!!1 && <span className="bage">{comment}</span>}
          </div>
          <div className="action-item" onClick={onLike}>
            <Icon
              type={attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'}
            />
            <p>点赞</p>
          </div>
          <div className="action-item" onClick={onCollected}>
            <Icon
              type={is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'}
            />
            <p>收藏</p>
          </div>
        </>
      )}

      {type === 'reply' && (
        <div className="action-item" onClick={onLike}>
          <Icon type={attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
          <p>点赞</p>
        </div>
      )}

      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter
