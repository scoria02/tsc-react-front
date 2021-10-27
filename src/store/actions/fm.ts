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
			return res.data.info;
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

export const validationCommerce = (id_client: number, commerce: any) => {
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM/${id_client}/commerce/valid`, commerce);
			if (res.data.info) {
				updateToken(res);
				console.log(res.data.info);
				dispatch(requestSuccess(res.data.info));
			} else {
				dispatch(requestSuccessOk());
			}
		} catch (error) {
			dispatch(requestError());
			console.log('dimas', error.response.data);
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: boolean) {
		return {
			type: ActionType.validCommerce,
			payload: state,
		};
	}
	function requestSuccessOk() {
		return {
			type: ActionType.validCommerceOk,
		};
	}
	function requestError() {
		return {
			type: ActionType.validCommerceError,
		};
	}
};

export const validationNumBank = (clientBank: any) => {
	//console.log(clientBank)
	return async (dispatch: any) => {
		try {
			const res = await useAxios.post(`/FM/bank/valid`, clientBank);
			updateToken(res);
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

export const sendClient = (cursedForm: any, codePhone: string) => {
	//console.log(client)
	const client = {
		email: cursedForm.email,
		name: cursedForm.name,
		last_name: cursedForm.last_name,
		id_ident_type: cursedForm.id_ident_type,
		ident_num: cursedForm.ident_num,
		phone1: codePhone + cursedForm.phone1,
		phone2: codePhone + cursedForm.phone2,
		location: {
			id_estado: cursedForm.id_estado_client,
			id_municipio: cursedForm.id_municipio_client,
			id_parroquia: cursedForm.id_parroquia_client,
			id_ciudad: cursedForm.id_ciudad_client,
			sector: cursedForm.sector_client,
			calle: cursedForm.calle_client,
			local: cursedForm.local_client,
		},
	};

	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM/client`, client);
			updateToken(res);
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

export const sendCommerce = (id_client: number, cursedForm: any) => {
	//console.log('Client', id_client, 'Comercio', commerce);
	const commerce = {
		id_ident_type: cursedForm.id_ident_type_commerce,
		ident_num: cursedForm.ident_num_commerce,
		special_contributor: cursedForm.special_contributor,
		name: cursedForm.name_commerce,
		bank_account_num: cursedForm.text_account_number,
		id_activity: cursedForm.id_activity,
		location: {
			id_estado: cursedForm.id_estado,
			id_municipio: cursedForm.id_municipio,
			id_parroquia: cursedForm.id_parroquia,
			id_ciudad: cursedForm.id_ciudad,
			sector: cursedForm.sector,
			calle: cursedForm.calle,
			local: cursedForm.local,
		},
	};

	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM/${id_client}/commerce`, commerce);
			updateToken(res);
			console.log(res.data.info);
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
			updateToken(res);
			const images: any = res.data.info;
			console.log('images_dimas', images);
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

export const sendFM = (cursedForm: any, fm: any) => {
	//console.log('SendFM', formM);
	console.log(fm.id_images);
	const form = {
		...fm.id_images,
		id_client: fm.id_client,
		id_commerce: fm.id_commerce,
		number_post: cursedForm.number_post,
		id_product: cursedForm.id_model_post,
		id_payment_method: cursedForm.id_payment_method,
		bank_account_num: cursedForm.text_account_number,
		id_type_payment: cursedForm.id_type_pay,
		id_request_origin: cursedForm.id_request_origin,
		ci_referred: cursedForm.reqSource_docnum,
		requestSource_docnum: cursedForm.id_requestSource,
		coutas: cursedForm.cuotas,
		POS_received: cursedForm.discount,
		pagadero: cursedForm.pagadero,
		dir_pos: {
			id_estado: cursedForm.id_estado_pos,
			id_municipio: cursedForm.id_municipio_pos,
			id_parroquia: cursedForm.id_parroquia_pos,
			id_ciudad: cursedForm.id_ciudad_pos,
			sector: cursedForm.sector_pos,
			calle: cursedForm.calle_pos,
			local: cursedForm.local_pos,
		},
	};
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM`, form);
			updateToken(res);
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
