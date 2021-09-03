import Swal from 'sweetalert2';

import { AxiosResponse } from 'axios';
import useAxios from '../../config';
import { StartLoading } from './ui';
import { ActionType } from '../types/types';

//import { showAlertAction, hiddenAlertAction } from './alert';

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
			}
	};
};

export const validationEmail  = (email: string) => {
	return async (dispatch: any) => {
		try {
			await useAxios.post('/auth/register/valid/1', { email });
			dispatch(validationEmailSuccess())
		}catch (error) {
			console.log(error);
			dispatch(validationEmailError())
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
	}
}

export const validationIdentDoc = (identDoc: any) => {
	console.log(identDoc)
	return async (dispatch: any) => {
		try {
			await useAxios.post('/auth/register/valid/2', identDoc);
			dispatch(validationIdentDocSuccess())
		}catch (error) {
			console.log(error);
			dispatch(validationIdentDocError())
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
	}
}

export const registerUser = (user: any) => {
	console.log(user)
	return async (dispatch: any) => {
		try {
			const res = await useAxios.post('/auth/register', user);
			dispatch(requestSuccess(res));
		}catch (error) {
			console.log(error);
			dispatch(requestFailure())
			Swal.fire('Error', error.response.data.message, 'error');
		}
		function requestSuccess(state: any) {
			return {
				type: ActionType.registerUser,
				payload: state
			};
		}
		function requestFailure() {
			return {
				type: ActionType.registerUserError,
			};
		}
	}
}
