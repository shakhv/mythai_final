import React , {useRef} from 'react'
import {Link} from 'react-router-dom'
import '../css/mainpage.css'
// ВЫНЕСТИ КОМПОНЕНТ СРАЗУ 

import { Header, HeaderConnect } from '../components/Header'
import {DishesConnect} from '../components/DishesCategory';
import { BasketConnect } from '../components/Basket';
import { useState } from 'react';
import Particles from 'react-tsparticles';

import banner1 from "../images/banner1.jpg"
import banner2 from '../images/banner2.jpg'

import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { useSelector } from 'react-redux';

 const image = [banner2, banner1, banner2];


const delay = 3000;

function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === image.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {image.map((backgroundImage, index) => (
          <img
            className="slide"
            key={index}
            src={backgroundImage}
          ></img>
        ))}
      </div>
    </div>
  );
}


export const MainPage = () => {
  const selectedSpot = useSelector((state) => state.cardReducer?.spot);

  function handlePhoneCall() {
    if(selectedSpot?.name === "2"){
      return window.location.href = 'tel:+380660558522'; // Replace the phone number with the number you want to call
    }
    if(selectedSpot?.name === "5"){
      return window.location.href = 'tel:+380992308969'
    }
  }

  return (
      <div id='body'>
            <div className='icon_phone_trigger' onClick={handlePhoneCall}>
                        <CallOutlinedIcon />  
            </div>
            <HeaderConnect />
            <Slideshow />
            <DishesConnect />
            <BasketConnect/>
      </div>
  )
}

