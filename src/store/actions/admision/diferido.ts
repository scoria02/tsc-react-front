import { ActionType } from 'store/types/types';
import useAxios from 'config/index';
import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import { ImagesInt } from 'context/Admision/CreationFM/fmImages/interface';
import { handleError } from 'utils/handleSwal';
import { CloseModalDiferido } from '../ui';
import { PosDif, SolicDif } from 'context/Admision/Diferido/interfaces/pos_interface';
import { ClientDif } from 'context/Admision/Diferido/interfaces/client_interface';
import { SocialDistance } from '@mui/icons-material';

export const createFormDataFmDif = (
	id_fm: number,
	solic: any,
	client: any,
	commerce: any,
	pos: any,
	imagePlanilla: FileList | [],
	imagesForm: ImagesInt,
	imagesActa: FileList | []
): FormData => {
	const formData: FormData = new FormData();
	formData.append('id_fm', id_fm.toString());
	formData.append('solic', JSON.stringify(solic));
	formData.append('client', JSON.stringify(client));
	formData.append('commerce', JSON.stringify(commerce));
	formData.append('pos', JSON.stringify(pos));
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

const dataFormatClient = (client: any, idLocationClient: number) => ({
	id: client.id,
	email: client.email,
	name: client.name.trim(),
	last_name: client.last_name.trim(),
	id_ident_type: client.id_ident_type.id,
	ident_num: client.ident_num,
	phones: {
		phone1: '+58' + client.phone1,
		phone2: '+58' + client.phone2,
	},
	location: {
		id: client.id_location,
		id_direccion: idLocationClient ? idLocationClient : null,
		calle: client.calle,
		local: client.local,
	},
	/*
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
	*/
});

export const dataFormatCommerce = (commerce: any, idLocationCommerce: number | null) => ({
	id: commerce.id,
	id_ident_type: commerce.id_ident_type.id,
	ident_num: commerce.ident_num,
	//special_contributor: commerce.special_contributor ? 1 : 0,
	name: commerce.name.trim(),
	id_activity: commerce?.id_activity.id,
	location: {
		id: commerce.id_location,
		id_direccion: idLocationCommerce,
		calle: commerce.calle,
		local: commerce.local,
	},
	days: commerce.days,
	rc_constitutive_act: commerce.rc_constitutive_act,
	rc_rif: commerce.rc_rif,
	rc_special_contributor: commerce.rc_special_contributor,
});

export const dataFormatPos = (pos: PosDif | null, idLocationPos: number | null) => ({
	model_post: pos?.id_product.id || null,
	location: {
		id: pos?.id_location,
		id_direccion: idLocationPos ? idLocationPos : null,
		calle: pos?.calle,
		local: pos?.local,
	},
});

export const dataFormatSolic = (solic: SolicDif | null) => ({
	id: solic?.id,
	bank_account_num: solic?.bank_account_num || null,
	number_post: solic?.number_post,
	nro_comp_dep: solic?.nro_comp_dep,
	discount: solic?.discount,
	pagadero: solic?.pagadero,
	id_payment_method: solic?.id_payment_method.id || null,
	id_type_payment: solic?.id_type_payment.id || null,
	rc_comp_dep: solic?.rc_comp_dep,
	rc_planilla: solic?.rc_planilla,
	rc_ref_bank: solic?.rc_ref_bank,
});

//Diferido
export const updateStatusFMDiferido = (
	id_fm: number,
	solic: SolicDif | null,
	client: ClientDif | null,
	phones: any,
	commerce: any,
	pos: PosDif | null,
	idLocationClient: number,
	idLocationCommerce: number,
	idLocationPos: number,
	imagesForm: ImagesInt,
	imagePlanilla: FileList | [],
	imagesActa: FileList | []
) => {
	return async (dispatch: any) => {
		//console.log('Client:old', client);
		//console.log('Commerce:old', commerce);
		const client_phones = { ...client, ...phones };
		const clientData: any = client ? dataFormatClient(client_phones, idLocationClient) : null;
		const commerceData: any = commerce ? dataFormatCommerce(commerce, idLocationCommerce) : null;
		const posData: any = pos ? dataFormatPos(pos, idLocationPos) : null;
		const solicData: any = solic ? dataFormatSolic(solic) : null;
		//console.log('Client:', clientData);
		//console.log('Commerce:', commerceData);
		const dataFm: any = createFormDataFmDif(
			id_fm,
			solicData,
			clientData,
			commerceData,
			posData,
			imagePlanilla,
			imagesForm,
			imagesActa
		);
		try {
			await useAxios.put(`/FM/admition/${id_fm}/diferido`, dataFm);
			//console.log('updateimg', res)
			dispatch(requestSuccess());
			return {
				ok: true,
			};
		} catch (error: any) {
			//console.log(error.response)
			dispatch(requestError());
			Swal.fire({
				icon: 'error',
				title: 'Error',
				customClass: { container: 'swal2-validated' },
				text: error.response?.data?.message,
			});
		}
	};
	function requestSuccess() {
		return {
			type: ActionType.updatedStatusDiferido,
		};
	}
	function requestError() {
		return {
			type: ActionType.updateStatusErrorDiferido,
		};
	}
};

export const cleanDataFmDiferido = () => {
	return async (dispatch: any) => {
		//console.log('Clean data Diferido')
		dispatch(CloseModalDiferido());
		dispatch(request());
	};
	function request() {
		return {
			type: ActionType.cleanDataDiferido,
		};
	}
};

export const getDataFMDiferido = (fm: any) => {
	return async (dispatch: any) => {
		try {
			dispatch(requestSuccess(fm));
		} catch (error: any) {
			//console.log(error.response)
			dispatch(CloseModalDiferido());
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.getDataFMDiferido,
			payload: state,
		};
	}
	function requestError() {
		return {
			type: ActionType.getDataFMDiferidoError,
		};
	}
};

export const onChangeFmDiferito = (event: any) => async (dispatch: any) => {
	dispatch({
		type: ActionType.onChangeDiferido,
		payload: event,
	});
};

export const validationClientDiferido = (client: any, errValid: boolean) => {
	return async (dispatch: any) => {
		try {
			console.log('validar', client);
			const res: AxiosResponse<any> = await useAxios.post(`/FM/client/diferido/valid`, client);
			console.log('validado', res.data);
			dispatch(requestSuccess());
		} catch (error: any) {
			dispatch(requestError());
			//if (!errValid) {
			handleError(error);
			//}
		}
	};
	function requestSuccess() {
		return {
			type: ActionType.succesClientDiferido,
		};
	}
	function requestError() {
		return {
			type: ActionType.errorClientDiferido,
		};
	}
};

export const validationCommerceDiferido = (commerce: any, errValid: boolean) => {
	return async (dispatch: any) => {
		try {
			console.log('validar commerce', commerce);
			const res: AxiosResponse<any> = await useAxios.post(`/FM/commerce/diferido/valid`, commerce);
			console.log('validado', res.data);
			dispatch(requestSuccess());
		} catch (error: any) {
			dispatch(requestError());
			//if (!errValid) {
			handleError(error);
			//}
		}
	};
	function requestSuccess() {
		return {
			type: ActionType.succesCommerceDiferido,
		};
	}
	function requestError() {
		return {
			type: ActionType.errorCommerceDiferido,
		};
	}
};
