import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../img/logo_1000pagos_blanco.svg';
import { useStylesModalUser } from './styles';

const sxStyles = {
	borderRadius: '2rem',
	maxWidth: '80vw',
	marginTop: '1.5rem',
} as const;

const AuthModal: React.FC<any> = ({ children, name, register }) => {
	const classes = useStylesModalUser();

	const history = useHistory();

	return (
		<>
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
					objectFit: 'cover',
					objectPosition: '20% 45%' /* try 20px 10px */,
				}}
			/>
			<Card sx={sxStyles}>
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
		</>
	);
};

export default AuthModal;
