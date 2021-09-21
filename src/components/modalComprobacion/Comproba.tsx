import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useDispatch, useSelector } from 'react-redux';
import { CloseModal } from '../../store/actions/ui';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import PasoUno from '../pasosComprobacion/PasoUno';
import PasoUnoUser from '../pasosComprobacion/PasoUnoUser';
import PasoDos from '../pasosComprobacion/PasoDos';
import PasoDosDos from '../pasosComprobacion/PasoDosDos';
import PasoTres from '../pasosComprobacion/PasoTres';
import PasoTresDos from '../pasosComprobacion/PasoTresDos';
import PasoCuatro from '../pasosComprobacion/PasoCuatro';
import PasoCuaTroDos from '../pasosComprobacion/PasoCuatroDos';
import PasoCinco from '../pasosComprobacion/PasoCinco';
import PasoCincoDos from '../pasosComprobacion/PasoCincoDos';

import './comprobar.scss';
import { stepComplete } from '../../store/actions/accept';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement },
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles2 = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			margin: '2rem',
		},
		button: {
			marginRight: theme.spacing(1),
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
	})
);

function getSteps() {
	return [
		'Informacion',
		'Validacion (Cedula / Rif)',
		'Validacion (Cuenta / Referencia )',
		'Validacion (Acta Constitutiva / Doc. Propiedad)',
		'Validacion (Referencia Personal / Servicios)',
		'Validacion Contribuyen Especial',
	];
}

function getStepContent(step: number) {
	switch (step) {
		case 0:
			return (
				<div className='comprobar_container'>
					<div>
						<h1 className='titulo'>Informacion de Comercio </h1>
						<PasoUno />
					</div>
					<div>
						<h1 className='titulo'>Informacion de Cliente</h1>
						<PasoUnoUser />
					</div>
				</div>
			);
		case 1:
			return (
				<div className='comprobar_container_2'>
					<div>
						{/* <h1 className='titulo'>Informacion </h1> */}
						<PasoDos />
					</div>
					<div>
						{/* <h1 className='titulo'>Informacion </h1> */}
						<PasoDosDos />
					</div>
				</div>
			);
		case 2:
			return (
				<div className='comprobar_container_2'>
					<div>
						{/* <h1 className='titulo'>Informacion </h1> */}
						<PasoTres />
					</div>
					<div>
						{/* <h1 className='titulo'>Informacion </h1> */}
						<PasoTresDos />
					</div>
				</div>
			);
		case 3:
			return (
				<div className='comprobar_container_2'>
					<div>
						{/* <h1 className='titulo'>Informacion </h1> */}
						<PasoCuatro />
					</div>
					<div>
						{/* <h1 className='titulo'>Informacion </h1> */}
						<PasoCuaTroDos />
					</div>
				</div>
			);
		case 4:
			return (
				<div className='comprobar_container_2'>
					<div>
						{/* <h1 className='titulo'>Informacion </h1> */}
						<PasoCinco />
					</div>
					<div>
						{/* <h1 className='titulo'>Informacion </h1> */}
						<PasoCincoDos />
					</div>
				</div>
			);
		case 5:
			return (
				<div className='comprobar_container_2'>
					<div>
						{/* <h1 className='titulo'>Informacion </h1> */}

						<PasoCinco />
						{/* Colocar condicion para que si no hay nada en contribuyente notifique */}
					</div>
					<div>
						{/* <h1 className='titulo'>Informacion </h1>
						<PasoCincoDos /> */}
						{/* Uso Futuro */}
					</div>
				</div>
			);
		default:
			return 'Invalid step';
	}
}

export default function Comproba() {
	const classes2 = useStyles2();
	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState(new Set<number>());
	const [skipped, setSkipped] = React.useState(new Set<number>());
	const steps = getSteps();

	const totalSteps = () => {
		return getSteps().length;
	};

	// const isStepOptional = (step: number) => {
	// 	return step === 1;
	// };

	// const handleSkip = () => {
	// 	if (!isStepOptional(activeStep)) {
	// 		// You probably want to guard against something like this
	// 		// it should never occur unless someone's actively trying to break something.
	// 		throw new Error("You can't skip a step that isn't optional.");
	// 	}

	// 	setActiveStep((prevActiveStep) => prevActiveStep + 1);
	// 	setSkipped((prevSkipped) => {
	// 		const newSkipped = new Set(prevSkipped.values());
	// 		newSkipped.add(activeStep);
	// 		return newSkipped;
	// 	});
	// };

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

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed
				  // find the first step that has been completed
				  steps.findIndex((step, i) => !completed.has(i))
				: activeStep + 1;

		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	const handleComplete = async () => {
		const newCompleted = new Set(completed);
		newCompleted.add(activeStep);
		dispatch(stepComplete(newCompleted));
		console.log(newCompleted);
		setCompleted(newCompleted);

		/**
		 * Sigh... it would be much nicer to replace the following if conditional with
		 * `if (!this.allStepsComplete())` however state is not set when we do this,
		 * thus we have to resort to not being very DRY.
		 */
		if (completed.size !== totalSteps() - skippedSteps()) {
			handleNext();
		}
	};

	const handleReset = () => {
		setActiveStep(0);
		setCompleted(new Set<number>());
		setSkipped(new Set<number>());
		dispatch(CloseModal());
	};

	const isStepSkipped = (step: number) => {
		return skipped.has(step);
	};

	function isStepComplete(step: number) {
		return completed.has(step);
	}

	//******************************************************* */
	// const classes = useStyles();
	// const [open, setOpen] = React.useState(false);

	const dispatch = useDispatch();
	const { modalOpen } = useSelector((state: any) => state.ui);

	//   const handleOpen = () => {
	//     setOpen(true);
	//   };

	const handleClose = () => {
		// setOpen(false);
		dispatch(CloseModal());
	};

	return (
		<div>
			<Dialog fullScreen open={modalOpen} onClose={handleClose} TransitionComponent={Transition}>
				<div className={classes2.root}>
					<Stepper alternativeLabel nonLinear activeStep={activeStep}>
						{steps.map((label, index) => {
							const stepProps: { completed?: boolean } = {};
							const buttonProps: { optional?: React.ReactNode } = {};
							// if (isStepOptional(index)) {
							// 	buttonProps.optional = <Typography variant='caption'>Optional</Typography>;
							// }
							if (isStepSkipped(index)) {
								stepProps.completed = false;
							}
							return (
								<Step key={label} {...stepProps}>
									<StepButton onClick={handleStep(index)} completed={isStepComplete(index)} {...buttonProps}>
										{label}
									</StepButton>
								</Step>
							);
						})}
					</Stepper>
					<div>
						{allStepsCompleted() ? (
							<div className='btn-divfloat'>
								<Typography className={classes2.instructions}>
									Todos los campos fueron Validados - Saludos BB
								</Typography>
								<Button onClick={handleReset}>Salir</Button>
							</div>
						) : (
							<div>
								<Typography className={classes2.instructions}>{getStepContent(activeStep)}</Typography>
								<div className='btn-divfloat'>
									<Button disabled={activeStep === 0} onClick={handleBack} className={classes2.button}>
										Volver
									</Button>
									<Button variant='contained' color='primary' onClick={handleNext} className={classes2.button}>
										Siguiente
									</Button>
									{/* {isStepOptional(activeStep) && !completed.has(activeStep) && (
										// <Button variant='contained' color='primary' onClick={handleSkip} className={classes2.button}>
										// 	Saltar
										// </Button>
									)} */}
									{activeStep !== steps.length &&
										(completed.has(activeStep) ? (
											<Typography variant='caption' className={classes2.completed}>
												Step {activeStep + 1} already completed
											</Typography>
										) : (
											<Button variant='contained' color='primary' onClick={handleComplete}>
												{/* <Button variant='contained' color='primary'> */}
												{completedSteps() === totalSteps() - 1 ? 'Finish' : 'Verificado'}
											</Button>
										))}
								</div>
							</div>
						)}
					</div>
				</div>
			</Dialog>
		</div>
	);
}

/*

const dispatch = useDispatch();
	const { modalOpen } = useSelector((state: any) => state.ui);

	//   const handleOpen = () => {
	//     setOpen(true);
	//   };

	const handleClose = () => {
		// setOpen(false);
		dispatch(CloseModal());
	};
*/
