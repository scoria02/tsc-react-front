import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

//icons
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//styles
import {useStylesModalUser} from '../styles';
import './index.scss';

//valids
import * as valids from './validationForm';

//Redux
import {RootState} from '../../../store/store';
import {registerUser} from '../../../store/actions/auth';

//Material UI
import {useMediaQuery} from '@material-ui/core';
import MobileStepper from '@material-ui/core/MobileStepper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//import luffy from '../../../img/itachi2.png';
import luffy from '../../../img/user.png';

import {
	Interface_RegisterUser,
	Interface_RegisterUserError,
	Interface_ErrorPass,
} from '../interfaceAuth';

import {Step1} from './steps/Step1';
import {Step2} from './steps/Step2';

const Register: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStylesModalUser();

	//Dispatch
	const auth: any = useSelector((state: RootState) => state.auth);
	const registrationUser = (user: Interface_RegisterUser) => {
		dispatch(registerUser(user));
	};

	const isMediumScreen: boolean = useMediaQuery('(max-width:800px)');

	//States
	const [readyStep, setReadyStep] = useState<boolean>(false);

	const [activeStep, setActiveStep] = useState<number>(0);

	const codePhone = '+58';

	const [company, setListCompany] = useState<any>([
		{
			id: 1,
			name: 'Tranred',
		},
		{
			id: 2,
			name: '1000pagos',
		},
		{
			id: 3,
			name: 'Digo',
		},
	]);

	const [userForm, setUserForm] = useState<Interface_RegisterUser>({
		email: '',
		password: '',
		confirmPassword: '',
		name: '',
		last_name: '',
		id_ident_type: 1,
		ident_num: '',
		phone: '',
		id_company: 1,
		id_department: 1,
		code: '+58',
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
		minus: true,
		sig: true,
	});

	//Validations
	const validateForm = (name: string, value: any) => {
		let temp: Interface_RegisterUserError = {...userFormError};
		switch (name) {
			//step1
			case 'email':
				temp.email = valids.validEmail(value);
				break;
			case 'password':
				let temPass: Interface_ErrorPass = {...errorPassword};
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
					temp.confirmPassword = !valids.validSamePass(value, userForm.confirmPassword);
				setErrorPassword({
					...temPass,
				});
				break;
			case 'confirmPassword':
				temp.confirmPassword = !valids.validSamePass(userForm.password, value);
				break;
			//step2
			case 'name':
			case 'last_name':
				temp[name] = valids.validFullName(value);
				break;
			case 'identType':
				break;
			case 'ident_num':
				temp.ident_num = valids.validIdentNum(value, userForm.id_ident_type);
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
	const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserForm({
			...userForm,
			[event.target.name]: event.target.value,
		});
		validateForm(event.target.name, event.target.value);
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserForm({
			...userForm,
			[event.target.name]: event.target.name === 'id_company' ? event.target.value : parseInt(event.target.value, 10),
		});
		validateForm(event.target.name, event.target.value);
	};

	const handleSubmit = () => {
		if (valids.allInputNotNUll(activeStep, userForm) || valids.checkErrorAllInput(activeStep, userFormError)) {
			console.log('Debe llenear todos los campos')
			return;
		}
		registrationUser(userForm);
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
			handleSelect={handleSelect}
			handleChange={handleChangeForm}
			codePhone={codePhone}
			company={company}
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
							<form autoComplete='off'>
								<div className="ed-container">
									{getStep[activeStep]}
									<MobileStepper
										variant='dots'
										steps={2}
										position='static'
										style={{background: 'none'}}
										activeStep={activeStep}
										className={classes.step}
										nextButton={
											activeStep === 1 ? (
												<Button
													className={classes.buttonSend}
													onClick={handleSubmit}
													disabled={!readyStep}
													variant='contained'>
													{isMediumScreen ? <SendIcon /> : <span style={{color: '#fff'}}>Registrarme</span>}
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
								<div className='ed-grid s-grid-2 containerButton-login'>
									<Button size='small' color='primary' variant='contained' onClick={() => history.push('/auth/login')}>
										<div className='ed-container'>
											<div className='s-to-center button-login'>Volver a Inicio</div>
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
