import { NavBar, InfiniteScroll } from 'antd-mobile'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'
// import CommentInput from '../CommentInput'

import DOMPurify from 'dompurify'
import Icon from '@/components/Icon'
import { useInitialState } from '@/utils/use-initial-state'
import { getArticleById } from '@/store/actions/article'

const Article = () => {
  const history = useHistory()
  const params = useParams<{ artId: string }>()
  const loadMoreComments = async () => {
    console.log('加载更多评论')
  }
  // get article detaile
  const { detail } = useInitialState(
    () => getArticleById(params.artId),
    'article'
  )
  // console.log(detail)

  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper">
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{detail.title}</h1>

            <div className="info">
              <span>{detail.pubdate}</span>
              <span>{detail.read_count} 阅读</span>
              <span>{detail.comm_count} 评论</span>
            </div>

            <div className="author">
              <img
                src={
                  detail.aut_photo ||
                  'http://geek.itheima.net/images/user_head.jpg'
                }
                alt=""
              />
              <span className="name">{detail.aut_name}</span>
              <span
                className={classNames(
                  'follow',
                  detail.is_followed ? 'followed' : ''
                )}
              >
                {detail.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          </div>

          <div className="content">
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(detail.content),
              }}
            />
            <div className="date">发布文章时间：{detail.pubdate}</div>
          </div>
        </div>

        <div className="comment">
          <div className="comment-header">
            <span>全部评论（10）</span>
            <span>20 点赞</span>
          </div>

          <div className="comment-list">
            <InfiniteScroll hasMore={false} loadMore={loadMoreComments} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => history.go(-1)}
          right={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {true && (
            <div className="nav-author">
              <img
                src={
                  detail.aut_photo ||
                  'http://geek.itheima.net/images/user_head.jpg'
                }
                alt=""
              />
              <span className="name">{detail.aut_name}</span>
              <span
                className={classNames(
                  'follow',
                  detail.is_followed ? 'followed' : ''
                )}
              >
                {detail.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}
        {/* 底部评论栏 */}
        {/* <CommentInput /> */}
      </div>
    </div>
  )
}

export default Article
