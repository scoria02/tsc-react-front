import Axios, { AxiosRequestConfig } from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';

// Set config defaults when creating the instance

//const urlLocal = 'http://localhost';
//const URL = 'http://localhost';
const URL = 'http://10.198.68.21';
const Port = '5051';

const configAxios: AxiosRequestConfig = {
	baseURL: `${URL}:${Port}`,
	headers: { common: { token: localStorage.getItem('token') } },
	// transformResponse: (data: any) => {
	// 	const data_json = JSON.parse(data);

	// 	console.log('data_json', data_json);

	// 	if (data_json.token) {
	// 		if (localStorage.getItem('token') === null) localStorage.removeItem('token');
	// 		localStorage.setItem('token', data_json.token);
	// 	}

	// 	return data_json;
	// },
};

Axios.defaults.headers['Content-Type'] = 'application/json';

const axios = Axios.create(configAxios);

const cache = new LRU({ max: 10 });

configure({ axios, cache });

export default axios;
