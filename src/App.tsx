import React from 'react';
import GameComponent from "./components/GameComponent";
import Config from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import packageJson from '../package.json';
import defaultConfig from './config.json';
function App() {
  return (
    <>
      <GameComponent config={defaultConfig as Config} />
      <pre style={{ textAlign: "center" }}>{`Version: ${packageJson.version}`}</pre>
    </>
  );
}

export default App;