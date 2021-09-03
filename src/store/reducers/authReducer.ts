import { ActionType } from '../types/types';
import { updataError, deleteError } from '../utils';

interface inState {
	user: any,
	error: any[],
	registered: boolean,
}

const initialState : inState = {
	user: {},
	error: [],
	registered: false,
}

export const authReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case ActionType.login:
			console.log('hola from login')
			return {
			}
		case ActionType.registerEmail:
      state.error = deleteError(state.error, 'email');
			console.log(state.error)
			return {
				...state,
			}
		case ActionType.registerEmailError:
      state.error = updataError(state.error, {message: action.payload, name: 'email' });
			return {
				...state,
			}
		default:
			return state;
	}
};
