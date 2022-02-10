import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
//import logo from '../../img/user.png';
import logo from '../../img/logo_1000pagos.svg';
import './login/index.scss';
import { useStylesModalUser } from './styles';

const AuthModal: React.FC<any> = ({ children, name, register }) => {
	const classes = useStylesModalUser();

	const history = useHistory();

	return (
		<Card className={classes.root}>
			<CardContent>
				<div className='ed-grid s-grid-1 m-grid-2'>
					<div className={classes.containerLeft}>
						<CardMedia className={classes.media} image={logo} title='Logo 1000Pagos' />
						<Button
							className={classes.buttonLeft}
							size='small'
							color='primary'
							variant='contained'
							onClick={() => history.push(`/auth/${!register ? 'register' : 'login'}`)}>
							<div className='ed-container'>
								<div className='s-to-center button-login'>{!register ? 'Registrarme ' : 'Volver al Inicio'}</div>
							</div>
						</Button>
					</div>
					<CardContent>
						<div className='s-py-4'>
							<Typography
								gutterBottom
								variant='h5'
								component='h2'
								align='center'
								className={register ? '' : 'toto'}>
								<b>{name}</b>
							</Typography>
						</div>
						<div>{children}</div>
					</CardContent>
				</div>
			</CardContent>
		</Card>
	);
};

export default AuthModal;
