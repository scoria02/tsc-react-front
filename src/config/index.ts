import Axios, { AxiosRequestConfig } from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';

// Set config defaults when creating the instance

//const urlLocal = 'http://localhost';
//const URL = 'http://localhost';
export const URL = 'http://10.198.68.21';
export const Port = '5051';
export const PortFiles = '6060';

const configAxios: AxiosRequestConfig = {
	baseURL: `${URL}:${Port}`,
	headers: { common: { token: localStorage.getItem('token') } },
};

const configAxiosFiles: AxiosRequestConfig = {
	baseURL: `${URL}:${PortFiles}`,
	headers: { common: { token: localStorage.getItem('token') } },
};

Axios.defaults.headers['Content-Type'] = 'application/json';

const axios = Axios.create(configAxios);
export const axiosFiles = Axios.create(configAxiosFiles);

const cache = new LRU({ max: 10 });

configure({ axios, cache });

export default axios;
