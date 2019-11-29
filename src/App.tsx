import React from 'react';
import WSS from './wss';
import { WssModel } from './wss/model';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>YAWC</h1>
      <WSS model={new WssModel<string>()}/>
    </div>
  );
}

export default App;
