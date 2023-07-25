import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa desde react-dom/client en lugar de react-dom
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App tab="home" />
  </Provider>
);
