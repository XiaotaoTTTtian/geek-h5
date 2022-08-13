import classnames from 'classnames'
import { useHistory } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'
import { useDebounceFn } from 'ahooks'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '@/types/store'
import { getSuggestion, clearSuggestion } from '@/store/actions/search'

const SearchPage = () => {
  const history = useHistory()
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useDispatch<AppThunkDispatch>()
  const { suggestion } = useSelector((state: RootState) => state.search)
  console.log(suggestion)
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
      dispatch(getSuggestion(searchInput))
    },
    {
      wait: 500,
    }
  )
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={<span className="search-text">搜索</span>}
      >
        <SearchBar
          placeholder="请输入关键字搜索"
          value={searchInput}
          onChange={onSearch}
        />
      </NavBar>

      {true && (
        <div
          className="history"
          style={{
            display: true ? 'none' : 'block',
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            <span className="history-item">
              <span className="text-overflow">黑马程序员</span>
              <Icon type="iconbtn_essay_close" />
            </span>
          </div>
        </div>
      )}

      <div
        className={classnames(
          'search-result',
          suggestion.length > 0 ? 'show' : ''
        )}
      >
        {suggestion.map((item, index) => (
          <div className="result-item" key={index}>
            <Icon className="icon-search" type="iconbtn_search" />
            <div className="result-value text-overflow">
              {/* <span>黑马</span>
           程序员 */}
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
