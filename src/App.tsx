import './App.scss'
// route
import { Router, Route, Switch, Redirect } from 'react-router-dom'
// imported components
import Login from '@/pages/Login'
import Layout from './pages/Layout'
import Article from './pages/Article'
import ProfileEdit from './pages/Profile/Edit'
import { AuthRoute } from '@/components/AuthRoute'
import history from '@/utils/history'

function App() {
  return (
    <Router history={history}>
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home/index" />} />
          <Route path="/home" component={Layout} />
          <Route path="/login" component={Login} />
          {/* <Route path="/profile/edit" component={ProfileEdit} /> */}
          <AuthRoute path="/profile/edit">
            <ProfileEdit />
          </AuthRoute>
          <Route path="/article/:artId">
            <Article />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
