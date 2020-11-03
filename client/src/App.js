import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/navbar';
import Signup from './components/user/signup.component';
import Login from './components/user/login.component';
import Profile from './components/user/profile.component';
import CreatePet from './components/pet/create.component';
import ListPets from './components/pet/list.component';
import FoundPet from './components/pet/foundPet.component';
import PetDetails from './components/pet/petDetails.component';

function App() {
  return (
    <Router>
      <Navigation/>
      <Route path='/signup' exact component={Signup}/>
      <Route path='/login' exact component={Login}/>
      <Route path='/profile' exact component={Profile}/>
      <Route path='/lost-pet' exact component={CreatePet}/>
      <Route path='/pets-list' exact component={ListPets}/>
      <Route path='/found-pet' exact component={FoundPet}/>
      <Route path='/pets-list/:id' exact component={PetDetails}/>
    </Router>
  );
}

export default App;
