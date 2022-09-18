import React from 'react';
import { useEffect, useState } from "react";
import bomb from "./../../image/bomba.png";
import ReactHowler from 'react-howler';
import clockMp3 from './../../sounds/reloj.mp3';
import bombMp3 from './../../sounds/bomb.mp3';
import useCards from './../../data/cards.hooks.js';
import './style.css';
const Home = () => {
    let [randomNum, setRandomNumb] = useState(0);
    let [soundTicTac, setSoundTicTac] = useState(false);
    let [soundBomb, setSoundBomb] = useState(false);
    let [roll, setRoll] = useState('Tirar')
    let [ultimateCard, setUltimateCard] = useState('Tik-Tac')
  
    const cards = useCards([]);
    const newCards = cards[0]
  
    let max = 20;
    let min = 0;
    let dmax = 3;
    let dmin = 1;
    let cmax = 7;
    let cmin = 0;
  
    function numRandom() {
      let number = Math.floor(Math.random() * (max - min + 1)) + min;
      setRandomNumb(number);
    }
  
    function dadoRandom() {
      let optionDado = Math.floor(Math.random() * (dmax - dmin + 1)) + dmin;
      
  if (optionDado === 1){
    setRoll('Delante')
  }else if(optionDado === 2){
    setRoll('Fin')
  }else{
    setRoll('Bom')
  }
  
  let optionCards = Math.floor(Math.random() * (cmax - cmin + 1)) + cmin;
  setUltimateCard(optionCards)
    }
    console.log(newCards[`${ultimateCard}`])
  
  
    useEffect(() => {
      let randomInterval = setInterval(() => {
        if (randomNum === 0) {
          clearInterval(randomInterval);
          
        }else if (randomNum === 1){
          setSoundTicTac(false);
          setSoundBomb(true); 
        }else {
          setRandomNumb(randomNum - 1);
          setSoundTicTac(true);
          setSoundBomb(false);
  
        }
      }, 1000);
      return () => {
        clearInterval(randomInterval);
      };
    }, [randomNum]);
  
    console.log(randomNum);
  
  
    return (
      <div className="App p-2 d-flex flex-column flex-wrap">
        <div className="wrap_header bg-success text-center">
          <h1>La Papa se Quema</h1>
        </div>
  
        <div className="wrap__dado d-flex justify-content-center align-items-center">
          <div className="dado bg-light d-flex justify-content-center align-items-center rounded m-2" onClick={dadoRandom}>{roll}</div>
        </div>
  
        <div className="wrap__card bg-primary d-flex justify-content-center p-2">
          <div className="card w-75 bg-light d-flex justify-content-center align-items-center">
            {newCards[`${ultimateCard}`]}
          </div>
        </div>
  
        <div className="wrap__bomb d-flex justify-content-center align-items-center">
          <div className="bomb d-flex justify-content-center align-items-center">
            <img src={bomb} alt="icono de bomba" />
          </div>
        </div>
  
        <div
          className="wrap__button d-flex justify-content-center
  align-items-center"
        >
          <button className="btn__ya border" onClick={numRandom} >
            YA!!
          </button>
        </div>
        <ReactHowler src={clockMp3} playing={soundTicTac} />
        <ReactHowler src={bombMp3} playing={soundBomb} />
      </div>
    );
  }


export default Home