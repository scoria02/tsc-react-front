import {AxiosResponse} from 'axios';
import Swal from 'sweetalert2';
import useAxios, {axiosFiles} from '../../config/index';
import {ActionType} from '../types/types';
import {CloseModal, CloseModalDiferido} from './ui';
import {cleanRec} from './accept';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const getDataFM = (fm: any) => {
	return async (dispatch: any) => {
		try {
			//const res: AxiosResponse<any> = await useAxios.get(`/FM`);
			//updateToken(res);
			console.log('fm del socket', fm);
			dispatch(requestSuccess(fm));
		} catch (error) {
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

export const updateStatusFM = (id_fm: number, status: any, accept: any) => {
	const id_status: any = {
		'id_status_request': status,
		valids: {
			//step1
			valid_ident_card: accept.rc_ident_card.msg,
			//step2
			valid_rif: accept.rc_rif.msg,
			//step3
			valid_ref_bank: accept.rc_ref_bank.msg,
			//step4
			valid_constitutive_act: accept.rc_constitutive_act.msg,
			valid_special_contributor: accept.rc_special_contributor.msg,
			valid_comp_dep: accept.rc_comp_dep.msg
		}
	}
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.put(`/FM/admision/${id_fm}/status`, id_status);
			updateToken(res);
			dispatch(requestSuccess(status));
		} catch (error) {
			//console.log(error.response)
			dispatch(CloseModal());
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(status: number) {
		return {
			type: ActionType.updateStatusFM,
			payload: status
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
		//console.log('Clean data FM & accept')
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
		} catch (error) {
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

