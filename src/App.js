import React from 'react';
import './App.css';
import DropZone from './components/dropzone'
import Nomenclatures from './components/nomenclatures'
import Nomenclature from './components/pdf/nomenclature'
import NomenclatureView from './components/nomenclature/NomenclatureView'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Router className="App">
      <header>
        <p>Montessori-Ressources !</p>
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/add">add</Link></li>
          <li><Link to="/info">info</Link></li>
        </ul>

      </header>
      <div className="content">
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
      </div>
    </Router>
  );
}

export default App
