import { ActionType } from '../types/types';

interface inState {
	id_client: number,
	mashClient: boolean,
	id_commerce: number,
	id_images: any,
	loadedClient: boolean,
	loadedCommerce: boolean,
	loadedImages: boolean,
	loadedFM: boolean,
	errorClient: boolean,
}

const initialState: inState = {
	id_client: 0,
	mashClient: false,
	id_commerce: 0,
	id_images: null,
	loadedClient: false,
	loadedCommerce: false,
	loadedImages: false,
	loadedFM: false,
	errorClient: false,
};

export const fmReducer = (state = initialState, action: any) => {
	switch (action.type) {
		//Client
		case ActionType.validClient:
			return {
				...state,
				errorClient: false,
				mashClient: action.payload.mash,
				id_client: action.payload.mash ? action.payload.id : 0,
			};
		case ActionType.validClientError:
			return {
				...state,
				errorClient: true,
			};
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
		//Commerce
		case ActionType.sendCommerce:
			return {
				...state,
				id_commerce: action.payload,
				loadedCommerce: true,
			};
		case ActionType.sendCommerceError:
			return {
				...state,
				id_commerce: 0,
				loadedCommerce: false,
			};
		//Images
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
		//FM
		case ActionType.sendFM:
			return {
				...state,
				loadedFM: true,
			};
		case ActionType.sendFMError:
			return {
				...state,
				loadedFM: false,
			};
		//Clean
		case ActionType.cleanFm:
			return {
				initialState
			};
		default:
			return state;
	}
};
