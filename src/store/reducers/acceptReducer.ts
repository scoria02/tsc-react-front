import { ActionType } from '../types/types';

interface inState {
	stepComplete: any[];
	validado: {
		rc_ident_card: {
			status: boolean;
			msg: string;
		};
		rc_rif: {
			status: boolean;
			msg: string;
		};
		rc_ref_bank: {
			status: boolean;
			msg: string;
		};
		rc_planilla: {
			status: boolean;
			msg: string;
		};
		rc_constitutive_act: {
			status: boolean;
			msg: string;
		};
		rc_special_contributor: {
			status: boolean;
			msg: string;
		};
		rc_comp_dep: {
			status: boolean;
			msg: string;
		};
		contrubuyente: number;
		localFrente: boolean;
		localDentro: boolean;
	};
	aci: boolean;
}

const initialState: inState = {
	stepComplete: [],
	validado: {
		rc_ident_card: {
			status: true,
			msg: '',
		},
		rc_rif: {
			status: true,
			msg: '',
		},
		rc_ref_bank: {
			status: true,
			msg: '',
		},
		rc_planilla: {
			status: true,
			msg: '',
		},
		rc_constitutive_act: {
			status: true,
			msg: '',
		},
		rc_special_contributor: {
			status: true,
			msg: '',
		},
		rc_comp_dep: {
			status: true,
			msg: '',
		},
		contrubuyente: 0,
		localFrente: false,
		localDentro: false,
	},
	aci: false,
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
					...action.payload,
				},
			};
		case ActionType.acceptAci: {
			return {
				...state,
				aci: action.payload,
			};
		}
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
