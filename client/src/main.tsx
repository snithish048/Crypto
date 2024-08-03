import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './_app.tsx'
import './index.css'
import Home from './pages/index.tsx'
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <Home />
  </Provider>

  </React.StrictMode>,
)
