import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/layout/styles.css';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Router';
import { Store } from '@mui/icons-material';
import { StoreProvider } from './app/api/context/StoreContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <StoreProvider>
    <RouterProvider router={router} />
    </StoreProvider>
    
  </React.StrictMode>
);



reportWebVitals();
