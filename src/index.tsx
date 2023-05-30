import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { I18nextProvider } from 'react-i18next';
import i18n from './common/language';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './service/store';
import GlobalStyle from './globalStyle';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <GlobalStyle>

        <App />
      </GlobalStyle>
      </I18nextProvider>,
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
