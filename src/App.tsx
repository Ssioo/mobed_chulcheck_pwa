import React, {Suspense} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const Home = React.lazy(() => import('./views/home'))

const App: React.FC = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Suspense>
  </Router>
)


export default App