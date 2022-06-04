import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//Material
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startLogin } from 'store/actions/auth/auth';
import AuthModal from '../AuthModal';
import { styledMui, useStylesModalUser } from '../styles';

const Login: React.FC = () => {
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
	};

	const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		setPass(e.target.value);
		//console.log(e.target.value);
	};

	const handleLogin = (e: any) => {
		e.preventDefault();
		dispatch(startLogin(email, password, history));
		// history.push(baseUrl);
	};

	return (
		<AuthModal register={false} name='BackOffice'>
			<form onSubmit={handleLogin} autoComplete='off'>
				<div className={classes.containerLogin}>
					<TextField
						sx={styledMui.inputStyle}
						className={classes.input}
						id='email'
						name='email'
						label='Correo'
						variant='outlined'
						type='email'
						onChange={handleUsernameChange}
					/>
					<TextField
						sx={styledMui.inputStyle}
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
						<Button className={classes.buttonLogin} type='submit' variant='contained'>
							Ingresar
						</Button>
					</div>
				</div>
			</form>
		</AuthModal>
	);
};

export default Login;
