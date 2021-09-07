import axios from 'axios';

// Set config defaults when creating the instance

//const urlLocal = 'http://localhost';
const URL = 'http://10.198.68.21';
const Port = '5051';

const useAxios = axios.create({
	baseURL: `${URL}:${Port}`,
	headers: { common: { token: localStorage.getItem('token') } },
	transformResponse(data) {
		if (data.info.token) {
			localStorage.removeItem('token');
			localStorage.setItem('token', data.info.token);
		}

		return data;
	},
});
axios.defaults.headers['Content-Type'] = 'application/json';

export default useAxios;
