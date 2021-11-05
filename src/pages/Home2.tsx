import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// import { Route } from 'react-router-dom';
import Admision from '../components/Admision';
import { FormMaldito } from '../components/formMaldito';
import MainMenu from '../components/MainMenu';
import { baseUrl, urlAdministracion, urlAdmision, urlCobr, urlFM, userAdmin } from '../routers/url';
import Administracion from './Administracion';
import Cobranza from './Cobranza';
import GestionUsuarios from './GestionUsuarios';
//Components
import Inicio from './Home';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			// '& > *': {
			// 	margin: theme.spacing(1),
			// },
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
			marginTop: 64,
		},
	})
);

const ruta = localStorage.getItem('path') || '/';

const Home: React.FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{/* <CssBaseline /> */}
			<MainMenu />
			<main className={classes.content}>
				<Route exact path={urlCobr} component={Cobranza} />
				<Route exact path={urlAdministracion} component={Administracion} />
				<Route exact path={urlAdmision} component={Admision} />
				<Route exact path={urlFM} component={FormMaldito} />
				<Route exact path={userAdmin} component={GestionUsuarios} />
				<Route exact path={baseUrl} component={Inicio} />
				<Redirect to={ruta} />
			</main>
		</div>
	);
};

export default Home;
