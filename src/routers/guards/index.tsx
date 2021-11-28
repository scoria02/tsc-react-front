import { GuardFunction } from 'react-router-guards';
import { GuardFunctionRouteProps, GuardToRoute, Next } from 'react-router-guards/dist/types';
import { baseUrl, urlAdministracion, urlAdmision, urlCobr, urlFM, urlLogin, userAdmin } from '../url';

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

export const PrivGuard: any = (to: GuardToRoute, from: GuardFunctionRouteProps, next: Next, user: any) => {
	const { roles, id_department } = user;
	let isWorker = roles.find((rol: any) => rol.name === 'worker') !== undefined;
	let userDep = to.meta.dep.find((department: any) => department === id_department.name);

	if (id_department.name === 'Presidencia' || id_department.name === 'God') {
		next.props({ isWorker: false });
	}

	switch (to.match.path) {
		case baseUrl:
			next();
			break;
		case urlFM:
			next();
			break;
		case urlAdmision:
			if (userDep) {
				next.props({ isWorker });
			} else {
				next.redirect(from.match.path);
			}
			break;
		case urlAdministracion:
			if (userDep) {
				next.props({ isWorker });
			} else {
				next.redirect(from.match.path);
			}
			break;
		case urlCobr:
			if (userDep) {
				next.props({ isWorker });
			} else {
				next.redirect(from.match.path);
			}
			break;
		case userAdmin:
			if (userDep) {
				next.props({ isWorker });
			} else {
				next.redirect(from.match.path);
			}
			break;
		default:
			next.redirect(baseUrl);
			break;
	}
};
