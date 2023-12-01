import axios from 'axios';
import { api } from './baseUrl';

const axiosInstance = axios.create({
    baseURL:api,
    // headers:{
    //     'Authorization':`Bearer ${localStorage.getItem('token')}`
    // }
});

export default axiosInstance;