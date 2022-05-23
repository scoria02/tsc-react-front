import useAxios from 'config/index';
import { ValidatedFace } from 'context/Admision/Validation/interface';
import { ImagesInt } from 'context/FM/fmImages/interface';
import Swal from 'sweetalert2';
import { ActionType } from '../types/types';
import { cleanRec } from './accept';
import { CloseModal, CloseModalDiferido } from './ui';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const getDataFM = (fm: any) => {
	return async (dispatch: any) => {
		try {
			//const res: AxiosResponse<any> = await useAxios.get(`/FM`);
			//updateToken(res);
			dispatch(requestSuccess(fm));
		} catch (error: any) {
			//console.log(error.response)
			dispatch(CloseModal());
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.getDataFM,
			payload: state,
		};
	}
	function requestError() {
		return {
			type: ActionType.getDataFMError,
		};
	}
};

export const updateStatusFM = (id_fm: number, status: any, validado: ValidatedFace, aci: number) => {
	console.log('aqui', validado);
	const id_status: any = {
		id_status_request: status,
		id_aci: aci,
		valids: {
			id_typedif_client: !validado.valid_cliente.status ? validado.valid_cliente.id_typedif : null,
			id_typedif_commerce: !validado.valid_commerce.status ? validado.valid_commerce.id_typedif : null,
			id_typedif_consitutive_acta: !validado.valid_ref_bank.status ? validado.valid_ref_bank.id_typedif : null,
			id_typedif_special_contributor: !validado.valid_special_contributor.status
				? validado.valid_special_contributor.id_typedif
				: null,
			id_typedif_pos: !validado.valid_pos.status ? validado.valid_pos.id_typedif : null,
			id_typedif_planilla: !validado.valid_planilla.status ? validado.valid_planilla.id_typedif : null,
			id_typedif_ref_bank: !validado.valid_ref_bank.status ? validado.valid_ref_bank.id_typedif : null,
			id_typedif_comp_num: !validado.valid_comp_dep.status ? validado.valid_comp_dep.id_typedif : null,
			//msg
			valid_client:
				!validado.valid_cliente.status && validado.valid_cliente.id_typedif === 2
					? validado.valid_cliente.msg
					: '',
			valid_commerce:
				!validado.valid_commerce.status && validado.valid_commerce.id_typedif === 2
					? validado.valid_commerce.msg
					: '',
			valid_constitutive_act:
				!validado.valid_constitutive_act.status && validado.valid_constitutive_act.id_typedif === 2
					? validado.valid_constitutive_act.msg
					: '',
			valid_special_contributor:
				!validado.valid_special_contributor.status && validado.valid_special_contributor.id_typedif === 2
					? validado.valid_special_contributor.msg
					: '',
			valid_planilla:
				!validado.valid_planilla.status && validado.valid_planilla.id_typedif === 2
					? validado.valid_planilla.msg
					: '',
			valid_comp_dep:
				!validado.valid_comp_dep.status && validado.valid_comp_dep.id_typedif === 2
					? validado.valid_comp_dep.msg
					: '',
			valid_ref_bank:
				!validado.valid_ref_bank.status && validado.valid_ref_bank.id_typedif === 2
					? validado.valid_ref_bank.msg
					: '',
			valid_pos: !validado.valid_pos.status && validado.valid_pos.id_typedif === 2 ? validado.valid_pos.msg : '',
		},
	};
	console.log('aquix', id_status);

	return async (dispatch: any) => {
		try {
			await useAxios.put(`/FM/admision/${id_fm}/status`, id_status);
			//updateToken(res);
			dispatch(requestSuccess(status));
		} catch (error: any) {
			console.log(error.response);
			//dispatch(CloseModal());
			dispatch(requestError());
			Swal.fire({
				icon: 'error',
				title: 'Error',
				customClass: { container: 'swal2-validated' },
				text: error.response?.data?.message,
			});
		}
	};
	function requestSuccess(status: number) {
		return {
			type: ActionType.updateStatusFM,
			payload: status,
		};
	}
	function requestError() {
		return {
			type: ActionType.updateStatusFMError,
		};
	}
};

export const cleanAdmisionFM = () => {
	return async (dispatch: any) => {
		// console.log('Clean data FM & accept');
		dispatch(cleanRec());
		dispatch(CloseModal());
		dispatch(request());
	};
	function request() {
		return {
			type: ActionType.cleanDataFM,
		};
	}
};

export const createFormDataFmDif = (
	id_fm: number,
	fm: any,
	imagePlanilla: FileList | [],
	imagesForm: ImagesInt,
	imagesActa: FileList | []
): FormData => {
	const formData: FormData = new FormData();
	formData.append('id_fm', id_fm.toString());
	formData.append('fm', JSON.stringify(fm));
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

export const updateStatusFMDiferido = (
	id_fm: number,
	fm: any,
	imagesForm: ImagesInt,
	imagePlanilla: FileList | [],
	imagesActa: FileList | []
) => {
	return async (dispatch: any) => {
		console.log('fmmmm', fm);
		console.log(imagePlanilla);
		console.log(imagesForm);
		console.log(imagesActa);
		const dataFm: any = createFormDataFmDif(id_fm, fm, imagePlanilla, imagesForm, imagesActa);
		try {
			await useAxios.put(`/FM/admition/${id_fm}/diferido`, dataFm);
			//console.log('updateimg', res)
			dispatch(requestSuccess());
		} catch (error: any) {
			//console.log(error.response)
			//dispatch(CloseModalDiferido());
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
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
		//	console.log('Clean data Diferido')
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
