/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
//Material
import Stepper from '@material-ui/core/Stepper';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { SocketContext } from '../../context/SocketContext';
import { baseUrl } from '../../routers/url';
import {
	cleanFM,
	sendClient,
	sendCommerce,
	sendFM,
	sendImages,
	validationClient,
	validationCommerce,
	validationNumBank,
} from '../../store/actions/fm';
//Redux
import { RootState } from '../../store/store';
import LoaderPrimary from '../loaders/LoaderPrimary';
import './index.scss';
//steps
import StepBase from './steps';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';
import { Step5 } from './steps/Step5';
import { useStylesFM } from './styles';
import * as valids from './validForm';

import { FMContext } from '../../context/FM/FMContext';

import { LocationsContext } from '../../context/Location/LocationsContext';

import { DataListContext } from '../../context/DataList/DataListContext';
import { FMint, ImagesInt, ListLocationInt, NamesImagesInt } from './interface';
import { StateFMInt } from '../../store/reducers/fmReducer';
import { stepError } from '../../utils/fm';

const initStep = ['Tipo de Solicitud'];

const baseSteps = [
	'Información Personal del Cliente',
	'Referencias Personales',
	'Información del Comercio',
	'Dirección del Comercio/POS',
	'Solicitud de POS',
];

const FormM: React.FC = () => {
	const history = useHistory();
	const classes = useStylesFM();
	const dispatch = useDispatch();

	const [steps, setSteps] = useState<string[]>(initStep);

	const fm: StateFMInt = useSelector((state: RootState) => state.fm);

	const {
		typeSolict,
		fmClient,
		fmCommerce,
		handleParamsCommerce,
		//s
		fmData,
		fmDataError,
		days,
		codePhone,
		setFmError,
		changeFmData,
		locationCommerce,
		locationPos,
		setLocationClient,
		setLocationCommerce,
		setFmData,
		setDays,
		setActivity,
		copyLocationCToCC,
		copyLocationCCToP,
	}: any = useContext(FMContext as any);

	const {
		listLocationClient,
		listLocationCommerce,
		listLocationPos,
		copyListLocationCToCC,
		copyListLocationCCToP,
	}: ListLocationInt = useContext(LocationsContext as any);

	const { listIdentType, listActivity, listPayment, listModelPos, listTypePay, listRequestSource }: any =
		useContext(DataListContext);

	//images
	const [imagesForm, setImagesForm] = useState<ImagesInt>({
		//Step1
		rc_ident_card: null, //11
		//Step2
		rc_rif: null, //10
		rc_special_contributor: null, //4
		//Step4
		rc_ref_bank: null, //5
		rc_comp_dep: null,
	});

	//images Acta
	const [imagesActa, setImagesActa] = useState<any>([]);

	const [validEmailIdent, setValidEmailIdent] = useState<boolean>(false);
	const [activeStep, setActiveStep] = useState<number>(0);
	const [readyStep, setReadyStep] = useState<boolean>(false);
	const [sendForm, setSendForm] = useState<number>(0);

	// Origen de solicitud
	const [requestSource, setRequestSource] = useState<any[]>(listRequestSource[0]);
	const [typePay, setTypePay] = useState<any>(null);
	const [payment, setPayment] = useState<any>(null);
	const [modelPos, setModelPost] = useState<any>(null);

	const { socket } = useContext(SocketContext);

	//name images
	const [namesImages, setNamesImages] = useState<NamesImagesInt>({
		//step1
		rc_ident_card: '', //11
		//step2
		rc_rif: '', //10
		rc_special_contributor: '', //4
		//step4
		rc_ref_bank: '', //5
		rc_comp_dep: '',
	});

	useEffect(() => {
		if (
			activeStep === 3 &&
			fmCommerce.ident_num !== '' &&
			fmClient.ident_num === fmCommerce.ident_num &&
			fmClient.id_ident_type === fmCommerce.id_ident_type
		) {
			handleParamsCommerce('name', fmClient.name + ' ' + fmClient.last_name);
		}
	}, [activeStep]);

	//SendForm
	useEffect(() => {
		if (fm.errorClient) {
			setValidEmailIdent(true);
		} else {
			setValidEmailIdent(false);
		}

		if (sendForm === 1 && fm.id_client !== 0) {
			console.log('Listo Cliente');
			if (!fm.mashCommerce) {
				dispatch(sendCommerce(fm.id_client, fmData, valids.daysToString(days)));
			}
			setSendForm(2);
			//Fin comerce
		} else if (sendForm === 2 && fm.id_commerce !== 0 && fm.id_client !== 0) {
			console.log('Listo Comercio');
			const formData: FormData = new FormData();
			for (const item of Object.entries(imagesForm)) {
				if (item[1] !== null) {
					formData.append('images', item[1]);
				}
			}
			for (const item of imagesActa) {
				formData.append('constitutive_act', item);
			}
			formData.append('id_client', `${fm.id_client}`);
			formData.append('id_commerce', `${fm.id_commerce}`);
			formData.append('bank_account_num', fmData.text_account_number);
			dispatch(sendImages(formData));
			//update fm_imgaes
			setSendForm(3);
		} else if (sendForm === 3 && fm.id_images !== null && fm.id_commerce !== 0 && fm.id_client !== 0) {
			console.log('Listo Images, Client/Comercio:', fm.id_client, fm.id_commerce);
			dispatch(sendFM(fmData, fm));
			setSendForm(4);
		} else if (sendForm === 4 && fm.loadedFM) {
			console.log('Ready All FM');
			socket.emit('cliente:disconnect');
			setSendForm(5);
			handleSendForm();
			dispatch(cleanFM());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sendForm, fm]);

	useEffect(() => {
		dispatch(cleanFM());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//Autocomplete location
	const [autoCompleteCommerce, setAutoCompleteCommerce] = useState<boolean>(true);
	const [autoCompletePos, setAutoCompletePos] = useState<boolean>(true);

	//Copyrighter Client to Commerce / Pos
	useEffect(() => {
		if (activeStep === 3 && autoCompleteCommerce && !fm.mashCommerce) {
			copyListLocationCToCC();
			copyLocationCToCC();
		}
	}, [activeStep, fm.commerceMash]);

	//Copyrighter Commerce to pos
	//note mover useE to step4
	useEffect(() => {
		if (activeStep === 3 && autoCompletePos) {
			copyListLocationCCToP();
			copyLocationCCToP();
		}
	}, [
		activeStep,
		locationCommerce,
		fmData.sector,
		fmData.calle,
		fmData.local,
		fmData.codigo_postal,
		fm.commerceMash,
	]);

	useEffect(() => {
		if (
			locationCommerce.estado === null &&
			locationCommerce.ciudad === null &&
			locationCommerce.municipio === null &&
			locationCommerce.parroquia === null &&
			fmData.sector === '' &&
			fmData.calle === '' &&
			fmData.local === '' &&
			fmData.codigo_postal === ''
		) {
			setAutoCompleteCommerce(true);
		}
		if (
			locationPos.estado === null &&
			locationPos.ciudad === null &&
			locationPos.municipio === null &&
			locationPos.parroquia === null &&
			fmData.sector_pos === '' &&
			fmData.calle_pos === '' &&
			fmData.local_pos === '' &&
			fmData.codigo_postal_pos === ''
		) {
			setAutoCompletePos(true);
		}
	}, [fmData, locationCommerce, locationPos]);

	useEffect(() => {
		if (fm.errorClient) setActiveStep(1);
		else if (activeStep > 1 && fm.errorCommerce) setActiveStep(3);
		else if (activeStep > 3 && fm.errorNumBank) setActiveStep(5);
	}, [activeStep, fm.errorClient, fm.errorCommerce, fm.errorNumBank]);

	useEffect(() => {
		switch (activeStep) {
			case 0:
				setReadyStep(true);
				break;
			case 1:
			case 2:
				if (
					!valids.checkErrorAllInput(valids.sizeStepError(activeStep), fmDataError) &&
					!valids.inputNotNull(valids.sizeStep(activeStep), fmClient)
				)
					setReadyStep(true);
				else setReadyStep(false);
				break;
			case 3:
				if (!valids.inputNotNull(valids.sizeStep(activeStep), fmCommerce)) setReadyStep(true);
				else setReadyStep(false);
				break;
			case 4:
				if (
					!valids.inputNotNull(valids.sizeStep(activeStep), fmCommerce)
					//&&
					//!valids.inputNotNull(valids.sizeStep(activeStep), fmPos)
				)
					setReadyStep(true);
				else setReadyStep(false);
				break;
			default:
				setReadyStep(false);
				break;
		}
	}, [fmClient, fmCommerce, imagesForm, activeStep, fm, imagesActa]);

	//CheckStepAcual
	/*
	useEffect(() => {
		if (
			//!valids.allInputNotNUll(valids.sizeStep(activeStep), fmData, fm.mashClient, fm.mashCommerce) &&
			//!valids.checkErrorAllInput(valids.sizeStep(activeStep), fmDataError) &&
			//valids.validMashes(activeStep, fm.validMashClient, fm.validMashCommerce)
			!valids.allImgNotNUll(
				fmData,
				valids.sizeImagesStep(activeStep),
				imagesForm,
				fmData.special_contributor,
				fm.imagesClient,
				fm.imagesCommerce,
				fmData.id_ident_type_commerce
			) &&
			!valids.checkErrorAllInput(valids.sizeStep(activeStep), fmDataError) &&
			!valids.validEndPoint(activeStep, fm) &&
			!valids.notNullImagenActa(activeStep, imagesActa, fmData.id_ident_type_commerce, fm.imagesCommerce) &&
			valids.validMashes(activeStep, fm.validMashClient, fm.validMashCommerce)
		) {
			setReadyStep(true);
		} else {
			setReadyStep(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fmData, imagesForm, activeStep, fm, imagesActa]);
	*/

	const validateForm = (name: string, value: any): void => {
		let temp: any = fmDataError;
		switch (name) {
			case 'email':
				temp.email = valids.validEmail(value);
				break;
			case 'name':
			case 'last_name':
				temp[name] = valids.validFullName(value);
				break;
			case 'id_ident_type':
				if (fmData.ident_num.trim() !== '') {
					temp.ident_num = valids.validIdentNum(fmData.ident_num, value);
				}
				break;
			case 'ident_num':
				temp.ident_num = valids.validIdentNum(value, fmData.id_ident_type);
				break;
			case 'phone1':
				temp.phone1 = valids.validPhone(value);
				if (fmData.phone2 !== '') temp.phone2 = valids.validPhone2(fmData.phone2, value);
				break;
			case 'phone2':
				temp.phone2 = valids.validPhone2(value, fmData.phone1);
				break;
			case 'phone_ref1':
				temp.phone_ref1 = valids.validPhone(value);
				if (fmData.phone_ref2 !== '') temp.phone_ref2 = valids.validPhone2(fmData.phone_ref2, value);
				break;
			case 'phone_ref2':
				temp.phone_ref2 = valids.validPhone2(value, fmData.phone_ref1);
				break;
			case 'doc_ident_ref1':
				temp.doc_ident_ref1 = valids.validIdentRef(
					fmData.doc_ident_type_ref1 + value,
					fmData.doc_ident_type_ref2 + fmData.doc_ident_ref2
				);
				break;
			case 'doc_ident_type_ref1':
				temp.doc_ident_ref1 = valids.validIdentRef(
					value + fmData.doc_ident_ref1,
					fmData.doc_ident_type_ref2 + fmData.doc_ident_ref2
				);
				break;
			case 'doc_ident_ref2':
				temp.doc_ident_ref2 = valids.validIdentRef(
					fmData.doc_ident_type_ref2 + value,
					fmData.doc_ident_type_ref1 + fmData.doc_ident_ref1
				);
				break;
			case 'doc_ident_type_ref2':
				temp.doc_ident_ref2 = valids.validIdentRef(
					fmData.doc_ident_type_ref1 + fmData.doc_ident_ref1,
					value + fmData.doc_ident_ref2
				);
				break;
			case 'name_commerce':
				temp.name_commerce = valids.validNameCommere(value);
				break;
			case 'number_post':
				temp.number_post = valids.validNum_post(value);
				break;
			case 'text_account_number':
				temp.text_account_number = valids.validNumBank(value);
				if (value.length === 20 && fmData.email !== '') {
					dispatch(
						validationNumBank({
							email: fmData.email,
							bank_account_num: value,
						})
					);
				}
				break;
			default:
				break;
		}
		setFmError(temp);
	};

	const [oldClientMatsh, setOldClientMatsh] = useState<boolean>(false);

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
				Domingo: true,
			});
			setActivity(null);
		}
	}, [fm.mashCommerce, fm.commerceMash]);

	const handleGetStep = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		const newSteps = [...initStep, ...baseSteps];
		setSteps(newSteps);
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleChangeNames = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (
			(event.target.value.trim() !== '' && /^[a-zA-Z ]+$/.test(event.target.value)) ||
			event.target.value === ''
		) {
			handleChange(event);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (changeFmData) changeFmData(event);
		validateForm(event.target.name, event.target.value);
	};

	const handleChangeImages = (event: any) => {
		if (event.target.files[0]) {
			let file = event.target.files[0];
			let newFile = new File([file], `${event.target.name}.${file.type.split('/')[1]}`, { type: file.type });
			//Save img
			setImagesForm({
				...imagesForm,
				[event.target.name]: newFile,
			});
			setNamesImages({
				...namesImages,
				[event.target.name]: event.target.files[0].name,
			});
		}
	};

	const handleChangeImagesMulti = (event: any) => {
		if (event.target.files[0]) {
			let files = event.target.files;
			setImagesActa(files);
		}
	};

	const handleSubmit = () => {
		if (
			valids.allInputNotNUll(valids.sizeStep(activeStep), fmData, fm.mashClient, fm.mashCommerce) ||
			valids.allImgNotNUll(
				fmData,
				valids.sizeImagesStep(activeStep),
				imagesForm,
				fmData.special_contributor,
				fm.imagesClient,
				fm.imagesCommerce,
				fmData.id_ident_type_commerce
			) ||
			valids.checkErrorAllInput(valids.sizeStep(activeStep), fmDataError) ||
			valids.validEndPoint(activeStep, fm) ||
			valids.notNullImagenActa(activeStep, imagesActa, fmData.id_ident_type_commerce, fm.imagesCommerce)
		)
			return;
		//Send FM
		handleLoading();
		setSendForm(1);
		if (!fm.mashClient && codePhone) {
			dispatch(sendClient(fmData, codePhone));
		}
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

	const deleteImgContributor = (name: string) => {
		setImagesForm({
			...imagesForm,
			[`rc_${name}`]: null,
		});
		setNamesImages({
			...namesImages,
			[`rc_${name}`]: '',
		});
	};

	const getStep = [
		<StepBase />,
		<Step1
			namesImages={namesImages}
			validEmailIdent={validEmailIdent}
			imagesForm={imagesForm}
			handleChangeNames={handleChangeNames}
			handleChangeImages={handleChangeImages}
		/>,
		<Step2 />,
		<Step3
			imagesActa={imagesActa}
			namesImages={namesImages}
			imagesForm={imagesForm}
			handleChangeImages={handleChangeImages}
			handleChangeImagesMulti={handleChangeImagesMulti}
			deleteImgContributor={deleteImgContributor}
		/>,
		<Step4 setAutoCompleteCommerce={setAutoCompleteCommerce} setAutoCompletePos={setAutoCompletePos} />,
		<Step5
			listTypePay={listTypePay}
			setTypePay={setTypePay}
			typePay={typePay}
			imagesForm={imagesForm}
			namesImages={namesImages}
			listModelPos={listModelPos}
			setModelPost={setModelPost}
			modelPos={modelPos}
			listPayment={listPayment}
			setPayment={setPayment}
			payment={payment}
			handleChangeImages={handleChangeImages}
			listRequestSource={listRequestSource}
			requestSource={requestSource}
			setRequestSource={setRequestSource}
			deleteImgContributor={deleteImgContributor}
		/>,
	];

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
							{getStep[activeStep]}
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
