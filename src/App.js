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
import { actionFullGetCategories, actionFullGetIngredients, actionFullGetProducts, actionFullGetProductsFranchise, actionGetClients, actionGetSpots, setFranchise } from './actions/Actions';
import SubmitOrder, { SubmitOrderConnect } from './pages/SubmitOrder';
import { BasketConnect } from './components/Basket';
import { actionSpotSelect } from './store/cardReducer';
import BeatLoader from 'react-spinners/BeatLoader';
import Payment from './pages/Payment';
import Contacts from './pages/Contacts';

// !!!!!!!!!!!!!!
import Discount from './pages/Discount';

import { loadFirePreset } from 'tsparticles-preset-fire';
import Particles from 'react-tsparticles';
// spots -> get_categories -> product get_spots = id 
// если выбран спот 1 то тогда делаем диспатч в редакс и передаем стоп , после этого на компоненте делаем проверку в зависимости от спота рендерим компонент продак спот ид = 1 

store.subscribe(() => console.log(store.getState()));

export class ParticlesContainer extends React.PureComponent {
  async customInit(engine: Engine): Promise<void> {
    await loadFirePreset(engine);
  }

  render() {
    const options = {
      preset: "fire",
    };

    return <Particles options={options} init={this.customInit} />;
  }
}

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
    store.dispatch(actionFullGetProductsFranchise())
    store.dispatch(actionGetClients())
    store.dispatch(actionFullGetCategories())
    store.dispatch(actionFullGetProducts())
    store.dispatch(actionFullGetIngredients())
  }, [])

  store.dispatch(setFranchise())
  

  useEffect(() => {
    let timeoutId;
  
    const checkSpotsStatus = async () => {
      try {
        const spotsStatus = store.getState().promise?.spots?.status;
        
        if (spotsStatus === "FULFILLED") {
          const selectedSpotId = localStorage.restaurant
          const selectedSpotAddress = localStorage.adress
          store.dispatch(actionSpotSelect(selectedSpotId ,selectedSpotAddress));
          setLoading(false);
        } else {
          setLoading(true);
          timeoutId = setTimeout(checkSpotsStatus, 10000);
        }
      } catch (error) {
        console.error(error);
        setLoading(true);
        timeoutId = setTimeout(checkSpotsStatus, 10000);
      }
    };
  
    checkSpotsStatus();
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
 

  return (
    <div className='App' style={{position: 'relative'}}> 
           <ParticlesContainer />
          
          <Provider store={store}>
            <Router>
              {
                        loading ? 
                        <div className='div_loading'>
                          <BeatLoader
                                  color="#291200"
                                  loading={loading}
                                  className="loading"
                                  size={30}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                          />
                        </div>
                        :
              <Routes>
                        <Route path="/" element={<MainPage />} exact/>
                        <Route path='/orderSubmit' element={<SubmitOrderConnect />} exact/>
                        <Route path="/basket" element={<BasketConnect/>} exact/>
                        <Route path='/payment'element={<Payment />} exact/>
                        <Route path='/contacts'element={<Contacts />} exact/>
                        <Route path='/discount'element={<Discount />} exact/>
              </Routes>
            } 
            </Router>
          </Provider>
      </div>
  );
}

export default App;
