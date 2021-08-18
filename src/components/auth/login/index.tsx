import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import './index.scss';
import luffy from '../../../img/itachi2.png';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 400,
		width: 345,
	},
});

const useStylesButton = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
				width: '95%',
			},
		},
	})
);

const Login: React.FC = () => {
	const classesbutton = useStylesButton();
	const classes = useStyles();
	// const dispatch = useDispatch();

	const [formValues, handleInputChange] = useState({
		email: '',
		password: '',
	});

	const { email, password }: any = formValues;

	const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		handleInputChange(e.target.value);
		console.log(e.target.value);
	};

	const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		handleInputChange(e.target.value);
		console.log(e.target.value);
	};

	const handleLogin = (e: any): void => {
		e.preventDefault();
		console.log(email, password);
		// dispatch(startLoginEmailPassword(email, password));
	};

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia className={classes.media} image={luffy} title='Rey de los Piratas' />
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2' align='center'>
						Ingresar
					</Typography>
					<div>
						<form onSubmit={handleLogin} className={classesbutton.root} autoComplete='off'>
							<TextField
								id='email'
								name='email'
								label='Email'
								variant='outlined'
								value={email}
								onChange={handleUsernameChange}
							/>
							<TextField
								id='password'
								name='password'
								label='Password'
								variant='outlined'
								type='password'
								value={password}
								onChange={handlePasswordChange}
							/>

							<Button type='submit' variant='outlined' color='primary'>
								Entrar
							</Button>
						</form>
					</div>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size='small' color='primary'>
					recuperar clave
				</Button>
				<Button size='small' color='primary'>
					<Link to='/auth/register'> Registrarte </Link>
				</Button>
			</CardActions>
		</Card>
	);
};

export default Login;
