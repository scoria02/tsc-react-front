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
import { baseUrl } from '../../routers/url';
import { cleanFM, sendCompleteFM } from '../../store/actions/fm';
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
				client,
				commerce,
				pos,
				activity,
				locationClient,
				locationCommerce,
				locationPos,
				imagesForm,
				imagesActa
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
	]);

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

	//const [oldClientMatsh, setOldClientMatsh] = useState<boolean>(false);
	/*
	//MashClient
	useEffect(() => {
		if (fm.mashClient && fm.id_client) {
			const ref1 = JSON.parse(fm.clientMash.ref_person_1);
			const ref2 = JSON.parse(fm.clientMash.ref_person_2);
			setOldClientMatsh(true);
			setFmData({
				...fmData,
				email: fm.clientMash.email,
				name: fm.clientMash.name,
				last_name: fm.clientMash.last_name,
				phone1: fm.clientMash.phones[0].phone,
				phone2: fm.clientMash.phones[1].phone,
				id_estado_client: fm.clientMash.id_location.id_estado.id,
				id_ciudad_client: fm.clientMash.id_location.id_ciudad.id,
				id_municipio_client: fm.clientMash.id_location.id_municipio.id,
				id_parroquia_client: fm.clientMash.id_location.id_parroquia.id,
				codigo_postal_client: fm.clientMash.id_location.id_ciudad.postal_code,
				sector_client: fm.clientMash.id_location.sector,
				calle_client: fm.clientMash.id_location.calle,
				local_client: fm.clientMash.id_location.local,
				name_ref1: ref1.fullName,
				doc_ident_type_ref1: ref1.document[0],
				doc_ident_ref1: ref1.document,
				phone_ref1: ref1.phone,
				name_ref2: ref2.fullName,
				doc_ident_type_ref2: ref2.document[0],
				doc_ident_ref2: ref2.document,
				phone_ref2: ref2.phone,
			});
			setLocationClient({
				estado: fm.clientMash.id_location.id_estado,
				ciudad: fm.clientMash.id_location.id_ciudad,
				municipio: fm.clientMash.id_location.id_municipio,
				parroquia: fm.clientMash.id_location.id_parroquia,
			});
			setFmError({
				...fmDataError,
				//step 1
				email: false,
				name: false,
				last_name: false,
				id_ident_type: false,
				ident_num: false,
				phone1: false,
				phone2: false,
				id_estado_client: false,
				id_ciudad_client: false,
				id_municipio_client: false,
				id_parroquia_client: false,
				codigo_postal_client: false,
				sector_client: false,
				calle_client: false,
				local_client: false,
				//Step2 Referencias Personales
				name_ref1: false,
				doc_ident_type_ref1: false,
				doc_ident_ref1: false,
				phone_ref1: false,
				name_ref2: false,
				doc_ident_type_ref2: false,
				doc_ident_ref2: false,
				phone_ref2: false,
			});
		} else if (!fm.mashClient && oldClientMatsh && !Object.keys(fm.clientMash).length) {
			setOldClientMatsh(false);
			console.log('vaciar client');
			setFmData({
				...fmData,
				//Step1
				name: '',
				last_name: '',
				phone1: '',
				phone2: '',
				id_estado_client: 0,
				id_ciudad_client: 0,
				id_municipio_client: 0,
				id_parroquia_client: 0,
				codigo_postal_client: '',
				sector_client: '',
				calle_client: '',
				local_client: '',
				//Step2 Referencias Personales
				name_ref1: '',
				doc_ident_type_ref1: 'V',
				doc_ident_ref1: '',
				phone_ref1: '',
				name_ref2: '',
				doc_ident_type_ref2: 'V',
				doc_ident_ref2: '',
				phone_ref2: '',
			});
			setLocationClient({
				estado: null,
				ciudad: null,
				municipio: null,
				parroquia: null,
			});
		}
	}, [fm.mashClient, fm.clientMash, fm.id_client]);
	*/

	/*
	const [oldCommerceMatsh, setOldCommerceMatsh] = useState<boolean>(false);
	//MashCommerce
	useEffect(() => {
		if (fm.mashCommerce) {
			console.log('comercio ya existe');
			setOldCommerceMatsh(true);
			setFmData({
				...fmData,
				//step1
				name_commerce: fm.commerceMash.name,
				id_activity: fm.commerceMash.id_activity.id,
				special_contributor: fm.commerceMash.special_contributor,
				//step2
				id_estado: fm.clientMash.id_location.id_estado.id,
				id_ciudad: fm.clientMash.id_location.id_ciudad.id,
				id_municipio: fm.clientMash.id_location.id_municipio.id,
				id_parroquia: fm.clientMash.id_location.id_parroquia.id,
				codigo_postal: fm.clientMash.id_location.id_ciudad.postal_code,
				sector: fm.commerceMash.id_location.sector,
				calle: fm.commerceMash.id_location.calle,
				local: fm.commerceMash.id_location.local,
				//Note:
				//update days work commerce
			});
			setLocationCommerce({
				estado: fm.commerceMash.id_location.id_estado,
				ciudad: fm.commerceMash.id_location.id_ciudad,
				municipio: fm.commerceMash.id_location.id_municipio,
				parroquia: fm.commerceMash.id_location.id_parroquia,
			});
			setActivity(fm.commerceMash.id_activity);
			setFmError({
				...fmDataError,
				name_commerce: false,
				ident_num_commerce: false,
				id_activity: false,
			});
		} else if (!fm.mashCommerce && oldCommerceMatsh) {
			setOldCommerceMatsh(false);
			console.log('vaciar Commercio', fm.commerceMash);
			setFmData({
				...fmData,
				name_commerce: '',
				id_activity: 0,
				special_contributor: 0,
				//Step3 Location
				//Location se carga del cliente
			});
			setDays({
				Lunes: true,
				Martes: true,
				Miercoles: true,
				Jueves: true,
				Viernes: true,
				Sabado: true,
	}, [fm.mashCommerce, fm.commerceMash]);
	*/

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
				client,
				commerce,
				pos,
				activity,
				locationClient,
				locationCommerce,
				locationPos,
				imagesForm,
				imagesActa
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
		history.push(baseUrl);
	};

	const getStep: ReactElement[] = [<StepBase />, <Step1 />, <Step2 />, <Step3 />, <Step4 />, <Step5 />];
	const getStepExtraPos: ReactElement[] = [<StepBase />, <ExtraPos />, <Step5 />];

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
									onClick={
										activeStep ? (activeStep === steps.length - 1 ? handleSubmit : handleNext) : handleGetStep
									}
									className={classes.buttonNext}>
									{!activeStep ? 'Comenzar' : activeStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
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
