/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography, Button, Step, StepLabel, Stepper } from '@mui/material';
import DataListAdmisionContext from 'context/DataList/DatalistAdmisionContext';
import DataListContext from 'context/DataList/DataListContext';
import FMDataContext from 'context/FM/fmAdmision/FmContext';
import ImagesFmContext from 'context/FM/fmImages/ImagesFmContext';
import LocationsContext from 'context/FM/Location/LocationsContext';
import { SocketContext } from 'context/SocketContext';
import React, { ReactElement, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { urlFM } from 'routers/url';
import { cleanFM, sendCompleteFM, sendCompleteFMExtraPos } from 'store/actions/fm';
import { StateFMInt } from 'store/reducers/fmReducer';
//Redux
import { RootState } from 'store/store';
import Swal from 'sweetalert2';
import { stepError } from 'utils/fm';
import LoaderPrimary from '../../loaders/LoaderPrimary';
//steps
import StepClient from './steps/StepClient';
import StepCommerce from './steps/StepCommerce';
//Cliente y comercio existente
import StepExtraPos from './steps/ExtraPos';
//
import StepLocationCCandPos from './steps/StepLocationCCandPos';
import StepPos from './steps/StepPos';
import { useStylesFM } from './styles';
import FMValidDataContext from 'context/Admision/Validation/FmContext';

const Validacion: React.FC = () => {
	const history = useHistory();
	const classes = useStylesFM();

	const { socket } = useContext(SocketContext);
	const [steps, setSteps] = useState<string[]>([]);

	const [activeStep, setActiveStep] = useState<number>(0);

	const [stepsValid, setStepsValid] = useState<number>(0);

	const { listAci } = useContext(DataListAdmisionContext);
	const { codeFM, pos, stepsFM } = useContext(FMValidDataContext);

	console.log('step show', stepsFM);

	const handleGetStep = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		const stepOp = stepsFM; //error 3312 validar si el comercio y el clente esta valido para mostrar
		const newSteps = stepOp;
		setSteps(newSteps);
	};

	useLayoutEffect(() => {
		setSteps(stepsFM);
	}, [stepsFM]);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSubmit = () => {};

	const handleLoading = () => {
		Swal.fire({
			icon: 'info',
			title: 'Verificando Solicitud...',
			showConfirmButton: false,
			//closeOnClickOutside: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});
	};

	const handleSend = () => {
		Swal.fire({
			icon: 'success',
			title: 'Solicitud Enviada',
			showConfirmButton: false,
			timer: 2500,
			customClass: { container: 'swal2-validated' },
		});
		//history.push(urlFM);
		//setActiveStep(0);
	};

	const handleVerificar = async () => {
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
				//setList()
				if (stepsValid !== steps.length - 1) {
					setStepsValid(stepsValid + 1);
					handleNext();
				} else {
					handleLoading();
				}
			}
		});
	};

	console.log('validados:', stepsValid, ' steps', steps.length - 1);

	const getContentSteps = () => {
		let listSteps: any = [];
		if (true && !listSteps.includes(<StepClient />)) listSteps.push(<StepClient />);
		if (true && !listSteps.includes(<StepCommerce />)) listSteps.push(<StepCommerce />);
		//if (fm.rc_ref_bank !== null && !list.includes(<StepReferencia />)) list.push(<StepReferencia />);
		//if (fm.rc_planilla.length && !list.includes('Planilla de Solicitud')) list.push('Planilla de Solicitud');
		//if (fm.id_commerce.rc_constitutive_act.length && !list.includes('Acta Const.')) list.push('Acta Const.');
		//if (fm.id_commercespecial_contributor && !list.includes('Cont. Especial')) list.push('Cont. Especial');
		//if (fm.rc_comp_num !== null && !list.includes('Comprobante de Pago')) list.push('Comprobante de Pago');
		//[<StepClient />, <StepCommerce />, <StepLocationCCandPos />, <StepPos />]
		return listSteps;
	};

	const getStep: ReactElement[] = getContentSteps();

	console.log(activeStep, stepsValid);

	const handleClickButton = () => {
		if (activeStep > stepsValid - 1) {
			handleVerificar();
		} else {
			handleNext();
		}
	};

	return (
		<div style={{ marginTop: '2rem' }}>
			{!listAci.length ? (
				<LoaderPrimary />
			) : (
				<div>
					<h2
						style={{
							marginTop: 1,
							fontSize: '12px',
						}}>
						Code: <span style={{ color: 'red' }}>{codeFM}</span>
					</h2>
					<form className={classes.containerSteps}>
						<Stepper alternativeLabel activeStep={activeStep} style={{ background: 'none', width: '100%' }}>
							{steps.map((label, index) => {
								const stepProps: { completed?: boolean } = {};
								return (
									<Step key={label} {...stepProps}>
										<StepLabel>
											<Typography
												variant={activeStep === index ? 'body1' : 'body2'}
												color={activeStep === index ? 'primary' : 'info'}>
												<b>{label}</b>
											</Typography>
										</StepLabel>
									</Step>
								);
							})}
						</Stepper>
						<div className={classes.containerFM}>
							<div>
								{getStep[activeStep]}
								<div className={classes.buttonFixed}>
									<Button
										sx={{
											mr: 60,
										}}
										size='large'
										disabled={activeStep === 0}
										variant='contained'
										style={{ opacity: activeStep ? 1 : 0 }}
										onClick={handleBack}
										className={classes.buttonBack}>
										<span className={classes.textButton}>Volver</span>
									</Button>
									{stepsValid === steps.length - 1 && activeStep === steps.length - 1 ? (
										<Button
											sx={{
												mr: 50,
											}}
											size='large'
											variant='contained'
											color='primary'
											onClick={handleSend}
											className={classes.buttonNext}>
											<span className={classes.textButton}>Enviar</span>
										</Button>
									) : (
										<Button
											sx={{
												mr: 50,
											}}
											size='large'
											variant='contained'
											color='primary'
											onClick={handleClickButton}
											className={classes.buttonNext}>
											<span className={classes.textButton}>Validar</span>
										</Button>
									)}
								</div>
							</div>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Validacion;
