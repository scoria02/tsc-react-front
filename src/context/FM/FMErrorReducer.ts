import { 
  CHANGE_ErrorFM,
  SET_ErrorFM,
} from './type';

const FMErrorReducer = (state: any, action:any) => {
  const {payload, type} = action;
  switch(type){
    case CHANGE_ErrorFM: 
      return {
        ...state,
        fmDataError: {
          ...state.fmDataError,
          [payload.name]: payload.value,
        },
      }
    case SET_ErrorFM: 
      return {
        ...state,
        fmDataError: payload,
      }
    default:
      return state;
  }
}

export default FMErrorReducer;
