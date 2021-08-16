import { types } from '../types/types';
// {
//     {
//     "tipo_solicitud": "Solicitud",
//     "tipo_llamada": "Solicitud (Cliente en lista de espera)",
//     "descripcion": "Prueba 1",
//     "num_rif_ci": "10456985",
//     "nombre_cliente": "pepe grillo",
//     "direccion": "cercas",
//     "id_user": "8",
//     "nombre_user": "Gohan",
//     "estado": "Nueva"
    // }
// }

const initialState = {
    calls: [],
    findClient: {
        id: 0,
        name: '',
        phone: '',
        location: ''
    },
    typeReqCall: [],
    desReqCall: []
};


export const callReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.callSetActive:
            return {
                ...state,
                callForm: action.payload
            }
        

        case types.callsLoaded:
            return {
                ...state,
                calls: [...action.payload ]
            }

        case types.callsFindLoaded:
            return {
                ...state,
                findClient: {...action.payload }
            }

        case types.callsFindTypesReqLoaded:
            return {
                ...state,
                typeReqCall: [...action.payload]
            }
        case types.callsFindDesReqLoaded:
             return {
                ...state,
                desReqCall: [...action.payload]
             }       
            
        case types.callsLogout:
            return {
                ...state,
                ...initialState
            }
            
        case  types.callAddNew:
            return {
                ...state,
                calls: [ action.payload, ...state.calls ]
            }
        default:
            return state;
    }


}
