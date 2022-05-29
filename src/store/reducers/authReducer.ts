import { ActionType } from '../types/types';
import { deleteError, updataError } from '../utils';
import { inStateAuth } from './interfaceAuth';

const initialState: inStateAuth = {
	user: null,
	error: [],
	registered: false,
	loginError: false,
};

export const authReducer = (state = initialState, action: any) => {
	console.log('action', action.type, ' -- ', action.payload);
	switch (action.type) {
		case ActionType.login:
			return {
				...state,
				user: action.payload,
				loginError: false,
			};
		case ActionType.loginError:
			return {
				...state,
				loginError: true,
			};
		case ActionType.refreshUser:
			return {
				...state,
				user: action.payload,
			};
		//Register User
		case ActionType.registerUser:
			return {
				...state,
				user: action.payload,
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
			return {
				...state,
			};
		case ActionType.registerDocIdentError:
			state.error = updataError(state.error, { message: action.payload, name: 'ident' });
			return {
				...state,
			};
		case ActionType.logout:
			return initialState;
		default:
			return state;
	}
};
