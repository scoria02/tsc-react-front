import { ActionType } from '../types/types';

interface inState {
	stepComplete: any[];
	validado: {
		//step1
		rc_ident_card: {
			status: boolean,
			msg: string
		};
		//step2
		rc_rif: {
			status: boolean,
			msg: string
		};
		//step3
		rc_ref_bank: {
			status: boolean,
			msg: string
		};
		//step4
		rc_constitutive_act: {
			status: boolean,
			msg: string
		};
		rc_special_contributor: {
			status: boolean,
			msg: string
		};
		rc_comp_dep: {
			status: boolean,
			msg: string
		};
		contrubuyente: number;
		localFrente: boolean;
		localDentro: boolean;
	};
}

const initialState: inState = {
	stepComplete: [],
	validado: {
		//step1
		rc_ident_card: {
			status: true,
			msg: ''
		},
		//step2
		rc_rif: {
			status: true,
			msg: ''
		}, 
		//step3
		rc_ref_bank: {
			status: true,
			msg: ''
		},
		//step4
		rc_constitutive_act: {
			status: true,
			msg: ''
		},
		rc_special_contributor: {
			status: true,
			msg: ''
		}, 
		rc_comp_dep: {
			status: true,
			msg: ''
		},
		contrubuyente: 0,
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
			console.log(action.payload)
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
