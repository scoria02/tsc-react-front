import { Route } from '.';
import Admision from '../../components/Admision';
import { FormMaldito } from '../../components/formMaldito';
import Administracion from '../../pages/Administracion';
import Cobranza from '../../pages/Cobranza';
import GestionUsuarios from '../../pages/GestionUsuarios';
import Inicio from '../../pages/Home';
import { baseUrl, urlAdministracion, urlAdmision, urlCobr, urlFM, userAdmin } from '../url';

const Private: Route[] = [
	{
		path: baseUrl,
		component: Inicio,
		meta: {
			auth: true,
			dep: 'all',
		},
	},
	{
		path: urlCobr,
		component: Cobranza,
		meta: {
			auth: true,
			dep: 'admin',
		},
	},
	{
		path: urlAdministracion,
		component: Administracion,
		meta: {
			auth: true,
			dep: 'admin',
		},
	},
	{
		path: urlAdmision,
		component: Admision,
		meta: {
			auth: true,
			dep: 'adm',
		},
	},
	{
		path: urlFM,
		component: FormMaldito,
		meta: {
			auth: true,
			dep: 'adm',
		},
	},
	{
		path: userAdmin,
		component: GestionUsuarios,
		meta: {
			auth: true,
			dep: 'sec',
		},
	},
];

export default Private;
