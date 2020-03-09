import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/Navigation/ProtectedRoute'
import DropZone from './components/dropzone'
import Nomenclatures from './components/nomenclatures'
import Nomenclature from './components/pdf/nomenclature'
import NomenclatureView from './components/nomenclature/NomenclatureView'
import MainHeader from './components/Navigation/MainHeader';
import MainFooter from './components/Footer/MainFooter'
import Info from './components/pages/info'

import Hero from 'react-bulma-components/lib/components/hero'
import Heading from 'react-bulma-components/lib/components/heading'
import Container from 'react-bulma-components/lib/components/container'

import './App.scss'
import './App.css'


function App() {
  return (
    <Router>
      <MainHeader />
        {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
        <main>
        <Switch>
          <Route path="/nomenclature/view/:nomenclatureId" component={NomenclatureView} />
          <Route path="/nomenclature/:nomenclatureId" component={Nomenclature} />
          <ProtectedRoute path="/add" component={DropZone} / >
          <Route path="/info" component={Info} />
          <Route path="/">
          <Hero color="primary" gradient >
            <Hero.Body>
              <Container>
                <Heading>
                  <span role="img" aria-label="book">📖</span> Bienvenue sur la plateforme de ressources Montessori !
                </Heading>
                <Heading subtitle size={5}>
                Les nomenclatures sont des outils essentiels pour accompagner les enfants dans leur
                développement. L’enfant s’épanouit et avec ses yeux vifs découvre les mystères de la vie. Grâce
                à ce support, nous enrichissons le vocabulaire de l’enfant. Plus celui-ci grandit plus ce support se
                rélève un allié dans l’apprentissage de la lecture et dans le développement de la logique.
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
  );
}

export default App
