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
// import CardActionArea from '@material-ui/core/CardActionArea';
// import { useForm, SubmitHandler } from 'react-hook-form';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import './index.scss';
import luffy from '../../../img/itachi2.png';
import { startLogin } from '../../../store/actions/auth';
// import { useForm } from '../../../hooks/useForm';

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
	const classesbutton = useStylesButton();
	const classes = useStylesModalUser();
	const history = useHistory();
	const dispatch = useDispatch();
	const isMediumScreen: boolean = useMediaQuery('(max-width:800px)');

	const [readyStep, setReadyStep] = React.useState<boolean>(false);
	const [activeStep, setActiveStep] = React.useState<number>(0);

	// const [formValues, handleInputChange] = useForm({
	// 	email: '',
	// 	password: '',
	// });

	const [email, setEmail] = useState<string>('leomerida15@gmail.com');
	const [password, setPass] = useState<string>('Test123.');

	// const { email, password }: any = formValues;

	const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
		console.log(e.target.value);
	};

	const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		setPass(e.target.value);
		console.log(e.target.value);
	};

	const handleLogin = (e: any): void => {
		e.preventDefault();
		dispatch(startLogin(email, password));
		console.log(email, password);
		// dispatch(startLoginEmailPassword(email, password));
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const getStep = [
		<Step1 />,
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
													disabled={!readyStep}
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
