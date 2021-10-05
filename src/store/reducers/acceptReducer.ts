import { ActionType } from '../types/types';

interface inState {
	stepComplete: any[];
	validado: {
		infoGeneral: boolean;

		//step2
		rc_ident_card: any;
		rc_rif: any; 
		//step3
		rc_account_number: any;
		rc_ref_bank: any;
		//step4
		rc_constitutive_act: any; 
		rc_property_document: any;
		//step5
		rc_ref_perso: any; 
		rc_service_document: any;
		//step6
		rc_special_contributor: any;

		contrubuyente: any;
		localFrente: boolean;
		localDentro: boolean;
	};
}

const initialState: inState = {
	stepComplete: [],
	validado: {
		infoGeneral: false,
		//step2
		rc_ident_card: {
			status: true,
			msg: ''
		},
		rc_rif: {
			status: true,
			msg: ''
		}, 
		//step3
		rc_account_number: {
			status: true,
			msg: ''
		},
		rc_ref_bank: {
			status: true,
			msg: ''
		},
		//step4
		rc_constitutive_act: {
			status: true,
			msg: ''
		},
		rc_property_document: {
			status: true,
			msg: ''
		},
		//step5
		rc_ref_perso: {
			status: true,
			msg: ''
		}, 
		rc_service_document: {
			status: true,
			msg: ''
		},
		//step6
		rc_special_contributor: {
			status: true,
			msg: ''
		}, 
		contrubuyente: null,
		localFrente: false,
		localDentro: false,
	},
};

export const acceptReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case ActionType.stepComplete:
			return {
				...state,
				stepComplete: [...action.payload],
			};

		case ActionType.acceptRec:
			return {
				...state,
				validado: {
					...state.validado,
					...action.payload
				}
			};
		//Register User
		case ActionType.registerUser:
			return {
				...state,
				user: action.payload.data.data,
				registered: true,
			};
		case ActionType.registerUserError:
			return {
				...state,
				registered: false,
			};
		case ActionType.cleanAcceptRec:
			return initialState;
		default:
			return state;
	}
};
