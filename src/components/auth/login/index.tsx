import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import { useForm, SubmitHandler } from 'react-hook-form';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import './index.scss';
import luffy from '../../../img/itachi2.png';
// import { useForm } from '../../../hooks/useForm';

const useStyles = makeStyles({
	root: {
		// maxWidth: 345,
	},
	media: {
		height: 400,
		width: 400,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
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

	// const { register, handleSubmit, control } = useForm();

	// const history = useHistory();

	// const dispatch = useDispatch();

	// const [formValues, handleInputChange] = useForm({
	// 	email: '',
	// 	password: '',
	// });

	const [email, setEmail] = useState<string>('');
	const [pass, setPass] = useState<string>('');

	// const { email, password }: any = formValues;

	const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
		console.log(e.target.value);
	};

	const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		setPass(e.target.value);
		console.log(e.target.value);
	};

	const handleLogin = (e: any): void => {
		e.preventDefault();
		console.log(email, pass);
		// dispatch(startLoginEmailPassword(email, password));
	};

	return (
		<Card className={classes.root}>
			<CardContent>
				<div className='ed-grid s-grid-1 m-grid-2 '>
					{' '}
					<div className='ed-container'>
						<div className='s-to-center'>
							{' '}
							<CardMedia className={classes.media} image={luffy} title='Rey de los Piratas' />
						</div>
					</div>
					<CardContent>
						<div className='s-py-4'>
							<Typography gutterBottom variant='h5' component='h2' align='center'>
								Ingresar
							</Typography>
						</div>
						<div>
							<form onSubmit={handleLogin} className={classesbutton.root} autoComplete='off'>
								<TextField
									id='email'
									name='email'
									label='Email'
									variant='outlined'
									// value={email}
									onChange={handleUsernameChange}
								/>
								<TextField
									id='password'
									name='password'
									label='Password'
									variant='outlined'
									type='password'
									// value={pass}
									onChange={handlePasswordChange}
								/>
								<Button type='submit' variant='outlined' color='primary'>
									Entrar
								</Button>

								<div className='ed-grid s-grid-2'>
									{/* <Button size='small' color='primary'>
										<div className='ed-container'>
											<div className='s-to-center'>recuperar clave</div>
										</div>
									</Button>
									<Button size='small' color='primary' onClick={() => history.push('/auth/register')}>
										<div className='ed-container'>
											<div className='s-to-center'>Registrarte</div>
										</div>
									</Button> */}
								</div>
							</form>
						</div>
					</CardContent>
				</div>
			</CardContent>
		</Card>
	);
};

export default Login;
