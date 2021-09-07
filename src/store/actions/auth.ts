import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../../config';
import { ActionType } from '../types/types';
import { StartLoading } from './ui';

//import { showAlertAction, hiddenAlertAction } from './alert';

export const startLogin = (email: any, password: any) => {
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/auth/login`, {
				email,
				password,
			});
			Swal.fire('Success', res.data.message, 'success');
			dispatch(StartLoading());
			dispatch(requestSuccess(res.data.info));
		} catch (error: any) {
			console.log('error', error);
			Swal.fire('Error', error.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		console.log('state', state);

		return {
			type: ActionType.login,
			payload: state,
		};
	}
};

export const refreshLogin = () => {
	return async (dispatch: any) => {
		try {
			const res: any = console.clear();
			console.log('res', res);

			//localStorage.setItem('token', res.data.info.token);
			// dispatch(StartLoading());
			// console.log(res);
			// dispatch(requestSuccess(res.data.info));
		} catch (error: any) {
			console.log('error', error);

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

export const registerUser = (user: any) => {
	return async (dispatch: any) => {
		try {
			const res = await useAxios.post('/auth/register', user);
			dispatch(requestSuccess(res));
			const { email, password } = user;
			dispatch(startLogin(email, password));
		} catch (error: any) {
			console.log(error);
			dispatch(requestFailure());
			Swal.fire('Error', error.response.data.message, 'error');
		}
		function requestSuccess(state: any) {
			return {
				type: ActionType.registerUser,
				payload: state,
			};
		}
		function requestFailure() {
			return {
				type: ActionType.registerUserError,
			};
		}
	};
};

export const validationEmail = (email: string) => {
	return async (dispatch: any) => {
		try {
			await useAxios.post('/auth/register/valid/1', { email });
			dispatch(validationEmailSuccess());
		} catch (error: any) {
			console.log(error);
			dispatch(validationEmailError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
		function validationEmailSuccess() {
			return {
				type: ActionType.registerEmail,
			};
		}
		function validationEmailError() {
			return {
				type: ActionType.registerEmailError,
			};
		}
	};
};

export const validationIdentDoc = (identDoc: any) => {
	// console.log(identDoc);
	return async (dispatch: any) => {
		try {
			await useAxios.post('/auth/register/valid/2', identDoc);
			dispatch(validationIdentDocSuccess());
		} catch (error: any) {
			console.log(error);
			dispatch(validationIdentDocError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
		function validationIdentDocSuccess() {
			return {
				type: ActionType.registerDocIdent,
			};
		}
		function validationIdentDocError() {
			return {
				type: ActionType.registerDocIdentError,
			};
		}
	};
};
