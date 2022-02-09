import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useStylesModalUser } from './styles';
//import logo from '../../img/logo_1000pagos.svg';

const AuthModal: React.FC<any> = ({ children, name, register }) => {
	const classes = useStylesModalUser();

	const history = useHistory();

	return (
		<Card className={classes.root}>
			<CardContent>
				<div className={classes.containerAuthModal}>
					<Typography gutterBottom variant='h5' component='h2' align='center' className={register ? '' : 'toto'}>
						<b>{name}</b>
					</Typography>
					<div>{children}</div>
					<div className={classes.buttonLeft}>
						<Button
							size='small'
							color='primary'
							variant='contained'
							onClick={() => history.push(`/auth/${!register ? 'register' : 'login'}`)}>
							<span className={classes.buttonText}>{!register ? 'Registrarme ' : 'Volver al Inicio'}</span>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default AuthModal;
