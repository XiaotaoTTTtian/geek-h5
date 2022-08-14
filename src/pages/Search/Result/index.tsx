import { useHistory, useLocation } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '@/types/store'
import { useEffect } from 'react'
import { clearSuggestion } from '@/store/actions/search'

const Result = () => {
  const history = useHistory()
  const dispatch = useDispatch<AppThunkDispatch>()
  const location = useLocation()
  const { suggestion } = useSelector((state: RootState) => state.search)
  const params = new URLSearchParams(location.search)
  const q = params.get('q') ?? ''
  console.log(suggestion)

  // clearing search suggestions
  useEffect(() => {
    dispatch(clearSuggestion())
  }, [suggestion])
  useEffect(() => {
    // dispatch(getSearchResult())
  }, [dispatch])
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
