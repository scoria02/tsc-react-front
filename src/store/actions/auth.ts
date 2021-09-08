import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../../config';
import { ActionType } from '../types/types';
import { StartLoading } from './ui';

export const startLogin = (email: any, password: any) => {
	return async (dispatch: any) => {
		try {
<<<<<<< HEAD
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
=======
			const res: AxiosResponse<any> = await useAxios.post(`/auth/login`, {
				email,
				password,
			});
			localStorage.setItem('token', res.data.token);
			Swal.fire('Success', res.data.message, 'success');
			dispatch(StartLoading());
			dispatch(requestSuccess(res.data.info.data));
		} catch (error: any) {
			console.log('error', error);
			Swal.fire('Error', error.message, 'error');
>>>>>>> 7491c51decac3d499afd754fb16cc1ae48393371
		}
	};
	function requestSuccess(state: any) {
		// console.log('state', state);

		return {
			type: ActionType.login,
			payload: state,
		};
	}
};

export const refreshLogin = () => {
	return async (dispatch: any) => {
		try {
<<<<<<< HEAD
			const res: any = await useAxios.get(`/worker`);
			localStorage.setItem('token', res.data.token);
			dispatch(StartLoading());
			console.log(res);
			dispatch(requestSuccess(res.data.info));
		} catch (error) {
			console.log(error);
=======
			const res = await useAxios.get('/worker');
			console.log('res', res);

			localStorage.setItem('token', res.data.token);
			dispatch(StartLoading());
			dispatch(requestSuccess(res.data.info));
		} catch (error: any) {
			console.log('error', error);

>>>>>>> 7491c51decac3d499afd754fb16cc1ae48393371
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		return {
<<<<<<< HEAD
			type: ActionType.login,
=======
			type: ActionType.refreshUser,
>>>>>>> 7491c51decac3d499afd754fb16cc1ae48393371
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
<<<<<<< HEAD
		} catch (error) {
=======
		} catch (error: any) {
>>>>>>> 7491c51decac3d499afd754fb16cc1ae48393371
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
<<<<<<< HEAD
		} catch (error) {
=======
		} catch (error: any) {
>>>>>>> 7491c51decac3d499afd754fb16cc1ae48393371
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
<<<<<<< HEAD
	console.log(identDoc);
=======
	// console.log(identDoc);
>>>>>>> 7491c51decac3d499afd754fb16cc1ae48393371
	return async (dispatch: any) => {
		try {
			await useAxios.post('/auth/register/valid/2', identDoc);
			dispatch(validationIdentDocSuccess());
<<<<<<< HEAD
		} catch (error) {
=======
		} catch (error: any) {
>>>>>>> 7491c51decac3d499afd754fb16cc1ae48393371
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
