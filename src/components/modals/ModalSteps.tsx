/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Step, StepButton, Stepper, Typography } from '@mui/material';
import { SocketContext } from 'context/SocketContext';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import LoaderPrimary from '../loaders/LoaderPrimary';
import FullModal from './FullModal';
import { sxStyled, useStyles } from './styles/modalStep';

const ModalSteps: React.FC<any> = ({
	clean,
	CloseModal,
	steps,
	getStepContent,
	fm,
	modalOpen,
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
		// console.log('clean for close');
		dispatch(CloseModal());
		dispatch(clean());
	};

	return (
		<FullModal modalOpen={modalOpen} handleClose={handleClose}>
			{Object.keys(fm).length ? (
				<>
					<Stepper alternativeLabel nonLinear activeStep={activeStep}>
						{steps.map((label: any, index: number) => {
							const stepProps: { completed?: boolean } = {};
							//const buttonProps: { optional?: React.ReactNode } = {};
							return totalSteps() > 1 ? (
								<Step key={index} {...stepProps} completed={isStepComplete(index)}>
									<StepButton onClick={handleStep(index)}>
										<b>{label}</b>
									</StepButton>
								</Step>
							) : (
								<StepButton key={index} onClick={handleStep(index)}>
									<b style={{ fontSize: '1.2rem' }}>{label}</b>
								</StepButton>
							);
						})}
					</Stepper>
					<div className={classes.containerStep}>
						<div className={classes.instructions}>{getStepContent(activeStep, steps)}</div>
						<div className='btn-divfloat'>
							<Button
								sx={sxStyled.button}
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.button}>
								Volver
							</Button>
							<Button
								sx={sxStyled.button}
								variant='contained'
								color='primary'
								onClick={handleNext}
								className={classes.button}>
								Siguiente
							</Button>
							{activeStep !== steps.length &&
								(completed.has(activeStep) ? (
									<Typography variant='caption' className={classes.completed}>
										Verificado
									</Typography>
								) : (
									<Button
										sx={sxStyled.button}
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
				</>
			) : (
				<LoaderPrimary />
			)}
		</FullModal>
	);
};

export default ModalSteps;
