import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Milpago from '../img/1000pagos_LogoBlue.png';

interface HomeInt {
	prueba?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
	base: {
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '2rem',
	},
	title: {
		fontSize: 40,
		padding: '1rem 0',
	},
	subtitle: {
		fontSize: 24,
		padding: '1rem',
	},
	logo: {
		width: '50%',
		margin: '2rem 0',
	},
}));
const Inicio: React.FC<HomeInt> = ({ prueba }) => {
	const classes = useStyles();

	return (
		<>
			<div className='ed-container'>
				<div className={classes.base}>
					<img src={Milpago} className={classes.logo} alt='logo milpagos' />
					<div className={classes.title}>Bienvenido al BackOffice</div>
					<div className={classes.subtitle}>Haga click en el menu superior izquierdo para navegar</div>
				</div>
			</div>
		</>
	);
};

export default Inicio;
