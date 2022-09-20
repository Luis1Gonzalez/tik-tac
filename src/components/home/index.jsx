import React from 'react';
import './style.css';
import { useEffect, useState } from "react";
import ReactHowler from 'react-howler';
import clockMp3 from './../../sounds/reloj.mp3';
import bombMp3 from './../../sounds/bomb.mp3';
import useCards from './../../data/cards.hooks.js';
import backgroundGeneral from './../../image/backgroundGeneral.jpg';
import backgroundGeneral2 from './../../image/backgroundGeneral2.jpg';
import { Spinner } from 'react-bootstrap';
import boom from './../../image/boom.png'

const Home = () => {
    let [randomNum, setRandomNumb] = useState(1);
    let [soundTicTac, setSoundTicTac] = useState(false);
    let [soundBomb, setSoundBomb] = useState(false);
    let [roll, setRoll] = useState('Tirar');
    let [ultimateCard, setUltimateCard] = useState('');
    let [colorGround, setColorGround] = useState('#fff');
    let [event, setEvent] = useState('none');
    let [progress, setProgress] = useState('hidden');
    let [showBoomb, setShowBoom] = useState('hidden');
  
    const cards = useCards([]);
    const newCards = cards[0]
  
    let max = 30;
    let min = 10;
    let dmax = 3;
    let dmin = 1;
    let cmax = 26;
    let cmin = 1;

    function dadoRandom() {
      let optionDado = Math.floor(Math.random() * (dmax - dmin + 1)) + dmin;
      setRandomNumb(0)
      setSoundBomb(false);
      setColorGround('#fff');
      setEvent('fill');
      setProgress('hidden');
      setShowBoom('hidden')
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

  
    function numRandom() {
      let number = Math.floor(Math.random() * (max - min + 1)) + min;
      setRandomNumb(number);
    }
  
      useEffect(() => {        
      
      let randomInterval = setInterval(() => {
        if (randomNum === 1) {          
          clearInterval(randomInterval);         
          
          
        }else if(randomNum === 2){
          setSoundBomb(true);
          window.navigator.vibrate([500]);
        setColorGround(backgroundGeneral2);
        setSoundTicTac(false);
        setEvent('none');
        setProgress('hidden');   
        setShowBoom('visible')   
        }else if(randomNum > 1){
          setRandomNumb(randomNum - 1);
          setSoundTicTac(true);
          setColorGround(backgroundGeneral);
          setProgress('visible');
          setShowBoom('hidden')
        }

        
      }, 1000);
      return () => {
        clearInterval(randomInterval);
      };

    }, [randomNum]);


    // function ejecution(randomNum){
    //   if(randomNum===1){
    //     setSoundBomb(true);
    //     setColorGround('#e04e18');
    //     console.log('bomb')
    //   }
    // }
    // ejecution()

    console.log(randomNum);
  
  
    return (
      <div className="App p-2 d-flex flex-column flex-wrap mt-2" style={{backgroundImage:`url(${colorGround})`, backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
        <div className="wrap_header d-flex justify-content-center align-items-center">
          <p className='m-0 pt-2'>TIK-TAC</p>
        </div>
  
        <div className="wrap__dado d-flex justify-content-center align-items-center mt-2">
          <div className="dado bg-light d-flex justify-content-center align-items-center rounded m-2" onClick={dadoRandom}>{roll}</div>
        </div>
  
        <div className="wrap__card d-flex justify-content-center p-2 mb-3">
          <button className="card w-75 d-flex justify-content-center align-items-center">
            {newCards[ultimateCard]}
          </button>
        </div>
  
        <div className="wrap__bomb d-flex w-100 flex-column justify-content-center align-items-center mt-5">
          <div className="bomb d-flex justify-content-center align-items-center" style={{visibility:progress}}>
          <Spinner animation="border" variant="warning" />
          <Spinner animation="border" variant="light" />
          <Spinner animation="border" variant="primary" />
          <Spinner animation="border" variant="light" />
          <Spinner animation="border" variant="danger" />     
          </div>
          <img  style={{visibility:showBoomb}} src={boom} alt="imagen de un boom"/>
        </div>
  
        <div
          className="wrap__button d-flex justify-content-center
  align-items-center"
        >
          <button className="btn__ya border" style={{pointerEvents:event}} onClick={numRandom} >
            YA!!
          </button>
        </div>
        <ReactHowler src={clockMp3} playing={soundTicTac} />
        <ReactHowler src={bombMp3} playing={soundBomb} />
      </div>
    );
  }


export default Home