import { useHistory } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '@/types/store'
import { useEffect } from 'react'
import { clearSuggestion } from '@/store/actions/search'

const Result = () => {
  const history = useHistory()
  const dispatch = useDispatch<AppThunkDispatch>()
  useEffect(() => {
    dispatch(clearSuggestion())
  }, [])
  const renderArticleList = () => {
    return [].map((item, index) => {
      const {
        title,
        pubdate,
        comm_count,
        aut_name,
        art_id,
        cover: { type, images },
      } = item

      const articleData = {
        title,
        pubdate,
        comm_count,
        aut_name,
        type,
        images,
      }

      return (
        <div
          key={index}
          className="article-item"
          onClick={() => history.push(`/article/${art_id}`)}
        >
          {/* <ArticleItem {...articleData} /> */}
        </div>
      )
    })
  }

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      <div className="article-list">{renderArticleList()}</div>
    </div>
  )
}

export default Result
