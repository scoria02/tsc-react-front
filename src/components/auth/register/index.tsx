import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

//icons
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//styles
import { useStylesModalUser } from '../styles';
import './index.scss';

//valids
import * as valids from './validationForm';

//Redux
import { RootState }  from '../../../store/store';

//Material UI
import { useMediaQuery } from '@material-ui/core';
import MobileStepper from '@material-ui/core/MobileStepper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import luffy from '../../../img/itachi2.png';
// import { useForm, SubmitHandler } from 'react-hook-form';
//import { startLogin } from '../../../store/actions/auth';

import {
	Interface_RegisterUser,
	Interface_RegisterUserError,
	Interface_ErrorPass,
} from '../interfaceAuth';

import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';

const Register: React.FC = () => {
	const history = useHistory();
	//const dispatch = useDispatch();
	const classes = useStylesModalUser();
	const auth : any = useSelector((state: RootState) => state.auth);

	const isMediumScreen: boolean = useMediaQuery('(max-width:800px)');

	//States
	const [readyStep, setReadyStep] = React.useState<boolean>(false);
	const [activeStep, setActiveStep] = React.useState<number>(0);

	const [userForm, setUserForm] = useState<Interface_RegisterUser>({
		email: '',
		password: '',
		confirmPassword: '',
		name: '',
		last_name: '',
		id_ident_type: 1,
		ident_num: '',
		phone: '',
		company: '',
	});

	//State Errors
	const [userFormError, setUserFormError] = React.useState<Interface_RegisterUserError>({
		email: false,
		password: false,
		confirmPassword: false,
		name: false,
		last_name: false,
		id_ident_type: false,
		ident_num: false,
		phone: false,
	});

	const [errorPassword, setErrorPassword] = React.useState<Interface_ErrorPass>({
		rango: true,
		mayus: true,
		sig: true,
	});

	//Validations
	const validateForm = (name: string, value: any) => {
		let temp: Interface_RegisterUserError = { ...userFormError };
		switch (name) {
			case 'email':
				temp.email = valids.validEmail(value);
				break;
			case 'password':
				let temPass: Interface_ErrorPass = { ...errorPassword };
				if (value.length < 8 || value.length > 12) temPass.rango = true;
				else temPass.rango = false;

				if (!/([A-Z]+)/g.test(value)) temPass.mayus = true;
				else temPass.mayus = false;

				if (!/[^a-z0-9\x20]/i.test(value)) temPass.sig = true;
				else temPass.sig = false;

				if (temPass.rango || temPass.mayus || temPass.sig) temp.password = true;
				else temp.password = false;

				if (userForm.confirmPassword.trim() !== '')
					temp.confirmPassword = !valids.validSamePass(value, userForm.confirmPassword);
				setErrorPassword({
					...temPass,
				});
				break;
			case 'confirmPassword':
				temp.confirmPassword = !valids.validSamePass(userForm.password, value);
				break;
			case 'name':
			case 'last_name':
				temp[name] = valids.validFullName(value);
				break;
			case 'identType':
				break;
			case 'ident_num':
				//temp.ident_num = valids.validIdentNum(value, identType);
				break;
			case 'phone':
				temp.phone = valids.validPhone(value);
				break;
			default:
				break;
		}
		setUserFormError({
			...temp,
		});
	};

	//useEffects
	//Check No error & No Input null
	useEffect(() => {
		if (!valids.allInputNotNUll(activeStep, userForm) && !valids.checkErrorAllInput(activeStep, userFormError) && (auth.error.length === 0)) {
			setReadyStep(true);
		} else {
			setReadyStep(false);
		}
	}, [userForm, activeStep, userFormError, auth]);

	//Handle
	const handleChangeForm= (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserForm({
			...userForm,
			[event.target.name]: event.target.value,
		});
		validateForm(event.target.name, event.target.value);
	};

	const handleLogin = (e: any): void => {
		e.preventDefault();
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	//Steps
	const getStep = [
		<Step1 
			userForm={userForm}
			userFormError={userFormError}
			errorPassword={errorPassword}
			handleChange={handleChangeForm}
		/>,
		<Step2 
			userForm={userForm}
			userFormError={userFormError}
			handleChange={handleChangeForm}
		/>,
	];

	return (
		<Card className={classes.root}>
			<CardContent>
				<div className='ed-grid s-grid-1 m-grid-2 '>
					<div className='ed-container'>
						<div className='s-to-center'>
							<CardMedia className={classes.media} image={luffy} title='Rey de los Piratas' />
						</div>
					</div>
					<CardContent>
						<div className='s-py-4'>
							<Typography gutterBottom variant='h5' component='h2' align='center'>
								Registrarme
							</Typography>
						</div>
						<div className={classes.containerRight} >
							<form onSubmit={handleLogin} autoComplete='off'>
								<div className="ed-container">
									{getStep[activeStep]}
									<MobileStepper
										variant='dots'
										steps={2}
										position='static'
										style={{ background: 'none' }}
										activeStep={activeStep}
										className={classes.step}
										nextButton={
											activeStep === 1 ? (
												<Button
													className={classes.buttonSend}
													//onClick={handleSubmit}
													disabled={!readyStep}
													variant='contained'>
													{isMediumScreen ? <SendIcon /> : <span>Registrarme</span>}
												</Button>
											) : (
												<Button
													className={classes.buttonStep}
													onClick={handleNext}
													disabled={!readyStep}
													variant='contained'>
													{isMediumScreen ? null : <span>Siguiente</span>}
													<ArrowForwardIosIcon />
												</Button>
											)
										}
										backButton={
											activeStep === 0 ? (
												<Button className={classes.buttonBack}>
												</Button>
											) : (
												<Button
													className={classes.buttonStep}
													onClick={handleBack}
													disabled={activeStep === 0}
													variant='contained'>
													<ArrowBackIosIcon />
													{isMediumScreen ? null : <span>Anterior</span>}
												</Button>
											)
										}
									/>
								</div>
								<div className='ed-grid s-grid-2'>
									<Button size='small' color='primary' variant='contained' onClick={() => history.push('/auth/login')}>
										<div className='ed-container'>
											<div className='s-to-center'>Iniciar Session</div>
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

export default Register;
