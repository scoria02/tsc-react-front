/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
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

import Swal from 'sweetalert2';
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
	setCompleted,
	skipped, 
}) => {
	const classes = useStyles();

	const totalSteps = () => {
		return getSteps(fm).length;
	};

	const dispatch = useDispatch();

	const skippedSteps = () => {
		return skipped.size;
	};

	const completedSteps = () => {
		return completed.size;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps() - skippedSteps();
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	useEffect(() => {
		if (id_status !== 0) {
			const idStatus = id_status;
			Swal.fire({
				title: `${idStatus === 3 ? 'Formulario Verificado' : 'Formulario Diferido'}`,
				icon: `${idStatus === 3 ? 'success' : 'warning'}`,
				customClass: { container: 'swal2-validated' },
			});
			dispatch(clean());
		}
	}, [id_status, updatedStatus]);

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted() ? steps.findIndex((step:any, i:any) => !completed.has(i)) : activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep:any) => prevActiveStep - 1);
	};

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	const handleComplete = async () => { const newCompleted = new Set(completed);
		Swal.fire({
			title: 'Confirmar verificación',
			icon: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Verificado',
			showCancelButton: true,
			cancelButtonText: 'Atras',
			showCloseButton: true,
			customClass: { container: 'swal2-validated' },
		}).then((result) => {
			if (result.isConfirmed) {
				newCompleted.add(activeStep);
				dispatch(stepComplete(newCompleted));
				setCompleted(newCompleted);
				if (completed.size !== totalSteps() - skippedSteps()) {
					handleNext();
				}
			}
		});
	};

	const isStepSkipped = (step: number) => {
		return skipped.has(step);
	};

	function isStepComplete(step: number) {
		return completed.has(step);
	}

	const handleClose = () => {
		dispatch(CloseModal());
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
									if (isStepSkipped(index)) {
										stepProps.completed = false;
									}
									return (
										<Step key={label} {...stepProps}>
											<StepButton onClick={handleStep(index)} completed={isStepComplete(index)} {...buttonProps}>
												<b>{label}</b>
											</StepButton>
										</Step>
									);
								})}
							</Stepper>
							<div className={classes.containerStep}>
								{allStepsCompleted() ? (
									<div className='btn-divfloat'>
										<Typography className={classes.instructions}>Todos los campos fueron Validados</Typography>
									</div>
								) : (
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
														Verificar
													</Typography>
												) : (
													<Button
														className={classes.buttonS}
														variant='contained'
														color='primary'
														onClick={handleComplete}>
														{completedSteps() === totalSteps() - 1 ? 'Solicitud Revisada' : 'Verificado'}
													</Button>
												))}
										</div>
									</div>
								)}
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
