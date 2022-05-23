/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography, Button, Step, StepLabel, Stepper } from '@mui/material';
import { cleanDataFmDiferido, updateStatusFMDiferido } from 'store/actions/admisionFm';
import DataListAdmisionContext from 'context/DataList/DatalistAdmisionContext';
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
//steps
//Cliente y comercio existente
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

const DiferidoValid: React.FC = () => {
	const dispatch = useDispatch();
	const classes = useStylesFM();

	const { socket } = useContext(SocketContext);
	const [steps, setSteps] = useState<string[]>([]);

	const [activeStep, setActiveStep] = useState<number>(0);

	const [stepsValid, setStepsValid] = useState<number>(0);

	const {
		disabled,
		setDisabled,
		client,
		codeFM,
		solic,
		listValidated,
		stepsFM,
		phones,
		commerce,
		imagesForm,
		imagePlanilla,
		imagesActa,
	} = useContext(FMDiferidoContext);

	useEffect(() => {
		if (activeStep > stepsValid - 1) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [disabled, activeStep, stepsValid]);

	useLayoutEffect(() => {
		setSteps(stepsFM);
	}, [stepsFM]);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

	const handleVerificated = () => {
		Swal.fire({
			icon: 'success',
			title: 'Solicitud Verificada',
			html: `<span>Codigo de Solicitud: <b>${codeFM}</b><span>`,
			showConfirmButton: false,
			allowOutsideClick: false,
			allowEscapeKey: false,
			timer: 2000,
			customClass: { container: 'swal2-validated' },
		});
		//setActiveStep(0);
	};

	const validStatusFm = () => {
		return false;
	};

	const handleSend = async () => {
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
				//handleLoading();
				let phone = {
					phone1: '+58' + phones.phone1,
					phone2: '+58' + phones.phone2,
				};
				console.log(solic);
				console.log({ ...client, phone });
				dispatch(
					updateStatusFMDiferido(
						solic.id,
						solic,
						{ ...client, phone },
						commerce,
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

	console.log('p', solic);

	const getContentSteps = () => {
		let list: any = [];
		if (listValidated.id_typedif_client && !list.includes(<DifStepClient />)) list.push(<DifStepClient />);
		if (listValidated.id_typedif_commerce && !list.includes(<DifStepCommerce />)) list.push(<DifStepCommerce />);
		if (listValidated.id_typedif_consitutive_acta && !list.includes(<DifStepActaConst />))
			list.push(<DifStepActaConst />);
		if (listValidated.id_typedif_special_contributor && !list.includes(<DifStepSpecialContributor />))
			list.push(<DifStepSpecialContributor />);
		if (listValidated.id_typedif_pos && !list.includes(<DifStepPos />)) list.push(<DifStepPos />);
		if (listValidated.id_typedif_planilla && !list.includes(<DifStepPlanilla />)) list.push(<DifStepPlanilla />);
		if (listValidated.id_typedif_ref_bank && !list.includes(<DifStepRefBank />)) list.push(<DifStepRefBank />);
		if (listValidated.id_typedif_comp_num && !list.includes(<DifStepCompDep />)) list.push(<DifStepCompDep />);
		return list;
	};

	const getStep: ReactElement[] = getContentSteps();

	const handleClickButton = () => {
		if (activeStep > stepsValid - 1) {
			handleVerificar();
		} else {
			handleNext();
		}
	};

	return (
		<div style={{ marginTop: '2rem' }}>
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
							{getStep[activeStep]}
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
