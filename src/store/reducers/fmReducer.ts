import { ActionType } from '../types/types';

interface inState {
	id_client: number;
	clientMash: any;
	mashClient: boolean;
	imagesClient: boolean;
	id_commerce: number;
	commerceMash: any;
	mashCommerce: boolean,
	imagesCommerce: boolean;
	id_images: any;
	loadedClient: boolean;
	loadedCommerce: boolean;
	loadedImages: boolean;
	loadedFM: boolean;
	errorClient: boolean;
	errorNumBank: boolean;
}

const initialState: inState = {
	id_client: 0,
	clientMash: {},
	mashClient: false,
	imagesClient: false,
	id_commerce: 0,
	imagesCommerce: false,
	commerceMash: {},
	mashCommerce: false,
	id_images: null,
	loadedClient: false,
	loadedCommerce: false,
	loadedImages: false,
	loadedFM: false,
	errorClient: false,
	errorNumBank: false,
};

export const fmReducer = (state = initialState, action: any) => {
	switch (action.type) {
		//Client
		case ActionType.validClient:
			return {
				...state,
				errorClient: false,
				mashClient: action.payload.matsh,
				imagesClient: action.payload.matshImg,
				id_client: action.payload.mash ? action.payload.client.id : 0,
				clientMash: action.payload.client,
			};
		case ActionType.validClientError:
			return {
				...state,
				id_client: 0,
				clientMash: {},
				mashClient: false,
				imagesClient: false,
				errorClient: true,
			};
		case ActionType.validCommerce:
			return {
				...state,
				commerceMash: action.payload,
				id_commerce: action.payload.id,
				mashCommerce: action.payload.matshImg,
				imagesCommerce: action.payload.matshImg,
			};
		case ActionType.validCommerceOk: //reset commerce
			return {
				...state,
				commerceMash: {},
				mashCommerce: false,
				imagesCommerce: false,
			};
		case ActionType.validCommerceError:
			return {
				...state,
				commerceMash: {},
				mashCommerce: false,
			};
		//Number Bank
		case ActionType.validNumBank:
			return {
				...state,
				errorNumBank: false,
			};
		case ActionType.validNumBankError:
			return {
				...state,
				errorNumBank: true,
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
			return initialState;
		default:
			return state;
	}
};
