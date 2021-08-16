import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import { Router } from '../interfaces';

export const PrivateRoute: React.FC<Router.Protected> = ({ component, isAuthenticated, ...rest }: any) => {
	const routeComponent = (props: any) =>
		isAuthenticated ? React.createElement(component, props) : <Redirect to={{ pathname: '/auth/login' }} />;
	return <Route {...rest} render={routeComponent} />;
};

PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
};
