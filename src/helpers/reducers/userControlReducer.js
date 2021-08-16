import { types } from '../types/types';

const initialState = {
    userControlFind: null,
}

export const userControlReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        
        case types.userControlFindLoaded:
            return {
                ...state,
                userControlFind: {...action.payload}
            }
        

        default:
            return state;
    }

}


