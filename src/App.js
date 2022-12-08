import React from 'react';
import logo from './logo.svg';
import './App.css';

import Grid from './components/grid'
import Menu from './components/NavBar'

function App() {
  return (
    <div className="App">
      <Menu />
      <Grid />
    </div>
  );
}

export default App;
