import { ActionType } from '../types/types';

interface inState {
	fm: any,
	error: boolean,
}

const initialState: inState = {
	fm: {},
	error: false,
};

export const admisionFM = (state = initialState, action: any) => {
	switch (action.type) {
		//Client
		case ActionType.getDataFM:
			return {
				...state,
				fm: action.payload,
			};
		case ActionType.getDataFMError:
			return {
				...state,
				//fm: {},
				error: true,
			};
		case ActionType.cleanDataFM:
			return initialState;
		default:
			return state;
	}
}
