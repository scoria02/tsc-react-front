import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import { useForm, SubmitHandler } from 'react-hook-form';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import luffy from '../../../img/itachi2.png';
import { startLogin } from '../../../store/actions/auth';
// import { useForm } from '../../../hooks/useForm';
import { useStylesModalUser } from '../styles';
import './index.scss';

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
	const classes = useStylesModalUser();

	// const { register, handleSubmit, control } = useForm();

	const history = useHistory();

	const dispatch = useDispatch();

	// const [formValues, handleInputChange] = useForm({
	// 	email: '',
	// 	password: '',
	// });

	const [email, setEmail] = useState<string>('');
	const [password, setPass] = useState<string>('');

	// const { email, password }: any = formValues;

	const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
		//console.log(e.target.value);
	};

	const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		setPass(e.target.value);
		//console.log(e.target.value);
	};

	const handleLogin = (e: any): void => {
		e.preventDefault();
		dispatch(startLogin(email, password));
		//console.log(email, password);
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
									type='email'
									// value={'leomerida15@gmail.com'}
									onChange={handleUsernameChange}
								/>
								<TextField
									id='password'
									name='password'
									label='Password'
									variant='outlined'
									type='password'
									// value={'Test123.'}
									onChange={handlePasswordChange}
								/>
								<Button type='submit' variant='outlined' color='primary'>
									Entrar
								</Button>
								<div className='ed-grid s-grid-2'>
									<Button
										size='small'
										color='primary'
										variant='contained'
										onClick={() => history.push('/auth/register')}>
										<div className='ed-container'>
											<div className='s-to-center'>Registrarte</div>
										</div>
									</Button>
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
