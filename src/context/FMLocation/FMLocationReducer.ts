import {
	SET_ESTADO_S,
	SET_MUNICIPIO_S,
	SET_CIUDAD_S,
	SET_PARROQUIA_S,
	COPY_LOCATION,
	SET_LOCATION,
} from '../FM/type';

import { LocationInt } from '../Location/interfaces';

const FMLocationReducer = (state: LocationInt, action: any) => {
	const { payload, type } = action;
	switch (type) {
		case SET_ESTADO_S:
			return {
				estado: payload,
				ciudad: null,
				municipio: null,
				parroquia: null,
			};
		case SET_MUNICIPIO_S:
			return {
				...state,
				municipio: payload,
				ciudad: null,
				parroquia: null,
			};
		case SET_CIUDAD_S:
			return {
				...state,
				ciudad: payload,
				parroquia: null,
			};
		case SET_PARROQUIA_S:
			return {
				...state,
				parroquia: payload,
			};
		case COPY_LOCATION:
			return {
				estado: payload.estado,
				municipio: payload.municipio,
				ciudad: payload.ciudad,
				parroquia: payload.parroquia,
			};
		case SET_LOCATION:
			return payload;
		default:
			return state;
	}
};

export default FMLocationReducer;
