import { ActionType } from '../types/types';
import { deleteError, updataError } from '../utils';

interface inState {
	user: any;
	error: any[];
	registered: boolean;
}

const initialState: inState = {
	user: {},
	error: [],
	registered: false,
};

export const authReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case ActionType.login:
			console.log('login', action.payload);
			return {
				...state,
				user: action.payload,
			};
		case ActionType.refreshUser:
			console.log('refresh', action.payload);
			return {
				...state,
				user: action.payload,
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
		//Validation Email
		case ActionType.registerEmail:
			state.error = deleteError(state.error, 'email');
			console.log(state.error);
			return {
				...state,
			};
		case ActionType.registerEmailError:
			state.error = updataError(state.error, { message: action.payload, name: 'email' });
			return {
				...state,
			};
		//Validation IdentDoc
		case ActionType.registerDocIdent:
			state.error = deleteError(state.error, 'ident');
			console.log(state.error);
			return {
				...state,
			};
		case ActionType.registerDocIdentError:
			state.error = updataError(state.error, { message: action.payload, name: 'ident' });
			return {
				...state,
			};
		default:
			return state;
	}
};
