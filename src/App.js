import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/Navigation/ProtectedRoute'
import DropZone from './components/dropzone'
import Nomenclatures from './components/nomenclatures'
import Nomenclature from './components/pdf/nomenclature'
import NomenclatureView from './components/nomenclature/NomenclatureView'
import MainHeader from './components/Navigation/MainHeader';
import MainFooter from './components/Footer/MainFooter'
import Info from './components/pages/info'
import { AuthContext } from 'context/auth-context'
import Admin from './components/Admin/index'

import Hero from 'react-bulma-components/lib/components/hero'
import Heading from 'react-bulma-components/lib/components/heading'
import Container from 'react-bulma-components/lib/components/container'

import './App.scss'
import './App.css'


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
          <ProtectedRoute path="/add" component={DropZone} />
          <Route path="/info" component={Info} />
          <Route path="/admin" component={Admin} />
          <Route path="/" exact>
            <Hero  color="primary" gradient >
              <Hero.Body>
                <Container>
                  <Heading>
                    <span role="img" aria-label="book">📗</span> Montessori Ressources, une plateforme ouverte et collaborative de matériel Montessori...
                  </Heading>
                  <Heading subtitle size={3}>

                  </Heading>
                </Container>
              </Hero.Body>
            </Hero>
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
