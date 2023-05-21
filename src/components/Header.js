import React from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { useState , CSSProperties  } from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { store } from '../store/store';
import { actionSpotSelect } from '../store/cardReducer';

import ClipLoader from "react-spinners/ClipLoader";
import { Link } from '@mui/material';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Instagram } from '@mui/icons-material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';


function removePrefix(name) {
        // Remove "hi-thai — " prefix
        name = name.replace("hi-thai — ", "");
        
        // Remove "my-thai-dnepr — " prefix
        name = name.replace("my-thai-dnepr — ", "");

        name = name.replace("my-thai-kharkov — ", "");

        name = name.replace("limetest — ", "");
        
        return name;
}

const OurStores = ({ openModal, setOpenModal, spots }) => {
        useEffect(() => {
          if (openModal) {
            document.body.classList.add("modal-open");
          } else {
            document.body.classList.remove("modal-open");
          }
        }, [openModal]);
      
        if (!openModal) return null;
      
        const markers = spots?.map((spot) => {
          return `markers=color:red%7Clabel:M%7C${spot.lat},${spot.lng}`;
        }).join('&');
      
        return (
          <div
            className={openModal ? "modal_basket active" : "modal_basket"}
            onClick={() => setOpenModal(false)}
          >
            <div className="modal_basket_content" onClick={(e) => e.stopPropagation()}>
                        <div className="close_browser_button" onClick={() => setOpenModal(false)}>
                                <CloseIcon sx={{ color: "white", fontSize: 40, backgroundColor: "inherit" }} />
                        </div>
      
                                <div className="map_our_stores">
                                        <img
                                        src={`https://maps.googleapis.com/maps/api/staticmap?size=800x200&maptype=roadmap&${markers}&key=AIzaSyAXoZSuCo6ZFOpfKyEct58sJnJtc2qla7c`}
                                        alt="Map with markers"
                                        />
                                </div>

                                <div className='ourStores_contact_wrapper'>
                                        <div className='ourStores_contacts'>
                                                <h2>Контакти</h2>
                                                <div className='ourStores_contacts_details'>
                                                        <span>
                                                                <Instagram sx={{color: "red"}}/>
                                                                <a href='https://www.instagram.com/my.thai.lozovaya/'>@my.thai.lozovaya</a>
                                                        </span>
                                                        <span>
                                                                <Instagram  sx={{color: "red"}}/>
                                                                <a href='https://www.instagram.com/my.thai.uman/'>@my.thai.uman</a>
                                                        </span>
                                                </div>
                                        </div>
                                        <div className='ourStores_spots'>
                                                <h2>Заклади</h2>
                                                <div className='ourStores_spots_contacts'>
                                                        {
                                                                spots?.map((item) => (
                                                                        <div key={item.spot_id} className="ourStores_spots_contacts_item">
                                                                                <h3>{item.name}</h3>
                                                                                <span><PlaceOutlinedIcon sx={{marginRight: "5px"}}/>{item.address}</span>
                                                                                {/* <a href=''></a> */} 
                                                                                {/* phone here */}
                                                                        </div>))
                                                        }
                                                </div>
                                                
                                        </div>
                                </div>
                        </div>
              </div>
        )
}

export const OurStoresConnect = connect(state => ({ 
        spots: state.promise.franchise?.payload?.franchise["hi-thai"]
      }), {
      
      })(OurStores) 


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
        const navigation = useNavigate()

        const [ourStoresModal , setOurStoresModal] = useState(false)
        
        const [selectSpot , setSelectSpot] = useState('')
        const [tooltip , setToolTip] = useState(false)

        const SELECT_VALUE_KEY = "MySelectValue";

        const handleOnChange = (e) => {
                const selectElement = document.getElementById("select");
                const selectedOption = selectElement.options[selectElement.selectedIndex];
                const address = selectedOption.getAttribute("adress");
                console.log(address)
                setSelectSpot(e.target.value)
                localStorage.setItem(SELECT_VALUE_KEY , JSON.stringify(e.target.value))
                localStorage.setItem("restaurant" , e.target.value)
                localStorage.setItem("adress" , address)
                store.dispatch(actionSpotSelect(e.target.value , address))
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
                        localStorage.setItem(SELECT_VALUE_KEY , JSON.stringify("..."))
                        check()
                }
        }, [localStorage])
        

        useEffect(() => {
                if(tooltip){
                        const el = document.querySelector("html , body");
                        el.classList.toggle("startScroll")
                }
        }, [tooltip])

        const handleNavigate = (e) => {
                if(e == "payment"){
                        navigation("/payment")
                }
                if(e == "contacts"){
                        navigation("/contacts")
                }
                if(e == "discount"){
                        navigation("/discount")
                }
        }
        
        return (
        <>
        <div className='header'>
                        <nav className='header_content'>
                                <a className='logo'>
                                <img src='https://mythai.com.ua/_next/image?url=https%3A%2F%2Fimg.postershop.me%2F5514%2FConfig%2F140825_1651000840.2687_original.PNG&w=96&q=75'/>
                                </a>
                                <div className='header_menu'> 
                                        <ul className={nav ? [ 'menu', 'active'].join(' ') : ['menu']}>
                                                <li onClick={() => handleNavigate("payment")}>Оплата та доставка</li>
                                                <li onClick={() => handleNavigate("contacts")}>Контакти</li>
                                                <li onClick={() => handleNavigate("discount")}>Акції</li>
                                        </ul>
                                        <div className="popup">
                                                <span className={ tooltip ? "popuptext": "myPopupON"} id="myPopup">Оберіть заклад</span>
                                                        <select className='citySelect' id="select"  value={selectSpot} onChange={handleOnChange}>
                                                                <option disabled>...</option>
                                                        {
                                                                spots?.map((item) => (
                                                                <option key={item.spot_id} value={item.spot_id} adress={item.spot_adress} className="option">{removePrefix(item.spot_name)}</option>))
                                                        }
                                                        </select>
                                        </div>
                                        <ul style={{color: "red"}} className='contacts'>
                                                <li onClick={() => setOurStoresModal(true)}>Наша мережа</li>
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
                <OurStoresConnect openModal={ourStoresModal} setOpenModal={setOurStoresModal}/>
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
