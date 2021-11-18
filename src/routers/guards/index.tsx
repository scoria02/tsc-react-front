import { GuardFunction } from 'react-router-guards';
import { GuardFunctionRouteProps, GuardToRoute, Next } from 'react-router-guards/dist/types';
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

export const PrivGuard: any = (to: GuardToRoute, from: GuardFunctionRouteProps | null, next: Next, user: any) => {
	next();
	// try {
	// 	console.clear();
	// 	console.log('userRol', userRol);
	// 	console.log('worker', resp);
	// 	console.log('entre a privGuard');
	// 	console.log('userData', resp.data.info);
	// 	console.log('to', to);
	// 	console.log('from', from?.match.path);
	// } catch (error) {
	// 	next.redirect(urlLogin);
	// }
};
