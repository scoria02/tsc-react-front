import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';

// Set config defaults when creating the instance

//QA
// export const URL = `http://10.198.73.15`;

//Aldrin
export const URL = 'http://10.198.68.21';

//Dimas
//export const URL = 'http://192.168.253.27';

//export const URL = 'http://localhost';

export const Port = '5051';
export const PortFiles = '6060';
export const PortSocket = '777';

const configAxios: AxiosRequestConfig = {
	baseURL: `${URL}:${Port}`,
	headers: { common: { token: localStorage.getItem('token') } },
};

const configAxiosFiles: AxiosRequestConfig = {
	baseURL: `${URL}:${PortFiles}`,
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

const cache = new LRU({ max: 10 });

configure({ axios, cache });

export default axios;
