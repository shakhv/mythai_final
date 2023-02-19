import React from 'react'
import { store } from '../store/store';
import { connect } from 'react-redux';
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

import {useJsApiLoader , Autocomplete} from '@react-google-maps/api'
import { Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { actionRequestOrder } from '../actions/Actions';

const workHours = ["Доставити швидше", "10:30" , "11:00" , "11:30" , "12:00" , "12:30" , "13:00" , "13:30" , "14:00" , "14:30" , "15:00" , "15:30" , "16:00" , "16:30" , "17:00" , "17:30" , "18:00" , "18:30" , "19:00" , "19:30" , "20:00" , "20:30" , "21:00"]
const getBySelf = ["Заберу раніше", "10:30" , "11:00" , "11:30" , "12:00" , "12:30" , "13:00" , "13:30" , "14:00" , "14:30" , "15:00" , "15:30" , "16:00" , "16:30" , "17:00" , "17:30" , "18:00" , "18:30" , "19:00" , "19:30" , "20:00" , "20:30" , "21:00"]


const SelectAdress = ({selectAdress , setSelectAdress , setOrderActive}) => {

  const handleChangeModal = () => {
      setSelectAdress(false)
      setOrderActive(true)
  }

  const options = {
    componentRestrictions: {country: "ua"},
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
                    <div className='select_adress_top'> 
                          <span>Адреса доставлення</span>
                          <PlaceOutlinedIcon sx={{backgroundColor: '#171010',color: "silver"}} className="select_adress_input_icon"/>
                         
                          <Autocomplete className="select_adress_div_autocompelete" options={options}>
                            <input 
                              placeholder="Вкажіть адресу доставлення" 
                              />
                          </Autocomplete>
                    </div>
                    <div>
                          <span>Під’їзд, поверх, квартира</span>
                          <Input 
                            className="adress_input" 
                            sx={{backgroundColor: "#171010", border: 'none'
                            }} 
                            />
                    </div>
                    <button>Зберегти</button>
              </div>
          </div>
      </div>
    </div>
  )
}


const OrderModal = ({orderActive , setOrderActive , setOpenBasket , price , products}) => {

  const [selectedValue, setSelectedValue] = useState('delivery');
  const [selectAdress , setSelectAdress] = useState(false)
  const currentHour = moment().hour()
  const currentMinute = moment().minute()
  const timeWork = []
  const selfGet = []
  // const [age, setAge] = React.useState('');
  const [name , setName] = useState('')
  const [phone , setPhone] = useState('')

  const handleName = (e) => {
      setName(e.target.value)
  }

  const handlePhone = (e) => {
      setPhone(e.target.value)
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    // if(orderActive === false){
    //   setOpenBasket(true)
    // }
    if(selectAdress === true){
      setOrderActive(false)
      setOpenBasket(false)
    }
  }, [orderActive , selectedValue , selectAdress])

  // const handleChange1 = (event) => {
  //   setAge(event.target.value);
  // };

  let time = currentHour + ":" + currentMinute

  const disableHours = () => {
    for(let i = 0;i < workHours.length; i++){
      if(time <= workHours[i]){
        timeWork.push(workHours[i])
      }
    }
    for(let i = 0;i < getBySelf.length; i++){
      if(time <= getBySelf[i]){
        selfGet.push(getBySelf[i])
      }
    }
  }
  disableHours()

  const handleSubmitOrder = (name , phone) => { 
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
    postData("http://localhost:8090/buy", {spot: store.getState().cardReducer?.spot?.name, name: name , phone: phone , products: products })
      .then((data) => {
        console.log(data);
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
              onChange={handleName} 
              className="contacts_input" 
              placeholder="Ім'я" 
              sx={{backgroundColor: "#171010", border: 'none' 
              }} 
              />

              <Input startDecorator={<CallOutlinedIcon sx={{
              backgroundColor: '#171010',
              color: "silver"
              }}/>} 
              onChange={handlePhone}
              className="contacts_input" placeholder="Номер телефону"
              sx={{backgroundColor: "#171010" , color: 'white'}} 
              />
          </div>
          <div className='delivery'>
            <div className='delivery_title'>
            {
              selectedValue === 'delivery' ? <span style={{backgroundColor: "inherit" ,color: 'white'}}>Доставлення</span> : <span style={{backgroundColor: "inherit" , color: 'white'}}>Самовивіз</span>
            }
            </div>
            <div className='delivery_select'>
                <label className="labl">
                    <input type="radio" value="delivery" name="gender" onChange={handleChange} checked={selectedValue === 'delivery'}/> 
                    <div>Доставлення</div>
                </label>
                <label className="labl">
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
                  onClick={() => setSelectAdress(true)}
                  autoComplete="new-password"
                  className="contacts_input" 
                  placeholder="Вкажіть адресу доставлення" 
                  sx={{backgroundColor: "#171010", border: 'none'
                  }} 
                  />
                  <div className='time_choose'>
                    <WatchLaterOutlinedIcon className='time_icon'/>
                    <select  className="contacts_input">
                    {
                      timeWork.map((e, i) => (
                        <option key={i} value={e}>
                          {e}
                        </option>
                      ))
                    }
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
                          color: "silver"
                          }}/>}
                          autoComplete="new-password"
                          className="contacts_input" 
                          placeholder="Вкажіть адресу доставлення" 
                          sx={{backgroundColor: "#171010", border: 'none'
                          }} 
                          />
                          <div className='time_choose'>
                              <WatchLaterOutlinedIcon className='time_icon'/>
                              <select  className="contacts_input">
                              {
                                selfGet.map((e, i) => (
                                  <option key={i} value={e}>
                                    {e}
                                  </option>
                                ))
                              }
                              </select>
                          </div>
                  </div>
              : []
            }
            <div className='delivery'>
              <div className='delivery_title'>
                  <span style={{backgroundColor: "inherit" ,color: 'white'}}>Оплата</span> 
              </div>
                  <Input className='payment_input' placeholder='Готівкой' startDecorator={<CreditCardOutlinedIcon
                  sx={{
                    backgroundColor: 'rgb(159, 156, 156)',
                    color: "white"
                    }}
                  />} sx={{marginBottom: 2}}/>
            </div>
            <div className='order_bottom'>
              <div className='order_bottom_price'>
                  <span>Сумма замовлення: <b>{price + " грн"}</b> </span>
                  {selectedValue === "getSelf"  ? [] : <span>Доставлення: <b>50 грн</b></span>}
              </div>
              <Link to="/orderSubmit" className='link_bottom' onClick={() => handleSubmitOrder(name , phone)}>Оформити за <b>{(price  + 50 )} грн</b></Link>
            </div>

        </div>
      </div>
    </div>
      <SelectAdress selectAdress={selectAdress} setSelectAdress={setSelectAdress} setOrderActive={setOrderActive}/>
    </>
  )
}


const RowDish = ({name , price , count}) =>
<div className='row_dish'>
  <img src='data:image/png;base64,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'/>
  <div className='row_dish_content'>
    <div className='row_dish_title'>
      <span>{name}</span>
      <span>{price} грн</span>
    </div>
    <div className='row_dish_count'>
      <button className='minus'> <span> - </span></button>
      <span>{count}</span>
      <button className='count_plus'> <span> + </span></button>
    </div>
  </div>
</div>


const ModalBasket = ({openBasket , setOpenBasket , count , products , price}) => {

  const [orderActive , setOrderActive] = useState(false)

  useEffect(() => {
    if(orderActive === true){
      setOpenBasket(false)
    }
  }, [orderActive , openBasket])
  

  return (
    <>
    <div className={openBasket ? "modal_basket active" : "modal_basket"} onClick={() => setOpenBasket(false)}>
    <div className='modal_basket_content' onClick={e => e.stopPropagation()}>
       <div className='basket_content'>
         <div className='basket_content_h1'>
          {count?.slice(0, -1)}
         </div>
         <div className='basket_content_desc'>
          <span>Мінімальне замовлення від <b style={{backgroundColor: "inherit"}}>99 грн</b></span>
          <span>Вартість доставлення <b style={{backgroundColor: "inherit"}}>50 грн</b></span>
         </div>
       </div>
       <div className='basket_content_products'>
          {
            products?.map((item) => (<RowDish name={item.name} price={item.price} count={item.count} key={item.name}/>))
          }
       </div>
       <div className='basket_content_textarea'>
        <textarea placeholder='Коментар до замовлення'>

        </textarea>
       </div>
      <div className='basket_content_bottom'>
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
          <OrderModal orderActive={orderActive} setOrderActive={setOrderActive} setOpenBasket={setOpenBasket} price={price} products={products}/>
  </>
  )
}


const Basket = ({basket}) => {
    const [cart , setCart] = useState()
    const totalCount = []
    const totalPrice = []
    const [count,setCount] = useState()
    const [price , setPrice] = useState()
    const [ libraries ] = useState(['places']);

    const productsInTheBasket = []

    const [openBasket , setOpenBasket] = useState(false)

    if(cart){
      for(let [key,value] of Object.entries(cart)){
        if(value.price){
          productsInTheBasket.push(value)
        }
      }
    }

    useEffect(() => {
      if(basket){
        setCart(basket)
      }
    }, [basket])

    const concCount = () => {
      if(cart !== null){
       for(let [key , value] of Object.entries(cart || {})){
          if(value.price) totalPrice.push(value.price)
          if(value.count) totalCount.push(value.count)
       }
      }
    }
    concCount()

    useEffect(() => {
      let resultCount = totalCount?.reduce((item , next) =>  item  + next, 0)
      let resultPrice = totalPrice?.reduce((item ,next ) => item + next , 0)

      if(totalCount.length == 0){
        setCount(0 + " товар,")
        setPrice(0)
      }
      if(totalCount.length == 1){
        setCount(1 + " товар,")
        setPrice(totalPrice[0])
      }
      if(totalCount.length > 1 || totalCount > 1 && resultCount < 5){
        setCount(resultCount  + " товари,") 
      }
      if(resultCount > 4){
        setCount(resultCount + " товарів,")
      }
      if(totalPrice.length > 1){
        setPrice(resultPrice)
      }
    }, [cart])

    const {isLoaded} = useJsApiLoader({
      googleMapsApiKey: "AIzaSyD-3lAed2PzWnYQG9wHBnIKguUzfcVGw9Y",
      componentRestrictions: {country: "ua"},
      libraries,
    })
  
    if(!isLoaded){
      return <span></span>
    }
  
    return (
      <>
      <div className={price > 1 ? 'basket_container' : "basket_containerDISABLE"}>
          <button className='btn_basket' onClick={() => setOpenBasket(true)}>
                  <div className='btn_content'>
                      <ShoppingCartOutlinedIcon style={{backgroundColor: "white" ,color: "inherit" , borderRadius: 5 , padding: 4}}/>
                      <span>{count}</span>
                      <span>{price + " грн"}</span>
                  </div>
                <div className='order'>
                  Замовити
                  <KeyboardArrowRightIcon style={{color: "white" , backgroundColor: 'inherit'  , marginTop: 2}}/>
                </div>
          
          </button>
      </div>
      <ModalBasket openBasket={openBasket} setOpenBasket={setOpenBasket} count={count} products={productsInTheBasket} price={price}/>
      </>
    )
  }


export const BasketConnect = connect(state => ({ 
    basket: state.cardReducer, 
}), {

})(Basket) 