import React , {useRef} from 'react'
import {Link} from 'react-router-dom'
import '../css/mainpage.css'
// ВЫНЕСТИ КОМПОНЕНТ СРАЗУ 

import { Header, HeaderConnect } from '../components/Header'
import {DishesConnect} from '../components/DishesCategory';
import { BasketConnect } from '../components/Basket';
import { useState } from 'react';

const image = ["https://mythai.com.ua/_next/image?url=https%3A%2F%2Fimg.postershop.me%2F5514%2FSlides%2F32369_1656021422.9424_big.jpeg&w=1200&q=75", "https://mythai.com.ua/_next/image?url=https%3A%2F%2Fimg.postershop.me%2F5514%2FSlides%2F32369_1656021422.9424_big.jpeg&w=1200&q=75", "https://mythai.com.ua/_next/image?url=https%3A%2F%2Fimg.postershop.me%2F5514%2FSlides%2F32369_1656021422.9424_big.jpeg&w=1200&q=75"];


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

const SetRestModal = ({selectRest , setSelectRest}) => {
  return (
    <div className={selectRest ? "selectRestModal active" : "selectRestModal"}>
      <div className='selectRestModal_content' onClick={e => e.stopPropagation()}>
          <h1>MyThai Суши</h1>
          <h5>Оберіть місто:</h5>
          <div>
          <span>Лозова</span>
          <span>Умань</span>
          <span>Ізюм</span>
          <span>Чернівці</span>
          <span>Черкаси</span>
          <span>Львів</span>
          </div>
      </div>
    </div>
  )
}

export const MainPage = () => {
  const [selectRest , setSelectRest] = useState(true)

  return (
      <div id='body'>
            <HeaderConnect />
            <Slideshow />
            <DishesConnect />
            <BasketConnect/>
      </div>
  )
}

