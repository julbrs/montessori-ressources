import React from 'react';
import './App.css';
import DropZone from './components/dropzone'
import Nomenclatures from './components/nomenclatures'

function App() {
  return (
    <div className="App">
      <header>
        <p>Montessori-Ressources !</p>

        <ul>
          <li><a href="#list">list</a>y</li>
          <li><a href="#add">add</a></li>
          <li><a href="#info">more info</a></li>
        </ul>

      </header>
      <div className="content">
        <h1 id="list">List</h1>
        <Nomenclatures />
        <h1 id="add">Add</h1>
        <DropZone />
        <h1 id="info">Info</h1>
        <p>Bla</p>
      </div>

    </div>
  );
}

export default App
