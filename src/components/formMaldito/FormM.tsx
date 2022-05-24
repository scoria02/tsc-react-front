/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography, Button, Step, StepLabel, Stepper } from '@mui/material';
import DataListContext from 'context/DataList/DataListContext';
import FMDataContext from 'context/Admision/CreationFM/fmAdmision/FmContext';
import ImagesFmContext from 'context/Admision/CreationFM/fmImages/ImagesFmContext';
import LocationsContext from 'context/Admision/CreationFM/Location/LocationsContext';
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
import LoaderPrimary from '../loaders/LoaderPrimary';
//steps
import StepBase from './steps';
import StepExtraPos from './steps/ExtraPos';
import StepClient from './steps/StepClient';
import StepCommerce from './steps/StepCommerce';
import StepLocationCCandPos from './steps/StepLocationCCandPos';
import StepPos from './steps/StepPos';
import StepReferencias from './steps/StepReferencias';
import { useStylesFM } from './styles';
import * as valids from './validForm';

const initStep = ['Tipo de Solicitud'];

const baseSteps = [
	'Información Personal del Cliente',
	'Referencias Personales',
	'Información del Comercio',
	'Dirección del Comercio/POS',
	'Solicitud de POS',
];

const PosExtraSteps = ['Cliente/Comerio', 'Solicitud de POS'];

const FormM: React.FC = () => {
	const history = useHistory();
	const classes = useStylesFM();
	const dispatch = useDispatch();

	const { socket } = useContext(SocketContext);

	const [steps, setSteps] = useState<string[]>(initStep);

	const fm: StateFMInt = useSelector((state: RootState) => state.fm);

	const [activeStep, setActiveStep] = useState<number>(0);
	const [readyStep, setReadyStep] = useState<boolean>(false);

	const [titleNextButton, setTitleNextButton] = useState('Comenzar');

	const { listIdentType, listActivity, listPayment, listTypesSolicts } = useContext(DataListContext);

	const {
		typeSolict,
		client,
		setClient,
		commerce,
		pos,
		activity,
		locationClient,
		locationCommerce,
		locationPos,
		copyLocationToCommerce,
		copyLocationToPos,
		errorsFm,
		errorsClient,
		errorsCommerce,
		validClientAndCommerce,
		idsCAndCc,
		aci,
		telemarket,
		typeWallet,
		handleTypeSolict,
		idLocationClient,
		idLocationCommerce,
		idLocationPos,
		resetFm,
	} = useContext(FMDataContext);

	const {
		listLocationClient,
		listLocationCommerce,
		listLocationPos,
		copyListLocationToCommerce,
		copyListLocationToPos,
		resetListLocaitons,
	} = useContext(LocationsContext);

	const { imagePlanilla, imagesForm, imagesActa, namesImages, resetImages } = useContext(ImagesFmContext);

	useEffect(() => {
		if (
			fm.mashClient &&
			fm.mashCommerce &&
			client.ident_num !== '' &&
			commerce.ident_num !== '' &&
			typeSolict !== 4
		) {
			handleTypeSolict(4);
			setActiveStep(1);
			const newSteps = [...initStep, ...PosExtraSteps];
			setSteps(newSteps);
		}
		if ((fm.mashClient && client.name === '' && client.last_name === '' && typeSolict === 1) || typeSolict === 3) {
			setClient({
				...client,
				name: fm.clientMash.name,
				last_name: fm.clientMash.last_name,
			});
		}
	}, [fm]);

	useEffect(() => {
		if (
			!fm.mashClient &&
			client.name !== '' &&
			client.last_name !== '' &&
			(typeSolict === 1 || typeSolict === 2 || typeSolict === 3)
		) {
			setClient({
				...client,
				name: '',
				last_name: '',
			});
		}
	}, [fm.mashClient]);

	useEffect(() => {
		setReadyStep(
			valids.validReadyStep(
				typeSolict,
				activeStep,
				errorsFm,
				errorsClient,
				errorsCommerce,
				client,
				commerce,
				pos,
				aci,
				telemarket,
				typeWallet,
				activity,
				locationClient,
				locationCommerce,
				locationPos,
				imagesForm,
				imagesActa,
				fm.errorClient,
				fm.errorCommerce,
				fm.errorNumBank,
				fm
			)
		);
	}, [
		client,
		commerce,
		pos,
		locationClient,
		locationCommerce,
		locationPos,
		activity,
		activeStep,
		imagesForm,
		imagesActa,
		fm,
		aci,
		telemarket,
		typeWallet,
	]);

	useEffect(() => {
		if (activeStep) {
			if (activeStep === steps.length - 1) {
				setTitleNextButton('Enviar');
			} else {
				if (typeSolict === 4 && activeStep === 1) setTitleNextButton('Validar');
				else setTitleNextButton('Siguiente');
			}
		} else setTitleNextButton('Comenzar');
	}, [activeStep]);

	useLayoutEffect(() => {
		//resetFm();
		//resetListLocaitons();
		//resetImages();
		//setActiveStep(1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//AutoComplete Locaitons
	useEffect(() => {
		copyListLocationToCommerce(listLocationClient);
		copyLocationToCommerce(locationClient, client, idLocationClient);
	}, [locationClient, listLocationClient, client.calle, client.local, idLocationClient]);

	useEffect(() => {
		copyListLocationToPos(listLocationCommerce);
		copyLocationToPos(locationCommerce, commerce, idLocationCommerce);
	}, [locationCommerce, listLocationCommerce, commerce.calle, commerce.local, idLocationCommerce]);

	useEffect(() => {
		if (fm.loadedFM) {
			console.log('Ready All FM');
			//socket.emit('cliente:disconnect');
			dispatch(cleanFM());
			handleSendForm();
		}
	}, [fm.loadedFM, dispatch]);

	useEffect(() => {
		if (fm.errorClient) setActiveStep(1);
		else if (activeStep > 1 && fm.errorCommerce) setActiveStep(3);
		else if (activeStep > 3 && fm.errorNumBank) setActiveStep(5);
	}, [activeStep, fm.errorClient, fm.errorCommerce, fm.errorNumBank]);

	const handleGetStep = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		const stepOp = typeSolict !== 4 ? baseSteps : PosExtraSteps;
		const newSteps = [...initStep, ...stepOp];
		setSteps(newSteps);
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		if (fm.mashClient && activeStep === 3) {
			setActiveStep(1);
		} else {
			setActiveStep((prevActiveStep) => prevActiveStep - 1);
		}
	};

	const handleSubmit = () => {
		if (
			!valids.validReadyStep(
				typeSolict,
				activeStep,
				errorsFm,
				errorsClient,
				errorsCommerce,
				client,
				commerce,
				pos,
				aci,
				telemarket,
				typeWallet,
				activity,
				locationClient,
				locationCommerce,
				locationPos,
				imagesForm,
				imagesActa,
				fm.errorClient,
				fm.errorCommerce,
				fm.errorNumBank,
				fm
			)
		)
			return;
		//Send FM
		handleLoading();
		dispatch(
			sendCompleteFM(
				typeSolict,
				client,
				commerce,
				activity,
				pos,
				aci,
				telemarket,
				typeWallet,
				imagePlanilla,
				imagesForm,
				imagesActa,
				fm.id_client,
				idLocationClient,
				idLocationCommerce,
				idLocationPos
			)
		);
	};

	const handleSubmitExtraPos = () => {
		if (
			!valids.validReadyStep(
				typeSolict,
				activeStep,
				errorsFm,
				errorsClient,
				errorsCommerce,
				client,
				commerce,
				pos,
				aci,
				telemarket,
				typeWallet,
				activity,
				locationClient,
				locationCommerce,
				locationPos,
				imagesForm,
				imagesActa,
				fm.errorClient,
				fm.errorCommerce,
				fm.errorNumBank,
				fm
			)
		)
			return;
		//Send FM
		handleLoading();

		dispatch(
			sendCompleteFMExtraPos(
				typeSolict,
				idsCAndCc!,
				pos,
				aci,
				telemarket,
				typeWallet,
				imagePlanilla,
				imagesForm,
				idLocationPos
			)
		);
	};

	const handleLoading = () => {
		Swal.fire({
			icon: 'info',
			title: 'Enviando Solicitud...',
			allowOutsideClick: false,
			allowEscapeKey: false,
			showConfirmButton: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});
	};

	const handleSendForm = () => {
		const text = `Nro: <b>${fm.code}</b>`;
		Swal.fire({
			icon: 'success',
			title: 'Solicitud Enviada',
			allowOutsideClick: false,
			allowEscapeKey: false,
			html: text,
			showConfirmButton: false,
			timer: 2500,
		});
		history.push(urlFM);
		setActiveStep(0);
	};

	const handleExtraPosValid = async () => {
		if (client.id_ident_type && client.ident_num !== '' && commerce.id_ident_type && commerce.ident_num !== '') {
			const res = await validClientAndCommerce();
			if (res) {
				setActiveStep(2);
			}
		}
	};

	const getStep: ReactElement[] = [
		<StepBase />,
		<StepClient />,
		<StepReferencias />,
		<StepCommerce />,
		<StepLocationCCandPos />,
		<StepPos />,
	];
	const getStepExtraPos: ReactElement[] = [<StepBase />, <StepExtraPos />, <StepPos />];

	const handleClickButton = () => {
		if (activeStep) {
			if (activeStep === steps.length - 1) {
				if (typeSolict === 4) handleSubmitExtraPos();
				else handleSubmit();
			} else {
				if (typeSolict === 4) {
					handleExtraPosValid();
				} else {
					if (fm.mashClient && activeStep === 1) {
						setActiveStep(3);
					} else {
						handleNext();
					}
				}
			}
		} else {
			handleGetStep();
		}
	};

	return (
		<div>
			{!listTypesSolicts.length ||
			!listIdentType.length ||
			!listActivity.length ||
			!listPayment.length ||
			!listLocationCommerce.estado.length ||
			!listLocationClient.estado.length ||
			!listLocationPos.estado.length ? (
				<LoaderPrimary />
			) : (
				<form className={classes.containerSteps}>
					<Stepper alternativeLabel activeStep={activeStep} style={{ background: 'none', width: '100%' }}>
						{steps.map((label, index) => {
							const stepProps: { completed?: boolean } = {};
							return !activeStep ? null : (
								<Step key={label} {...stepProps}>
									<StepLabel error={stepError(index, fm)}>
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
							{typeSolict === 4 ? getStepExtraPos[activeStep] : getStep[activeStep]}
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
								<Button
									disabled={!readyStep}
									sx={{
										mr: 50,
									}}
									size='large'
									variant='contained'
									color='primary'
									onClick={handleClickButton}
									className={classes.buttonNext}>
									<span className={classes.textButton}>{titleNextButton}</span>
								</Button>
							</div>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};

export default FormM;
