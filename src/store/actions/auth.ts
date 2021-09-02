import Swal from 'sweetalert2';

import { AxiosResponse } from 'axios';
import useAxios from '../../config';
import { StartLoading } from './ui';
// import { ActionType } from '../types/types';

export const startLogin = (email: any, password: any) => {
	return async (dispatch: any) => {
		const resp: AxiosResponse<{ message: string; info: any }> = await useAxios.post(`/auth/login`, {
			email,
			password,
		});
		try {
			localStorage.setItem('token', resp.data.info.token);
			Swal.fire('Success', resp.data.message, 'success');
			console.log(resp);
			dispatch(StartLoading());
		} catch (error) {
			console.log(error);
			Swal.fire('Error', resp.data.message, 'error');
		}
	};
};

// // export const login = (uid, displayName) => ({
// // 	type: types.login,
// // 	payload: {
// // 		uid,
// // 		displayName,
// // 	},
// // });

// // export const startLogout = () => {
// // 	return async (dispatch) => {
// // 		// await firebase.auth().signOut();

// // 		dispatch(logout());
// // 		dispatch(noteLogout());
// // 	};
// // };

// // export const logout = () => ({
// // 	type: types.logout,
// // });

// export const startChecking = () => {
//     return async(dispatch:any) => {

//         const resp: AxiosResponse<{ message: string; info: any }> = await useAxios.post(`/auth/login`, {
// 			email,
// 			password,
// 		});
// 		try {
// 			localStorage.setItem('token', resp.data.info.token);
// 			Swal.fire('Success', resp.data.message, 'success');
// 			console.log(resp.data.message);
// 		} catch (error) {
// 			console.log(error);
// 			Swal.fire('Error', resp.data.message, 'error');
// 		}
// 		dispatch( checkingFinish() );
//     }
// }

// const checkingFinish = () => ({ type: ActionType.authCheckingFinish });
