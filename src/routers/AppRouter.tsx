/* eslint-disable react-hooks/exhaustive-deps */
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isPrivate } from 'hooks/Functions';
import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import { Views } from 'store/reducers/interfaceAuth';
import LoaderPrimary from '../components/loaders/LoaderPrimary';
import MainMenu from '../components/MainMenu';
//Redux
import { refreshLogin } from '../store/actions/auth';
import { FinishLoading } from '../store/actions/ui';
import { Auth, PrivGuard } from './guards';
import Private from './routes/private';
import Public from './routes/public';
import { urlLogin } from './url';

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
		display: 'flex',
		justifyContent: 'center',
		margin: 0,
		height: '100vh',
		width: '100vw',
		backgroundColor: '#5c62c5',
	},
}));

export interface AppRouterContext_Int {
	menu: Views;
	setMenu: React.Dispatch<React.SetStateAction<Views>>;
}
export const ApprouterContext = createContext<AppRouterContext_Int>({
	menu: {},
	setMenu: () => {},
});

export const AppRouter = () => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const { loading } = useSelector((state: any) => state.ui);
	const { user } = useSelector((state: any) => state.auth);
	const [checking, setChecking] = useState<boolean>(true);
	const [menu, setMenu] = useState<Views>({});

	useLayoutEffect(() => {
		dispatch(FinishLoading());
		let token = localStorage.getItem('token');
		if (token !== null) dispatch(refreshLogin());
		setChecking(false);
	}, [dispatch]);

	useEffect(() => {
		if (localStorage.getItem('token') === null && isPrivate()) {
			window.location.replace(urlLogin);
		}
	}, []);

	useEffect(() => {
		if (user) {
			setMenu(user.views);
		}
	}, [user]);

	if (checking) {
		return <LoaderPrimary />;
	}

	return (
		<BrowserRouter>
			<ApprouterContext.Provider value={{ menu, setMenu }}>
				<GuardProvider guards={[Auth]}>
					<Switch>
						{loading && user ? (
							<>
								<div className={classes.root}>
									<MainMenu />
									<main className={classes.content}>
										<GuardProvider guards={[(to, from, next): void => PrivGuard(to, from, next, user, setMenu)]}>
											{Private.map(({ path, component, meta }, i) => {
												return <GuardedRoute key={i} exact path={path} component={component} meta={meta} />;
											})}
										</GuardProvider>
									</main>
								</div>
							</>
						) : (
							<>
								<div className={classes.auth}>
									{Public.map(({ component, meta, path }, i) => {
										return <GuardedRoute key={i} exact path={path} component={component} meta={meta} />;
									})}
								</div>
							</>
						)}
						<Redirect to={urlLogin} />
					</Switch>
				</GuardProvider>
			</ApprouterContext.Provider>
		</BrowserRouter>
	);
};
