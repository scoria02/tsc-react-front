/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import useAxios, { axiosFiles } from '../../config/index';
import { ActionType } from '../types/types';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const validationClient = (client: any) => {
	console.log(client);
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM/client/valid`, client);
			updateToken(res);
			console.log(res);
			dispatch(requestSuccess(res.data.info));
			return res.data.info;
		} catch (error: any) {
			console.log(error.response);
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
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
				dispatch(requestSuccess(res.data.info));
			} else {
				dispatch(requestSuccessOk());
			}
		} catch (error) {
			console.log('valid comerce', error);
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
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
	return async (dispatch: any) => {
		try {
			const res = await useAxios.post(`/FM/bank/valid`, clientBank);
			updateToken(res);
			dispatch(requestSuccess(res.data.info.name));
		} catch (error) {
			//console.log(error.response);
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.validNumBank,
			payload: state,
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
		ref_person_1: {
			fullName: cursedForm.name_ref1,
			document: cursedForm.doc_ident_type_ref1 + cursedForm.doc_ident_ref1,
			phone: codePhone + cursedForm.phone_ref1,
		},
		ref_person_2: {
			fullName: cursedForm.name_ref1,
			document: cursedForm.doc_ident_type_ref2 + cursedForm.doc_ident_ref2,
			phone: codePhone + cursedForm.phone_ref2,
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

export const sendCommerce = (id_client: number, cursedForm: any, days: string) => {
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
		days: days,
	};

	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM/${id_client}/commerce`, commerce);
			updateToken(res);
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
			dispatch(requestSuccess(res.data.info));
		} catch (error) {
			console.log('error images', error.reponse);
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
	const form = {
		//Data FM
		number_post: cursedForm.number_post,
		...fm.id_images,
		id_payment_method: cursedForm.id_payment_method,
		id_client: fm.id_client,
		id_commerce: fm.id_commerce,
		dir_pos: {
			id_estado: cursedForm.id_estado_pos,
			id_municipio: cursedForm.id_municipio_pos,
			id_parroquia: cursedForm.id_parroquia_pos,
			id_ciudad: cursedForm.id_ciudad_pos,
			sector: cursedForm.sector_pos,
			calle: cursedForm.calle_pos,
			local: cursedForm.local_pos,
		},
		bank_account_num: cursedForm.text_account_number,
		id_request_origin: cursedForm.id_request_origin,
		id_type_payment: cursedForm.id_type_pay,
		ci_referred: cursedForm.reqSource_docnum,
		id_product: cursedForm.id_model_post,
		requestSource_docnum: cursedForm.id_request_origin,
		discount: !!cursedForm.discount,
		nro_comp_dep: cursedForm.nro_comp_dep,
		pagadero: !!cursedForm.pagadero,
		coutas: cursedForm.cuotas,
		initial: cursedForm.initial,
	};
	console.log('mandar', form);
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

export const sendCompleteFM = () => {
	/*
	//SendForm
	useEffect(() => {
		if (sendForm === 1 && fm.id_client !== 0) {
			console.log('Listo Cliente');
			if (!fm.mashCommerce) {
				//dispatch(sendCommerce(fm.id_client, fmData, valids.daysToString(days)));
			}
			setSendForm(2);
			//Fin comerce
		} else if (sendForm === 2 && fm.id_commerce !== 0 && fm.id_client !== 0) {
			console.log('Listo Comercio');
			const formData: FormData = new FormData();
			for (const item of Object.entries(imagesForm)) {
				if (item[1] !== null) {
					formData.append('images', item[1]);
				}
			}
			for (const item of imagesActa) {
				formData.append('constitutive_act', item);
			}
			formData.append('id_client', `${fm.id_client}`);
			formData.append('id_commerce', `${fm.id_commerce}`);
			//formData.append('bank_account_num', fmData.text_account_number);
			dispatch(sendImages(formData));
			//update fm_imgaes
			setSendForm(3);
		} else if (sendForm === 3 && fm.id_images !== null && fm.id_commerce !== 0 && fm.id_client !== 0) {
			console.log('Listo Images, Client/Comercio:', fm.id_client, fm.id_commerce);
			//dispatch(sendFM(fmData, fm));
			setSendForm(4);
		} else if (sendForm === 4 && fm.loadedFM) {
			console.log('Ready All FM');
			socket.emit('cliente:disconnect');
			setSendForm(5);
			handleSendForm();
			dispatch(cleanFM());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sendForm, fm]);
	*/
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
