import Admision from 'components/Admision';
import { FormMaldito } from 'components/formMaldito';
import Administracion from 'pages/Administracion';
import Cobranza from 'pages/Cobranza';
import GestionUsuarios from 'pages/GestionUsuarios';
import Inicio from 'pages/Home';
import { Route } from '.';
import { baseUrl, urlAdministracion, urlAdmision, urlCobr, urlFM, userAdmin } from '../url';

const Private: Route[] = [
	{
		path: baseUrl,
		component: Inicio,
		meta: {
			auth: true,
			dep: ['Free'],
			rol: [1, 2, 3, 4],
		},
	},
	{
		path: userAdmin,
		component: GestionUsuarios,
		meta: {
			auth: true,
			dep: ['Seguridad'],
			rol: [4],
		},
	},
	{
		path: urlFM,
		component: FormMaldito,
		meta: {
			auth: true,
			dep: ['Admision', 'Canales', 'Fuerza de Venta'],
			rol: [1, 2, 3, 4],
		},
	},
	{
		path: urlAdmision,
		component: Admision,
		meta: {
			auth: true,
			dep: ['Admision'],
			rol: [1, 2, 3, 4],
		},
	},
	{
		path: urlCobr,
		component: Cobranza,
		meta: {
			auth: true,
			dep: ['Cobranza'],
			rol: [1, 2, 3, 4],
		},
	},
	{
		path: urlAdministracion,
		component: Administracion,
		meta: {
			auth: true,
			dep: ['Administracion'],
			rol: [1, 2, 3, 4],
		},
	},
];

export default Private;
