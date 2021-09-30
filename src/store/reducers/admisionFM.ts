import { ActionType } from '../types/types';

interface inState {
	fm: any,
	errorGetData: boolean,
	updatedStatus: boolean,
	errorStatusFM: boolean,
}

const initialState: inState = {
	fm: {},
	errorGetData: false,
	updatedStatus: false,
	errorStatusFM: false,
};

export const admisionFM = (state = initialState, action: any) => {
	switch (action.type) {
		//FM
		case ActionType.getDataFM:
			return {
				...state,
				fm: action.payload,
				errorGetData: false,
			};
		case ActionType.getDataFMError:
			return {
				...state,
				errorGetData: true,
			};
		//Status FM
		case ActionType.updateStatusFM:
			return {
				...state,
				updatedStatus: true,
				errorStatusFM: false,
			};
		case ActionType.updateStatusFMError:
			return {
				...state,
				errorStatusFM: true,
			};
		case ActionType.cleanDataFM:
			return initialState;
		default:
			return state;
	}
}
