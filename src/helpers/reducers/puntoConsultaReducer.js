import { types } from '../types/types';


const initialState = {
    plan: [],
    termClient: []
};


export const puntoConsultaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.puntoConsultaPlanLoaded:
            return {
                ...state,
                plan: [...action.payload ]
            }
        
        case types.puntoConsultaTermLoaded:
            return {
                ...state,
                termClient: [...action.payload ]
            }

       
        default:
            return state;
    }


}
