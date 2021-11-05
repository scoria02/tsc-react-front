import { Action } from '../actions/ui';
import { ActionType } from '../types/types';
const initialState = {
	loading: false,
	modalOpen: false,
	msgError: null,

	loadingDiferido: false,
	modalOpenDiferido: false,
	msgErrorDiferido: null,
};

export const uiReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case ActionType.uiOpenModal:
			return {
				...state,
				modalOpen: true,
			};

		case ActionType.uiCloseModal:
			return {
				...state,
				modalOpen: false,
			};
		case ActionType.uiStartLoading:
			return {
				...state,
				loading: true,
			};

		case ActionType.uiFinishLoading:
			return {
				...state,
				loading: false,
			};
		case ActionType.uiOpenModalDiferido:
			return {
				...state,
				modalOpenDiferido: true,
			};

		case ActionType.uiCloseModalDiferido:
			return {
				...state,
				modalOpenDiferido: false,
			};
		default:
			return state;
	}
};
