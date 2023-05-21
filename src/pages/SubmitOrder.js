import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { store } from '../store/store'

const SubmitOrder = ({order}) => {
  return (
    <div className='submit_order_content'>
        <div className='payment_body'>
            <div className='submit_order_box'>
              <h1>Дякуємо за замовлення!</h1>
              <span>Замовлення номер №{order}</span>
              <p>Ми перетелефонуємо Вам найближчим часом для уточнення деталей!</p>
              <Link to="/" className='link_submit' onClick={() => store.dispatch({ type: "DELETE_ORDER" })}>Повернутися на сайт</Link>
            </div>
        </div>
    </div>
  )
}

export const SubmitOrderConnect = connect(state => ({ 
  order: state.cardReducer?.order, 
}), {

})(SubmitOrder) 