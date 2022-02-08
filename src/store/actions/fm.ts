/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import useAxios, { axiosFiles } from '../../config/index';
import { Activity } from '../../context/DataList/interface';
import { ImagesInt } from '../../context/FM/fmImages/interface';
import { LocationInt } from '../../context/FM/Location/interfaces';
import { fmClient, fmCommerce, fmPos, IdClient_CommerceINT } from '../../interfaces/fm';
import { daysToString } from '../../validation/validFm';
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

export const dataFormatClient = (client: fmClient, locationClient: LocationInt) => ({
	email: client.email,
	name: client.name,
	last_name: client.last_name,
	id_ident_type: client.id_ident_type,
	ident_num: client.ident_num,
	phone1: '58' + client.phone1,
	phone2: '+58' + client.phone2,
	location: {
		id_estado: locationClient.estado?.id,
		id_municipio: locationClient.municipio?.id,
		id_parroquia: locationClient.parroquia?.id,
		id_ciudad: locationClient.ciudad?.id,
		sector: client.sector,
		calle: client.calle,
		local: client.local,
	},
	ref_person_1: {
		fullName: client.name_ref1,
		document: client.doc_ident_type_ref1 + client.doc_ident_ref1,
		phone: '+58' + client.phone_ref1,
	},
	ref_person_2: {
		fullName: client.name_ref1,
		document: client.doc_ident_type_ref2 + client.doc_ident_ref2,
		phone: '+58' + client.phone_ref2,
	},
});

export const dataFormatCommerce = (
	commerce: fmCommerce,
	locationCommerce: LocationInt,
	activity: Activity | null,
	pos: fmPos
) => ({
	id_ident_type: commerce.id_ident_type,
	ident_num: commerce.ident_num,
	special_contributor: commerce.special_contributor ? 1 : 0,
	name: commerce.name,
	bank_account_num: pos.text_account_number,
	id_activity: activity?.id,
	location: {
		id_estado: locationCommerce.estado?.id,
		id_municipio: locationCommerce.municipio?.id,
		id_parroquia: locationCommerce.parroquia?.id,
		id_ciudad: locationCommerce.ciudad?.id,
		sector: commerce.sector,
		calle: commerce.calle,
		local: commerce.local,
	},
	days: daysToString(commerce.days),
});

export const dataFormatPos = (
	pos: fmPos,
	locationPos: LocationInt,
	idClient: number,
	idCommerce: number,
	idImages: any
) => ({
	//Data FM
	...idImages,
	number_post: pos.number_post,
	id_payment_method: pos.payment_method?.id,
	id_client: idClient,
	id_commerce: idCommerce,
	dir_pos: {
		id_estado: locationPos.estado?.id,
		id_municipio: locationPos.municipio?.id,
		id_parroquia: locationPos.parroquia?.id,
		id_ciudad: locationPos.ciudad?.id,
		sector: pos.sector,
		calle: pos.calle,
		local: pos.local,
	},
	bank_account_num: pos.text_account_number,
	id_request_origin: pos.request_origin?.id,
	id_type_payment: pos.type_pay?.id,
	ci_referred: typeof pos.reqSource_docnum === 'object' ? pos.reqSource_docnum.id : pos.reqSource_docnum,
	id_product: pos.model_post?.id,
	requestSource_docnum: pos.request_origin?.id,
	discount: pos.discount,
	nro_comp_dep: pos.nro_comp_dep,
	pagadero: pos.pagadero,
	initial: pos.initial,
	//coutas: pos.coutas,
});

export const createFormDataFm = (
	idClient: number,
	idCommerce: number,
	imagePlanilla: object | null,
	imagesForm: ImagesInt,
	imagesActa: FileList | []
): FormData => {
	const formData: FormData = new FormData();
	formData.append('id_client', idClient.toString());
	formData.append('id_commerce', idCommerce.toString());
	for (const item of Object.entries(imagesForm)) {
		if (item[1] !== null) {
			formData.append('images', item[1]);
		}
	}
	for (let i: number = 0; i < imagesActa.length; i++) {
		formData.append('constitutive_act', imagesActa[i]);
	}
	return formData;
};

export const sendCompleteFM = (
	client: fmClient,
	locationClient: LocationInt,
	commerce: fmCommerce,
	locationCommerce: LocationInt,
	activity: Activity | null,
	pos: fmPos,
	locationPos: LocationInt,
	imagePlanilla: object | null,
	imagesForm: ImagesInt,
	imagesActa: FileList | []
) => {
	const dataClient = dataFormatClient(client, locationClient);
	const dataCommerce = dataFormatCommerce(commerce, locationCommerce, activity, pos);
	return async (dispatch: any) => {
		try {
			const resClient: AxiosResponse<any> = await useAxios.post(`/FM/client`, dataClient);
			const idClient: number = resClient.data.info.id;
			console.log('Client', idClient);
			const resCommerce: AxiosResponse<any> = await useAxios.post(`/FM/${idClient}/commerce`, dataCommerce);
			const idCommerce: number = resCommerce.data.info.id_commerce;
			console.log('Commerce', idCommerce);
			const images: any = createFormDataFm(idClient, idCommerce, imagePlanilla, imagesForm, imagesActa);
			const resImages: AxiosResponse<any> = await axiosFiles.post(`/1000pagosRC/RC`, images);
			const idImages = resImages.data.info;
			console.log('idImages', idImages);
			const dataPos = dataFormatPos(pos, locationPos, idClient, idCommerce, idImages);
			const resPos: AxiosResponse<any> = await useAxios.post(`/FM`, dataPos);
			console.log('fm cargado', resPos.data);
			//const res: AxiosResponse<any> = await useAxios.post(`/FM`, form);
			//updateToken(res);
			dispatch(requestSuccess());
		} catch (error: any) {
			//console.log(error.reponse)
			dispatch(requestError());
			Swal.fire('Error', error.response?.data.message, 'error');
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

export const sendCompleteFMExtraPos = (
	idsCAndCc: IdClient_CommerceINT,
	pos: fmPos,
	locationPos: LocationInt,
	imagePlanilla: object | null,
	imagesForm: ImagesInt
) => {
	return async (dispatch: any) => {
		try {
			const images: any = createFormDataFm(
				idsCAndCc.idClient,
				idsCAndCc.idCommerce,
				imagePlanilla,
				imagesForm,
				[]
			);
			const resImages: AxiosResponse<any> = await axiosFiles.post(`/1000pagosRC/RC`, images);
			const idImages = resImages.data.info;
			console.log('idImages', idImages);
			const dataPos = dataFormatPos(pos, locationPos, idsCAndCc.idClient, idsCAndCc.idCommerce, idImages);
			const resPos: AxiosResponse<any> = await useAxios.post(`/FM/extraPos`, dataPos);
			console.log('fm cargado', resPos.data);
			//updateToken(res);
			dispatch(requestSuccess());
		} catch (error: any) {
			//console.log(error.reponse)
			dispatch(requestError());
			Swal.fire('Error', error.response?.data.message, 'error');
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
