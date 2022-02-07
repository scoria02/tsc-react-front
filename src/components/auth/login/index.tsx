import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
//Material
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { useStylesModalUser, styledMui } from '../styles';
import { startLogin } from '../../../store/actions/auth';
import AuthModal from '../AuthModal';

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
			<div className={classes.containerRight}>
				<form onSubmit={handleLogin} autoComplete='off'>
					<div className='ed-container'>
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
			</div>
		</AuthModal>
	);
};

export default Login;
