import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import Home from '../pages/Home';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
	// const dispatch = useDispatch();

	// const [checking, setChecking] = useState(true);
	// const [isLoggedIn, setIsLoggedIn] = useState(false);

	// useEffect(() => {
	// 	dispatch(login());
	// 	setIsLoggedIn(false);
	// 	setChecking(false);
	// }, [dispatch]);

	const setChecking = false;
	if (setChecking) {
		return <h1>Wait...</h1>;
	}
	const isLoggedIn = false;

	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute path='/auth' component={AuthRouter} isAuthenticated={isLoggedIn} />

					<PrivateRoute isAuthenticated={isLoggedIn} path='/' component={Home} />

					<Redirect to='/auth/login' />
				</Switch>
			</div>
		</Router>
	);
};
