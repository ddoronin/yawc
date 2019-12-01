import React from 'react';
import WSS from './wss';
import { WssModel } from './wss/model';
import { theme } from './components';
import styled from 'styled-components';

const H1 = styled.h1`
  margin: ${theme.spacing(1)}px;
`

const App: React.FC = () => {
  return (
    <div className="App">
      <H1>YAWC</H1>
      <WSS model={new WssModel<string>()}/>
    </div>
  );
}

export default App;
