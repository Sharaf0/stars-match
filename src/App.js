import React from 'react';
import GameComponent from "./components/GameComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import config from './config';

function App() {
  return (
    <GameComponent config={config} />
  );
}

export default App;
