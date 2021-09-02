import { ActionType } from '../types/types';

const initialState = {
  alert: null
}

export function alertReducer(state = initialState, action: any) {
  switch(action.type){
	case ActionType.showAlert:
	  return {
			...state,
			alert: action.payload
	  }
	case ActionType.hiddenAlert:
	  return {
			...state,
			alert: null
	  }
	default:
	  return state;
	}
}
