import React, { Suspense, useEffect } from 'react'
import { Switch, Route, HashRouter, Link } from 'react-router-dom'

const Home = React.lazy(() => import('./views/home'))
const LocationScreen = React.lazy(() => import('./views/location'))
const Members = React.lazy(() => import('./views/members'))

const App: React.FC = () => {
  useEffect(() => {

  }, [])
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/location'>
            <LocationScreen />
          </Route>
          <Route path='/members'>
            <Members />
          </Route>
        </Switch>
      </Suspense>
    </HashRouter>
  )
}

export default App
