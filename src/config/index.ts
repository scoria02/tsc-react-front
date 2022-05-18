import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';

export const configAxios: AxiosRequestConfig = {
	baseURL: process.env.REACT_APP_API_API,
	//baseURL: 'http://localhost:5051',
	headers: { common: { token: localStorage.getItem('token') } },
};

const configAxiosFiles: AxiosRequestConfig = {
	baseURL: process.env.REACT_APP_API_IMAGES,
	//baseURL: 'http://localhost:6060',
	headers: { common: { token: localStorage.getItem('token') } },
};

Axios.defaults.headers['Common-Type'] = 'application/json';

const axios = Axios.create(configAxios);
export const axiosFiles = Axios.create(configAxiosFiles);

axios.interceptors.response.use((resp: AxiosResponse<any>): AxiosResponse<any> => {
	if (resp.data.token) {
		axios.defaults.headers.common['token'] = resp.data.token;
		localStorage.setItem('token', resp.data.token);
	}
	return resp;
});

axios.interceptors.request.use(async (config: any) => {
	console.log('token request', axios.defaults.headers.common['token']);
	return config;
});

const cache = new LRU({ max: 10 });

configure({ axios, cache });

export default axios;
