import axios from 'axios';
import {API} from './config'

const fetchClient = () => {
  const defaultOptions = {
    baseURL: API,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    // set the token only if available in localStorage
    if(token !== null) {
      config.headers.Authorization =  token ? `Bearer ${token}` : '';
    }
    return config;
  });

  return instance;
};

export default fetchClient();
