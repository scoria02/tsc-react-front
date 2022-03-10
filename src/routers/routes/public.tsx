import Login from 'components/auth/login';
import Register from 'components/auth/register';
import { Route } from '.';
import { urlLogin, urlRegister } from '../url';

const Public: Route[] = [
	{
		path: urlLogin,
		component: Login,
		meta: { auth: false },
	},
	{
		path: urlRegister,
		component: Register,
		meta: { auth: false },
	},
];

export default Public;
