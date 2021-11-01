import {BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
import {AuthRouter} from './AuthRouter';
import Home from '../pages/Home2';
import {PublicRoute} from './PublicRoute';
import {PrivateRoute} from './PrivateRoute';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

//Redux
import {refreshLogin} from '../store/actions/auth';
import {FinishLoading} from '../store/actions/ui';

export const AppRouter = () => {
	const dispatch = useDispatch();

	const [checking, setChecking] = useState<boolean>(true);
	// const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const {loading} = useSelector((state: any) => state.ui);

	useEffect(() => {
		dispatch(FinishLoading());
		// setIsLoggedIn(false);
		let token = localStorage.getItem('token');
		if (token) dispatch(refreshLogin());
		setChecking(false);
	}, [dispatch]);

	// const setChecking = false;
	if (checking) {
		return <h1>Wait...</h1>;
	}
	// const isLoggedIn = false;

	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute path='/auth' component={AuthRouter} isAuthenticated={loading} />

					<PrivateRoute isAuthenticated={loading} path='/' component={Home} />

					<Redirect to='/auth/login' />
				</Switch>
			</div>
		</Router>
	);
};
