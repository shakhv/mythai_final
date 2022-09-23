import React , {useEffect, useState , useCallback} from 'react'
import { Header } from './Body'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


const PlaylistRow = ({playlist: {_id , name}}) => 
<>
    <Link to={`/Player/playlist/${_id}`} className='pageMain__playlist'><h1>{name}</h1></Link>
</>
 
const PageMain = ({playlistAll = []}) => {
return (
  <div className='body'>
      <Header />
      <h1>Popular playlists</h1>
      <div className='pageMain__playlistsContainer'>
        {playlistAll.map(item => 
        item.name !== null ? <PlaylistRow playlist={item} key={item._id}/> : []).reverse()}
      </div>
  </div>
)
}
export const CPageMain = connect((state) => ({
playlistAll: state.promise.allPlaylists?.payload}))
(PageMain)