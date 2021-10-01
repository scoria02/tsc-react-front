import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { Route } from 'react-router-dom';
import Admision from '../components/Admision';
import { FormMaldito } from '../components/formMaldito';
import GestionUsuarios from '../components/GestionUsuarios';
import MainMenu from '../components/MainMenu';
import { baseUrl, urlAceptacion, urlFM } from '../routers/url';
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

const Home: React.FC = () => {
	const classes = useStyles();

	const [selectedIndex, setSelectedIndex] = React.useState(0);

	return (
		<div className={classes.root}>
			{/* <CssBaseline /> */}
			<MainMenu />
			<main className={classes.content}>
				<Route
					path={urlAceptacion}
					exact
					render={() => {
						return <Admision />;
					}}
				/>
				<Route
					path={urlFM}
					exact
					render={() => {
						return <FormMaldito setSelectedIndex={setSelectedIndex} />;
					}}
				/>
				{selectedIndex === 4 && <GestionUsuarios />}
				<Route
					exact
					path={baseUrl}
					render={() => {
						return <Inicio />;
					}}
				/>
			</main>
		</div>
	);
};

export default Home;
