import React from 'react';
import WSS from './wss';
import WsLogger from './models/ws-logger';
import { theme } from './components';
import styled from 'styled-components';
import { GithubLink } from './components';

const H1 = styled.h1`
  margin: ${theme.spacing(1)}px;
  color: white;
`

const App: React.FC = () => {
  return (
    <div className="App">
      <H1><GithubLink href="https://github.com/ddoronin/yawc"/> YAWC</H1>
      <WSS model={new WsLogger<string>()}/>
    </div>
  );
}

export default App;
