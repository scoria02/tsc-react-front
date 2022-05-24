import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';

export const configAxios: AxiosRequestConfig = {
	baseURL: process.env.REACT_APP_API_API,
	headers: { Authorization: `${localStorage.getItem('token')}` },
};

const configAxiosFiles: AxiosRequestConfig = {
	baseURL: process.env.REACT_APP_API_IMAGES,
	//headers: { Authorization: `${localStorage.get('token')}` },
};

Axios.defaults.headers['Common-Type'] = 'application/json';

const axios = Axios.create(configAxios);
export const axiosFiles = Axios.create(configAxiosFiles);

axios.interceptors.response.use((resp: AxiosResponse<any>): AxiosResponse<any> => {
	if (resp.data.token) {
		localStorage.setItem('token', resp.data.token);
		resp.headers.Authorization = resp?.data.token && '';
	}
	return resp;
});

axios.interceptors.request.use(async (config: any) => {
	config.headers.Authorization = localStorage.getItem('token');
	return config;
});

const cache = new LRU({ max: 10 });

configure({ axios, cache });

export default axios;
