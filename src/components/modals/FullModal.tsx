/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useDispatch } from 'react-redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import { TransitionProps } from '@material-ui/core/transitions';
import Typography from '@material-ui/core/Typography';

import LoaderPrimary from '../loaders/LoaderPrimary';

import './scss/fullmodal.scss';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement },
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			margin: '1.5rem',
			padding: '1rem',
		},
		button: {
			marginRight: theme.spacing(1),
			textTransform: 'none',
		},
		backButton: {
			marginRight: theme.spacing(1),
		},
		completed: {
			display: 'inline-block',
		},
		instructions: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
		},
		cancelIcon: {
			fontSize: '3rem',
			position: 'fixed',
			right: '2rem',
			top: '1rem',
			color: theme.palette.secondary.main,
			zIndex: 10,
			cursor: 'pointer',
			'&:hover': {
				color: theme.palette.secondary.light,
			},
		},
		containerStep: {
			marginTop: theme.spacing(2),
		},
		buttonS: {
			textTransform: 'none',
		},
	})
);


const FullModal: React.FC<any> = ({
	stepComplete,
	clean,
	CloseModal,
	steps,
	getStepContent,
	fm,
	modalOpen,
	updatedStatus,
	id_status,
	getSteps,
	activeStep, 
	setActiveStep,
	completed, 
	readyStep,
	handleNext,
	handleComplete,
}) => {
	const classes = useStyles();

	const totalSteps = () => {
		return getSteps(fm).length;
	};

	const dispatch = useDispatch();

	const completedSteps = () => {
		return completed.size;
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep:any) => prevActiveStep - 1);
	};

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	function isStepComplete(step: number) {
		return completed.has(step);
	}

	const handleClose = () => {
		console.log('clean for close')
		dispatch(CloseModal());
		dispatch(clean())
	};

	return (
		<div>
			<Dialog fullScreen open={modalOpen} onClose={handleClose} TransitionComponent={Transition}>
				{Object.keys(fm).length ? 
					<>
						<div className="button-close" >
							<div className="close-container" onClick={handleClose}>
								<div className="leftright"></div>
								<div className="rightleft"></div>
								<label className="closee">Cerrar</label>
							</div>
						</div>
						<div className={classes.root}>
							<Stepper alternativeLabel nonLinear activeStep={activeStep}>
								{steps.map((label:any, index:number) => {
									const stepProps: { completed?: boolean } = {};
									const buttonProps: { optional?: React.ReactNode } = {};
									return (
											totalSteps() > 1 ? (
												<Step key={label} {...stepProps}>
													<StepButton onClick={handleStep(index)} completed={isStepComplete(index)} {...buttonProps}>
														<b>{label}</b>
													</StepButton>
												</Step>
											):(
												<StepButton onClick={handleStep(index)} completed={isStepComplete(index)} {...buttonProps}>
													<b style={{ fontSize: "1.2rem" }}>{label}</b>
												</StepButton>
											)
									);
								})}
							</Stepper>
							<div className={classes.containerStep}>
								<div>
									<Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
									<div className='btn-divfloat'>
										<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
											Volver
										</Button>
										<Button variant='contained' color='primary' onClick={handleNext} className={classes.button}>
											Siguiente
										</Button>
										{activeStep !== steps.length &&
											(completed.has(activeStep) ? (
												<Typography variant='caption' className={classes.completed}>
													Verificado
												</Typography>
											) : (
												<Button
													className={classes.buttonS}
													variant='contained'
													color='primary'
													disabled={readyStep}
													onClick={handleComplete}>
													{completedSteps() === totalSteps() - 1 ? 'Solicitud Revisada' : 'Verificar'}
												</Button>
											))}
									</div>
								</div>
							</div>
						</div>
					</>
					:
						<LoaderPrimary />
				}
			</Dialog>
		</div>
	);
};

export default FullModal;
