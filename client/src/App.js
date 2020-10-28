import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/navbar';
import Signup from './components/user/signup.component';
import Login from './components/user/login.component';

function App() {
  return (
    <Router>
      <Navigation/>
      <Route path='/signup' exact component={Signup}/>
      <Route path='/login' exact component={Login}/>
    </Router>
  );
}

export default App;
