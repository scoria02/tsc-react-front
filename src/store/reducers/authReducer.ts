import { Action } from '../actions/ui';
// import { ActionType } from '../types/types';
/*
    {
        uid: 'jagdfjahdsf127362718',
        name: 'Fernando'
    }

*/
export const authReducer = (state = {}, action: Action) => {
	switch (action.type) {
		// case ActionType.uiStartLoading:
		// 	return {
		// 		...state,
		// 		// email: action.payload.email,
		// 		// password: action.payload.displayName
		// 	};

		// case ActionType.uiFinishLoading:
		// 	return {};

		default:
			return state;
	}
};
