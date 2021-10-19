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

//import CancelIcon from '@material-ui/icons/Cancel';

import PasoClient from './pasosComprobacion/PasoClient';
import PasoCommerce from './pasosComprobacion/PasoCommerce';
import PasoCommerce2 from './pasosComprobacion/PasoCommerce2';
import PasoAccountNumber from './pasosComprobacion/PasoAccountNumber';
import PasoActaConst from './pasosComprobacion/PasoActaConst';
import PasoContriSpecial from './pasosComprobacion/PasoContriSpecial';
import PasoPaymentReceipt from './pasosComprobacion/PasoPaymentReceipt';

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
		}
	})
);

const Comprobacion: React.FC<any> = ({ special }) => {
	const classes2 = useStyles2();

	function getStepContent(step: number) {
		switch (step) {
			case 0:
				return (
					<div>
						<PasoClient/>
					</div>
				);
			case 1:
				return (
					<div className='comprobar_container_2'>
						<div>
							<PasoCommerce/>
						</div>
						<div>
							<PasoCommerce2/>
						</div>
					</div>
				);
			case 2:
				return (
					<div> 
						<PasoAccountNumber />
					</div>
				);
			case 3:
				return (
					<div className='comprobar_container_2'>
						<div>
							{fm.path_rc_constitutive_act &&
								<PasoActaConst/>
							}
						</div>
						<div>
							{fm.path_rc_special_contributor &&
								<PasoContriSpecial />
							}
						</div>
					</div>
				);
			case 4:
				return (
					<div>
						<PasoPaymentReceipt />
					</div>
				);
			default:
				return 'Invalid step';
		}
	}

	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const dispatch = useDispatch();
	const { modalOpen } = useSelector((state: any) => state.ui);
	const validated: any = useSelector((state: RootState) => state.acceptance.validado);
	const updatedStatus: any = useSelector((state: RootState) => state.fmAdmision.updatedStatus);

	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState(new Set<number>());
	const [skipped, setSkipped] = React.useState(new Set<number>());
	const steps = getSteps(fm);
	function getSteps(form:any) {
		if(form.path_rc_constitutive_act || form.path_rc_special_contributor) {
			if(true){
				return [
					'Validacion (Cliente)',
					'Validacion (Comercio)',
					'Validacion (Referencia Bancaria)',
					`
					Validacion (
					${ 
						form.path_rc_constitutive_act ?
							`Acta Const. ${form.path_rc_special_contributor ? '/' : ''}`
						:
						''
					}
					${ 
						form.path_rc_special_contributor ?
							'Con. Especial' 
						:
						''
					}
					)`,
					'Validacion (Comprobante de Pago)',
				]
			}else{
				return [
					'Validacion (Cliente)',
					'Validacion (Comercio)',
					'Validacion (Referencia Bancaria)',
					`
					Validacion (
					${ 
						form.path_rc_constitutive_act ?
							`Acta Const. ${form.path_rc_special_contributor ? '/' : ''}`
						:
						''
					}
					${ 
						form.path_rc_special_contributor ?
							'Con. Especial' 
						:
						''
					}
					)`,
				]
			}
		}else{
			if(form.path_rc_comp_dep){
				return [
					'Validacion (Cliente)',
					'Validacion (Comercio)',
					'Validacion (Referencia Bancaria)',
					'Validacion (Comprobante de Pago)',
				]
			}else{
				return [
					'Validacion (Cliente)',
					'Validacion (Comercio)',
					'Validacion (Referencia Bancaria)',
				]
			}
		}
	}

	const totalSteps = () => {
		return getSteps(fm).length;
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
			isLastStep() && 
			!allStepsCompleted() ? 
				steps.findIndex((step, i) => !completed.has(i))
			: 
				activeStep + 1;
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
			<Dialog fullScreen open={modalOpen} onClose={handleClose} TransitionComponent={Transition} >
				{/*
					<CancelIcon className={classes2.cancelIcon} onClick={handleClose}/>
					*/}
				<div className="close" onClick={handleClose}></div>
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
										<b>{label}</b>
									</StepButton>
								</Step>
							);
						})}
					</Stepper>
					<div className={classes2.containerStep}>
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
									<Button  variant='contained' color='primary' onClick={handleNext} className={classes2.button}>
										Siguiente
									</Button>
									{activeStep !== steps.length &&
										(completed.has(activeStep) ? (
											<Typography variant='caption' className={classes2.completed}>
												Verificar
											</Typography>
										) : (
											<Button className={classes2.buttonS} variant='contained' color='primary' onClick={handleComplete}>
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
