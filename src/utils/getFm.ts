import { AxiosResponse } from 'axios';
import useAxios from 'config';
import Swal from 'sweetalert2';

export const getFM = async (id: number) => {
	try {
		const res: AxiosResponse<any> = await useAxios.get(`/FM/${id}`);
		const dataFm = res.data.info;
		Swal.close();
		return {
			ok: true,
			fm: dataFm,
		};
	} catch (error: any) {
		Swal.fire('Error', error.response.data.message, 'error');
		return {
			ok: false,
			err: error,
		};
	}
};
