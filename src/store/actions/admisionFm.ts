import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../../config/index';
import { ActionType } from '../types/types';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const getDataFM = () => {
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.get(`/FM`);
			//localStorage.setItem('token', res.data.token);
			//console.log(res.data.info)
			dispatch(requestSuccess(res.data.info));
		} catch (error) {
			//console.log(error.reponse)
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.getDataFM,
			payload: state,
		};
	}
	function requestError() {
		return {
			type: ActionType.getDataFMError,
		};
	}
};

export const cleanAdmisionFM = () => {
	return async (dispatch: any) => {
		dispatch(request());
	};
	function request() {
		return {
			type: ActionType.cleanDataFM,
		};
	}
};
