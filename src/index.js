import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createContext } from 'react';
// const {REACT_APP_API_URL} = process.env;
// console.log(REACT_APP_API_URL)
export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Context.Provider value={{
        products: new ProductsStore(),
    }}> */}
        <App />
    {/* </Context.Provider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

