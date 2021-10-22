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
			if(res.data.info){
				updateToken(res);
				dispatch(requestSuccess(res.data.info));
			}
			else{
				dispatch(CloseModal());
				dispatch(requestError());
				Swal.fire('Error', 'Dimas cuando no hay fm debiera ser error', 'error');
			}
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
			valid_rc_ident_card: accept.rc_ident_card.msg,
			//step2
			valid_rc_rif: accept.rc_rif.msg, 
			//step3
			valid_rc_ref_bank: accept.rc_ref_bank.msg,
			//step4
			valid_rc_constitutive_act:accept.rc_constitutive_act.msg,
			valid_rc_special_contributor: accept.rc_special_contributor.msg, 
			valid_rc_comp_dep: accept.rc_comp_dep.msg
		}
	}
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.put(`/FM/${id_fm}/status`, id_status);
			updateToken(res);
			dispatch(CloseModal());
			dispatch(requestSuccess());
			if(id_status === 2)
				Swal.fire('Success', 'Formulario Verificado');
			else if (id_status === 4)
				Swal.fire('Success', 'Formulario Diferido');
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
