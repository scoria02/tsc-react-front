import { GuardFunction } from 'react-router-guards';
import { baseUrl, urlLogin } from '../url';

export const Auth: GuardFunction = (to, from, next) => {
	if (to.meta.auth) {
		localStorage.getItem('token') !== null ? next() : next.redirect(urlLogin);
	} else {
		if (localStorage.getItem('token') !== null) {
			next.redirect(baseUrl);
		} else {
			next();
			// next.redirect(urlLogin);
		}
	}
};

export const PrivGuard: GuardFunction = (to, from, next) => {
	if (to.meta.dep && localStorage.getItem('token')) {
		console.log('entre a priv true');
		next();
	} else {
		console.log('entre a priv false');
		next();
	}
};
