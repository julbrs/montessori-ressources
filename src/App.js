import React, { useState, useCallback } from 'react';
import Admin from './components/Admin/index'
import { AuthContext } from 'context/auth-context'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/Navigation/ProtectedRoute'
import Add from './components/add'
import Contact from './components/pages/contact'
import Nomenclature from './components/pdf/nomenclature'
import NomenclatureView from './components/nomenclature/NomenclatureView'
import MainHeader from './components/Navigation/MainHeader';
import MainFooter from './components/Footer/MainFooter'
import Info from './components/pages/info'
import Main from './components/pages/main'
import withTracker from './tools/withTracker'

import './App.scss'

const App = () => {
  const [isLoggedIn, setIsLoggedIn ] = useState(false)

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])



  return (
    /* Every component in our router has acess to AuthContext. 
    The provider takes a value prop that we bind with the initial value.
    Every time this value changes, all components that listen to our context will re-render */
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout:logout}}>
    <Router>
      <MainHeader />
        {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <main>
        <Switch>
          <Route path="/nomenclature/view/:nomenclatureId" component={withTracker(NomenclatureView)} />
          <Route path="/nomenclature/:nomenclatureId" component={withTracker(Nomenclature)} />
          <ProtectedRoute path="/add" component={withTracker(Add)} />
          <Route path="/info" component={withTracker(Info)} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={Admin} />
          <Route path="/" exact component={withTracker(Main)} />
        </Switch>
        </main>
        <MainFooter />
    </Router>
    </AuthContext.Provider>
  );
}

export default App
