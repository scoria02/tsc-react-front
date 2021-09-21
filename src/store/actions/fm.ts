import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import { ActionType } from '../types/types';
import useAxios, { axiosFiles } from '../../config/index';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const validationClient = (client :any) => {
	//console.log(client)
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM/client/valid`, client);
			dispatch(requestSuccess(res.data.info));
			//console.log(res.data)
		} catch (error) {
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
			console.log(error.response.data.message)
		}
	};
	function requestSuccess(state: boolean) {
		return {
			type: ActionType.validClient,
			payload: state
		};
	}
	function requestError() {
		return {
			type: ActionType.validClientError,
		};
	}
};

export const sendClient = (client :any) => {
	//console.log(client)
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM/client`, client);
			//localStorage.setItem('token', res.data.token);
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
			payload: state
		};
	}
	function requestError() {
		return {
			type: ActionType.sendClientError,
		};
	}
};

export const sendCommerce = ( id_client: number, commerce :any) => {
	console.log('Client', id_client, 'Comercio', commerce)
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM/${id_client}/commerce`, commerce);
			//localStorage.setItem('token', res.data.token);
			dispatch(requestSuccess(res.data.info.id_commerce));
		} catch (error) {
			console.log(error.reponse)
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.sendCommerce,
			payload: state
		};
	}
	function requestError() {
		return {
			type: ActionType.sendCommerceError,
		};
	}
};

export const sendImages = (formData: any ) => {
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await axiosFiles.post(`/1000pagosRC/RC`, formData);
			//localStorage.setItem('token', res.data.token);
			Swal.fire('Success', res.data.message, 'success');
			dispatch(requestSuccess(res.data.info));
			console.log(res.data.info)
		} catch (error) {
			console.log(error.reponse)
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.sendImages,
			payload: state
		};
	}
	function requestError() {
		return {
			type: ActionType.sendImagesError,
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
}
