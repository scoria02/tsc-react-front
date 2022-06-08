import { Route } from '.';
import Inicio from 'pages/Home';
import Admision from 'pages/Admision';
import FormMaldito from 'pages/FormularioM';
import Administracion from 'pages/Administracion/Administracion';
import Cobranza from 'pages/Cobranza';
import UpdataData from 'components/updateData';
import Terminales from 'pages/Terminales';
import Seguridad from 'pages/Seguridad';
import {
	baseUrl,
	urlAdministracion,
	urlAdmision,
	urlCobr,
	urlFM,
	urlTerminales,
	urlUpdateCommerce,
	urlSeguridad,
	urlSolicitudes,
} from '../url';
import FMS from 'pages/FMs';

const Private: Route[] = [
	{
		path: baseUrl,
		component: Inicio,
		meta: {
			auth: true,
		},
	},
	{
		path: urlSeguridad,
		component: Seguridad,
		meta: {
			auth: true,
		},
	},
	{
		path: urlSolicitudes,
		component: FMS,
		meta: {
			auth: true,
		},
	},
	{
		path: urlFM,
		component: FormMaldito,
		meta: {
			auth: true,
		},
	},
	{
		path: urlAdmision,
		component: Admision,
		meta: {
			auth: true,
		},
	},
	{
		path: urlCobr,
		component: Cobranza,
		meta: {
			auth: true,
		},
	},
	{
		path: urlAdministracion,
		component: Administracion,
		meta: {
			auth: true,
		},
	},
	{
		path: urlTerminales,
		component: Terminales,
		meta: {
			auth: true,
		},
	},
	{
		path: urlUpdateCommerce,
		component: UpdataData,
		meta: {
			auth: true,
		},
	},
];

export default Private;
