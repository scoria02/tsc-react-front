import Login from 'components/auth/login';
import NewPassword from 'components/auth/NewPassword';
import Register from 'components/auth/register';
import RestorePassword from 'components/auth/RestorePassword';
import { Route } from '.';
import { urlLogin, urlNewPassword, urlRegister, urlRestorePassword } from '../url';

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
	{
		path: urlNewPassword,
		component: NewPassword,
		meta: { auth: false },
	},
	{
		path: urlRestorePassword,
		component: RestorePassword,
		meta: { auth: false },
	},
];

export default Public;
