import useAxios from 'config/index';
import Swal from 'sweetalert2';
import { handleVerificado } from 'utils/handleSwal';
import { ActionType } from '../../types/types';

export const updateStatusFMAdministration = (id_fm: number, id_statusFMAd: number, newP: any, file: any) => {
	const data = {
		...newP,
		id_status_request: id_statusFMAd,
	};
	console.log(data, file);
	return async (dispatch: any) => {
		const formData: FormData = new FormData();
		formData.append('dataPago', JSON.stringify(data));
		if (file !== null) {
			formData.append('imagen', file);
		}
		try {
			await useAxios.put(`/FM/administration/${id_fm}/status`, formData);
			handleVerificado();
			dispatch(requestSuccess(id_statusFMAd));
		} catch (error: any) {
			console.log(error.response);
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(status: number) {
		return {
			type: ActionType.updateStatusFMAdministration,
			payload: status,
		};
	}
	function requestError() {
		return {
			type: ActionType.updateStatusFMErrorAdministration,
		};
	}
};

export const cleanAdmisionFMAdministration = () => {
	return async (dispatch: any) => {
		dispatch(request());
	};
	function request() {
		return {
			type: ActionType.cleanDataFMAdministration,
		};
	}
};
