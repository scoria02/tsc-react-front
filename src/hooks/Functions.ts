// File to add reutilizable functions
import { urlPrivate } from 'routers/url';

export const isPrivate = () => {
	const is = urlPrivate.findIndex((val) => {
		return val === window.location.pathname;
	});
	return is !== -1;
};
