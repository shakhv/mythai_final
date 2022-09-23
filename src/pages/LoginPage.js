import  React , {useState , useEffect}  from 'react';
import '../css/loginpage.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { store } from '../store/store';
import {connect}   from 'react-redux';
import { actionFullLogin } from '../actions/Actions';
// import { actionGetUserPlaylists } from '../../actions/Actions';
import { AlertTitle } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

// mui imports
import { Sheet } from '@mui/joy';
import { TextField } from '@mui/joy';
import { Button } from '@mui/joy';



const LoginForm = ({ loged , onLogin}) => {
      const [login , setLogin] = useState('')
      const [password , setPassword] = useState('')
      const [log,setLog ] = useState('')
      const [passwordVisible, setPasswordVisible] = useState(false);
      const history = useNavigate()

      useEffect(() => {
        setLog(loged)
        if(log?.payload && localStorage.authToken){
          history('/Player')
          // localStorage.authToken = '';
        }
      
      }, [loged , log])
  
      return (
        <div className='loginForm' >
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
            WELCOME!
            <TextField
              // html input attribute
              name="login"
              type="text"
              placeholder="JohnWikk"
              // value={email}
              onChange={(e) => setLogin(e.target.value)}
              label="Login"
            />
            <TextField
              name="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              label={log?.payload !== null ? "Password" : <p className='password__title'>Check Password {<RemoveRedEyeIcon  onClick={() => {setPasswordVisible(!passwordVisible)}} className='password__eye'/>}</p>}
            /> 
            {/* <RemoveRedEyeIcon  onClick={() => {setPasswordVisible(!passwordVisible)}} className='password__eye'/> */}
            {log?.payload === null ? (
              <AlertTitle className='alert__title'>
                Sorry, but your login or password is not correct, please try or register again
              </AlertTitle>
            ) : null}
            <Button 
            size="md" 
            className='button'
            onClick={() => {onLogin(login,password)}} >
            LOG IN
            </Button>
           
            
           <div className='loginPage'>
                  <p> You don't have account? <Link to="/RegistrationPage" className='link_sign_up'>Sign Up</Link></p>
          </div>
         
          </Sheet>
        </div>
      )
    }

   export const LfConnect = connect(state =>({ loged: state.promise.login || {} }), { onLogin: actionFullLogin })(LoginForm) 




