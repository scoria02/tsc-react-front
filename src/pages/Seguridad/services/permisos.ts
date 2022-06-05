import { AxiosResponse } from 'axios';
import useAxios from 'config/index';
import Swal from 'sweetalert2';
import { multiGetterAxios } from 'utils/multiGetterAxios';

export const editPermisos = {
	getAllListSeguridad,
	getAllListPermiss,
	savePermiss,
	getAllListViews,
	saveViews,
};

export async function getAllListSeguridad() {
	try {
		const routes = [
			`seguridad/departments`,
			`seguridad/roles`,
			//`seguridad/views`,
			//`seguridad/permisos`,
		];

		return multiGetterAxios(routes)
			.then((responses) => {
				return {
					ok: true,
					departments: responses[0].data.info,
					roles: responses[1].data.info,
				};
			})
			.catch((errors) => {
				console.log('error multi axos', errors);
				return {
					ok: false,
				};
			});
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
		};
	}
}

export async function getAllListPermiss(dep: number, rol: number) {
	try {
		const res: AxiosResponse<any> = await useAxios.get(`/seguridad/permissions/${dep}/${rol}`);
		return {
			ok: true,
			permiss: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function savePermiss(dep: number, rol: number, permiss: any[]) {
	try {
		const res: AxiosResponse<any> = await useAxios.post(`/seguridad/permissions/${dep}/${rol}`, permiss);
		return {
			ok: true,
			permiss: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function getAllListViews(dep: number) {
	try {
		const res: AxiosResponse<any> = await useAxios.get(`/seguridad/views/${dep}`);
		return {
			ok: true,
			permiss: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function saveViews(dep: number, views: any[]) {
	try {
		const res: AxiosResponse<any> = await useAxios.post(`/seguridad/views/${dep}`, views);
		return {
			ok: true,
			permiss: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}
