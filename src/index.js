import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AndrewReads from './AndrewReads';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AndrewReads />, document.getElementById('root'));
registerServiceWorker();
