import React, { ReactElement, useContext, useEffect, useLayoutEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Typography, Button, Step, StepLabel, Stepper } from '@mui/material';
import { updateStatusFMDiferido } from 'store/actions/admision/diferido';
import { useDispatch } from 'react-redux';
import DifStepClient from './steps/DifStepClient';
import DifStepCommerce from './steps/DifStepCommerce';
import { useStylesFM } from './styles';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import DifStepActaConst from './steps/DifStepActaConst';
import DifStepPlanilla from './steps/DifStepPlanilla';
import DifStepSpecialContributor from './steps/DifStepSpecialContributor';
import DifStepPos from './steps/DifStepPos';
import DifStepRefBank from './steps/DifStepRefBank';
import DifStepCompDep from './steps/DifStepCompDep';
import LocationsContext from 'context/Admision/CreationFM/Location/LocationsContext';

const DiferidoValid: React.FC = () => {
	const dispatch = useDispatch();
	const classes = useStylesFM();

	const [steps, setSteps] = useState<string[]>([]);

	const [stepsValid, setStepsValid] = useState<number>(0);

	const {
		initListLocation,
		setListLocationClient,
		setListLocationCommerce,
		setListLocationPos,
		//
		listLocationClient,
		listLocationCommerce,
		listLocationPos,
	} = useContext(LocationsContext);

	const {
		disabled,
		activeStep,
		setActiveStep,
		ready,
		setDisabled,
		codeFM,
		solic,
		client,
		pos,
		listValidated,
		stepsFM,
		phones,
		commerce,
		imagesForm,
		imagePlanilla,
		imagesActa,
		locationClient,
		locationCommerce,
		locationPos,
		idLocationClient,
		idLocationCommerce,
		idLocationPos,
	} = useContext(FMDiferidoContext);

	console.log('aqui', solic);

	useEffect(() => {
		if (activeStep > stepsValid - 1) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [disabled, activeStep, stepsValid]);

	useLayoutEffect(() => {
		setSteps(stepsFM);
	}, [stepsFM]);

	const handleNext = () => {
		setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
	};

	const handleLoading = () => {
		Swal.fire({
			icon: 'info',
			title: 'Verificando',
			showConfirmButton: false,
			customClass: { container: 'swal2-validated' },
			allowOutsideClick: false,
			allowEscapeKey: false,
			//closeOnClickOutside: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});
	};

	const handleSend = async () => {
		if (!solic) return;
		Swal.fire({
			title: 'Solicitud verificada?',
			icon: 'warning',
			showConfirmButton: true,
			allowOutsideClick: false,
			allowEscapeKey: false,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Verificado',
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			showCloseButton: true,
			customClass: { container: 'swal2-validated' },
		}).then((result) => {
			if (result.isConfirmed) {
				handleLoading();
				let phone = {
					phone1: phones.phone1,
					phone2: phones.phone2,
				};
				//console.log(phones);
				dispatch(
					updateStatusFMDiferido(
						solic.id,
						solic,
						client,
						phone,
						commerce,
						pos,
						idLocationClient,
						idLocationCommerce,
						idLocationPos,
						imagesForm,
						imagePlanilla,
						imagesActa
					)
				);
				console.log('mandado a administracion');
			}
		});
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

	//console.log('validados:', stepsValid, ' steps', steps.length - 1);

	const getContentSteps = (): ReactElement[] => {
		let list: ReactElement[] = [];
		if (listValidated.id_typedif_client && !list.includes(<DifStepClient />)) {
			if (
				locationClient.estado &&
				locationClient.municipio &&
				locationClient.ciudad &&
				locationClient.parroquia &&
				!listLocationClient.municipio.length &&
				!listLocationClient.ciudad.length &&
				!listLocationClient.parroquia.length &&
				!listLocationClient.sector.length
			) {
				//console.log('getLoction clientx');
				initListLocation(
					{
						estado: locationClient.estado.estado,
						municipio: locationClient.municipio.municipio,
						ciudad: locationClient.ciudad.ciudad,
						parroquia: locationClient.parroquia.parroquia,
					},
					setListLocationClient
				);
			}
			list.push(<DifStepClient />);
		}
		if (listValidated.id_typedif_commerce && !list.includes(<DifStepCommerce />)) {
			if (
				locationCommerce &&
				locationCommerce.estado &&
				locationCommerce.municipio &&
				locationCommerce.ciudad &&
				locationCommerce.parroquia &&
				!listLocationCommerce.municipio.length &&
				!listLocationCommerce.ciudad.length &&
				!listLocationCommerce.parroquia.length &&
				!listLocationCommerce.sector.length
			) {
				initListLocation(
					{
						estado: locationCommerce.estado.estado,
						municipio: locationCommerce.municipio.municipio,
						ciudad: locationCommerce.ciudad.ciudad,
						parroquia: locationCommerce.parroquia.parroquia,
					},
					setListLocationCommerce
				);
			}
			list.push(<DifStepCommerce />);
		}
		if (listValidated.id_typedif_consitutive_acta && !list.includes(<DifStepActaConst />))
			list.push(<DifStepActaConst />);
		if (listValidated.id_typedif_special_contributor && !list.includes(<DifStepSpecialContributor />))
			list.push(<DifStepSpecialContributor />);
		if (listValidated.id_typedif_pos && !list.includes(<DifStepPos />)) {
			if (
				locationPos.estado &&
				locationPos.municipio &&
				locationPos.ciudad &&
				locationPos.parroquia &&
				!listLocationPos.municipio.length &&
				!listLocationPos.ciudad.length &&
				!listLocationPos.parroquia.length &&
				!listLocationPos.sector.length
			) {
				//if (locationPos) {
				initListLocation(
					{
						estado: locationPos.estado.estado,
						municipio: locationPos.municipio.municipio,
						ciudad: locationPos.ciudad.ciudad,
						parroquia: locationPos.parroquia.parroquia,
					},
					setListLocationPos
				);
			}
			list.push(<DifStepPos />);
		}
		if (listValidated.id_typedif_planilla && !list.includes(<DifStepPlanilla />)) list.push(<DifStepPlanilla />);
		if (listValidated.id_typedif_ref_bank && !list.includes(<DifStepRefBank />)) list.push(<DifStepRefBank />);
		if (listValidated.id_typedif_comp_num && !list.includes(<DifStepCompDep />)) list.push(<DifStepCompDep />);
		return list;
	};

	const [step, setStep] = useState<ReactElement[]>([]);

	useLayoutEffect(() => {
		setStep(getContentSteps());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClickButton = () => {
		if (activeStep > stepsValid - 1) {
			handleVerificar();
		} else {
			handleNext();
		}
	};

	return (
		<div className={classes.containerSolic}>
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
										<Typography
											style={{
												fontSize: '10px',
											}}
											variant={activeStep === index ? 'body1' : 'body2'}
											color={activeStep === index ? 'primary' : 'info'}>
											<span>{index > stepsValid - 1 ? '' : 'Verificado'}</span>
										</Typography>
									</StepLabel>
								</Step>
							);
						})}
					</Stepper>
					<div className={classes.containerFM}>
						<div>
							{step[activeStep]}
							<div className={classes.buttonFixed}>
								<Button
									sx={{
										ml: 20,
										mr: 20,
									}}
									size='large'
									disabled={activeStep === 0}
									variant='contained'
									style={{ opacity: activeStep ? 1 : 0 }}
									onClick={handleBack}
									className={classes.buttonBack}>
									<span className={classes.textButton}>Volver</span>
								</Button>
								{activeStep === steps.length - 1 ? (
									<Button
										sx={{
											mr: 40,
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
											mr: 40,
										}}
										disabled={ready}
										size='large'
										variant='contained'
										color='primary'
										onClick={handleClickButton}
										className={classes.buttonNext}>
										<span className={classes.textButton}>
											{activeStep > stepsValid - 1 ? 'Verificar' : 'Siguente'}
										</span>
									</Button>
								)}
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DiferidoValid;
