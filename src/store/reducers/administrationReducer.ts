import { ActionType } from '../types/types';

interface inState {
	fmAd: any[],
	errorGetDataAd: boolean,
	updatedStatusAd: boolean,
	errorStatusFMAd: boolean,
	id_statusFMAd: number;
}

const initialState: inState = {
	fmAd: [],
	errorGetDataAd: false,
	updatedStatusAd: false,
	errorStatusFMAd: false,
	id_statusFMAd: 0,
};

export const administrationReducer = (state = initialState, action: any) => {
	switch (action.type) {
		//FM
		case ActionType.getDataFMAdministration:
			return {
				...state,
				fmAd: action.payload,
				errorGetDataAd: false,
			};
		case ActionType.getDataFMError:
			return {
				...state,
				errorGetDataAd: true,
			};
		//Status FM
		case ActionType.updateStatusFMAdministration:
			return {
				...state,
				updatedStatusAd: true,
				errorStatusFMAd: false,
				id_statusFMAd: action.payload,
			};
		case ActionType.updateStatusFMErrorAdministration:
			return {
				...state,
				updatedStatusAd: false,
				errorStatusFMAd: true,
				id_statusFMAd: 0,
			};
		case ActionType.cleanDataFMAdministration:
			return initialState;
		default:
			return state;
	}
}
