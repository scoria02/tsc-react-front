import Login from 'pages/Auth/components/login';
import NewPassword from 'pages/Auth/components/NewPassword';
import Register from 'pages/Auth/components/register';
import RestorePassword from 'pages/Auth/components/RestorePassword';
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
