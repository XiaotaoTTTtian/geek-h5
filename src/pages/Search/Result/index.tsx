import { useHistory, useLocation } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '@/types/store'
import { useEffect } from 'react'
import { clearSuggestion, getSearchResult } from '@/store/actions/search'
import { useInitialState } from '@/utils/use-initial-state'
import ArticleItem from '@/components/ArticleItem'

const Result = () => {
  const history = useHistory()
  const dispatch = useDispatch<AppThunkDispatch>()
  const location = useLocation()
  const { suggestion } = useSelector((state: RootState) => state.search)
  const params = new URLSearchParams(location.search)
  // console.log(location)

  // obtaining query paramters
  const q = params.get('q') ?? ''

  // clearing search suggestions
  useEffect(() => {
    dispatch(clearSuggestion())
  }, [dispatch, suggestion])
  // request and retrieve data
  const {
    searchResults: { results },
  } = useInitialState(() => getSearchResult(q), 'search')
  // console.log(searchResults)
  const list = results ?? []
  // console.log(results)

  const renderArticleList = () => {
    return list.map((item, index) => {
      return (
        <div
          key={index}
          className="article-item"
          onClick={() => history.push(`/article/${item.art_id}`)}
        >
          <ArticleItem {...item} />
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
