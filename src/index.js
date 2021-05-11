import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import reducer, { initialState } from './reducer';
import { StateProvider } from './StateProvide';
import App from './App';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <App />
      </Router>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);