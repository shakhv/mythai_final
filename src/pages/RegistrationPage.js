import React from 'react'
import { useState  , useEffect} from 'react';

// mui imports
import { Sheet } from '@mui/joy';
import {TextField} from '@mui/joy';
import {Button} from '@mui/joy';
import '../css/registration.css'
import { connect } from 'react-redux';
import { actionFullRegister, actionRegister } from '../actions/Actions';
import { useNavigate } from 'react-router-dom';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { AlertTitle } from '@mui/material';

export function validateEmail(email) {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    email.toLowerCase()
  );
}

export function validatePassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/.test(password);
}

export function validateNickname(nick) {
  return /^[a-z0-9_-]{3,8}$/.test(nick);
}


const  RegistrationForm = ({regID,registration }) => {
  const [login , setLogin] = useState('');
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [id, setID] = useState('')
  const history = useNavigate()

  useEffect(() => {
    setID(regID)
    if(regID?.payload){
      history('/Player')
    }
  }, [regID , id])
  
  
  return (
    <div className='registration'>
       <Sheet
          sx={
            {
              maxWidth: 400,
              mx: 'auto', // margin left & right
              mt: 25, // margin top & botom
              py: 3, // padding top & bottom
              px: 2, // padding left & right
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRadius: 'sm',
              boxShadow: 'md',
            }
          }
        >
          Please Enter your details!
          <TextField
            // html input attribute
            name="text"
            type="text"
            placeholder="kingCharlesIII"
            onChange={(e) => setLogin(e.target.value)}
            label="Login"
          />
         
          <TextField
            name="password"
            type="password"
            placeholder="password"
            label={id?.payload !== null ? "Password" : <p className='password__title'>Check Password {<RemoveRedEyeIcon  onClick={() => {setPasswordVisible(!passwordVisible)}} className='password__eye'/>}</p>}
          />
          {login.length === 0 ? null : validateEmail(login) ? (
          password.length === 0 ? null : validatePassword(password) ? null : (
            <AlertTitle>
              Пароль должен быть от 6 символов, иметь хотя бы одну цифру и
              заглавную букву.
            </AlertTitle>
          )
        ) : (
          <AlertTitle>Email должен быть в формате: email@gmail.com.</AlertTitle>
        )}
          <TextField
            name="confirmpassword"
            type="password"
            placeholder="confirm password"
            onChange={(e) => setPassword(e.target.value)}
            label="Confirm Password"
          />
          {id?.payload === null ? (
              <AlertTitle className='alert__title'>
                Sorry, but your login or password is not correct, please try again
              </AlertTitle>
            ) : null}
          <Button 
            size="md" 
            className='button' 
            onClick={() => {registration(login, password)}}
            >
          Sign up
        </Button>
        </Sheet>
    </div>
    
  )
}

export const RegistrationPage = connect(state => ({regID: state.promise.registration || {}}), { registration: actionFullRegister })(RegistrationForm)