/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import useAxios, { axiosFiles } from '../../config/index';
import { ActionType } from '../types/types';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const validationClient = (client: any) => {
	//console.log(client)
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM/client/valid`, client);
			updateToken(res);
			dispatch(requestSuccess(res.data.info));
			//console.log(res.data)
		} catch (error) {
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
			console.log(error.response.data.message);
		}
	};
	function requestSuccess(state: boolean) {
		return {
			type: ActionType.validClient,
			payload: state,
		};
	}
	function requestError() {
		return {
			type: ActionType.validClientError,
		};
	}
};

export const validationNumBank = (clientBank: any) => {
	//console.log(clientBank)
	return async (dispatch: any) => {
		try {
			const res = await useAxios.post(`/FM/bank/valid`, clientBank);
			updateToken(res)
			dispatch(requestSuccess());
		} catch (error) {
			//console.log(error.response);
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess() {
		return {
			type: ActionType.validNumBank,
		};
	}
	function requestError() {
		return {
			type: ActionType.validNumBankError,
		};
	}
};

export const sendClient = (client: any) => {
	//console.log(client)
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM/client`, client);
			updateToken(res)
			dispatch(requestSuccess(res.data.info.id));
		} catch (error) {
			//console.log(error.reponse)
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.sendClient,
			payload: state,
		};
	}
	function requestError() {
		return {
			type: ActionType.sendClientError,
		};
	}
};

export const sendCommerce = (id_client: number, commerce: any) => {
	console.log('Client', id_client, 'Comercio', commerce);
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM/${id_client}/commerce`, commerce);
			updateToken(res)
			dispatch(requestSuccess(res.data.info.id_commerce));
		} catch (error) {
			console.log(error.reponse);
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.sendCommerce,
			payload: state,
		};
	}
	function requestError() {
		return {
			type: ActionType.sendCommerceError,
		};
	}
};

export const sendImages = (formData: any) => {
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await axiosFiles.post(`/1000pagosRC/RC`, formData);
			updateToken(res)
			let images: any = res.data.info;
			dispatch(requestSuccess(images));
		} catch (error) {
			console.log(error.reponse);
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.sendImages,
			payload: state,
		};
	}
	function requestError() {
		return {
			type: ActionType.sendImagesError,
		};
	}
};

export const sendFM = (formM: any) => {
	console.log('SendFM', formM);
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM`, formM);
			updateToken(res)
			dispatch(requestSuccess());
		} catch (error) {
			//console.log(error.reponse)
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess() {
		return {
			type: ActionType.sendFM,
		};
	}
	function requestError() {
		return {
			type: ActionType.sendFMError,
		};
	}
};

export const cleanFM = () => {
	return async (dispatch: any) => {
		dispatch(request());
	};
	function request() {
		return {
			type: ActionType.cleanFm,
		};
	}
};
