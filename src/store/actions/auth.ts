import Swal from 'sweetalert2';

import { AxiosResponse } from 'axios';
import useAxios from '../../config';
import { StartLoading } from './ui';
import { ActionType } from '../types/types';

import { showAlertAction, hiddenAlertAction } from './alert';

export const startLogin = (email: any, password: any) => {
	return async (dispatch: any) => {
			try {
				const resp: AxiosResponse<{ message: string; info: any }> = await useAxios.post(`/auth/login`, {
					email,
				password,
				});
				localStorage.setItem('token', resp.data.info.token);
				Swal.fire('Success', resp.data.message, 'success');
				dispatch(StartLoading());
			} catch (error) {
				console.log(error);
				Swal.fire('Error', error.response.data.message, 'error');

				//dispatch(showAlertAction(error.response.data.message));
			}
	};

	function request() {
		return {
			type: ActionType.login,
		};
	};

	function requestSuccess(state: any) {
	};

	function requestError(state: any) {
	};
};
