import React, { Component } from 'react';
import './Home.css'
import AfisareNotite from './AfisareNotite';
import meme from './meme.jpg'

export default class Home extends Component {

    constructor(props){
        super(props);
    }
   
    render(){
        return ( 
        <div className="wrapper">
            <div className="title-wrapper">
                <h1>Welcome to our application!</h1>
            </div>
            <div className="buttonWrapper">
            <button className="onlyButton" onClick={()=>{
                 this.props.history.push("/AfisareNotite") //ma duce la pagina notite
            }}>AFISARE LISTA NOTITE</button>
            </div>
            <div className="memeWrapper">
            <img src={meme} className="meme"></img>
            </div>

        </div>
        );
    }
}