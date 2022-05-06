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
			console.log(res);
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
	idCommerce: number
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
		id_client: idClient,
		id_commerce: idCommerce,
		//Data FM
		id_type_request: typeSolict,
		number_post: pos.number_post,
		id_payment_method: pos.payment_method?.id,
		pos: {
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

export const dataForPos = (
	typeSolict: number,
	pos: fmPos,
	aci: Aci | null,
	telemarket: TeleMarket | null,
	typeWallet: TypeWallet | null,
	locationPos: LocationInt
) => {
	//pos.request_origin?.id === 2 ? (aci ? aci : '') | ''
	let auxOrigen: string = '';
	if (pos.request_origin?.id === 2 || pos.request_origin?.id === 8) {
		auxOrigen = aci!.id.toString();
	} else if (pos.request_origin?.id === 3) {
		auxOrigen = telemarket!.id.toString();
	} else if (pos.request_origin?.id === 6) {
		auxOrigen = typeWallet!.Id.toString();
	} else {
		auxOrigen = pos.reqSource_docnum;
	}
	return {
		//Data FM
		id_type_request: typeSolict,
		number_post: pos.number_post,
		id_payment_method: pos.payment_method?.id,
		pos: {
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

export const createFM = (
	client: any,
	comerce: any,
	//Images
	imagePlanilla: FileList | [],
	imagesForm: ImagesInt,
	imagesActa: FileList | [],
	//pos
	pos: any,
	//
	id_client: number
) => {
	//console.log(client.stringify());
	const formData: FormData = new FormData();
	formData.append('id_client', id_client.toString());
	formData.append('client', JSON.stringify(client));
	formData.append('commerce', JSON.stringify(comerce));
	formData.append('posX', JSON.stringify(pos));
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

export const createFMExtraPos = (
	id_client: number,
	id_comerce: number,
	//Images
	imagePlanilla: FileList | [],
	imagesForm: ImagesInt,
	//pos
	pos: any
) => {
	//console.log(client.stringify());
	const formData: FormData = new FormData();
	formData.append('id_client', id_client.toString());
	formData.append('id_commerce', id_comerce.toString());
	formData.append('posX', JSON.stringify(pos));
	for (const item of Object.entries(imagesForm)) {
		if (item[1] !== null) {
			formData.append('images', item[1]);
		}
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
	imagesActa: FileList | [],
	id_client: number
) => {
	//Crear formart
	const dataClient = id_client ? null : dataFormatClient(client, locationClient);
	const dataCommerce = dataFormatCommerce(commerce, locationCommerce, activity, pos);
	const dataPost = dataForPos(typeSolict, pos, aci, telemarket, typeWallet, locationPos);
	console.log('cliente: ', dataClient, ' id ', id_client);
	return async (dispatch: any) => {
		try {
			const fm: any = createFM(
				//Client
				dataClient,
				//Comerce
				dataCommerce,
				//Images
				imagePlanilla,
				imagesForm,
				imagesActa,
				//Pos
				dataPost,
				//
				id_client
			);
			const resFM: AxiosResponse<any> = await useAxios.post(`/FM`, fm);
			console.log('creado fm id: ', resFM);
			dispatch(requestSuccess(resFM.data.info.code));
		} catch (error: any) {
			//console.log(error.reponse)
			dispatch(requestError());
			Swal.fire('Error', error.response?.data.message, 'error');
		}
	};
	function requestSuccess(code: string) {
		return {
			type: ActionType.sendFM,
			payload: code,
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
		const dataPos = dataFormatPos(
			typeSolict,
			pos,
			aci,
			telemarket,
			typeWallet,
			locationPos,
			idsCAndCc.idClient,
			idsCAndCc.idCommerce
		);
		const fmExtraPos = createFMExtraPos(
			idsCAndCc.idClient,
			idsCAndCc.idCommerce,
			imagePlanilla,
			imagesForm,
			dataPos
		);
		try {
			const resFM: AxiosResponse<any> = await useAxios.post(`/FM/extraPos`, fmExtraPos);
			console.log('fm cargado', resFM.data);
			//updateToken(res);
			dispatch(requestSuccess(resFM.data.info.code));
		} catch (error: any) {
			//console.log(error.reponse)
			dispatch(requestError());
			Swal.fire('Error', error.response?.data.message, 'error');
		}
	};
	function requestSuccess(code: string) {
		return {
			type: ActionType.sendFM,
			payload: code,
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
