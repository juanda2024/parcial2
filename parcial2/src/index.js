import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { IntlProvider } from 'react-intl';
import estructuraEspanol from "./locales/es";
import estructuraIngles from "./locales/en";

let idioma = "";

if (window.navigator.language.split("-")[0] === 'es') {
  idioma = estructuraEspanol
}
else {
  idioma = estructuraIngles
}
console.log(idioma);

ReactDOM.render(
  <IntlProvider locale={window.navigator.language.split("-")[0]} messages={idioma}>
    <App />
</IntlProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
