import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../components/auth/login';

// import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
	return (
		<div className='auth__main'>
			<div className=''>
				<Switch>
					<Route exact path='/auth/login' component={Login} />
					<Route exact path='/auth/register' component={RegisterScreen} />
					<Redirect to='/auth/login' />
				</Switch>
			</div>
		</div>
	);
};
