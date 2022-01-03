import { INIT_LIST } from './types';

import { InterFaceStateList } from './interface';

const DataListReducer = (state: InterFaceStateList, action: any) => {
	const { payload, type } = action;
	switch (type) {
		case INIT_LIST:
			return {
				...state,
				listIdentType: payload[0].data.info,
				listActivity: payload[1].data.info,
				listPayment: payload[2].data.info,
				listModelPos: payload[3].data.info,
			};
		default:
			return state;
	}
};

export default DataListReducer;
