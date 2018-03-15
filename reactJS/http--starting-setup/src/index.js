import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

// use() register a new interceptor; which takes a function as input which receives the config(request)
axios.interceptors.request.use(req => {
    console.log(req);
    // edit request config 
    return req;
}, err => {
    console.log(err);
    // forward it to our request that we wrote in the component to handle it with .catch method
    return Promise.reject(err);
});

axios.interceptors.response.use(res => {
    console.log(res);
    return res;
}, err => {
    console.log(err);
    return Promise.reject(err);
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
