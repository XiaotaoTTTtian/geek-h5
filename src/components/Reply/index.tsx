import { Popup, NavBar } from 'antd-mobile'

import CommentItem from '@/pages/Article/components/CommentItem'
// import CommentFooter from '../CommentFooter'
import CommentInput from '@/pages/Article/components/CommentInput'
import NoneComment from '@/components/NoneComment'

import styles from './index.module.scss'
import {
  AddCommentReplyResponse,
  ArtComment,
  ArticleComment,
  ArticleCommentResponse,
} from '@/types/data'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import CommentFooter from '@/pages/Article/components/CommentFooter'

type Props = {
  onClose: (commentId: string, total: number) => void
  commentItem: ArtComment
  onOriginThumbsUp: () => void
  articleId: string
}

const Reply = ({
  onClose,
  commentItem,
  onOriginThumbsUp,
  articleId,
}: Props) => {
  // the status of the original comment item
  const [originComment, setOriginComment] = useState(commentItem)
  // the reply list status of the comment item
  const [commentReply, setCommentReply] = useState({} as ArticleComment)
  const [replyInput, setReplyInput] = useState(false)
  // get a list of comments and replies
  useEffect(() => {
    const loadData = async () => {
      const res = await http.get<ArticleCommentResponse>('/comments', {
        params: {
          type: 'c',
          source: originComment.com_id,
        },
      })
      console.log(res)
      setCommentReply(res.data.data)
    }
    setOriginComment(commentItem)

    loadData()
  }, [commentItem.com_id])
  const onReplyInputShow = () => setReplyInput(true)
  const onReplyInputHide = () => setReplyInput(false)
  // respond to the comments
  const onAddReply = async (content: string) => {
    const res = await http.post<AddCommentReplyResponse>('/comments', {
      target: commentItem.com_id,
      content,
      art_id: articleId,
    })
    setCommentReply({
      ...commentReply,
      total_count: commentReply.total_count + 1,
      results: [res.data.data.new_obj, ...commentReply.results],
    })
    onReplyInputHide()
  }
  // close the reply popup layer, passing the total number of current comments to the parent comment
  const onBackToArticle = () => {
    onClose(originComment.com_id, commentReply.total_count)
  }
  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        <NavBar className="transparent-navbar" onBack={onBackToArticle}>
          {commentReply.total_count}?????????
        </NavBar>

        {/* ?????????????????? */}
        <div className="origin-comment">
          <CommentItem
            item={originComment}
            type="origin"
            onThumbsUp={onOriginThumbsUp}
          />
        </div>

        <div className="reply-list">
          <div className="reply-header">????????????</div>

          {commentReply.total_count > 0 ? (
            commentReply.results.map((item) => (
              <CommentItem type="reply" key={item.com_id} item={item} />
            ))
          ) : (
            <NoneComment />
          )}
        </div>

        <CommentFooter
          placeholder="?????????"
          type="reply"
          onOpenReply={onReplyInputShow}
        />
      </div>

      {/* ?????????????????????????????? */}

      <Popup className="reply-popup" position="bottom" visible={replyInput}>
        <CommentInput onAddComment={onAddReply} onClose={onReplyInputHide} />
      </Popup>
    </div>
  )
}

export default Reply
