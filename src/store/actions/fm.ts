import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../../config';
import { ActionType } from '../types/types';
import { StartLoading } from './ui';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const sendImages = (email: any, password: any) => {
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/auth/login`, {
				email,
				password,
			});
			localStorage.setItem('token', res.data.token);
			Swal.fire('Success', res.data.message, 'success');
			dispatch(StartLoading());
			dispatch(requestSuccess(res.data.info.data));
		} catch (error) {
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.login,
			payload: state,
		};
	}
};

