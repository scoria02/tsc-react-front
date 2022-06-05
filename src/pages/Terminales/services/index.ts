import { AxiosResponse } from 'axios';
import useAxios from 'config/index';
import Swal from 'sweetalert2';

export const activacion = {
	getAllListTerminals,
	getAllListCommerces,
	saveStatusTerminal,
};

export async function getAllListTerminals() {
	try {
		const res: AxiosResponse<any> = await useAxios.get(`/activacion/tms7/terminals`);
		return {
			ok: true,
			terminals: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function getAllListCommerces() {
	try {
		const res: AxiosResponse<any> = await useAxios.get(`/activacion/tms7/commerces`);
		return {
			ok: true,
			commerces: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function saveStatusTerminal(terminalId: string, status: number) {
	try {
		const res: AxiosResponse<any> = await useAxios.put(`/activacion/tms7/terminal`, { terminalId, status });
		console.log(res);
		return {
			ok: true,
			//terminals: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}
