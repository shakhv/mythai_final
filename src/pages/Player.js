import React, { useState } from 'react'
import "../css/player.css"

import { SideBar } from '../components/Sidebar'
import { Body} from '../components/Body/Body'
// import {Body}  from './Body'

import Footer from '../components/Footer'


function Player() {

  return (
    <div className='player'>
      <div className='player__body'>
          <SideBar />
          <Body />
      </div>
      <Footer />
    
    </div>
  )
}

export default Player