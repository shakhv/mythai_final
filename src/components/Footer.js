import React from 'react'



import '../css/footer.css'
import { PlayCircleOutline, PlaylistPlay, VolumeDown } from '@mui/icons-material'
import { PauseCircleFilledOutlined } from '@mui/icons-material'
import { SkipPrevious } from '@mui/icons-material'
import { SkipNext } from '@mui/icons-material'
import { Shuffle } from '@mui/icons-material'
import { Repeat } from '@mui/icons-material'
import { Grid, Slider } from '@mui/material'
import { connect } from 'react-redux'
import { actionFullPause, actionFullPlay, actionPlay } from '../store/playerReducer'
import { store } from '../store/store'


const FooterTitle = ({track}) => 
<div className='footer__left'>
          <img src='' alt=''className='footer__albumLogo'/>
          <div className='footer__songInfo'>
            <h4>{track}</h4>
            <p>...</p>
          </div>
</div>

const CFooterTitle = connect(state => ({track: state.playerReducer?.track}))(FooterTitle)

const FooterControl = ({isPlaying}) =>
<div className='footer__center'>
            <Shuffle className='footer__aqua'/>
            <SkipPrevious className='footer__icon'/>
            {/* {
               isPlaying !== true ? <PlayCircleOutline fontSize='large' className='footer__icon' onClick={() => store.dispatch(actionPlay())}/> : <PauseCircleFilledOutlined fontSize='large' className='footer__icon'  onClick={() => store.dispatch(actionFullPause())}/>
            } */}
            {/* <PauseCircleFilledOutlined fontSize='large' className='footer__icon'  onClick={() => store.dispatch(actionFullPause())}/> */}
            <SkipNext className='footer__icon'/>
            <Repeat className='footer__aqua'/>
</div>

const CFooterControl = connect(state => ({isPlaying: state.playerReducer?.isPlaying}))(FooterControl)

// playerReducer.isPlaying
function Footer() {
  return (
    <div className='footer'>
        <CFooterTitle />
        <CFooterControl/>
        <div className='footer__right'>
            <Grid container spacing={2}>
              <Grid item>
                <PlaylistPlay />
              </Grid>
              <Grid item>
                <VolumeDown />
              </Grid>
              <Grid item xs>
                <Slider />
              </Grid>
            </Grid>
        </div>
    </div>
  )
}

export default Footer