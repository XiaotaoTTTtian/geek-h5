import './App.scss'
// route
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
// imported components
import Login from '@/pages/Login'
import Layout from './pages/Layout'

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home/index" />} />
          <Route path="/home" component={Layout} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
