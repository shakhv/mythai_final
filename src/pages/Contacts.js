import React from 'react'
import { useNavigate } from 'react-router'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function Contacts() {
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
                <h1>Контакти</h1>
                <h4 style={{ paddingBottom: '4%'}}>м. Лозова, мікрорайон 2 буд 16<br/> - тел. <b>0660558522</b></h4>
                <hr/> 
                <h4 style={{ paddingBottom: '4%'}}>м. Умань, вул. Європейська 54 <br/> - тел. <b>0992308969</b></h4>
            </div>
        </div>
    </div>
  )
}


export default Contacts