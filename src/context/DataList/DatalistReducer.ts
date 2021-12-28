import { 
	INIT_LIST
} from './types'

const DataListReducer = (state: any, action:any) => {
  const {payload, type} = action;
  switch(type){
    case INIT_LIST:
      return {
        ...state,
        listIdentType: payload[0].data.info,
        listActivity: payload[1].data.info,
        listPayment: payload[2].data.info,
        listModelPos: payload[3].data.info,
      }
    default:
      return state;
  }
}

export default DataListReducer
;
