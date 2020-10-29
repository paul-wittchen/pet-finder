import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/navbar';
import Signup from './components/signup';
import Login from './components/login';
import Profile from './components/profile';

function App() {
  return (
    <Router>
      <Navigation/>
      <Route path='/signup' exact component={Signup}/>
      <Route path='/login' exact component={Login}/>
      <Route path='/profile' exact component={Profile}/>
    </Router>
  );
}

export default App;
