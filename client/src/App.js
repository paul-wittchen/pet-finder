import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/navbar';
import Signup from './components/user/signup.component';
import Login from './components/user/login.component';
import Profile from './components/user/profile.component';
import CreatePet from './components/pet/create.component';

function App() {
  return (
    <Router>
      <Navigation/>
      <Route path='/signup' exact component={Signup}/>
      <Route path='/login' exact component={Login}/>
      <Route path='/profile' exact component={Profile}/>
      <Route path='/lost-pet' exact component={CreatePet}/>
    </Router>
  );
}

export default App;
