import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './components/home/home';
import Signup from './components/user/signup/signup.component';
import Login from './components/user/login/login.component';
import Profile from './components/user/profile/profile.component';
import CreatePet from './components/pet/create/create.component';
import ListPets from './components/pet/list/list.component';
import PetDetails from './components/pet/petDetails/petDetails.component';

const App = () => {
  return (
    <Router>
      <Navigation/>
      <Route path='/' exact component={Home}/>
      <Route path='/signup' exact component={Signup}/>
      <Route path='/login' exact component={Login}/>
      <Route path='/profile' exact component={Profile}/>
      <Route path='/lost-pet' exact component={CreatePet}/>
      <Route path='/pets-list' exact component={ListPets}/>
      <Route path='/pets-list/:id' exact component={PetDetails}/>
      <Footer/>
    </Router>
  );
}

export default App;
