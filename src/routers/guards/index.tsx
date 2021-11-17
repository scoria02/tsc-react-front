import { GuardFunction } from 'react-router-guards';
import axios from '../../config';
import { baseUrl, urlLogin } from '../url';

export const Auth: GuardFunction = (to, from, next) => {
	if (to.meta.auth) {
		if (localStorage.getItem('token') !== null) {
			next();
		} else {
			next.redirect(urlLogin);
		}
	} else {
		if (localStorage.getItem('token') !== null) {
			next.redirect(baseUrl);
		} else {
			next();
			// next.redirect(urlLogin);
		}
	}
};

export const PrivGuard: GuardFunction = async (to, from, next) => {
	const resp = await axios.get('/worker');
	const userRol = resp.data.info.roles;
	console.clear();
	// console.log('worker', resp);
	// console.log('entre a privGuard');
	// console.log('userData', resp.data.info);
	// console.log('to', to);
	// console.log('from', from?.match.path);
	next();
};
