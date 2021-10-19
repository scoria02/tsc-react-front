import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../../config/index';
import { ActionType } from '../types/types';
import { CloseModal } from './ui';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const getDataFM = () => {
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.get(`/FM`);
			console.log('aqui', res.data)
			updateToken(res);
			dispatch(requestSuccess(res.data.info));
		} catch (error) {
			console.log(error.response)
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
	const id_status:any = {
    'id_status_request': status,
		valids: {
			//step1
			valid_rc_ident_card: accept.rc_ident_card,
			//step2
			valid_rc_rif: accept.rc_rif, 
			//step3
			valid_rc_ref_bank: accept.rc_ref_bank,
			//step4
			valid_rc_constitutive_act:accept.rc_constitutive_act,
			valid_rc_special_contributor: accept.rc_special_contributor, 
		}
	}
	console.log(id_fm, id_status)
	return async (dispatch: any) => {
		console.log(id_status)
		try {
			const res: AxiosResponse<any> = await useAxios.put(`/FM/${id_fm}/status`, id_status);
			updateToken(res);
			dispatch(CloseModal());
			dispatch(requestSuccess());
			Swal.fire('Success', 'Cliente Verificado');
		} catch (error) {
			console.log(error.response)
			dispatch(CloseModal());
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess() {
		return {
			type: ActionType.updateStatusFM,
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
		dispatch(request());
	};
	function request() {
		return {
			type: ActionType.cleanDataFM,
		};
	}
};
