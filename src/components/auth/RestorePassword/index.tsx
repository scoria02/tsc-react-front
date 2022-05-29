/* eslint-disable react-hooks/exhaustive-deps */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Button,
	IconButton,
	InputAdornment,
	Snackbar,
	SnackbarContent,
	TextField,
	Typography,
} from '@mui/material';
import Alert from 'components/alert/Alert1';
import useAxios from 'config/index';
import { FC, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { baseUrl } from 'routers/url';
import { refreshLogin, updateToken } from 'store/actions/auth';
import { StartLoading } from 'store/actions/ui';
import Swal from 'sweetalert2';
import { capitalizedFull } from 'utils/formatName';
import AuthModal from '../AuthModal';
import { Interface_ErrorPass, Interface_RegisterUserError } from '../interfaceAuth';
import { validSamePass } from '../register/validationForm';
import { styledMui, useStylesModalUser } from '../styles';

interface IRestorePassword {
	token: string;
}

const RestorePassword: FC<IRestorePassword> = ({ token }) => {
	const classes = useStylesModalUser();
	const history = useHistory();
	const dispatch = useDispatch();
	const [userForm, setUserForm] = useState({
		password: '',
		confirmPassword: '',
	});
	const [tokenURL, setToken] = useState('');
	const [open, setOpen] = useState(false); //Show errors Password
	const [isSamePass, setIsSamePass] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [errorPassword, setErrorPassword] = useState<Interface_ErrorPass>({
		rango: true,
		mayus: true,
		minus: true,
		sig: true,
	});
	const [userFormError, setUserFormError] = useState<Interface_RegisterUserError>({
		email: false,
		password: false,
		confirmPassword: false,
		name: false,
		last_name: false,
		id_ident_type: false,
		ident_num: false,
		phone: false,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let value =
			event.target.name === 'name' || event.target.name === 'last_name'
				? capitalizedFull(event.target.value)
				: event.target.value;
		setUserForm({
			...userForm,
			[event.target.name]: value,
		});
		validateForm(event.target.name, value);
	};

	const validateForm = (name: string, value: any) => {
		let temp: Interface_RegisterUserError = { ...userFormError };
		switch (name) {
			//step1
			case 'password':
				let temPass: Interface_ErrorPass = { ...errorPassword };
				//Rango Password
				if (value.length < 8 || value.length > 12) temPass.rango = true;
				else temPass.rango = false;

				//Tenga 1 Mayuscula
				if (!/([A-Z]+)/g.test(value)) temPass.mayus = true;
				else temPass.mayus = false;

				//Al menos una minuscula
				if (!/([a-z]+)/g.test(value)) temPass.minus = true;
				else temPass.minus = false;

				//Al menos un signo
				if (!/[^a-z0-9\x20]/i.test(value)) temPass.sig = true;
				else temPass.sig = false;

				//No tenga ningun Error
				if (temPass.rango || temPass.mayus || temPass.sig || temPass.minus) temp.password = true;
				else temp.password = false;

				if (userForm.confirmPassword.trim() !== '')
					temp.confirmPassword = !validSamePass(value, userForm.confirmPassword);
				setErrorPassword({
					...temPass,
				});
				break;
			case 'confirmPassword':
				temp.confirmPassword = !validSamePass(userForm.password, value);
				break;
			//step2
			default:
				break;
		}
		setUserFormError({
			...temp,
		});
	};

	const handleNewPass = async (e: any) => {
		e.preventDefault();
		const { password } = userForm;
		const payload = { token: tokenURL, password };
		try {
			const resp = await useAxios.post(`/auth/passrenew/`, payload);
			console.log('resp', resp.data.info.token);
			updateToken(resp);
			dispatch(refreshLogin());
			history.push(baseUrl);
			dispatch(StartLoading());
			Swal.fire({
				icon: 'success',
				title: '¡Éxito!',
				html: `<p>Bienvenido nuevamente</p>`,
				showConfirmButton: false,
				timer: 2500,
			});
			// .then((resp) => setMessage(resp.data.info));
		} catch (error) {}
	};

	useLayoutEffect(() => {
		setToken(token.split('?token=')[1]);
		setIsSamePass(userForm.password === '' || !validSamePass(userForm.password, userForm.confirmPassword));
	}, [token, userFormError]);

	return (
		<>
			<AuthModal register={false} name='Nueva Contraseña'>
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
								<Typography
									className={classes.textM}
									style={{ display: `${errorPassword.sig ? 'block' : 'none'}` }}>
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
				<div className={classes.inputButton}>
					<Button sx={styledMui.buttonLogin} onClick={handleNewPass} variant='contained' disabled={isSamePass}>
						Guardar e Ingresar
					</Button>
				</div>
			</AuthModal>
		</>
	);
};

export default RestorePassword;
