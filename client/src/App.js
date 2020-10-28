import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/navbar';
import Signup from './components/user/signup.component';

function App() {
  return (
    <Router>
      <Navigation/>
      <Route path='/signup' exact component={Signup}/>
    </Router>
  );
}

export default App;
