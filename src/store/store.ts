import { uiReducer } from './reducers/uiReducer';
import { authReducer } from './reducers/authReducer';
import { alertReducer as alert } from './reducers/alert';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { acceptReducer } from './reducers/acceptReducer';
import { fmReducer } from './reducers/fmReducer';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
	ui: uiReducer,
	auth: authReducer,
	alert: alert,
	acceptance: acceptReducer,
	fm: fmReducer
});

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof reducers>;
