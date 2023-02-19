import './App.css';
import React, { createContext, useState } from 'react';
import { Provider , connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { store } from './store/store';
import "./App.css"

import { MainPage } from './pages/MainPage';
import { useEffect ,CSSProperties } from 'react';
import { actionFullGetCategories, actionFullGetIngredients, actionFullGetProducts, actionGetSpots } from './actions/Actions';
import SubmitOrder from './pages/SubmitOrder';
import { BasketConnect } from './components/Basket';
import { actionSpotSelect } from './store/cardReducer';
import BeatLoader from 'react-spinners/BeatLoader';


// spots -> get_categories -> product get_spots = id 
// если выбран спот 1 то тогда делаем диспатч в редакс и передаем стоп , после этого на компоненте делаем проверку в зависимости от спота рендерим компонент продак спот ид = 1 

store.subscribe(() => console.log(store.getState()));

const SetRestModal = () => {
  return (
    <div className='selectRestModal'>
      <div className='selectRestModal_content'>
          <h1>MyThai</h1>
          <h4>Оберіть місто:</h4>
          <div className='selectRestModal_content_cities'>
                <span>Лозова</span>
                <span>Умань</span>
                <span>Ізюм</span>
                <span>Чернівці</span>
                <span>Черкаси</span>
                <span>Львів</span>
          </div>
          <Link className='start_button' to="/mainpage"><span>Обрати</span></Link>
      </div>
    </div>
  )
}

{/* <h1>MyThai Суши</h1>
<h5>Оберіть місто:</h5>
<div className='selectRestModal_content_cities'>
<span>Лозова</span>
<span>Умань</span>
<span>Ізюм</span>
<span>Чернівці</span>
<span>Черкаси</span>
<span>Львів</span>
</div> */}
//  ! DARK MODE
export const ThemeContext = createContext(null)

function App() {
  const [theme , setTheme] = useState("light")
  const [selectRest , setSelectRest] = useState(true)
  const toogleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }
  const [loading , setLoading] = useState(false)

  useEffect(() => {
    store.dispatch(actionGetSpots())
    store.dispatch(actionFullGetCategories())
    store.dispatch(actionFullGetProducts())
    store.dispatch(actionFullGetIngredients())
  }, [])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      if(store.getState().promise?.spots?.status == "FULFILLED"){
        if(!localStorage.restaurant){
          store.dispatch(actionSpotSelect(store.getState().promise?.spots?.payload?.spots[0]?.spot_id))
        }else{
          store.dispatch(actionSpotSelect(localStorage.restaurant))
        }
        setLoading(false)
      }else {
        setLoading(true)
      }
    }, 2000)
  }, [])
    // !!!!!!!!!!!!!!!!!!!!!!


  return (
    // <ThemeContext.Provider value={{theme , toogleTheme}}>

    // <div className='App'> 
          <Provider store={store}>
            <Router>
              {/* {
                        loading ? 
                        <BeatLoader

                                color="red"
                                loading={loading}
                                className="loading"
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                        />
                        : */}

              <Routes>
                        <Route path="/" element={<MainPage />} exact/>
                        <Route path='/orderSubmit' element={<SubmitOrder />} exact/>
                        <Route path="/basket" element={<BasketConnect/>} exact/>
              </Routes>
              {/* } */}
            </Router>
          </Provider>
  
    // </ThemeContext.Provider> 
  );
}

export default App;
