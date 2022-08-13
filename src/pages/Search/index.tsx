import classnames from 'classnames'
import { useHistory } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'
import { useDebounceFn } from 'ahooks'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '@/types/store'
import { getSuggestion, clearSuggestion } from '@/store/actions/search'

const GEEK_SEARCH_KEY = 'geek-search-history'
const SearchPage = () => {
  const history = useHistory()
  const [searchInput, setSearchInput] = useState('')
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [flag, setFlag] = useState(true)
  const dispatch = useDispatch<AppThunkDispatch>()
  const { suggestion } = useSelector((state: RootState) => state.search)
  // search suggestions
  const onSearch = (value: string): void => {
    setSearchInput(value)
    if (value.trim() === '') {
      // dispatch
      return dispatch(clearSuggestion())
    }

    run()
  }
  // image stabilization function
  const { run } = useDebounceFn(
    () => {
      // no more execution after jumping to the search results page
      if (flag) {
        dispatch(getSuggestion(searchInput))
      }
    },
    {
      wait: 500,
    }
  )
  // associate keyword highlighting
  const highlightingSuggestion = suggestion.map((item) => {
    if (item === null) {
      suggestion.length = 0
      return {
        left: '',
        search: '',
        right: '',
      }
    }

    // convert to lowercase
    const lowerCaseItem = item.toLocaleLowerCase()
    const lowerCaseSearchTxt = searchInput.toLocaleLowerCase()
    const index = lowerCaseItem.indexOf(lowerCaseSearchTxt)
    const searchTxtLength = searchInput.length
    const left = item.slice(0, index)
    const search = item.slice(index, index + searchTxtLength)
    const right = item.slice(index + searchTxtLength)
    return {
      left,
      search,
      right,
    }
  })
  // get search results
  const onSearchResult = (value: string) => {
    dispatch(clearSuggestion())
    setFlag(false)
    history.push(`/search/result?q=${value}`)
    saveHistories(value)
  }
  // save the history
  const saveHistories = (value: string) => {
    let localHistory = JSON.parse(
      localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]'
    ) as string[]
    if (localHistory.length === 0) {
      localHistory.push(value)
    } else {
      localHistory = localHistory.filter((item: string) => item !== value)
      localHistory.unshift(value)
    }
    setSearchHistory(localHistory)
    localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(localHistory))
  }
  // when the page is displayed, the history is obtained from the local cache
  useEffect(() => {
    let localHistory = JSON.parse(
      localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]'
    ) as string[]
    setSearchHistory(localHistory)
  }, [])
  // delete and clear historical records
  const deleteHistory = (value: string, type: string) => {
    console.log('ooo')

    if (type === 'single') {
      let newLocalHistory = searchHistory.filter((item) => item !== value)
      localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(newLocalHistory))
      setSearchHistory(newLocalHistory)
    } else {
      console.log('all')
      setSearchHistory([])
      localStorage.removeItem(GEEK_SEARCH_KEY)
    }
  }
  console.log(suggestion)

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={
          <span
            className="search-text"
            onClick={() => onSearchResult(searchInput)}
          >
            搜索
          </span>
        }
      >
        <SearchBar
          placeholder="请输入关键字搜索"
          value={searchInput}
          onChange={onSearch}
        />
      </NavBar>

      {suggestion.length <= 0 && (
        <div
          className="history"
          style={{
            display: searchHistory.length > 0 ? 'block' : 'none',
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span onClick={() => deleteHistory('', 'all')}>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            {searchHistory.map((item, index) => (
              <span className="history-item" key={index}>
                <span className="text-overflow"> {item} </span>
                <Icon
                  type="iconbtn_essay_close"
                  onClick={() => deleteHistory(item, 'single')}
                />
              </span>
            ))}
          </div>
        </div>
      )}

      <div
        className={classnames(
          'search-result',
          suggestion.length > 0 ? 'show' : ''
        )}
      >
        {highlightingSuggestion.map((item, index) => (
          <div
            className="result-item"
            key={index}
            onClick={() => onSearchResult(item.left + item.search + item.right)}
          >
            <Icon className="icon-search" type="iconbtn_search" />
            <div className="result-value text-overflow">
              {/* <span>黑马</span>
           程序员 */}
              {item.left}
              <span> {item.search} </span>
              {item.right}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
