import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
        <Switch>
          <Route path="/nomenclature/view/:nomenclatureId">
            <NomenclatureView/>
          </Route>
          <Route path="/nomenclature/:nomenclatureId">
            <Nomenclature/>
          </Route>
          <Route path="/add">
            <h1 id="add">Add</h1>
            <DropZone />
          </Route>
          <Route path="/info">
            <h1 id="info">Info</h1>
            <p>Bla</p>
          </Route>
          <Route path="/">
            <h1 id="list">List</h1>
            <Nomenclatures />
          </Route>
        </Switch>
        <MainFooter />
    </Router>
  );
}

export default App
