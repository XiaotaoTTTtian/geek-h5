import { NavBar, InfiniteScroll } from 'antd-mobile'
import { useHistory, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'
// import CommentInput from '../CommentInput'

import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import ContentLoader from 'react-content-loader'
import throttle from 'lodash/throttle'
import Icon from '@/components/Icon'
import { useInitialState } from '@/utils/use-initial-state'
import {
  getArticleById,
  followAuthor,
  collectArticle,
  likeArticle,
} from '@/store/actions/article'
import { useEffect, useRef, useState } from 'react'
import CommentFooter from './components/CommentFooter'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '@/types/store'
const NAV_BAR_HEIGTH = 100
const Article = () => {
  const history = useHistory()
  const params = useParams<{ artId: string }>()
  const [load, setLoad] = useState(true)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const authorRef = useRef<HTMLDivElement>(null)
  const [showNavAuthor, setShowNavAuthor] = useState(false)
  const commentRef = useRef<HTMLDivElement>(null)
  const isShowComment = useRef(false)
  const dispatch = useDispatch<AppThunkDispatch>()
  const loadMoreComments = async () => {
    console.log('加载更多评论')
  }
  // get article detaile
  const { detail } = useInitialState(
    () => getArticleById(params.artId),
    'article',
    () => setLoad(false)
  )
  // the content of the article is highlighted
  useEffect(() => {
    const dgHtmlDOM = document.querySelector('.dg-html')
    const codes = dgHtmlDOM?.querySelectorAll<HTMLElement>('pre code')
    if (codes && codes.length > 0) {
      codes.forEach((el) => {
        // let each code content implement code highlighting
        hljs.highlightElement(el)
      })
      return
    }
    hljs.configure({
      // ignore the warning
      ignoreUnescapedHTML: true,
    })
    const pres = dgHtmlDOM?.querySelectorAll('pre')
    if (pres && pres.length > 0) {
      pres.forEach((el) => {
        hljs.highlightElement(el)
      })
    }
  }, [detail])
  // the author information is displayed in the navigation bar
  useEffect(() => {
    if (load) return
    const wrapperDOM = wrapperRef.current!
    // create a throttle function
    const handleScroll = throttle(() => {
      const { top } = authorRef.current!.getBoundingClientRect()
      if (top + NAV_BAR_HEIGTH <= 0) {
        setShowNavAuthor(true)
      } else {
        setShowNavAuthor(false)
      }
    }, 100)

    wrapperDOM.addEventListener('scroll', handleScroll)
    return () => wrapperDOM.removeEventListener('scroll', handleScroll)
  }, [load, showNavAuthor])
  // effect of loading
  if (load) {
    return (
      // 根据当前页面结构，设计好的 loading 效果
      <ContentLoader
        speed={2}
        width={375}
        height={230}
        viewBox="0 0 375 230"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="16" y="8" rx="3" ry="3" width="340" height="10" />
        <rect x="16" y="26" rx="0" ry="0" width="70" height="6" />
        <rect x="96" y="26" rx="0" ry="0" width="50" height="6" />
        <rect x="156" y="26" rx="0" ry="0" width="50" height="6" />
        <circle cx="33" cy="69" r="17" />
        <rect x="60" y="65" rx="0" ry="0" width="45" height="6" />
        <rect x="304" y="65" rx="0" ry="0" width="52" height="6" />
        <rect x="16" y="114" rx="0" ry="0" width="340" height="15" />
        <rect x="263" y="208" rx="0" ry="0" width="94" height="19" />
        <rect x="16" y="141" rx="0" ry="0" width="340" height="15" />
        <rect x="16" y="166" rx="0" ry="0" width="340" height="15" />
      </ContentLoader>
    )
  }
  // show or hide comments
  const onShowComment = () => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const comment = commentRef.current
    if (!comment) return
    if (!isShowComment.current) {
      wrapper.scroll({
        top: comment.offsetTop - NAV_BAR_HEIGTH,
        behavior: 'auto',
      })
      isShowComment.current = true
    } else {
      wrapper.scrollTo(0, 0)
      isShowComment.current = false
    }
  }
  // pay attention to the author
  const onFollow = () => {
    dispatch(followAuthor(detail.art_id, detail.is_followed))
  }
  // collection of articles
  const onCollected = () => {
    dispatch(collectArticle(detail.art_id, detail.is_collected))
  }
  // the article thumb up
  const onLike = () => {
    dispatch(likeArticle(detail.art_id, detail.attitude))
  }
  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper" ref={wrapperRef}>
        <div className="article-wrapper" ref={authorRef}>
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
                onClick={onFollow}
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
          <div className="comment-header" ref={commentRef}>
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
          {showNavAuthor && (
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
                onClick={onFollow}
              >
                {detail.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}
        {/* 底部评论栏 */}
        <CommentFooter
          onShowComment={onShowComment}
          comment={detail.comm_count}
          is_collected={detail.is_collected}
          onCollected={onCollected}
          attitude={detail.attitude}
          onLike={onLike}
        />
        {/* <CommentInput /> */}
      </div>
    </div>
  )
}

export default Article
