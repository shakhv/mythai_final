import {jwtDecode, backendURL } from './promiseReducer';
// import { actionPromise } from '../actions/Actions';
import { store } from './store';
import { gql } from './promiseReducer';



const audio = new Audio;

export function audioReducer(state = [], {type , duration ,track, playlist , currentTime , volume}) {
    if (!state) {
          return {};
    }
    if(type === "PLAY"){
          return {
                ...state,
                isPlaying : true,
                
          }
    }
    if(type === "PAUSE"){
          return {
                ...state ,
                isPlaying : false ,
          }
    }

    if(type === "GET_DURATION"){
          return {
                ...state , 
                duration
          }
    }
    
    if(type === "SET_PLAYLIST"){
          return {
                ...state, 
                playlist,
          }
    }
    if(type === "SET_CURRENT_TIME"){
          return {
                ...state , 
                currentTime
          }
    }
    if(type === "SET_VOLUME"){
          return {
                ...state,
                volume
          }
    }
    if(type === "SET_TRACK"){
          return {
                ...state,
                isPlaying : true ,
                  track
                    // tracks 
          }
    }
    
    return state;
}

export const actionPlay = () => ({ type: "PLAY"});
const actionPause = () => ({ type : "PAUSE"})
const actionDuration  = (duration) => ({ type: "GET_DURATION" , duration})
const actionCurrentTime = (currentTime) => ({type: "SET_CURRENT_TIME" , currentTime})
const actionSetTrack = (track) => ({type: 'SET_TRACK',track})
const actionSetPlaylist = (playlist) => ({type:'SET_PLAYLIST', playlist})


// export const actionFullPlay = () => (dispatch) => {
//     dispatch(setTrack())
//     actionFullDuration();
//     actionFullCurrentTime();
//     actionFullSetTrack();
//     dispatch(actionPlay());
//     audio.play();
// }

// export const actionFullPause = () => (dispatch) => {
//     dispatch(actionPause())
//     audio.pause();
// }



// export const actionFullCurrentTime = (currentTime) => {
//     // audio.ontimeupdate = () => {
//           // currentTime = audio.currentTime
//           store.dispatch(actionCurrentTime(currentTime)) 
//     // }            
// }



//  const backPlay = `http://player.node.ed.asmer.org.ua` + '/' + `${track}`

export const actionFullPlay = (track , url) => dispatch =>{
      console.log(track , url)
      // audio.src = `http://player.node.ed.asmer.org.ua` + '/' + url 
      // audio.play();
      // dispatch(actionPlay())
      // dispatch(setTrack(track , url))
      // audio.onloadedmetadata = (() => dispatch(actionFullDuration(audio.duration)))
      
}     



export const actionFullDuration = (duration) =>  dispatch => {
      audio.ondurationchange = () => {
            duration = audio.duration
      }
      dispatch(actionDuration(duration))
}

// export const actionFullPause = () => (dispatch) => {
//       dispatch(actionPause())
//       audio.pause();
// }


export const setTrack = (track , url) => (dispatch) => {
     
      dispatch(actionSetTrack(track))
}


export const actionFullSetPlaylist = (playlist) => dispatch => dispatch(actionSetPlaylist(playlist));
    

  