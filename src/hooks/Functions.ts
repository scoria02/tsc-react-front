// File to add reutilizable functions
import { urlPrivate, urlPublic } from 'routers/url';

export const isPrivate = () => {
	const is = urlPrivate.findIndex((val) => {
		return val === window.location.pathname;
	});
	return is !== -1;
};

export const existRoutePublic = () => {
	const is = urlPublic.findIndex((val) => {
		return val === window.location.pathname;
	});
	return is !== -1;
};
