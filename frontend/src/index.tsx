import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import authHeader from './routers/APIs/authHeader';

//redux persist : localhost
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import { Provider, useSelector } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import favoriteProductListReducer from '@modules/FavoriteProductList';
import CheckListProductsReducer from '@modules/CheckListProductList';
import authTokenReducer from './modules/Auth'

axios.defaults.withCredentials = true;
const persistConfig = {
  key: 'root',
  storage: storage,
};

const rootReducer = combineReducers({
  favoriteProductListReducer,
  authTokenReducer,
  CheckListProductsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: {
    persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

// console.log(localStorage.getItem('persist:null'));


if (localStorage.jwtToken) {
  authHeader(localStorage.jwtToken);
  const token = localStorage.jwtToken
  // console.log(token);
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
