import { types } from '../types/types';

const initialState = {
	loading: false,
	modalOpen: false,
	msgError: null,
};

export const uiReducer = (state: typeof initialState, action: types) => {
	switch (action.type) {
		case '[ui] Set Error':
			return {
				...state,
				msgError: action.payload,
			};

		case '[ui] Remove Error':
			return {
				...state,
				msgError: null,
			};

		case '[ui] Start loading':
			return {
				...state,
				loading: true,
			};

		case '[ui] Finish loading':
			return {
				...state,
				loading: false,
			};

		case '[ui] Open modal':
			return {
				...state,
				modalOpen: true,
			};

		case '[ui] Close modal':
			return {
				...state,
				modalOpen: false,
			};

		default:
			return state;
	}
};
