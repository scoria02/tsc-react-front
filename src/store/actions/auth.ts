import Swal from 'sweetalert2';

import { AxiosResponse } from 'axios';
import useAxios from '../../config';
import { StartLoading } from './ui';
import { ActionType } from '../types/types';

export const startLogin = (email: any, password: any) => {
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<{ message: string; info: any; token: string }> = await useAxios.post(
				`/auth/login`,
				{
					email,
					password,
				}
			);
			localStorage.setItem('token', res.data.token);
			Swal.fire('Success', res.data.message, 'success');
			dispatch(StartLoading());
			dispatch(requestSuccess(res.data.info));
		} catch (error) {
			console.log(error);
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

export const refreshLogin = () => {
	return async (dispatch: any) => {
		try {
			const res: any = await useAxios.get(`/worker`);
			localStorage.setItem('token', res.data.token);
			dispatch(StartLoading());
			console.log(res);
			dispatch(requestSuccess(res.data.info));
		} catch (error) {
			console.log(error);
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
		} catch (error) {
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
		} catch (error) {
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
	console.log(identDoc);
	return async (dispatch: any) => {
		try {
			await useAxios.post('/auth/register/valid/2', identDoc);
			dispatch(validationIdentDocSuccess());
		} catch (error) {
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
