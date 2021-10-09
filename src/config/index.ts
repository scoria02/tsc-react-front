import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';

// Set config defaults when creating the instance

export const URL = 'http://localhost';
//export const ioURL = 'ws://localhost';

//QA
//export const URL = `http://10.198.73.15`;
//export const ioURL = 'ws://10.198.73.15';

<<<<<<< HEAD
<<<<<<< HEAD
//export const URL = 'http://10.198.68.21';
export const ioURL = 'ws://10.198.68.21';
=======
// export const URL = 'http://10.198.68.21';
// export const ioURL = 'ws://10.198.68.21';

export const URL = 'http://localhost';
export const ioURL = 'ws://localhost';
>>>>>>> 2ae35deaff06318841878ee3af8a201f0c95df06
=======
//Aldrin
export const URL = 'http://10.198.68.21';
export const ioURL = 'ws://10.198.68.21';

//export const URL = 'http://localhost';
//export const ioURL = 'ws://localhost';
>>>>>>> 8d6d2de304060d849973bc1fe477660cb72930fa

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
