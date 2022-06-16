import { Button, Card, CardContent, Typography } from '@mui/material';
import Logo from 'img/logo_1000pagos_blanco.svg';
import React, { useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { urlNewPassword, urlRestorePassword } from 'routers/url';
import { useStylesModalUser } from './styles';

const sxStyles = {
	borderRadius: '2rem',
	maxWidth: '80vw',
	marginTop: '1.5rem',
} as const;

const AuthModal: React.FC<any> = ({ children, name, register }) => {
	const classes = useStylesModalUser();

	const history = useHistory();

	const [newpass, setNewPass] = useState<boolean>(false);
	const [url, setUrl] = useState('');

	useLayoutEffect(() => {
		const urlUser = history.location.pathname;
		urlUser === urlNewPassword
			? setNewPass(true)
			: urlUser === urlRestorePassword
			? setNewPass(true)
			: setNewPass(false);
		setUrl(history.location.pathname);

		// setUrl(history);
	}, [history.location.pathname, url]);

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
							{newpass ? (
								<Button
									size='small'
									color='primary'
									variant='contained'
									onClick={() => history.push(`/auth/${newpass ? 'login' : !register ? 'register' : 'login'}`)}>
									<span className={classes.buttonText}>{'Volver al Inicio'}</span>
								</Button>
							) : (
								<Button
									size='small'
									color='primary'
									variant='contained'
									onClick={() => history.push(`/auth/${newpass ? 'login' : !register ? 'register' : 'login'}`)}>
									<span className={classes.buttonText}>{!register ? 'Registrarme ' : 'Volver al Inicio'}</span>
								</Button>
							)}
						</div>
						{/*
							url === urlLogin && (
							<div className={classes.buttonRight}>
								<Button
									size='small'
									color='primary'
									variant='contained'
									onClick={() => history.push(urlNewPassword)}>
									<span className={classes.buttonText}>Olvide Contraseña</span>
								</Button>
							</div>
						)
						*/}
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default AuthModal;
