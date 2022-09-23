import React from 'react'
import '../../css/body.css'

import { useRoutes } from 'react-router-dom'

import { Search } from '@mui/icons-material'
import { Avatar, Input, InputBase } from '@mui/material'
import { connect } from 'react-redux'

import { CCreatePlaylist } from './CreatePlaylist'
import { CPagePlaylist } from './Playlist'
import { CPageMain } from './Main'
import { CUploadFile } from './Upload'


const HeaderName = ({name}) => {
  return (
    <div className='header'>
        <div className='header__left'>
            <Search />
            <input placeholder='Search ...'/>
        </div>
        <div className='header__right'>
            <Avatar src='named?.images[0]?.url' alt="avatar"/>
            <h4>{name}</h4>
        </div>
    </div>
  )
}

export const Header = connect((state) =>({name : state.authReducer?.payload?.sub?.login}))(HeaderName)


export const Body = () => {
        let routes = useRoutes([
            { path: "/*", element: <CPageMain /> },
            { path: "/playlist/:_id/*", element: <CPagePlaylist/> },
            { path: "/Create%20playlist", element: <CCreatePlaylist/> },
          ]);
          return routes;
}



