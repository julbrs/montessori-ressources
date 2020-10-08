import React, { useState, useCallback } from 'react';
import Admin from './components/Admin/index'
import { AuthContext } from 'context/auth-context'
import banner from 'images/banner.jpg'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/Navigation/ProtectedRoute'
import Add from './components/add'
import Contact from './components/pages/contact'
import Image from 'react-bulma-components/lib/components/image'
import Info from './components/pages/info'
import MainHeader from './components/Navigation/MainHeader';
import MainFooter from './components/Footer/MainFooter'
import Nomenclatures from './components/nomenclatures'
import Nomenclature from './components/pdf/nomenclature'
import NomenclatureView from './components/nomenclature/NomenclatureView'

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
          <Route path="/nomenclature/view/:nomenclatureId" component={NomenclatureView} />
          <Route path="/nomenclature/:nomenclatureId" component={Nomenclature} />
          <ProtectedRoute path="/add" component={Add} />
          <Route path="/info" component={Info} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={Admin} />

          <Route path="/" exact>
            <Image  src={banner} style={{ width: "100%", marginLeft: "auto",  marginRight: "auto"}}/>
            <Nomenclatures />
          </Route>
        </Switch>
        </main>
        <MainFooter />
    </Router>
    </AuthContext.Provider>
  );
}

export default App
