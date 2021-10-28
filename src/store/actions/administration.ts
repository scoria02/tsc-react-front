import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../../config/index';
import { ActionType } from '../types/types';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const getDataFMAdministration = () => {
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.get(`/FM/administration`);
			updateToken(res);
			dispatch(requestSuccess(res.data.info));
		} catch (error) {
			dispatch(requestError());
			//Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.getDataFMAdministration,
			payload: state,
		};
	}
	function requestError() {
		return {
			type: ActionType.getDataFMErrorAdministration,
		};
	}
};

export const updateStatusFMAdministration = (id_fm: number, id_statusFMAd: number, newP: any) => {
	const data = {
		...newP,
		id_status_request: id_statusFMAd,
	}
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.put(`/FM/administration/${id_fm}/status`, data);
			console.log(res)
			//updateToken(res);
			dispatch(requestSuccess(id_statusFMAd));
		} catch (error) {
			console.log(error.response)
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(status: number) {
		return {
			type: ActionType.updateStatusFMAdministration,
			payload: status
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
}
