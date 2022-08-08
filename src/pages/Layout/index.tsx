import { useHistory } from 'react-router-dom'
import './index.scss'
const Layout = () => {
  const history = useHistory()
  const onClick = () => {
    history.go(-1)
  }
  return (
    <div className="test">
      <button onClick={onClick}>回退</button>
    </div>
  )
}
export default Layout
