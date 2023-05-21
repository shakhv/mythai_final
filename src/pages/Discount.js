import React from 'react'
import { useNavigate } from 'react-router'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import banner1 from "../images/banner1.jpg"

function Discount() {
    const navigation = useNavigate()

  return (
    <div className='payment'>
        <div className='header'>
            <div className='header_content'>
                <div onClick={() => navigation("/")} className="payment_header_content">
                    <KeyboardArrowLeftIcon className='order_content_top_arrow' sx={{color:"red"}}/> 
                    <span style={{color: "red"}}>Назад до меню</span>
                </div>
            </div>
        </div>
        <div className='payment_body'>
            <div className='payment_body_content'>
                <img src={banner1}/>   
            </div>
        </div>
    </div>
  )
}

export default Discount