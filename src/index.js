import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AndrewReads from './AndrewReads';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter><AndrewReads /></BrowserRouter>
),
  document.getElementById('root')
);
registerServiceWorker();