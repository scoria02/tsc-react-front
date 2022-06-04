import { AxiosResponse } from 'axios';
import useAxios from 'config';
import Swal from 'sweetalert2';
import { handleSucessTime } from 'utils/handleSwal';

export const getFM_solic = async (id: number) => {
	try {
		const res: AxiosResponse<any> = await useAxios.get(`/FM/${id}`);
		const dataFm = res.data.info;
		//console.log('fm gettt', dataFm);
		handleSucessTime(dataFm.code);
		return {
			ok: true,
			fm: res.data.info,
		};
	} catch (error: any) {
		Swal.fire('Error', error.response.data.message, 'error');
		return {
			ok: false,
			err: error,
		};
	}
};
