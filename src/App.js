import React from 'react'
import { Route, Switch } from 'react-router-dom';

import { useStateValue } from './StateProvide';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import './App.scss';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
        <Sidebar />
        <Switch>
          <Route path="/:roomId"> 
            <Chat />
          </Route>
          {/* <Route path="/:roomId" component={Chat} /> */}

          <Route path="/"> 
            <Chat />
          </Route>
          {/* <Route path="/" component={Chat} /> */}
        </Switch>
      </div> 
      )}
    </div>
  );
}

export default App;
