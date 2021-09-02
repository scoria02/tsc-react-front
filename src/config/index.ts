import axios from 'axios';

// Set config defaults when creating the instance

const useAxios = axios.create({
	baseURL: 'http://localhost:5051',
	headers: { common: { token: localStorage.getItem('token') } },
});
axios.defaults.headers['Content-Type'] = 'application/json';

export default useAxios;
