import React from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { useState , CSSProperties  } from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { store } from '../store/store';
import { actionSpotSelect } from '../store/cardReducer';

import ClipLoader from "react-spinners/ClipLoader";

const ToolTip = ({tooltipOpen , setToolTip}) => {
        return(
        <div className={tooltipOpen ? "tooltip act" : "tooltip"}>
                <div className='tooltip_content' onClick={e => e.stopPropagation()}>
                </div>
        </div>
        )
}


const Header = ({spots}) => {
        const [nav , setNav] = useState(false)
        
        const [selectSpot , setSelectSpot] = useState('')
        const [tooltip , setToolTip] = useState(false)

        const SELECT_VALUE_KEY = "MySelectValue";

        const handleOnChange = (e) => {
                setSelectSpot(e.target.value)
                localStorage.setItem(SELECT_VALUE_KEY , JSON.stringify(e.target.value))
                localStorage.setItem("restaurant" , e.target.value)
                store.dispatch(actionSpotSelect(e.target.value))
                setToolTip(false)
        }

        useEffect(() => {
                const lastSelected = JSON.parse(
                  localStorage.getItem(SELECT_VALUE_KEY) ?? "[]"
                );
                setSelectSpot(lastSelected);
        }, []);

        
        function check () {
               setToolTip(true)
               const popup = document.getElementById('myPopup')
               popup.classList.toggle("show");
        }

        useEffect(() => {
                if(!localStorage.restaurant){
                        setToolTip(true)
                        check()
                }
        }, [localStorage])
        

        useEffect(() => {
                if(tooltip){
                        const el = document.querySelector("html , body");
                        el.classList.toggle("startScroll")
                }
        }, [tooltip])
        

        return (
        <>
        <div className='header'>
                        <nav className='header_content'>
                                <a className='logo'>
                                <img src='https://mythai.com.ua/_next/image?url=https%3A%2F%2Fimg.postershop.me%2F5514%2FConfig%2F140825_1651000840.2687_original.PNG&w=96&q=75'/>
                                </a>
                                <div className='header_menu'> 
                                        <ul className={nav ? [ 'menu', 'active'].join(' ') : ['menu']}>
                                                <li>Оплата та доставка</li>
                                                <li>Контакти</li>
                                                <li>Акції</li>
                                        </ul>
                                        <div className="popup">
                                                <span className={ tooltip ? "popuptext": "myPopupON"} id="myPopup">Оберіть заклад</span>
                                                        <select className='citySelect' id="select" value={selectSpot} onChange={handleOnChange}>
                                                                <option>...</option>
                                                        {
                                                                spots?.map((item) => (
                                                                <option key={item.spot_id} value={item.spot_id} className="option">{item.spot_name}</option>))
                                                        }
                                                        </select>
                                        </div>
                                        <ul style={{color: "red"}} className='contacts'>
                                                <li>Контакти</li>
                                        </ul>
                                </div>
                        
                                <div className='mobile_btn' onClick={() => setNav(!nav)}>
                                        {nav ? <RestaurantMenuIcon style={{color: 'red' , fontSize: 40}}/> : 
                                        <MenuIcon style={{color: 'red' , fontSize: 40}}/>
                                        
                                        }
                                </div>
                        </nav>
                </div>
                <ToolTip tooltipOpen={tooltip} setToolTip={setToolTip}/>
        </>
        )
}

export const HeaderConnect = connect(state => ({ 
        spots: state.promise.spots?.payload?.spots
      }), {
      
      })(Header) 




// const SelectOption = (props) => {
//          const [selectedOption, setSelectedOption] = useState(null); 
//          const [localStorageOption, setLocalStorageOption] = useLocalStorage( "selectedOption" );

//         React.useEffect(() => { 
//                 if (localStorageOption) { 
//                         setSelectedOption(localStorageOption); 
//                 } 
//         }, [localStorageOption]);


// const handleChange = (e) => { 
//         setSelectedOption(e.target.value);
//         setLocalStorageOption(e.target.value); 
// };

// return ( 
// {option.label}
//  ); };

// export default SelectOption;

// FREE
