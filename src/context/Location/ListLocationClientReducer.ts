import { 
  SET_ESTADO,
  SET_MUNICIPIO,
  SET_CIUDAD,
  SET_PARROQUIA,
  COPY_LOCATION,
} from './types';

const ListLocationClientReducer = (state: any, action:any) => {
  const {payload, type} = action;
  switch(type){
    case SET_ESTADO: 
      return {
        estado: payload,
        municipio: [],
        ciudad: [],
        parroquia: [],
      }
    case SET_MUNICIPIO: 
      return {
        ...state,
        municipio: payload,
        ciudad: [],
        parroquia: [],
      }
    case SET_CIUDAD: 
      return {
        ...state,
        ciudad: payload,
        parroquia: [],
      }
    case SET_PARROQUIA: 
      return {
        ...state,
        parroquia: payload
      }
    case COPY_LOCATION: 
      return {
        estado: payload.estado,
        municipio: payload.municipio,
        ciudad: payload.ciudad,
        parroquia: payload.parroquia,
      }
    default:
      return state;
  }
}

export default ListLocationClientReducer;
