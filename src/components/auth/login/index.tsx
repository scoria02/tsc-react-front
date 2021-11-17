import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import { useForm, SubmitHandler } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../../../routers/url';
//import luffy from '../../../img/itachi2.png';
import { startLogin } from '../../../store/actions/auth';
import AuthModal from '../AuthModal';
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
	const dispatch = useDispatch();
	const history = useHistory();

	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const [password, setPass] = useState<string>('');
	const [email, setEmail] = useState<string>('');

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

	const handleLogin = (e: any) => {
		e.preventDefault();
		dispatch(startLogin(email, password));
		history.push(baseUrl);
	};

	return (
		<AuthModal register={false} name='Ingresar al BackOffice'>
			<div className={classes.containerRight}>
				<form onSubmit={handleLogin} className={classesbutton.root} autoComplete='off'>
					<div className='ed-container'>
						<TextField
							className={classes.input}
							id='email'
							name='email'
							label='Email'
							variant='outlined'
							type='email'
							onChange={handleUsernameChange}
						/>
						<TextField
							id='password'
							className={classes.input}
							name='password'
							onChange={handlePasswordChange}
							label='Contraseña'
							type={showPassword ? 'text' : 'password'}
							autoComplete='current-password'
							variant='outlined'
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onMouseDown={() => setShowPassword(!showPassword)}
											onMouseUp={() => setShowPassword(!showPassword)}
											edge='end'>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<div className={classes.inputButton}>
							<Button className={classes.buttonLogin} type='submit' variant='outlined' color='primary'>
								Entrar
							</Button>
						</div>
					</div>
				</form>
			</div>
		</AuthModal>
	);
};

export default Login;
