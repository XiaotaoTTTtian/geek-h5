import './App.scss'
// route
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// imported components
import Login from './pages/Login'
import Layout from './pages/Layout'

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/home" component={Layout} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
