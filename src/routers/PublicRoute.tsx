import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
// import * as intf from '../interfaces';
import { Router } from '../interfaces';

export const PublicRoute: React.FC<Router.Protected> = ({ component, isAuthenticated, ...rest }) => {
	const routeComponent = (props: any) =>
		isAuthenticated ? <Redirect to={{ pathname: '/' }} /> : React.createElement(component, props);
	return <Route {...rest} render={routeComponent} />;
};

PublicRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
};
