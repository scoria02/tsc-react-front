import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';
import { calendarReducer } from './calendarReducer';
import { authReducer } from './authReducer';
import { callReducer } from './callReducer';
import { userControlReducer } from './userControlReducer';
import { puntoConsultaReducer } from './puntoConsultaReducer'



export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer,
    call: callReducer,
    userControl: userControlReducer,
    puntoConsulta: puntoConsultaReducer
})

