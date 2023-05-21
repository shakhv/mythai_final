import React from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router';

function Payment() {
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
                <h1>Оплата та доставка</h1>
                <h3>Варіанти оплат:</h3>
                    <div className='payment_body_payment_select'>
                            <span>- Оплата готівкою кур'єру</span>
                            <span>- Онлайн оплата платіжними картами Visa и MasterCard, також ApplePay и GooglePay</span>
                    </div>

                    <h4><b>🎉Вартість доставлення 50грн🎉</b></h4>
                    <span>Детали та райони обслуговування доставлення уточнюйте у адміністратора</span>
            </div>
        </div>
    </div>
  )
}

export default Payment