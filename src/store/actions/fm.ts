/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosResponse } from 'axios';
import useAxios, { axiosFiles } from 'config/index';
import { Aci, Activity, TypeWallet } from 'context/DataList/interface';
import { ImagesInt } from 'context/FM/fmImages/interface';
import { LocationInt } from 'context/FM/Location/interfaces';
import { fmClient, fmCommerce, fmPos, IdClient_CommerceINT } from 'interfaces/fm';
import Swal from 'sweetalert2';
import { daysToString } from 'validation/validFm';
import { ActionType } from '../types/types';
import { TeleMarket } from './../../context/DataList/interface';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const validationClient = (client: any) => {
	//console.log(client);
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM/client/valid`, client);
			updateToken(res);
			//console.log(res);
			dispatch(requestSuccess(res.data.info));
			return res.data.info;
		} catch (error: any) {
			//console.log(error.response);
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
		} catch (error: any) {
			//console.log('valid comerce', error);
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
		} catch (error: any) {
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

export const dataFormatClient = (client: fmClient, locationClient: LocationInt) => ({
	email: client.email,
	name: client.name.trim(),
	last_name: client.last_name.trim(),
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
		fullName: client.name_ref1.trim(),
		document: client.doc_ident_type_ref1 + client.doc_ident_ref1,
		phone: '+58' + client.phone_ref1,
	},
	ref_person_2: {
		fullName: client.name_ref1.trim(),
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
	name: commerce.name.trim(),
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
	typeSolict: number,
	pos: fmPos,
	aci: Aci | null,
	telemarket: TeleMarket | null,
	typeWallet: TypeWallet | null,
	locationPos: LocationInt,
	idClient: number,
	idCommerce: number,
	idImages: any
) => {
	//pos.request_origin?.id === 2 ? (aci ? aci : '') | ''
	let auxOrigen: string = '';
	if (pos.request_origin?.id === 2 || pos.request_origin?.id === 8) {
		auxOrigen = aci!.id.toString();
	}
	if (pos.request_origin?.id === 3) {
		auxOrigen = telemarket!.id.toString();
	}
	if (pos.request_origin?.id === 6) {
		auxOrigen = typeWallet!.Id.toString();
	}
	return {
		//Data FM
		...idImages,
		id_type_request: typeSolict,
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
		id_product: pos.model_post?.id,
		//requestSource_docnum: auxOrigen,
		ci_referred: auxOrigen,
		discount: pos.discount,
		nro_comp_dep: pos.pagadero ? '' : pos.nro_comp_dep,
		pagadero: pos.pagadero,
		initial: pos.initial,
		//coutas: pos.coutas,
	};
};

export const createFormDataFm = (
	idClient: number,
	idCommerce: number,
	imagePlanilla: FileList | [],
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
	for (let i: number = 0; i < imagePlanilla.length; i++) {
		formData.append('planilla', imagePlanilla[i]);
	}
	return formData;
};

export const sendCompleteFM = (
	typeSolict: number,
	client: fmClient,
	locationClient: LocationInt,
	commerce: fmCommerce,
	locationCommerce: LocationInt,
	activity: Activity | null,
	pos: fmPos,
	aci: Aci | null,
	telemarket: TeleMarket | null,
	typeWallet: TypeWallet | null,
	locationPos: LocationInt,
	imagePlanilla: FileList | [],
	imagesForm: ImagesInt,
	imagesActa: FileList | []
) => {
	const dataClient = dataFormatClient(client, locationClient);
	const dataCommerce = dataFormatCommerce(commerce, locationCommerce, activity, pos);
	console.log('trim', dataClient);
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
			const dataPos = dataFormatPos(
				typeSolict,
				pos,
				aci,
				telemarket,
				typeWallet,
				locationPos,
				idClient,
				idCommerce,
				idImages
			);
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
	typeSolict: number,
	idsCAndCc: IdClient_CommerceINT,
	pos: fmPos,
	aci: Aci | null,
	telemarket: TeleMarket | null,
	typeWallet: TypeWallet | null,
	locationPos: LocationInt,
	imagePlanilla: FileList | [],
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
			const dataPos = dataFormatPos(
				typeSolict,
				pos,
				aci,
				telemarket,
				typeWallet,
				locationPos,
				idsCAndCc.idClient,
				idsCAndCc.idCommerce,
				idImages
			);
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
