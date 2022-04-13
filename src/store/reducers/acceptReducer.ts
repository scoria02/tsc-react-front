import { ActionType } from '../types/types';

export interface inStateAccept {
	stepComplete: any[];
	validado: {
		valid_cliente: {
			status: boolean;
			id_typedif: number;
			msg: string;
		};
		valid_commerce: {
			status: boolean;
			id_typedif: number;
			msg: string;
		};
		valid_ref_bank: {
			status: boolean;
			id_typedif: number;
			msg: string;
		};
		valid_planilla: {
			status: boolean;
			id_typedif: number;
			msg: string;
		};
		valid_constitutive_act: {
			status: boolean;
			id_typedif: number;
			msg: string;
		};
		valid_special_contributor: {
			status: boolean;
			id_typedif: number;
			msg: string;
		};
		valid_comp_dep: {
			status: boolean;
			id_typedif: number;
			msg: string;
		};
	};
	aci: boolean;
}

const initialState: inStateAccept = {
	stepComplete: [],
	validado: {
		valid_cliente: {
			status: true,
			id_typedif: 0,
			msg: '',
		},
		valid_commerce: {
			status: true,
			id_typedif: 0,
			msg: '',
		},
		valid_ref_bank: {
			status: true,
			id_typedif: 0,
			msg: '',
		},
		valid_planilla: {
			status: true,
			id_typedif: 0,
			msg: '',
		},
		valid_constitutive_act: {
			status: true,
			id_typedif: 0,
			msg: '',
		},
		valid_special_contributor: {
			status: true,
			id_typedif: 0,
			msg: '',
		},
		valid_comp_dep: {
			status: true,
			id_typedif: 0,
			msg: '',
		},
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
