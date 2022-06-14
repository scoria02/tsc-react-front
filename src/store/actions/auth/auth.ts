import { AxiosResponse } from 'axios';
import useAxios from 'config';
import { baseUrl, urlLogin } from 'routers/url';
import Swal from 'sweetalert2';
import { ActionType } from '../../types/types';
import { StartLoading } from '../ui';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const startLogout = () => ({
	type: ActionType.logout,
});

export const startLogin = (email: any, password: any, history?: any) => {
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/auth/login`, {
				email,
				password,
			});
			//updateToken(res);
			//console.log('login', res.data.info);
			const user = res.data.info;
			dispatch(requestSuccess(user));
			history?.push(baseUrl);
			dispatch(StartLoading());
			Swal.fire({
				icon: 'success',
				title: '¡Éxito!',
				html: `<p>Bienvenido <b>${user.data.name} ${user.data.last_name}</b></p>`,
				showConfirmButton: false,
				timer: 2500,
			});
		} catch (error: any) {
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
			//console.log('refresh', res.data.info);
			dispatch(requestSuccess(res.data.info));
			dispatch(StartLoading());
		} catch (error: any) {
			localStorage.clear();
			if (error.response.data.code === 401) {
				//Error de que algo cambio en el usuario
				Swal.fire({
					icon: 'info', //'error',
					title: 'Vuelva a iniciar sesión',
					confirmButtonText: 'Ok',
					allowOutsideClick: false,
					allowEscapeKey: false,
					//timer: 3000,
				}).then((confirm) => {
					if (confirm.isConfirmed) {
						dispatch(startLogout());
						window.location.replace(urlLogin);
					}
				});
			} else {
				//Error de exp token
				Swal.fire({
					icon: 'info',
					title: 'Sesión expirada',
					html: '<p>Vuelva a iniciar sesión</p>',
					showConfirmButton: false,
					timer: 2000,
				});
				//Swal.fire('Error', 'Sesión expirada, vuelva a iniciar sesión', 'error');
				dispatch(startLogout());
				window.location.replace(urlLogin);
			}
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.refreshUser,
			payload: state,
		};
	}
};

export const registerUser = (user: any, history?: any) => {
	return async (dispatch: any) => {
		const newUser = {
			email: user.email.trim(),
			password: user.password,
			confirmPassword: user.confirmPassword,
			name: user.name.trim(),
			last_name: user.last_name.trim(),
			id_ident_type: user.id_ident_type,
			ident_num: user.ident_num,
			phone: user.code + user.phone,
			id_company: user.id_company,
		};
		try {
			const res = await useAxios.post('/auth/register', newUser);
			updateToken(res);
			dispatch(requestSuccess(res.data.info));
			//dispatch(StartLoading());
			history?.push(baseUrl);
			Swal.fire({
				icon: 'success',
				title: 'Usuario Registrado con exito',
				//html: `<p>${res.data.message}</p>`,
				showConfirmButton: false,
				timer: 2500,
			});
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
