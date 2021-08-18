import { RouteProps } from 'react-router-dom';

export interface Protected extends RouteProps {
	isAuthenticated: boolean;
	component: React.FC;
}

export interface Types {
	uiOpenModal: string;
	uiCloseModal: string;

	login: string;
	logout: string;

	uiSetError: string;
	uiRemoveError: string;

	uiStartLoading: string;
	uiFinishLoading: string;
}
