import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stepComplete } from '../../../store/actions/accept';
import { updateStatusFM } from '../../../store/actions/admisionFm';
import { CloseModal } from '../../../store/actions/ui';
import { RootState } from '../../../store/store';
import './index.scss';
import PasoCinco from './pasosComprobacion/PasoCinco';
import PasoCincoDos from './pasosComprobacion/PasoCincoDos';
import PasoCuatro from './pasosComprobacion/PasoCuatro';
import PasoCuaTroDos from './pasosComprobacion/PasoCuatroDos';
import PasoSeis from './pasosComprobacion/PasoSeis';
import PasoAccountNumber from './pasosComprobacion/PasoAccountNumber';
import PasoTresDos from './pasosComprobacion/PasoTresDos';

import PasoCommerce from './pasosComprobacion/PasoCommerce';
import PasoCommerce2 from './pasosComprobacion/PasoCommerce2';
import PasoClient from './pasosComprobacion/PasoClient';

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
			margin: '1.5rem',
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

const Comprobacion: React.FC<any> = ({ special }) => {
	const classes2 = useStyles2();

	function getStepContent(step: number) {
		switch (step) {
			case 0:
				return (
					<div>
						<h1 className='titulo'>Informacion del Cliente</h1>
						<PasoClient/>
					</div>
				);
			case 1:
				return (
					<div className='comprobar_container_2'>
						<div>
							<h1 className='titulo'>Informacion del Comercio </h1>
							<PasoCommerce/>
						</div>
						<div>
							<PasoCommerce2/>
						</div>
					</div>
				);
			case 2:
				return (
					<div className='comprobar_container_2'>
						<div>
							{/* <h1 className='titulo'>Informacion </h1> */}
							<PasoAccountNumber />
						</div>
						<div>
							{/* <h1 className='titulo'>Informacion </h1> */}
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

							<PasoSeis />
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


	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState(new Set<number>());
	const [skipped, setSkipped] = React.useState(new Set<number>());
	const steps = getSteps();

	const dispatch = useDispatch();
	const { modalOpen } = useSelector((state: any) => state.ui);
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const validated: any = useSelector((state: RootState) => state.acceptance.validado);
	const updatedStatus: any = useSelector((state: RootState) => state.fmAdmision.updatedStatus);

	console.log(fm)

	function getSteps() {
		if (special) {
			return [
				'Validacion (Cliente)',
				'Validacion (Comercio)',
				'Validacion (Referencia Bancaria)',
				/*
				'Validacion (Acta Constitutiva / Doc. Propiedad)',
				'Validacion (Referencia Personal / Servicios)',
				'Validacion Contribuyen Especial',
				 */
			];
		} else {
			return [
				'Validacion (Cliente)',
				'Validacion (Comercio)',
				'Validacion (Referencia Bancaria)',
				/*
				'Validacion (Acta Constitutiva / Doc. Propiedad)',
				'Validacion (Referencia Personal / Servicios)',
				 */
			];
		}
	}

	const totalSteps = () => {
		return getSteps().length;
	};
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

	useEffect(() => {
		if(allStepsCompleted() && !updatedStatus){
			for (const item in validated) {
				if(item.slice(0,3) === 'rc_'){
					const element = validated[item]
					if(element.status === false){
						dispatch(updateStatusFM(fm.id_fm, 4, validated));
						console.log('diferido')
						return;
					}
				}
			}
		dispatch(updateStatusFM(fm.id_fm, 2, {}));
		console.log('validated')
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeStep, dispatch, allStepsCompleted])

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	const handleComplete = async () => {
		const newCompleted = new Set(completed);
		Swal.fire({
			title: 'Confirmar verificación',
			icon: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Verificado',
			showCancelButton: true,
			cancelButtonText: 'Atras',
			showCloseButton: true,
			customClass: { container: 'swal2-validated' }
		}).then((result) => {
			if (result.isConfirmed) {
				newCompleted.add(activeStep);
				dispatch(stepComplete(newCompleted));
				setCompleted(newCompleted);
				if (completed.size !== totalSteps() - skippedSteps()) {
					handleNext();
				}
			}
		})
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

	const handleClose = () => {
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
									Todos los campos fueron Validados
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
									{activeStep !== steps.length &&
										(completed.has(activeStep) ? (
											<Typography variant='caption' className={classes2.completed}>
												Verificado
											</Typography>
										) : (
											<Button variant='contained' color='primary' onClick={handleComplete}>
												{completedSteps() === totalSteps() - 1 ? 'Solicitud Revisada' : 'Verificado'}
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
};

export default Comprobacion;
