import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Material
import { Typography, SnackbarContent, Snackbar, IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import Alert from '../../../alert/Alert1';

//validation
import { checkErrorInput } from '../validationForm';

//Styles
import { useStylesModalUser, styledMui } from '../../styles';

//Redux
import { RootState } from '../../../../store/store';
import { validationEmail } from '../../../../store/actions/auth';

import { Interface_RegisterUser, Interface_RegisterUserError, Interface_ErrorPass } from '../../interfaceAuth';

interface Props {
	userForm: Interface_RegisterUser; //json
	userFormError: Interface_RegisterUserError; //json
	errorPassword: Interface_ErrorPass;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Step1: React.FC<Props> = ({ userForm, userFormError, errorPassword, handleChange }) => {
	const dispatch = useDispatch();

	//selector
	const auth: any = useSelector((state: RootState) => state.auth);

	//State
	const [open, setOpen] = React.useState(false); //Show errors Password
	const [showPassword, setShowPassword] = React.useState<boolean>(false);

	const classes = useStylesModalUser();

	//Handles
	const handleBlurEmail = (email: string) => {
		if (userForm.email.trim() !== '') {
			dispatch(validationEmail(email));
		}
	};

	return (
		<>
			<TextField
				required
				className={classes.input}
				sx={styledMui.inputStyle}
				name='email'
				onChange={handleChange}
				onBlur={() => handleBlurEmail(userForm.email)}
				type='email'
				label='Correo'
				placeholder='correo@correo.com'
				value={userForm.email}
				variant='outlined'
				autoComplete='email'
				error={userFormError.email || checkErrorInput('email', auth.error)}
			/>
			<TextField
				id='password'
				className={classes.input}
				sx={styledMui.inputStyle}
				name='password'
				onFocus={() => setOpen(true)}
				onBlur={() => setOpen(false)}
				onChange={handleChange}
				value={userForm.password}
				label='Contraseña'
				placeholder='*********'
				type={showPassword ? 'text' : 'password'}
				autoComplete='current-password'
				variant='outlined'
				error={userFormError.password}
			/>
			<Snackbar
				open={open && (errorPassword.rango || errorPassword.mayus || errorPassword.sig || errorPassword.minus)}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}>
				<SnackbarContent
					style={{ padding: '0', margin: '0', height: 0 }}
					message={
						<Alert>
							<Typography
								className={classes.textM}
								style={{ display: `${errorPassword.rango ? 'block' : 'none'}` }}>
								<span>&#8226;</span> Entre 8 a 12 carateres
							</Typography>
							<Typography
								className={classes.textM}
								style={{ display: `${errorPassword.mayus ? 'block' : 'none'}` }}>
								<span>&#8226;</span> Al menos una MAYUSCULA
							</Typography>
							<Typography
								className={classes.textM}
								style={{ display: `${errorPassword.minus ? 'block' : 'none'}` }}>
								<span>&#8226;</span> Al menos 1 minuscula
							</Typography>
							<Typography className={classes.textM} style={{ display: `${errorPassword.sig ? 'block' : 'none'}` }}>
								<span>&#8226;</span> Al menos 1 carater (#,$,*,@,!...)
							</Typography>
						</Alert>
					}
				/>
			</Snackbar>
			<TextField
				id='confirmPassword'
				className={classes.input}
				sx={styledMui.inputStyle}
				value={userForm.confirmPassword}
				onFocus={() => setOpen(true)}
				onBlur={() => setOpen(false)}
				name='confirmPassword'
				onChange={handleChange}
				placeholder='*********'
				label='Comfirmar Contraseña'
				type='password'
				autoComplete='current-password'
				variant='outlined'
				error={userFormError.confirmPassword}
			/>
		</>
	);
};
