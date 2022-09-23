import React , {useRef} from 'react'
import {Link} from 'react-router-dom'
import '../css/startpage.css'
import logo from '../images/logo.svg'




export const StartPage = () =>
<div className='start__page'>
        <img src={logo}/>
        <Link to="/LoginPage" className='link' >START WITH MUSICAPP</Link>
        { localStorage.authToken = ''}
</div>



