import { ActionType } from '../types/types';

interface inState {
	error: string;
}


const initialState: inState = {
	error: '',
};

export const fmReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case ActionType.login:
			return {
				...state,
			};
		default:
			return state;
	}
};
