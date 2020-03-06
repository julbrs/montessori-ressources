import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/Navigation/ProtectedRoute'
import DropZone from './components/dropzone'
import Nomenclatures from './components/nomenclatures'
import Nomenclature from './components/pdf/nomenclature'
import NomenclatureView from './components/nomenclature/NomenclatureView'
import MainHeader from './components/Navigation/MainHeader';
import MainFooter from './components/Footer/MainFooter'
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
          <Route path="/info">
            <h1 id="info">Info</h1>
            <p>Bla</p>
          </Route>
          <Route path="/">
            <h1 id="list">List</h1>
            <Nomenclatures />
          </Route>
        </Switch>
        </main>
        <MainFooter />
    </Router>
  );
}

export default App
