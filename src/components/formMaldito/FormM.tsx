/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
//Material
import Stepper from '@material-ui/core/Stepper';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { SocketContext } from '../../context/SocketContext';
import { urlFM } from '../../routers/url';
import { cleanFM, sendCompleteFM, sendCompleteFMExtraPos } from '../../store/actions/fm';
import { useDispatch, useSelector } from 'react-redux';
//Redux
import { RootState } from '../../store/store';
import LoaderPrimary from '../loaders/LoaderPrimary';
import './index.scss';
//steps
import StepBase from './steps';
import ExtraPos from './steps/ExtraPos';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';
import { Step5 } from './steps/Step5';
import { useStylesFM } from './styles';
import * as valids from './validForm';
import { StateFMInt } from '../../store/reducers/fmReducer';
import { stepError } from '../../utils/fm';

import FMDataContext from '../../context/FM/fmAdmision/FmContext';
import DataListContext from '../../context/DataList/DataListContext';
import LocationsContext from '../../context/FM/Location/LocationsContext';
import ImagesFmContext from '../../context/FM/fmImages/ImagesFmContext';
import { types } from 'util';
import { act } from 'react-dom/test-utils';
import { ActionType } from '../../store/types/types';

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

	const { listIdentType, listActivity, listPayment, listModelPos, listTypePay, listRequestSource } =
		useContext(DataListContext);

	const {
		typeSolict,
		client,
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
	} = useContext(FMDataContext);

	const {
		listLocationClient,
		listLocationCommerce,

		listLocationPos,
		copyListLocationToCommerce,
		copyListLocationToPos,
	} = useContext(LocationsContext);

	const { imagePlanilla, imagesForm, imagesActa, namesImages } = useContext(ImagesFmContext);

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
				activity,
				locationClient,
				locationCommerce,
				locationPos,
				imagesForm,
				imagesActa,
				fm.errorClient,
				fm.errorCommerce,
				fm.errorNumBank
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
	]);

	useEffect(() => {
		if (activeStep) {
			if (activeStep === steps.length - 1) {
				setTitleNextButton('Enviar');
			} else {
				if (typeSolict === 3 && activeStep === 1) setTitleNextButton('Validar');
				else setTitleNextButton('Siguiente');
			}
		} else setTitleNextButton('Comenzar');
	}, [activeStep]);

	useEffect(() => {
		dispatch(cleanFM());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//AutoComplete Locaitons
	useEffect(() => {
		copyListLocationToCommerce(listLocationClient);
		copyLocationToCommerce(locationClient, client);
	}, [locationClient, listLocationClient, client.sector, client.calle, client.local]);

	useEffect(() => {
		copyListLocationToPos(listLocationCommerce);
		copyLocationToPos(locationCommerce, commerce);
	}, [locationCommerce, listLocationCommerce, commerce.sector, commerce.calle, commerce.local]);

	useEffect(() => {
		if (fm.loadedFM) {
			console.log('Ready All FM');
			socket.emit('cliente:disconnect');
			handleSendForm();
			dispatch(cleanFM());
		}
	}, [fm.loadedFM]);

	useEffect(() => {
		if (fm.errorClient) setActiveStep(1);
		else if (activeStep > 1 && fm.errorCommerce) setActiveStep(3);
		else if (activeStep > 3 && fm.errorNumBank) setActiveStep(5);
	}, [activeStep, fm.errorClient, fm.errorCommerce, fm.errorNumBank]);

	const handleGetStep = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		const stepOp = typeSolict !== 3 ? baseSteps : PosExtraSteps;
		const newSteps = [...initStep, ...stepOp];
		setSteps(newSteps);
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
				activity,
				locationClient,
				locationCommerce,
				locationPos,
				imagesForm,
				imagesActa,
				fm.errorClient,
				fm.errorCommerce,
				fm.errorNumBank
			)
		)
			return;
		//Send FM
		handleLoading();
		dispatch(
			sendCompleteFM(
				client,
				locationClient,
				commerce,
				locationCommerce,
				activity,
				pos,
				locationPos,
				imagePlanilla,
				imagesForm,
				imagesActa
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
				activity,
				locationClient,
				locationCommerce,
				locationPos,
				imagesForm,
				imagesActa,
				fm.errorClient,
				fm.errorCommerce,
				fm.errorNumBank
			)
		)
			return;
		//Send FM
		handleLoading();

		dispatch(sendCompleteFMExtraPos(idsCAndCc!, pos, locationPos, imagePlanilla, imagesForm));
	};

	const handleLoading = () => {
		Swal.fire({
			icon: 'info',
			title: 'Enviando Solicitud...',
			showConfirmButton: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});
	};

	const handleSendForm = () => {
		Swal.fire({
			icon: 'success',
			title: 'Solicitud Enviada',
			showConfirmButton: false,
			timer: 1500,
		});
		history.push(urlFM);
	};

	const handleExtraPosValid = async () => {
		if (client.id_ident_type && client.ident_num !== '' && commerce.id_ident_type && commerce.ident_num !== '') {
			const res = await validClientAndCommerce();
			if (res) {
				handleNext();
			}
		}
	};

	const getStep: ReactElement[] = [<StepBase />, <Step1 />, <Step2 />, <Step3 />, <Step4 />, <Step5 />];
	const getStepExtraPos: ReactElement[] = [<StepBase />, <ExtraPos />, <Step5 />];

	const handleClickButton = () => {
		if (activeStep) {
			if (activeStep === steps.length - 1) {
				if (typeSolict === 3) handleSubmitExtraPos();
				else handleSubmit();
			} else {
				if (typeSolict === 3) {
					handleExtraPosValid();
				} else {
					handleNext();
				}
			}
		} else {
			handleGetStep();
		}
	};

	return (
		<div className='ed-container container-formMaldito'>
			{!listIdentType.length ||
			!listActivity.length ||
			!listPayment.length ||
			!listLocationCommerce.estado.length ||
			!listLocationClient.estado.length ||
			!listLocationPos.estado.length ? (
				<LoaderPrimary />
			) : (
				<form className='container-form'>
					<Stepper alternativeLabel activeStep={activeStep} style={{ background: 'none', width: '100%' }}>
						{steps.map((label, index) => {
							const stepProps: { completed?: boolean } = {};
							return !activeStep ? null : (
								<Step key={label} {...stepProps}>
									<StepLabel error={stepError(index, fm)}>
										<b>{label}</b>
									</StepLabel>
								</Step>
							);
						})}
					</Stepper>
					<div className={classes.containerFM}>
						<div className='container-steps'>
							{typeSolict === 3 ? getStepExtraPos[activeStep] : getStep[activeStep]}
							<div className={classes.buttonFixed}>
								<Button
									size='large'
									disabled={activeStep === 0}
									variant='contained'
									style={{ opacity: activeStep ? 1 : 0 }}
									onClick={handleBack}
									className={classes.buttonBack}>
									Volver
								</Button>
								<Button
									disabled={!readyStep}
									size='large'
									variant='contained'
									color='primary'
									onClick={handleClickButton}
									className={classes.buttonNext}>
									{titleNextButton}
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
