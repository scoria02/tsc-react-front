import { ActionType } from '../types/types';

interface inState {
	id_client: number,
	id_commerce: number,
	id_images: any,
	loadedClient: boolean,
	loadedImages: boolean,
}

const initialState: inState = {
	id_client: 0,
	id_commerce: 0,
	id_images: null,
	loadedClient: false,
	loadedImages: false,
};

export const fmReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case ActionType.sendClient:
			return {
				...state,
				id_client: action.payload,
				loadedClient: true,
			};
		case ActionType.sendClientError:
			return {
				...state,
				id_client: 0,
				loadedClient: false,
			};
		case ActionType.sendImages:
			return {
				...state,
				loadedImages: true,
				id_images: action.payload,
			};
		case ActionType.sendImagesError:
			return {
				...state,
				loadedImages: false,
			};
		case ActionType.cleanFm:
			return {
				initialState
			};
		default:
			return state;
	}
};
