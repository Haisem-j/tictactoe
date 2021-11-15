import React from 'react';
import ReactDOM from 'react-dom';
import {BoardProvider} from './context/BoardContext'
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BoardProvider>
      <App />
    </BoardProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

