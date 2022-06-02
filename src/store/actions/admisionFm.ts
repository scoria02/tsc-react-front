import useAxios from 'config/index';
import { ValidatedFace } from 'context/Admision/Validation/interface';
import { ActionType } from '../types/types';
import { cleanRec } from './accept';
import Swal from 'sweetalert2';
import { CloseModal } from './ui';
import { handleErrorProvider } from 'utils/handleSwal';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const getDataFM = (fm: any) => {
	return async (dispatch: any) => {
		try {
			//const res: AxiosResponse<any> = await useAxios.get(`/FM`);
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
	const id_status: any = {
		id_status_request: status,
		id_aci: aci,
		valids: {
			id_typedif_client: !validado.valid_cliente.status ? validado.valid_cliente.id_typedif : null,
			id_typedif_commerce: !validado.valid_commerce.status ? validado.valid_commerce.id_typedif : null,
			id_typedif_consitutive_acta: !validado.valid_constitutive_act.status
				? validado.valid_constitutive_act.id_typedif
				: null,
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
	//console.log('aquix', id_status);

	return async (dispatch: any) => {
		try {
			await useAxios.put(`/FM/admision/${id_fm}/status`, id_status);
			dispatch(requestSuccess(status));
		} catch (error: any) {
			console.log(error.response);
			//dispatch(CloseModal());
			dispatch(requestError());
			handleErrorProvider(error);
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
		//console.log('Clean data FM & accept');
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
