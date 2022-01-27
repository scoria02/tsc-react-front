import {
	CHANGE_FM,
	SET_FM,
	CHANGE_DAYS,
	SET_DAYS,
	SET_ACTIVITY,
	CHANGE_ErrorFM,
	SET_ErrorFM,
	SELECT_TYPE_SOLICT,
} from './type';

const FMReducer = (state: any, action: any) => {
	const { payload, type } = action;
	switch (type) {
		case SELECT_TYPE_SOLICT:
			return {
				...state,
				typeSolict: payload,
			};
		case CHANGE_FM:
			return {
				...state,
				fmData: {
					...state.fmData,
					[payload.name]: payload.value,
				},
			};
		case SET_FM:
			return {
				...state,
				fmData: payload,
			};
		case CHANGE_DAYS:
			return {
				...state,
				days: {
					...state.days,
					[payload.name]: payload.value,
				},
			};
		case SET_DAYS:
			return {
				...state,
				days: payload,
			};
		case SET_ACTIVITY:
			return {
				...state,
				activity: payload,
			};
		case CHANGE_ErrorFM:
			return {
				...state,
				fmDataError: {
					...state.fmDataError,
					[payload.name]: payload.value,
				},
			};
		case SET_ErrorFM:
			return {
				...state,
				fmDataError: payload,
			};
		default:
			return state;
	}
};

export default FMReducer;
