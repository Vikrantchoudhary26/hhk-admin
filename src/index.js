import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store,{persistor} from './store/store';
import { BrowserRouter } from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';


window.store = store;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store} >
    <BrowserRouter>
      <React.StrictMode>
      <PersistGate persistor={persistor} >
        <App />
      </PersistGate>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
