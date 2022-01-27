import { CHANGE_FM, SET_FM } from '../type';

export default function PosReducer(state: any, action: any) {
	const { payload, type } = action;
	switch (type) {
		case CHANGE_FM:
			return {
				...state,
				[payload.name]: payload.value,
			};
		case SET_FM:
			return payload;
		default:
			return state;
	}
}
