import classnames from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import Icon from '@/components/Icon'
import { Image } from 'antd-mobile'

import styles from './index.module.scss'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
type Props = {
  art_id?: string
  aut_id?: string
  aut_name: string
  comm_count: number
  cover: {
    type: number
    images: string[]
  }
  pubdate: string
  title: string
}

const ArticleItem = ({
  cover,
  title,
  aut_name,
  comm_count,
  pubdate,
}: Props) => {
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          cover.type === 3 && 't3',
          cover.type === 0 && 'none-mt'
        )}
      >
        <h3>{title}</h3>
        {cover.type !== 0 && (
          <div className="article-imgs">
            {cover.images.map((item, index) => (
              <div key={index} className="article-img-wrapper">
                <Image
                  lazy={true}
                  src={item}
                  alt=""
                  style={{
                    '--height': '110px',
                    '--width': '75px',
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className={classnames('article-info', cover.type === 0 && 'none-mt')}
      >
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>{dayjs().to(dayjs(pubdate))}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
