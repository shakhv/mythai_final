import './App.css';
import React from 'react';
import { Provider , connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { store } from './store/store';


import { StartPage } from './pages/StartPage';
import { LfConnect } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import Player from './pages/Player';


store.subscribe(() => console.log(store.getState()));

function App() {
  return (
   
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<StartPage />} exact/>
            <Route path="/LoginPage" element={<LfConnect />} exact/>
            <Route path="/RegistrationPage" element={<RegistrationPage />} exact/>
            <Route path="/Player/*" element={<Player />} exact/>
          </Routes>
        </Router>
      </Provider>
  
  );
}

export default App;
