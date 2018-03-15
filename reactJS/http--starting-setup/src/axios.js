import axios from 'axios';

// creates instance of axios like a copy of axios object
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

export default instance;