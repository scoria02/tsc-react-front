import { AxiosResponse } from 'axios';
import useAxios, { axiosFiles } from 'config/index';
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

export const updateStatusFM = (id_fm: number, status: any, validado: any, aci: number) => {
	console.log('aqui', validado);
	const id_status: any = {
		id_status_request: status,
		id_aci: aci,
		valids: {
			id_typedif_pos: null,
			id_typedif_client: validado.valid_cliente.id_typedif || null,
			id_typedif_commerce: validado.valid_commerce.id_typedif || null,
			id_typedif_ref_bank: validado.valid_ref_bank.id_typedif || null,
			id_typedif_comp_num: validado.valid_comp_dep.id_typedif || null,
			//falta en base de datos
			id_typedif_consitutive_acta: validado.valid_ref_bank.id_typedif || null,
			id_typedif_planilla: validado.valid_planilla.id_typedif || null,
			id_typedif_special_contributor: validado.valid_special_contributor.id_typedif || null,
			//msg
			valid_ident_card: validado.valid_cliente.msg,
			valid_rif: validado.valid_commerce.msg,
			valid_planilla: validado.valid_planilla.msg,
			valid_constitutive_act: validado.valid_constitutive_act.msg,
			valid_special_contributor: validado.valid_special_contributor.msg,
			valid_ref_bank: validado.valid_ref_bank.msg,
			valid_comp_dep: validado.valid_comp_dep.msg,
		},
	};
	console.log('aquix', id_status);

	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.put(`/FM/admision/${id_fm}/status`, id_status);
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

export const updateStatusFMDiferido = (id_fm: number, formData: any) => {
	return async (dispatch: any) => {
		try {
			await axiosFiles.put(`/1000pagosRC/RC/admition/${id_fm}/diferidos`, formData);
			//console.log('updateimg', res)
			dispatch(requestSuccess());
		} catch (error: any) {
			//console.log(error.response)
			dispatch(CloseModalDiferido());
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
