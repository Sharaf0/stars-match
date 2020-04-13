import React from 'react';
import GameComponent from "./components/GameComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import config from './config';
import packageJson from '../package.json';

function App() {
  return (
    <>
      <GameComponent config={config} />
      <pre style={{textAlign: "center"}}>{`Version: ${packageJson.version}`}</pre>
    </>
  );
}

export default App;
