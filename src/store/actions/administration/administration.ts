import { AxiosResponse } from 'axios';
import useAxios from 'config/index';
import Swal from 'sweetalert2';
import { ActionType } from '../../types/types';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const updateStatusFMAdministration = (id_fm: number, id_statusFMAd: number, newP: any) => {
	const data = {
		...newP,
		id_status_request: id_statusFMAd,
	};
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.put(`/FM/administration/${id_fm}/status`, data);
			updateToken(res);
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
