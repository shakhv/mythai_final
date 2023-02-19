import React from 'react'
import { Link } from 'react-router-dom'

const SubmitOrder = () => {
  return (
    <div className='submit_order_content'>
        <div className='submit_order_box'>
            <h1>Дякуємо за замовлення!</h1>
            <span>Замовлення номер №</span>
            <p>Дякуємо за замовлення!Ми перетелефонуємо Вам найближчим часом для уточнення деталей!</p>
            <Link to="/" className='link_submit'>Повернутися на сайт</Link>
        </div>

    </div>
  )
}

export default SubmitOrder