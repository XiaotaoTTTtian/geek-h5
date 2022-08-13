import { InfiniteScroll } from 'antd-mobile'
import styles from './index.module.scss'
import ArticleItem from '@/components/ArticleItem'
import { useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, RootState } from '@/types/store'
import { getArticleList } from '@/store/actions/article'

type article = {
  channelId: number
}
const ArticleList = ({ channelId }: article) => {
  const dispatch = useDispatch<AppThunkDispatch>()
  const { channelArticles } = useSelector((state: RootState) => state.article)
  const { pre_timestamp, results } = channelArticles[channelId] ?? {
    pre_timestamp: Date.now() + '',
    results: [],
  }
  const loadMore = async () => {
    await dispatch(getArticleList(channelId, pre_timestamp))
  }
  // if pre_timestamp is null, there is no more data
  const hasMore = pre_timestamp !== null
  console.log(hasMore)

  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      {results.map((item, index) => (
        <div className="article-item" key={index}>
          <ArticleItem {...item} />
        </div>
      ))}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}

export default ArticleList
