import { AxiosResponse } from 'axios';
import useAxios from 'config/index';
import Swal from 'sweetalert2';

export const fms = {
	getAllListFms,
};

export async function getAllListFms() {
	try {
		const res: AxiosResponse<any> = await useAxios.get(`/FM`);
		return {
			ok: true,
			solicitudes: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}
