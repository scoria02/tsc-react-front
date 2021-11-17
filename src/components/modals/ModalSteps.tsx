/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';

import { useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';

import FullModal from './FullModal';

import { useStyles } from './styles/modalStep';

const ModalSteps: React.FC<any> = ({
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
		setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
	};

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	function isStepComplete(step: number) {
		return completed.has(step);
	}

	const { socket } = useContext(SocketContext);

	const handleClose = () => {
		socket.emit('cliente:disconnect');
		socket.emit('cliente:dashdatasiempre');
		console.log('clean for close');
		dispatch(CloseModal());
		dispatch(clean());
	};

	return (
		<FullModal
			modalOpen={modalOpen}
			handleClose={handleClose}
			valuesObj={fm}
		>
			<Stepper alternativeLabel nonLinear activeStep={activeStep}>
				{steps.map((label: any, index: number) => {
					const stepProps: { completed?: boolean } = {};
					const buttonProps: { optional?: React.ReactNode } = {};
					return totalSteps() > 1 ? (
						<Step key={index} {...stepProps}>
							<StepButton onClick={handleStep(index)} completed={isStepComplete(index)} {...buttonProps}>
								<b>{label}</b>
							</StepButton>
						</Step>
					) : (
						<StepButton key={index} onClick={handleStep(index)} completed={isStepComplete(index)} {...buttonProps}>
							<b style={{ fontSize: '1.2rem' }}>{label}</b>
						</StepButton>
					);
				})}
			</Stepper>
			<div className={classes.containerStep}>
					<div className={classes.instructions}>{getStepContent(activeStep)}</div>
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
		</FullModal>
	);
};

export default ModalSteps;
