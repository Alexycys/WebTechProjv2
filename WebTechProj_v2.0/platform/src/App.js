import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



import Home from './Components/Home'
import SignIn from './Components/SignInSide'
import AfisareNotite from './Components/AfisareNotite'
import AddNote from './Components/AdaugaNota'
import NoteAttach from './Components/NoteAttach'


class App extends Component {
  render(){
    return (
        <BrowserRouter>
        <Switch>
          <Route path ="/Signin" exact strict component={SignIn}/>
          <Route path ="/Home" exact strict component={Home}/>
          <Route path ="/AfisareNotite" exact strict component = {AfisareNotite}/>
          <Route path = "/AddNote/:id?" exact strict component = {AddNote}/>
          <Route path ="/NoteUser/:id" exact strict component={NoteAttach}/>


        </Switch>
        </BrowserRouter>
    )
}
}

export default App;
