import React from 'react'
import { store } from '../store/store';
import { connect, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import Input from '@mui/joy/Input';
import moment from "moment";
import StorefrontIcon from '@mui/icons-material/Storefront';

import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import { actionCartAdd, actionCartChange, actionCartRemove, actionNumberOfOrder, actionSpotSelect} from '../store/cardReducer';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { Autocomplete, LoadScript } from '@react-google-maps/api';
import { Skeleton } from '@mui/material';
import { Link , useNavigate } from 'react-router-dom';
import { actionRequestOrder } from '../actions/Actions';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { ParticlesContainer } from '../App';

const workHours = ["Доставити швидше", "10:30" , "11:00" , "11:30" , "12:00" , "12:30" , "13:00" , "13:30" , "14:00" , "14:30" , "15:00" , "15:30" , "16:00" , "16:30" , "17:00" , "17:30" , "18:00" , "18:30" , "19:00" , "19:30" , "20:00" , "20:30" , "21:00"]
const getBySelf = ["Заберу раніше", "10:30" , "11:00" , "11:30" , "12:00" , "12:30" , "13:00" , "13:30" , "14:00" , "14:30" , "15:00" , "15:30" , "16:00" , "16:30" , "17:00" , "17:30" , "18:00" , "18:30" , "19:00" , "19:30" , "20:00" , "20:30" , "21:00"]

const libraries = ['places'];
const SelectAdress = ({selectAdress , setSelectAdress , setOrderActive}) => {
  const [adress , setAdress] = useState('')
  const [adressError , setAdressError] = useState('')

  const [place, setPlace] = useState(null);

  const [room , setRoom] = useState('')

  const handleSetAdress = (event) => {
        setAdress(event.target.value)
  }

  const handleSetRoom = (event) => {
        setRoom(event.target.value)
  }

  
  const handleChangeModal = () => {
        setSelectAdress(false)
        setOrderActive(true)
  }

  let autocomplete;

  const onLoad = (autocompleteObject) => {
    console.log('Autocomplete loaded:', autocompleteObject);
    autocomplete = autocompleteObject;
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      setPlace(autocomplete.getPlace());
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };


  const options = {
        componentRestrictions: {country: "ua"},
  }

  const handleSubmit = (adress , room) => {
        handleChangeModal()
        localStorage.setItem("user_adress" , adress && room ? `${adress} ${room}`: adress)
  }

  return (
    <div className={selectAdress ? "modal_basket active" : "modal_basket"} onClick={()=> setSelectAdress(false)}>
      <div className='modal_basket_content' onClick={e => e.stopPropagation()}>
          <div className='order_wrapper'>
              <div className='order_content'>
                <KeyboardArrowLeftIcon className='order_content_top_arrow' onClick={() => handleChangeModal()}/> 
                <div className='order_content_top'>
                  <span>Напишіть адресу</span>
                </div>
              </div>
              <div className='select_adress_content'>
                    <div className='select_adress_top'  sx={{borderRadius: 10}}> 
                          <span>Адреса доставлення</span>
                          <LoadScript googleMapsApiKey="AIzaSyD-3lAed2PzWnYQG9wHBnIKguUzfcVGw9Y"  libraries={libraries} >
                          {/* <PlaceOutlinedIcon sx={{backgroundColor: '#171010',color: "silver"}} className="select_adress_input_icon"/> */}
                            <Autocomplete
                              options={options}
                              onLoad={onLoad}
                              onPlaceChanged={onPlaceChanged}
                              className="pac-container">
                              <input
                                type="text"
                                value={adress}
                                placeholder="Вкажіть адресу доставлення"
                                onChange={handleSetAdress}
                                className="pac-input"
                              />
                            </Autocomplete>
                          </LoadScript>
                    </div>
                    <div>
                          <span>Під’їзд, поверх, квартира</span>
                          <Input 
                            className="adress_input" 
                            value={room}
                            onChange={handleSetRoom}
                            sx={{backgroundColor: "#171010", border: 'none'
                            }} 
                            />
                    </div>
                    {adressError ? <div style={{color: "red" , display: "flex" , alignItems: "center"}}><ErrorOutlineOutlinedIcon sx={{backgroundColor: "inherit" , paddingRight: "5px"}}/>{adressError}</div> : []}
                    <button onClick={() => {
                    if (adress) {
                      handleSubmit(adress , room);
                    } else {
                      setAdressError("Введіть адресу");
                    }
                      }}>Зберегти</button>
              </div>
          </div>
      </div>
    </div>
  )
}


const OrderModal = ({orderActive , setOrderActive , setOpenBasket , price , products , productsFranchise , deliveryPrice , comment}) => {

  const [selectedValue, setSelectedValue] = useState('delivery');
  const [selectAdress , setSelectAdress] = useState(false)
  const navigation = useNavigate()

  const selectedSpot = useSelector((state) => state.cardReducer?.spot?.spot_adress);

  const currentHour = moment().hour()
  const currentMinute = moment().minute()
  const timeWork = []
  const selfGet = []  

  const [name , setName] = useState('')
  const [nameError , setNameError] = useState(false)

  const [phone , setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('');

  const [adress , setAdress] = useState('')
  const storedAdress = localStorage.getItem('user_adress')

  const [service_mode , setServiceMode] = useState(3)

  const [selectedTime , setSelectedTime] = useState('')

  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    // Check if the maximum width of the screen is greater than 800 pixels
    const mediaQuery = window.matchMedia('(max-width: 800px)');

    // Hide the component if the screen is too large
    setShowComponent(mediaQuery.matches);

    // Add a listener to the media query to update the component when the screen size changes
    const handleMediaQueryChange = () => {
      setShowComponent(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);


  const [allErrors , setAllErrors] = useState(false)

  const validateName = (value) => {
    const regex = /[a-zA-Zа-яА-Я]{2,}/;
    if(regex.test(value)){
      localStorage.setItem("name" , value)
      setAllErrors(false)
    }
    if (!regex.test(value)) {
      return true;
    }
    return '';
  };

  const handleName = (event) => {
    const value = event.target.value;
    const error = validateName(value);
    setName(value); // update name state with input value
    setNameError(error);
  }

  const validatePhone = (value) => {
    const regex = /^\+380\d{9}$/;
    if(regex.test(value)){
      localStorage.setItem("phone" , value)
      setAllErrors(false)
    }
    if (!regex.test(value)) {
      return "Введіть номер телефону , +380";
    }
    return '';
  };
  
  const handlePhone = (event) => {
    const value = event.target.value;
    const error = validatePhone(value);
    setPhone(value); // update phone state with input value
    setPhoneError(error);
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedPhone = localStorage.getItem('phone')
    if (storedName) {
      setName(storedName);
    }
    if(storedPhone){
      setPhone(storedPhone)
    }
    if(storedAdress){
      setAdress(storedAdress)
    }
  }, [storedAdress])
  

  useEffect(() => {
    // if(orderActive === false){
    //   setOpenBasket(true)
    // }
    if(selectAdress === true){
      setOrderActive(false)
      // setOpenBasket(false)
    }
  }, [orderActive , selectedValue , selectAdress])

  let mainTime = currentHour + ":" + currentMinute;
  let time;

  if(mainTime > "00:00"){
    time = "00:00"
  }

  if(mainTime > "10:30"){
    time = mainTime
  }

  const disableHours = () => {
    for(let i = 0; i < workHours.length; i++) {
      if(time <= workHours[i]) {
        timeWork.push(workHours[i]);
      }
    }
    for(let i = 0; i < getBySelf.length; i++) {
      if(time <= getBySelf[i]) {
        selfGet.push(getBySelf[i]);
      }
    }
  }
  disableHours()

  function updateProductId(products, productsFranchise) {
    const updatedProducts = products?.map(product => {
      const franchiseProduct = productsFranchise.find(franchise => franchise.product_name === product.name);
      if (franchiseProduct) {
        return {
          ...product,
          product_id: franchiseProduct.product_id,
          price: franchiseProduct?.product_price
        };
      } else {
        return product;
      }
    });
    return updatedProducts;
  }

  const handleSubmitOrder = (name , phone) => { 
    navigation("/orderSubmit")
    
    async function postData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return response.json(); 
    }

    postData("http://localhost:8090/addClient", {spot: store.getState().cardReducer?.spot?.name, name: name , phone: phone , address: adress})
    .then((response) => {
      try {
        const data = response

        postData("http://localhost:8090/buy", {spot: store.getState().cardReducer?.spot?.name, name: name , phone: phone ,service_mode: service_mode, address: adress , products: store.getState().cardReducer?.spot?.name === "8" ? updateProductId(products, productsFranchise) : products , delivery_time: selectedTime ? selectedTime : mainTime, delivery_price: deliveryPrice , comment: comment})
        .then((response) => {
          try {
            const data = response
            store.dispatch(actionNumberOfOrder(data?.incomingOrderId?.incoming_order_id))
            console.log(data)
          } catch (error) {
            console.error(error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
        
        console.log(data?.incomingOrderId)
      } catch (error) {
        console.error(error);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <>
    <div className={orderActive ? "modal_basket active" : "modal_basket"} onClick={()=> setOrderActive(false)}>
      <div className='modal_basket_content' onClick={e => e.stopPropagation()}>
        <div className='order_wrapper'>
          <div className='order_content'>
          <KeyboardArrowLeftIcon className='order_content_top_arrow' onClick={() => setOrderActive(false)}/>
            <div className='order_content_top'>
              <span>Замовлення</span>
            </div>
          </div>
          <div className='order_contants_details'>
              <Input 
              startDecorator={<PermIdentityOutlinedIcon sx={{
              backgroundColor: '#171010',
              color: "silver"
              }}/>}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                handleName(event);
              }}  
              endDecorator={nameError || allErrors? <ErrorOutlineOutlinedIcon sx={{
                backgroundColor: 'inherit',
                color: "red"
                }}/> : []}
              className="contacts_input" 
              placeholder="Ім'я" 
              sx={{backgroundColor: "#171010", border: 'none' 
              }} 
              />

              <Input startDecorator={<CallOutlinedIcon sx={{
              backgroundColor: '#171010',
              color: "silver"
              }}/>} 
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                handlePhone(event);
              }}
              endDecorator={ phoneError || allErrors? <ErrorOutlineOutlinedIcon sx={{
                backgroundColor: 'inherit',
                color: "red"
                }}/> : []}
              className="contacts_input" placeholder="Номер телефону"
              sx={{backgroundColor: "#171010" , color: 'white'}} 
              />
          </div>
              {phoneError && <div style={{color: "red" , backgroundColor: "#4e3f3f" , padding: 5 , textAlign: "center"}}>{phoneError}</div>}
          <div className='delivery'>
            <div className='delivery_title'>
            {
              selectedValue === 'delivery' ? <span style={{backgroundColor: "inherit" ,color: 'white'}}>Доставлення</span> : <span style={{backgroundColor: "inherit" , color: 'white'}}>Самовивіз</span>
            }
            </div>
            <div className='delivery_select'>
                <label className="labl" onClick={() => setServiceMode(3)}>
                    <input type="radio" value="delivery" name="gender" onChange={handleChange} checked={selectedValue === 'delivery'}/> 
                    <div>Доставлення</div>
                </label>
                <label className="labl" onClick={() => setServiceMode(2)}>
                    <input type="radio" value="getSelf" name="gender" onChange={handleChange} checked={selectedValue === 'getSelf'}/> 
                    <div>Самовивіз</div>
                </label>
            </div>
          </div>
            {
              selectedValue === "delivery" ? 
              <div className='order_contants_details'>
                  <Input 
                  startDecorator={<PlaceOutlinedIcon sx={{
                  backgroundColor: '#171010',
                  color: "silver"
                  }}/>} 
                  value={adress ? adress : []}
                  onClick={() => {
                      setSelectAdress(true)
                  }}
                  readOnly
                  autoComplete="new-password"
                  className="contacts_input" 
                  placeholder="Вкажіть адресу доставлення" 
                  sx={{backgroundColor: "#171010", border: 'none'
                  }} 
                  />
                  <div className='time_choose'>
                    <WatchLaterOutlinedIcon className='time_icon'/>

                    <select  className="contacts_input" onChange={(e) => setSelectedTime(e.target.value)}>

                    {timeWork.length > 0 ? timeWork.map((e, i) => (
                      <option key={i} value={e}>
                        {e}
                      </option>
                    )) : (
                      <option value="">No available hours</option>
                    )}

                    </select>
                  </div>
              </div>
              : []
            }
            
            {
              selectedValue === "getSelf" ? 
                  <div className='order_contants_details'>
                        <Input 
                          startDecorator={<StorefrontIcon sx={{
                          backgroundColor: '#171010',
                          color: "white"
                          }}/>}
                          autoComplete="new-password"
                          disabled
                          value={selectedSpot}
                          className="contacts_input" 
                          // placeholder={selectedSpot}
                          sx={{backgroundColor: "#171010", border: 'none'
                          }} 
                          />
            
                          <div className='time_choose'>
                              <WatchLaterOutlinedIcon className='time_icon'/>
                              <select  className="contacts_input"  onChange={(e) => setSelectedTime(e.target.value)}>
                              {selfGet.length > 0 ? selfGet.map((e, i) => (
                                <option key={i} value={e}>
                                  {e}
                                </option>
                              )) : (
                                <option value="">No available hours</option>
                              )}
                              </select>
                          </div>
                  </div>
              : []
            }
            <div className='delivery'>
              <div className='delivery_title'>
                  <span style={{backgroundColor: "inherit" ,color: 'white'}}>Оплата</span> 
              </div>
                  <Input className='payment_input' disabled placeholder='Готівкой' startDecorator={<CreditCardOutlinedIcon
                  sx={{
                    backgroundColor: 'rgb(159, 156, 156)',
                    color: "white"
                    }}
                  />} sx={{marginBottom: 2}}/>
            </div>
            <div className='order_bottom'>
              <div className='order_bottom_price'>
                  <span>Сумма замовлення: <b>{price + " грн"}</b> </span>
                  {selectedValue === "getSelf"  ? [] : <span>Доставлення: <b>{deliveryPrice}грн</b></span>}
              </div>
              <button className='link_bottom' onClick={() => {
              if (name && phone && !nameError && !phoneError) {
                handleSubmitOrder(name, phone);
              } else {
                setAllErrors(true)
              }
              }}>Оформити за <b>{(price  + deliveryPrice )} грн</b></button>
            </div>

        </div>
      </div>
    </div>
      <SelectAdress selectAdress={selectAdress} setSelectAdress={setSelectAdress} setOrderActive={setOrderActive}/>
    </>
  )
}

// handleSubmitOrder(name , phone)
const RowDish = ({ name, price, count, photo, id  , totalPrice}) => {
  const [newCount, setNewCount] = useState(count);

  const removeFromBasket = () => {
    store.dispatch(actionCartChange(-1, id, name, price, photo));
    setNewCount(newCount - 1);
    if(store.getState().cardReducer[id].count === 0){
      store.dispatch(actionCartRemove(id))
  }
  };

  const addToBasket = () => {
    store.dispatch(actionCartAdd(1, id, name, Number(price), photo)); // Pass price as a number
    setNewCount(newCount + 1)
  };

  return (
    <div className='row_dish' key={id}>
      <img src={photo} />
      <div className='row_dish_content'>
        <div className='row_dish_title'>
          <span>{name}</span>
          <span>{totalPrice} грн</span>
        </div>
        <div className='row_dish_count'>
          <button onClick={removeFromBasket} className={count < 1 ? 'visibleMinus' : 'minus'}>
            <span> - </span>
          </button>
          <span>{newCount}</span>
          <button onClick={addToBasket} className='count_plus'>
            <span> + </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const countPriceDelivery = (selectedSpot, orderPrice, setDeliveryPrice) => {
  if(selectedSpot?.name === "2"){
    setDeliveryPrice(70)
  }else{
    setDeliveryPrice(70)
  }
  if (selectedSpot?.name === "5" && orderPrice > 399) {
    setDeliveryPrice(0);
  } else if (selectedSpot?.name === "5" && orderPrice < 399) {
    setDeliveryPrice(50);
  }
};

const ModalBasket = ({openBasket , setOpenBasket , count , price , products , productsFranchise}) => {
  const [orderActive , setOrderActive] = useState(false)

  const [isAddressBarVisible, setIsAddressBarVisible] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [startY, setStartY] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  const [comment , setComment] = useState('')

  const selectedSpot = useSelector((state) => state.cardReducer?.spot)

  const [deliveryPrice , setDeliveryPrice] = useState(70)

  const [cart, setCart] = useState();
  const [isFixed, setIsFixed] = useState(false);
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    // Check if the maximum width of the screen is greater than 800 pixels
    const mediaQuery = window.matchMedia('(max-width: 800px)');

    // Hide the component if the screen is too large
    setShowComponent(mediaQuery.matches);

    // Add a listener to the media query to update the component when the screen size changes
    const handleMediaQueryChange = () => {
      setShowComponent(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);
  
  useEffect(() => {
    let copyObject = Object.values(products)
    setCart(copyObject);
    if(count ==="0 товар,"){
      setOpenBasket(false)
    }
}, [products , count]);
  
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const button = document.getElementById('fixed-button');
      if (button) {
        if (scrollY > button.offsetTop) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    countPriceDelivery(selectedSpot, price, setDeliveryPrice);
  }, [selectedSpot, price]);


  useLayoutEffect(() => {
    function handleResize() {
      const isAddressBarVisible = window.visualViewport.height > 700;
      setIsAddressBarVisible(isAddressBarVisible);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setStartY(touch.clientY);
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    setCurrentY(touch.clientY);
    if (startY && !isSwiping) {
      setIsSwiping(true);
    }
    if (isSwiping) {
      const contentHeight = contentRef.current.scrollHeight;
      const scrollTop = contentRef.current.scrollTop;
      const swipeDistance = touch.clientY - startY;
      const isScrollingTop = swipeDistance > 0 && scrollTop === 0;
      const isScrollingBottom = swipeDistance < 0 && scrollTop + contentHeight === contentRef.current.offsetHeight;
      if (!isScrollingTop && !isScrollingBottom) {
        event.preventDefault();
      }
    }
  };

  const handleTouchEnd = () => {
    if (isSwiping) {
      const swipeDistance = currentY - startY;
      if (swipeDistance > 50) {
        setOpenBasket(false);
      }
      setIsSwiping(false);
    }
    setStartY(null);
    setCurrentY(null);
  };

  if (!openBasket) return null; 
  
  return (
    <>   
        <div className={openBasket ? "modal_basket active" : "modal_basket"}
        style={{ transform: `translateY(${currentY ? currentY - startY : 0}px)` , backgroundColor:   currentY ? "rgba(0,0,0,0)" : [] , borderBottom: isAddressBarVisible ? "50px" : 0}} onClick={() => setOpenBasket(false)}
        >
        <div className='modal_basket_content' ref={modalRef} onClick={(e) => e.stopPropagation()}> 
          <div className='basket_content' ref={contentRef}>
            {showComponent && <div className='close_modal_button' 
                   onTouchStart={handleTouchStart}
                   onTouchMove={handleTouchMove}
                   onTouchEnd={handleTouchEnd}
                >
                    {
                      isSwiping ? <ArrowDropDownIcon/> : <RemoveIcon/>
                    }
                </div>   
            }
            {
              !showComponent ? 
                <div className="close_browser_button" onClick={() => setOpenBasket(false)}>
                  <CloseIcon sx={{color: "white" , fontSize: 40 , backgroundColor: "inherit"}}/>
                </div>
              : []
            }         
            
            <div className={showComponent ? "basket_content_h1mobil" :'basket_content_h1'}>
              {count?.slice(0, -1)}
            </div>
            <div className='basket_content_desc'>
              <span>Мінімальне замовлення від <b style={{backgroundColor: "inherit"}}>99 грн</b></span>
              {selectedSpot?.name  === "2" ? (
                <span>Вартість доставлення <b style={{backgroundColor: "inherit"}}>70 грн</b></span>
              ) : (
                <div className='basket_content_desc1'>
                  <span>Вартість доставлення <b style={{backgroundColor: "inherit"}}>50 грн</b></span>
                  <span>Безкоштовна доставка при замовленні від <b style={{backgroundColor: "inherit"}}>399 грн</b></span>
                </div>
              )}
            </div>
          </div>
          <div className='basket_content_products'>
              {
                cart?.map((item) => (item.photo ? <RowDish name={item.name} price={item.price} count={item.count} key={item.name} photo={item.photo} id={item.product_id} totalPrice={item.totalPrice}/> : []))
              }
          </div>
          <div className='basket_content_textarea'>
            <textarea placeholder='Коментар до замовлення' onChange={(e) => setComment(e.target.value)}>

            </textarea>
          </div>
          <div className='basket_content_bottom' style={{ position: isFixed ? 'fixed' : 'static', bottom: '20px' }}>
              <div className='basket_content_price'>
                <span> Сума замовлення:</span>
                <span>{price + " грн"}</span>
              </div>
              <div className='basket_content_btn'>
                <button onClick={() => setOrderActive(true)}>
                  Перейти до оформлення
                </button>
              </div>
          </div>
        </div>
      </div>
          <OrderModal orderActive={orderActive} setOrderActive={setOrderActive} setOpenBasket={setOpenBasket} price={price} products={cart} productsFranchise={productsFranchise} deliveryPrice={deliveryPrice} comment={comment}/>
  </>
  )
}

export const ModalBasketConnect = connect(state => ({ 
  products: state.cardReducer, 
  productsFranchise: state.promise?.productsFranchise?.payload?.products
}), {

})(ModalBasket) 


const Basket = ({basket}) => {
  const [cart, setCart] = useState();

  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
 
  const [openBasket, setOpenBasket] = useState(false);
  const [libraries] = useState(['places']);

  useEffect(() => {
      let copyObject = Object.values(basket)
      setCart(copyObject);
  }, [basket , count]);


  const calculateCartTotal = (cart) => {
    function sumByKey(arr, key) {
      return arr.reduce((acc, obj) => {
        if (obj[key] !== undefined) {
          return acc + obj[key];
        }
        return acc;
      }, 0);
    }
      const totalCount = sumByKey(cart, "count");
      const totalPrice = sumByKey(cart, "totalPrice");

    if (totalCount === 0) {
      setCount("0 товар,");
    } else {
      switch (true) {
        case totalCount === 1:
            setCount("1 товар,");
            setPrice(totalPrice);
           
          break;
        case totalCount > 1 && totalCount < 5:
            setCount(`${totalCount} товари,`);
            setPrice(totalPrice);
            
          break;
        case totalCount >= 5:
            setCount(`${totalCount} товарів,`);
            setPrice(totalPrice);
          
          break;
        default:
          break;
       }
    }
  };
  
  useEffect(() => {
    if (Array.isArray(cart)) {
      calculateCartTotal(cart);
      console.log(cart)
    } else {
      console.log('Error: arr is not an array');
    }
  }, [cart]);
  
  useEffect(() => {
    if (openBasket) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [openBasket]);
  
  
  const handleOpening = (event) => {
    event.stopPropagation();
    setOpenBasket(true);
  };


    return (
      <>
      <div className='basket_container'>
          <button className={count !== "0 товар,"? 'btn_basket acti' : "btn_basket"} onClick={handleOpening}>
                  <div className='btn_content'>
                      <ShoppingCartOutlinedIcon style={{backgroundColor: "white", borderRadius: 5 , padding: 4 , color: 'red'}}/>
                      <span>{count}</span>
                      <span>{price + " грн"}</span>
                  </div>
                <div className='order'>
                  Замовити
                  <KeyboardArrowRightIcon style={{color: "white" , backgroundColor: 'inherit'  , marginTop: 2}}/>
                </div>
          </button>
      </div>
      <ModalBasketConnect openBasket={openBasket} setOpenBasket={setOpenBasket} count={count}  price={price}/>
      </>
    )
  }

export const BasketConnect = connect(state => ({ 
    basket: state.cardReducer, 
}), {

})(Basket) 