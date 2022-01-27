import { CHANGE_CLIENT, SET_CLIENT } from './types';

export default function ClientReducer(state: any, action: any) {
	const { payload, type } = action;
	switch (type) {
		case CHANGE_CLIENT:
			return {
				...state,
				[payload.name]: payload.value,
			};
		case SET_CLIENT:
			return payload;
		default:
			return state;
	}
}
