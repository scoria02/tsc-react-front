import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../../config';
import { urlLogin } from '../../routers/url';
import { ActionType } from '../types/types';
import { StartLoading } from './ui';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const startLogin = (email: any, password: any) => {
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/auth/login`, {
				email,
				password,
			});
			updateToken(res);
			Swal.fire('Success', res.data.message, 'success');
			dispatch(StartLoading());
			dispatch(requestSuccess(res.data.info.data));
		} catch (error) {
			Swal.fire('Error', error.response.data.message, 'error');
			dispatch(requestError());
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.login,
			payload: state,
		};
	}
	function requestError() {
		return {
			type: ActionType.loginError,
		};
	}
};

export const refreshLogin = () => {
	return async (dispatch: any) => {
		try {
			const res = await useAxios.get('/worker');
			updateToken(res);
			dispatch(StartLoading());
			dispatch(requestSuccess(res.data.info));
		} catch (error: any) {
			console.log('borrar');
			localStorage.clear();
			Swal.fire('Error', 'Sesión expirada, vuelva a iniciar sesión', 'error').then((result) => {
				if (result.isConfirmed) {
					window.location.replace(urlLogin);
				} else window.location.replace(urlLogin);
			});
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.refreshUser,
			payload: state,
		};
	}
};

export const registerUser = (user: any) => {
	return async (dispatch: any) => {
		const newUser = {
			email: user.email,
			password: user.password,
			confirmPassword: user.confirmPassword,
			name: user.name,
			last_name: user.last_name,
			id_ident_type: user.id_ident_type,
			ident_num: user.ident_num,
			phone: user.code + user.phone,
			id_company: user.id_company,
			id_department: user.id_department,
		};
		try {
			const res = await useAxios.post('/auth/register', newUser);
			updateToken(res);
			Swal.fire('Success', res.data.message, 'success');
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
			const res = await useAxios.post('/auth/register/valid/1', { email });
			updateToken(res);
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
