import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// Corrected import
import App from './App';
import './index.css';
import store from './redux/store';
import { UiProvider } from './contexts/UiContext';
// Create the Redux store with thunk middleware applied

// Render the app with Redux Provider and Router
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <UiProvider>
          <App />
        </UiProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
