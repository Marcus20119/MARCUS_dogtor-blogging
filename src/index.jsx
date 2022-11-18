import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { theme } from './utils/constants';
import { GlobalStyles } from './styles/GlobalStyles';
import AuthProvider from './contexts/authContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <Fragment>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
