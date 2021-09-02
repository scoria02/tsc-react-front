import { ActionType } from '../types/types';

const initialState = {
	user: {}
}

export const authReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case ActionType.login:
			console.log('hola from login')
			return {
			}
		default:
			return state;
	}
};
