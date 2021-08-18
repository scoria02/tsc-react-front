import { Action } from '../actions/ui';
import { ActionType } from '../types/types';
const initialState = {
	loading: false,
	modalOpen: false,
	msgError: null,
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

		default:
			return state;
	}
};
