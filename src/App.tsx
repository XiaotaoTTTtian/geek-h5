import './App.scss'
// route
import { Router, Route, Switch, Redirect } from 'react-router-dom'
// imported components

import { AuthRoute } from '@/components/AuthRoute'
import history from '@/utils/history'
import Login from '@/pages/Login'
import Layout from './pages/Layout'
import Article from './pages/Article'
import ProfileEdit from './pages/Profile/Edit'
import Search from './pages/Search'
import SearchResult from './pages/Search/Result'
import Chat from './pages/Profile/Chat'

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
          <Route exact path="/search">
            <Search />
          </Route>
          <Route path="/search/result">
            <SearchResult />
          </Route>
          <AuthRoute path="/chat">
            <Chat />
          </AuthRoute>
        </Switch>
      </div>
    </Router>
  )
}

export default App
