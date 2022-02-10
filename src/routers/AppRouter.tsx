/* eslint-disable react-hooks/exhaustive-deps */
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { GuardedRoute, GuardProvider } from 'react-router-guards';
import LoaderPrimary from '../components/loaders/LoaderPrimary';
import MainMenu from '../components/MainMenu';
import Logo from '../img/logo_1000pagos_blanco.svg';
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
		display: 'flex',
		justifyContent: 'center',
		margin: 0,
		height: '100vh',
		width: '100vw',
		backgroundColor: '#5c62c5',
	},
}));

export interface CobranzaContextProps {
	menu: any;
	setMenu: React.Dispatch<React.SetStateAction<{}>>;
}
export const ApprouterContext = createContext<CobranzaContextProps>({
	menu: '',
	setMenu: () => {},
});

export const AppRouter = () => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const { loading } = useSelector((state: any) => state.ui);
	const { user } = useSelector((state: any) => state.auth);
	const [checking, setChecking] = useState<boolean>(true);
	const [menu, setMenu] = useState<any>('');

	const isPrivate = () => {
		const is = urlPrivate.findIndex((val) => {
			return val === window.location.pathname;
		});
		return is !== -1;
	};

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
		if (user !== undefined && Object.keys(user).length) {
			const { id_department } = user;
			setMenu(`${id_department.name}`);
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
						{loading && Object.keys(user).length ? (
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
									<img
										src={Logo}
										alt='Logo'
										style={{
											position: 'absolute',
											top: '0',
											padding: 0,
											margin: 0,
											width: '500px',
											height: '150px',
											//background: 'red',
											objectFit: 'cover',
											objectPosition: '20% 45%' /* try 20px 10px */,
										}}
									/>
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
