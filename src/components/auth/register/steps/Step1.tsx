import React from "react"
//Material
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Typography from '@material-ui/core/Typography';

//styles
import { useStylesModalUser } from '../../styles';

//import { isMobile } from 'react-device-detect';
import {
	Interface_RegisterUser,
	Interface_RegisterUserError,
} from '../../interfaceAuth';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
	userForm: Interface_RegisterUser; //json
	userFormError: Interface_RegisterUserError; //json
	handleChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
}


export const Step1: React.FC<Props> = ({ userForm, userFormError, handleChange}) => {
	//State
	const [showPassword, setShowPassword] = React.useState<boolean>(false);

	const classes = useStylesModalUser();

	const [errorPassword, setErrorPassword] = React.useState<any>({
		rango: true,
		mayus: true,
		sig: true,
	});

	//alert material
	const [state, setState] = React.useState<any>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
 const { vertical, horizontal } = state;
 const [open, setOpen] = React.useState(false);

  const handleAlertFocus = (newState: any) => () => {
		console.log('holaa')
    setState({ 
			...state,
			open: true
		});
		setOpen(true);
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };


 /*
  const handleAlertFocus= () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

	*/
	return (
		<>
			<TextField
				required
				className={classes.input}
				name='email'
				//onBlur={handleBlurEmail}
				onChange={handleChange}
				type='email'
				label='correo@correo'
				value={userForm.email}
				variant='outlined'
				autoComplete='email'
				error={userFormError.email}
			/>
			<TextField
				id='password'
				className={classes.input}
				name='password'
				onFocus={() => setOpen(true)}
				onBlur={() => setOpen(false)}
				onChange={handleChange}
				value={userForm.password}
				label='Contraseña'
				type={showPassword ? "text" : "password"}
				autoComplete='current-password'
				variant='outlined'
				error={userFormError.password}
				InputProps={{ // <-- This is where the toggle button is added.
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onMouseDown={() => setShowPassword(!showPassword)}
								onMouseUp={() => setShowPassword(!showPassword)}
								edge="end"
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					)
				}}
				/>
			<Snackbar
				open={open}
				anchorOrigin={{ 
					vertical, horizontal 
				}}
			>
				<SnackbarContent
					style={{ padding: '0', margin: '0', height: 0 }}
					message={
						<Alert className={classes.alertPassword} severity='error'>
							<Typography className={classes.textM} style={{ display: `${errorPassword.rango ? 'block' : 'none'}` }}>
								<span>&#8226;</span> Entre 8 a 12 carateres
							</Typography>
							<Typography className={classes.textM} style={{ display: `${errorPassword.mayus ? 'block' : 'none'}` }}>
								<span>&#8226;</span> Al menos una MAYUSCULA
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
				value={userForm.confirmPassword}
				name='confirmPassword'
				onChange={handleChange}
				label='Comfirmar Contraseña'
				type='password'
				autoComplete='current-password'
				variant='outlined'
				error={userFormError.confirmPassword}
			/>
		</>
	)
}

