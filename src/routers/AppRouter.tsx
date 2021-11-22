import { makeStyles, Theme } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import LoaderPrimary from '../components/loaders/LoaderPrimary';
import MainMenu from '../components/MainMenu';
//Redux
import { refreshLogin } from '../store/actions/auth';
import { FinishLoading } from '../store/actions/ui';
import { Auth, PrivGuard } from './guards';
import Private from './routes/private';
import Public from './routes/public';
import { urlLogin, urlPrivate } from './url';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		marginTop: 64,
	},
	auth: {
		alignItems: 'center',
		backgroundColor: '#5c62c5',
		display: 'flex',
		justifyContent: 'center',
		margin: 0,
		height: '100vh',
		width: '100vw',
	},
}));

export const AppRouter = () => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const [checking, setChecking] = useState<boolean>(true);
	const { loading } = useSelector((state: any) => state.ui);
	const { user } = useSelector((state: any) => state.auth);

	useEffect(() => {
		dispatch(FinishLoading());
		let token = localStorage.getItem('token');
		if (token !== null) dispatch(refreshLogin());
		setChecking(false);
	}, [dispatch]);

	const isPrivate = () => {
		const is = urlPrivate.findIndex((val) => {
			return val === window.location.pathname;
		});
		return is !== -1;
	};
	useEffect(() => {
		if (localStorage.getItem('token') === null && isPrivate()) {
			window.location.replace(urlLogin);
		}
	}, []);

	if (checking) {
		return <LoaderPrimary />;
	}

	return (
		<BrowserRouter>
			<GuardProvider guards={[Auth]}>
				<Switch>
					{!loading && (
						<div className={classes.auth}>
							{Public.map(({ component, meta, path }, i) => {
								return <GuardedRoute key={i} exact path={path} component={component} meta={meta} />;
							})}
						</div>
					)}
					{loading && (
						<div className={classes.root}>
							<MainMenu />
							<main className={classes.content}>
								<GuardProvider guards={[(to, from, next): void => PrivGuard(to, from, next, user)]}>
									{Private.map(({ path, component, meta }, i) => {
										return <GuardedRoute key={i} exact path={path} component={component} meta={meta} />;
									})}
								</GuardProvider>
							</main>
						</div>
					)}
					<Redirect to={urlLogin} />
				</Switch>
			</GuardProvider>
		</BrowserRouter>
	);
};
