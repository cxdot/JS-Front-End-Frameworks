import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-e8a8c.firebaseio.com/'
});

export default instance;