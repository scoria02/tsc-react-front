import { ActionType } from '../types/types';

interface inState {
	//validation Fm
	fm: any;
	errorGetData: boolean;
	updatedStatus: boolean;
	errorStatusFM: boolean;
	id_statusFM: number;

	diferido: any;
	id_statusDiferido: number;
	updatedStatusDiferido: boolean;
	errorStatusDiferido: boolean;
}

const initialState: inState = {
	//validation Fm
	fm: {},
	errorGetData: false,
	updatedStatus: false,
	errorStatusFM: false,
	id_statusFM: 0,

	diferido: {},
	id_statusDiferido: 0,
	updatedStatusDiferido: false,
	errorStatusDiferido: false,
};

export const admisionFM = (state = initialState, action: any) => {
	//console.log(action.payload);
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
				id_statusFM: action.payload,
			};
		case ActionType.updateStatusFMError:
			return {
				...state,
				updatedStatus: false,
				errorStatusFM: true,
				id_statusFM: 0,
			};
		case ActionType.updatedStatusDiferido:
			return {
				...state,
				updatedStatusDiferido: true,
				errorStatusDiferido: false,
			};
		case ActionType.getDataFMDiferido:
			return {
				...state,
				diferido: action.payload,
			};
		case ActionType.updateStatusErrorDiferido:
			return {
				...state,
				updatedStatusDiferido: false,
				errorStatusDiferido: true,
			};
		//
		case ActionType.onChangeDiferido:
			return {
				...state,
				diferido: {
					...state.diferido,
					[action.payload.target.name]: action.payload.target.value,
				},
			};
		case ActionType.cleanDataDiferido:
			return initialState;
		case ActionType.cleanDataFM:
			return initialState;
		//Status Diferido
		default:
			return state;
	}
};
