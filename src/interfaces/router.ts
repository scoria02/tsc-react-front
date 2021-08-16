import { RouteProps } from 'react-router-dom';

export interface Protected extends RouteProps {
	isAuthenticated: boolean;
	component: React.FC;
}
