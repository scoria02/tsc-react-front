import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//icons
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//styles
import { useStylesModalUser } from '../styles';

import { useMediaQuery } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './index.scss';
import luffy from '../../../img/itachi2.png';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import { useForm, SubmitHandler } from 'react-hook-form';
//import { startLogin } from '../../../store/actions/auth';

import {
	Interface_RegisterUser,
	Interface_RegisterUserError,
} from '../interfaceAuth';

import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';

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

const Register: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStylesModalUser();
	const classesbutton = useStylesButton();
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
		phone1: '',
		phone2: '',
	});

	const [userFormError, setUserFormError] = React.useState<Interface_RegisterUserError>({
		email: false,
		password: false,
		confirmPassword: false,
		name: false,
		last_name: false,
		id_ident_type: false,
		ident_num: false,
		phone1: false,
		phone2: false,
		checkPhones: false,
	});

	//Handles
	//handle
	const handleChangeForm= (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserForm({
			...userForm,
			[event.target.name]: event.target.value,
		});
		//validateForm(event.target.name, event.target.value);
	};
	const handleUserForm: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		console.log(e.target.value);
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
			handleChange={handleChangeForm}
		/>,
		<Step2 />,
	];

	return (
		<Card className={classes.root}>
			<CardContent>
				<div className='ed-grid s-grid-1 m-grid-2 '>
					{' '}
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
						<div>
							<form onSubmit={handleLogin} className={classesbutton.root} autoComplete='off'>
									{getStep[activeStep]}
									<MobileStepper
										variant='dots'
										steps={2}
										position='static'
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
													//disabled={!readyStep}
													variant='contained'>
													{isMediumScreen ? null : <span>Siguiente</span>}
													<ArrowForwardIosIcon />
												</Button>
											)
										}
										backButton={
											activeStep === 0 ? (
												<Button className={classes.buttonBack} onClick={handleLogin}>
													<ArrowBackIosIcon style={{ fontSize: '3vh' }} />
													{isMediumScreen ? null : <span>Volver</span>}
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
								<Button type='submit' variant='outlined' color='primary'>
									Registrarme
								</Button>
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
