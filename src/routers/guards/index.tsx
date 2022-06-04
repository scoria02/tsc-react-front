import { GuardFunction } from 'react-router-guards';
import { GuardFunctionRouteProps, GuardToRoute, Next } from 'react-router-guards/dist/types';
import { baseUrl, urlLogin, urlRestorePassword } from '../url';

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
			if (to.match.path === urlRestorePassword) {
				next.props({ token: to.location.search });
			}
			next();
			// next.redirect(urlLogin);
		}
	}
};

export const PrivGuard: any = (to: GuardToRoute, from: GuardFunctionRouteProps, next: Next, user: any) => {
	const { id_rol, views, id_department } = user;
	console.log(to.location.pathname.split('/')[1]);
	let isWorker = id_rol;
	let userDep = views[to.location.pathname.split('/')[1]];
	//let userDep = to.meta.dep.find((department: any) => department === id_department.name);

	//Solo para God
	if (id_department === 8) {
		next.props({ isWorker: false });
	}

	if (userDep) {
		// console.log('Tiene acceso worker', to.location.pathname.split('/')[1]);
		next.props({ isWorker });
	} else {
		// console.log('reditrec to', from.match.path);
		next.redirect(from.match.path);
	}
};
