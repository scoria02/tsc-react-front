import { ActionType } from '../types/types';

interface inState {
	stepComplete: any[];
	validado: {
		infoGeneral: boolean;
		cedula: boolean;
		rif: boolean;
		cuenta: boolean;
		refBanco: boolean;
		actaConstitutiva: boolean;
		refPersonal: boolean;
		servicio: boolean;
		contrubuyente: any;
		localFrente: boolean;
		localDentro: boolean;
	};
}

const initialState: inState = {
	stepComplete: [],
	validado: {
		infoGeneral: false,
		cedula: false,
		rif: false,
		cuenta: false,
		refBanco: false,
		actaConstitutiva: false,
		refPersonal: false,
		servicio: false,
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
				// stepComplete: action.payload,
				stepComplete: [...action.payload],
			};

		case ActionType.acceptRec:
			return {
				...state,
				validado: action.payload,
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

		default:
			return state;
	}
};
