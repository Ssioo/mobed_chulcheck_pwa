import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const Home = React.lazy(() => import('./views/home'))

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path='/'>
            <Home/>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  )
}


export default App
