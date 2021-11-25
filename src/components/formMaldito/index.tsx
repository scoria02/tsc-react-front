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
import {
	getActivity,
	getCiudad,
	getEstados,
	getIdentTypes,
	getMunicipio,
	getParroquia,
	getPayMent,
	getProducts,
} from './getData';
import './index.scss';
//steps
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';
import { Step5 } from './steps/Step5';
import { useStylesFM } from './styles';
import * as valids from './validForm';

function getSteps() {
	return [
		'Información Personal del Cliente',
		'Referencias Personales del Cliente',
		'Información del Comercio',
		'Dirección del Comercio/POS',
		'Solicitud de POS',
	];
}

export const FormMaldito: React.FC = () => {
	const history = useHistory();
	const classes = useStylesFM();
	const dispatch = useDispatch();

	const [cursedForm, setCursedForm] = useState<any>({
		//step1 Cliente
		email: '',
		name: '',
		last_name: '',
		id_ident_type: 1,
		ident_num: '',
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
		//step3 Comercio
		id_ident_type_commerce: 3,
		ident_num_commerce: '',
		name_commerce: '',
		id_activity: 0,
		special_contributor: 0,
		//Step4 Location
		//Commerce
		id_estado: 0,
		id_ciudad: 0,
		id_municipio: 0,
		id_parroquia: 0,
		codigo_postal: '',
		sector: '',
		calle: '',
		local: '',
		//Pos
		id_estado_pos: 0,
		id_ciudad_pos: 0,
		id_municipio_pos: 0,
		id_parroquia_pos: 0,
		codigo_postal_pos: '',
		sector_pos: '',
		calle_pos: '',
		local_pos: '',
		//Step5 Post
		number_post: 1,
		id_model_post: 0,
		text_account_number: '',
		id_payment_method: 0,
		id_type_pay: 0,
		id_request_origin: 1,
		reqSource_docnum: '',
		initial: 100,
		cuotas: 0, //Si es inical coutas cambia
		nro_comp_dep: '',
		discount: 0,
		pagadero: 0,
	});

	const [cursedFormError, setCursedFormError] = useState<any>({
		//step1 Cliente
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
		//step3 Comercio
		id_ident_type_commerce: false,
		ident_num_commerce: false,
		name_commerce: false,
		id_activity: false,
		special_contributor: false,
		//Step4 Location
		//Commerce
		id_estado: false,
		id_ciudad: false,
		id_municipio: false,
		id_parroquia: false,
		codigo_postal: false,
		sector: false,
		calle: false,
		local: false,
		//Pos
		id_estado_pos: false,
		id_ciudad_pos: false,
		id_municipio_pos: false,
		id_parroquia_pos: false,
		codigo_postal_pos: false,
		sector_pos: false,
		calle_pos: false,
		local_pos: false,
		//Step5 Post
		number_post: false,
		id_model_post: false,
		text_account_number: false,
		id_payment_method: false,
		id_type_pay: false,
		id_request_origin: false,
		reqSource_docnum: false,
		initial: false,
		cuotas: false, //Si es inical coutas cambia
		nro_comp_dep: false,
		discount: false,
		pagadero: false,
	});

	//images
	const [imagesForm, setImagesForm] = useState({
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
	const [readyStep, setReadyStep] = React.useState<boolean>(false);
	const [sendForm, setSendForm] = React.useState<number>(0);

	const codePhone = '+58';

	const fm: any = useSelector((state: RootState) => state.fm);

	//Client Location
	const [listLocationClient, setListLocationClient] = useState<any>({
		estado: [],
		ciudad: [],
		municipio: [],
		parroquia: [],
	});

	const [locationClient, setLocationClient] = useState<any>({
		estado: null,
		ciudad: null,
		municipio: null,
		parroquia: null,
	});

	//Locatio  Commerce
	const [listLocationCommerce, setListLocationCommerce] = useState<any>({
		estado: [],
		ciudad: [],
		municipio: [],
		parroquia: [],
	});

	const [locationCommerce, setLocationCommerce] = useState<any>({
		estado: null,
		ciudad: null,
		municipio: null,
		parroquia: null,
	});

	//Location Pos
	const [listLocationPos, setListLocationPos] = useState<any>({
		estado: [],
		ciudad: [],
		municipio: [],
		parroquia: [],
	});

	const [locationPos, setLocationPos] = useState<any>({
		estado: null,
		ciudad: null,
		municipio: null,
		parroquia: null,
	});

	//Ident Type
	const [listIdentType, setListIdentType] = useState<any[]>([]);

	// Origen de solicitud
	const [listRequestSource, setListRequestSol] = useState<any>([
		{
			id: 1,
			name: 'Referido',
		},
		{
			id: 2,
			name: 'ACI',
		},
		{
			id: 3,
			name: 'Call Center',
		},
		{
			id: 4,
			name: 'Feria',
		},
		{
			id: 5,
			name: 'Pagina WEB',
		},
	]);
	const [requestSource, setRequestSource] = useState<any[]>(listRequestSource[0]);

	//Activity commerce
	const [listActivity, setListActivity] = useState<any[]>([]);
	const [activity, setActivity] = useState<any>(null);

	//list tipo de pago
	const [listTypePay, setListListTypePay] = useState<any>([
		{
			id: 1,
			name: 'De Contado',
		},
		{
			id: 2,
			name: 'Inicial',
		},
	]);
	const [typePay, setTypePay] = useState<any>(null);

	//POS
	const [listPayment, setListPayment] = useState<any[]>([]);
	const [payment, setPayment] = useState<any>(null);

	const [listModelPos, setListModelPos] = useState<any[]>([]);
	const [modelPos, setModelPost] = useState<any>(null);

	const { socket } = useContext(SocketContext);

	//name images
	const [namesImages, setNamesImages] = useState<any>({
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
		if (fm.errorClient) {
			setValidEmailIdent(true);
		} else {
			setValidEmailIdent(false);
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fm]);

	//SendForm
	useEffect(() => {
		if (sendForm === 1 && fm.id_client !== 0) {
			console.log('Listo Cliente');
			if (!fm.mashCommerce) {
				dispatch(sendCommerce(fm.id_client, cursedForm));
			}
			setSendForm(2);
			//Fin comerce
		} else if (sendForm === 2 && fm.id_commerce !== 0 && fm.id_client !== 0) {
			console.log('Listo Comercio');
			const formData: any = new FormData();
			for (const item of Object.entries(imagesForm)) {
				if (item[1] !== null) {
					formData.append('images', item[1]);
				}
			}
			for (const item of imagesActa){
				formData.append('constitutive_act', item);
			}
			formData.append('id_client', fm.id_client);
			formData.append('id_commerce', fm.id_commerce);
			formData.append('bank_account_num', cursedForm.text_account_number);
			dispatch(sendImages(formData));
			//update fm_imgaes
			setSendForm(3);
		} else if (sendForm === 3 && fm.id_images !== null && fm.id_commerce !== 0 && fm.id_client !== 0) {
			console.log('Listo Images, Client/Comercio:', fm.id_client, fm.id_commerce);
			dispatch(sendFM(cursedForm, fm));
			setSendForm(4);
		} else if (sendForm === 4 && fm.loadedFM) {
			console.log('Ready All FM');
			socket.emit('cliente:Todos');
			setSendForm(5);
			handleSendForm();
			socket.emit('cliente:disconnect');
			dispatch(cleanFM());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sendForm, fm]);

	const [getDataControl, setGetDataControl] = useState<number>(0);

	useEffect(() => {
		//Get Type Doc Ident
		if (getDataControl === 0) {
			if (listIdentType.length === 0) {
				getIdentTypes().then((res) => {
					res.forEach((item, indice) => {
						setListIdentType((prevState: any) => [...prevState, item]);
						if (indice === res.length - 1) {
							setGetDataControl(1);
						}
					});
				});
			}
			//Get List Activity
		} else if (getDataControl === 1) {
			if (listActivity.length === 0) {
				getActivity().then((res) => {
					res.forEach((item, indice) => {
						setListActivity((prevState: any) => [...prevState, item]);
						if (indice === res.length - 1) {
							setGetDataControl(2);
						}
					});
				});
			}
			//Get Estados
		} else if (getDataControl === 2) {
			if (listLocationCommerce.estado.length === 0) {
				getEstados().then((res) => {
					res.forEach((item, indice) => {
						setListLocationCommerce((prevState: any) => ({
							...prevState,
							estado: [...prevState.estado, item],
						}));
						setListLocationPos((prevState: any) => ({
							...prevState,
							estado: [...prevState.estado, item],
						}));
						setListLocationClient((prevState: any) => ({
							...prevState,
							estado: [...prevState.estado, item],
						}));
						if (indice === res.length - 1) {
							setGetDataControl(3);
						}
					});
				});
			}
			//Get Payment
		} else if (getDataControl === 3) {
			if (listPayment.length === 0) {
				getPayMent().then((res) => {
					res.forEach((item, indice) => {
						setListPayment((prevState: any) => [...prevState, item]);
						if (indice === res.length - 1) {
							setGetDataControl(4);
						}
					});
				});
			}
		} else if (getDataControl === 4) {
			if (listModelPos.length === 0) {
				getProducts().then((res) => {
					res.forEach((item, indice) => {
						setListModelPos((prevState: any) => [...prevState, item]);
						if (indice === res.length - 1) {
							setGetDataControl(5);
						}
					});
				});
			}
		} else if (getDataControl === 5) {
			console.log('Todo correcto');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getDataControl]);

	//Autocomplete location
	const [autoCompleteCommerce, setAutoCompleteCommerce] = useState<boolean>(true);
	const [autoCompletePos, setAutoCompletePos] = useState<boolean>(true);

	//Copyrighter Client to Commerce
	useEffect(() => {
		if (activeStep === 1 && autoCompleteCommerce && !fm.mashCommerce) {
			setLocationCommerce(locationClient);
			setListLocationCommerce(listLocationClient);
			setLocationPos(autoCompletePos ? locationClient : locationPos);
			setListLocationPos(listLocationClient);
			setCursedForm({
				...cursedForm,
				id_estado: cursedForm.id_estado_client,
				id_ciudad: cursedForm.id_ciudad_client,
				id_municipio: cursedForm.id_municipio_client,
				id_parroquia: cursedForm.id_parroquia_client,
				sector: cursedForm.sector_client,
				calle: cursedForm.calle_client,
				local: cursedForm.local_client,
				codigo_postal: cursedForm.codigo_postal_client,
				id_estado_pos: autoCompletePos ? cursedForm.id_estado_client : cursedForm.id_estado_pos,
				id_ciudad_pos: autoCompletePos ? cursedForm.id_ciudad_client : cursedForm.id_ciudad_pos,
				id_municipio_pos: autoCompletePos ? cursedForm.id_municipio_client : cursedForm.id_municipio_pos,
				id_parroquia_pos: autoCompletePos ? cursedForm.id_parroquia_client : cursedForm.id_parroquia_pos,
				sector_pos: autoCompletePos ? cursedForm.sector_client : cursedForm.sector_pos,
				calle_pos: autoCompletePos ? cursedForm.calle_client : cursedForm.calle_pos,
				local_pos: autoCompletePos ? cursedForm.local_client : cursedForm.local_pos,
				codigo_postal_pos: autoCompletePos ? cursedForm.codigo_postal_client : cursedForm.codigo_postal_pos,
			});
		}
	}, [activeStep, fm.commerceMash]);

	//Copyrighter Commerce to pos
	useEffect(() => {
		if (activeStep === 2 && autoCompletePos) {
			setLocationPos(locationCommerce);
			setListLocationPos(listLocationCommerce);
			setCursedForm({
				...cursedForm,
				id_estado_pos: cursedForm.id_estado,
				id_ciudad_pos: cursedForm.id_ciudad,
				id_municipio_pos: cursedForm.id_municipio,
				id_parroquia_pos: cursedForm.id_parroquia,
				sector_pos: cursedForm.sector,
				calle_pos: cursedForm.calle,
				local_pos: cursedForm.local,
				codigo_postal_pos: cursedForm.codigo_postal,
			});
		}
	}, [
		activeStep,
		locationCommerce,
		cursedForm.sector,
		cursedForm.calle,
		cursedForm.local,
		cursedForm.codigo_postal,
		fm.commerceMash,
	]);

	//Client Location handle
	const handleUpdateLocationClient = (op: any, value: any) => {
		if (op === 'estado') {
			//Select estado and Update List Ciudades
			setLocationClient({
				estado: value,
				ciudad: null,
				municipio: null,
				parroquia: null,
			});
			setListLocationClient((prevState: any) => ({ ...prevState, ciudad: [], municipio: [], parroquia: [] }));
			if (value) {
				getCiudad(value.id).then((res) => {
					setListLocationClient({
						...listLocationClient,
						ciudad: res,
					});
				});
			}
		} else if (op === 'ciudad') {
			//Select ciudad and Update List municipio
			setLocationClient({
				...locationClient,
				ciudad: value,
				municipio: null,
				parroquia: null,
			});
			setListLocationClient((prevState: any) => ({ ...prevState, municipio: [], parroquia: [] }));
			if (value) {
				getMunicipio(cursedForm.id_estado_client).then((res) => {
					setListLocationClient({
						...listLocationClient,
						municipio: res,
					});
				});
			}
		} else if (op === 'municipio') {
			//Select municipio and Update List parroquia
			setLocationClient({
				...locationClient,
				municipio: value,
				parroquia: null,
			});
			setListLocationClient((prevState: any) => ({ ...prevState, parroquia: [] }));
			if (value) {
				getParroquia(value.id).then((res) => {
					setListLocationClient({
						...listLocationClient,
						parroquia: res,
					});
				});
			}
		} else if (op === 'parroquia') {
			//Select parroquia
			setLocationClient({
				...locationClient,
				parroquia: value,
			});
		}
	};

	useEffect(() => {
		if (
			locationCommerce.estado === null &&
			locationCommerce.ciudad === null &&
			locationCommerce.municipio === null &&
			locationCommerce.parroquia === null &&
			cursedForm.sector === '' &&
			cursedForm.calle === '' &&
			cursedForm.local === '' &&
			cursedForm.codigo_postal === ''
		) {
			setAutoCompleteCommerce(true);
		}
		if (
			locationPos.estado === null &&
			locationPos.ciudad === null &&
			locationPos.municipio === null &&
			locationPos.parroquia === null &&
			cursedForm.sector_pos === '' &&
			cursedForm.calle_pos === '' &&
			cursedForm.local_pos === '' &&
			cursedForm.codigo_postal_pos === ''
		) {
			setAutoCompletePos(true);
		}
	}, [cursedForm, locationCommerce]);

	//Commerce Location handle
	const handleUpdateLocationCommerce = (op: any, value: any) => {
		setAutoCompleteCommerce(false);
		if (op === 'estado') {
			//Select estado and Update List Ciudades
			setLocationCommerce({
				estado: value,
				ciudad: null,
				municipio: null,
				parroquia: null,
			});
			setListLocationCommerce((prevState: any) => ({ ...prevState, ciudad: [], municipio: [], parroquia: [] }));
			if (value) {
				getCiudad(value.id).then((res) => {
					setListLocationCommerce({
						...listLocationCommerce,
						ciudad: res,
					});
				});
			}
		} else if (op === 'ciudad') {
			//Select ciudad and Update List municipio
			setLocationCommerce({
				...locationCommerce,
				ciudad: value,
				municipio: null,
				parroquia: null,
			});
			setListLocationCommerce((prevState: any) => ({ ...prevState, municipio: [], parroquia: [] }));
			if (value) {
				getMunicipio(cursedForm.id_estado).then((res) => {
					setListLocationCommerce({
						...listLocationCommerce,
						municipio: res,
					});
				});
			}
		} else if (op === 'municipio') {
			//Select municipio and Update List parroquia
			setLocationCommerce({
				...locationCommerce,
				municipio: value,
				parroquia: null,
			});
			setListLocationCommerce((prevState: any) => ({ ...prevState, parroquia: [] }));
			if (value) {
				getParroquia(value.id).then((res) => {
					setListLocationCommerce({
						...listLocationCommerce,
						parroquia: res,
					});
				});
			}
		} else if (op === 'parroquia') {
			//Select parroquia
			setLocationCommerce({
				...locationCommerce,
				parroquia: value,
			});
		}
	};

	//POS Location handle
	const handleUpdateLocationPos = (op: any, value: any) => {
		setAutoCompletePos(false);
		if (op === 'estado') {
			//Select estado and Update List Ciudades
			setLocationPos({
				estado: value,
				ciudad: null,
				municipio: null,
				parroquia: null,
			});
			setListLocationPos((prevState: any) => ({ ...prevState, ciudad: [], municipio: [], parroquia: [] }));
			if (value) {
				getCiudad(value.id).then((res) => {
					setListLocationPos({
						...listLocationPos,
						ciudad: res,
					});
				});
			}
		} else if (op === 'ciudad') {
			//Select ciudad and Update List municipio
			setLocationPos({
				...locationPos,
				ciudad: value,
				municipio: null,
				parroquia: null,
			});
			setListLocationPos((prevState: any) => ({ ...prevState, municipio: [], parroquia: [] }));
			if (value) {
				getMunicipio(cursedForm.id_estado).then((res) => {
					setListLocationPos({
						...listLocationPos,
						municipio: res,
					});
				});
			}
		} else if (op === 'municipio') {
			//Select municipio and Update List parroquia
			setLocationPos({
				...locationPos,
				municipio: value,
				parroquia: null,
			});
			setListLocationPos((prevState: any) => ({ ...prevState, parroquia: [] }));
			if (value) {
				getParroquia(value.id).then((res) => {
					setListLocationPos({
						...listLocationPos,
						parroquia: res,
					});
				});
			}
		} else if (op === 'parroquia') {
			//Select parroquia
			setLocationPos({
				...locationPos,
				parroquia: value,
			});
		}
	};

	//CheckStepAcual
	useEffect(() => {
		if (
			!valids.allInputNotNUll(valids.sizeStep(activeStep), cursedForm, fm.mashClient, fm.mashCommerce) &&
			!valids.allImgNotNUll(
				cursedForm,
				valids.sizeImagesStep(activeStep),
				imagesForm,
				cursedForm.special_contributor,
				fm.imagesClient,
				fm.imagesCommerce,
				cursedForm.id_ident_type_commerce
			) &&
			!valids.checkErrorAllInput(valids.sizeStep(activeStep), cursedFormError) && 
			!valids.validEndPoint(activeStep, fm) &&
			!valids.notNullImagenActa(activeStep, imagesActa, cursedForm.id_ident_type_commerce)
		) {
			setReadyStep(true);
		} else {
			setReadyStep(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cursedForm, imagesForm, activeStep, fm, imagesActa]);

	const validateForm = (name: string, value: any) => {
		let temp: any = { ...cursedFormError };
		switch (name) {
			case 'email':
				temp.email = valids.validEmail(value);
				break;
			case 'name':
			case 'last_name':
				temp[name] = valids.validFullName(value);
				break;
			case 'id_ident_type':
				if (cursedForm.ident_num.trim() !== '') {
					temp.ident_num = valids.validIdentNum(cursedForm.ident_num, value);
				}
				break;
			case 'ident_num':
				temp.ident_num = valids.validIdentNum(value, cursedForm.id_ident_type);
				break;
			case 'phone1':
				temp.phone1 = valids.validPhone(value);
				break;
			case 'phone2':
				temp.phone2 = valids.validPhone2(value, cursedForm.phone1);
				break;
			case 'phone_ref1':
				temp.phone_ref1 = valids.validPhone(value);
				break;
			case 'phone_ref2':
				temp.phone_ref2 = valids.validPhone(value);
				break;
			case 'name_commerce':
				temp.name_commerce = valids.validNameCommere(value);
				break;
			case 'number_post':
				temp.number_post = valids.validNum_post(value);
				break;
			case 'text_account_number':
				temp.text_account_number = valids.validNumBank(value);
				if (
					!temp.text_account_number &&
					value.length === 20 &&
					cursedForm.email !== '' &&
					cursedForm.text_account_number !== ''
				) {
					dispatch(
						validationNumBank({
							email: cursedForm.email,
							bank_account_num: value,
						})
					);
				}
				break;
			default:
				break;
		}
		setCursedFormError({
			...temp,
		});
	};

	//handle
	const handleBlurEmailIdent = () => {
		if (
			activeStep === 0 &&
			cursedForm.email !== '' &&
			cursedForm.id_ident_type !== '' &&
			cursedForm.ident_num !== ''
		) {
			dispatch(
				validationClient({
					email: cursedForm.email,
					id_ident_type: cursedForm.id_ident_type,
					ident_num: cursedForm.ident_num,
				})
			);
		}
	};

	const handleBlurCommerce = () => {
		if (activeStep === 2 && cursedForm.id_ident_type_commerce !== '' && cursedForm.ident_num_commerce !== '') {
			dispatch(
				validationCommerce(fm.id_client, {
					id_ident_type: cursedForm.id_ident_type_commerce,
					ident_num: cursedForm.ident_num_commerce,
				})
			);
		}
	};

	const [oldClientMatsh, setOldClientMatsh] = useState<boolean>(false);

	//MashClient
	useEffect(() => {
		if (fm.mashClient && fm.id_client) {
			setOldClientMatsh(true);
			setCursedForm({
				...cursedForm,
				email: fm.clientMash.email,
				name: fm.clientMash.name,
				last_name: fm.clientMash.last_name,
				phone1: fm.clientMash.phones[0].phone,
				phone2: fm.clientMash.phones[1].phone,
				id_estado_client: fm.clientMash.id_location.id_estado.id,
				id_ciudad_client: fm.clientMash.id_location.id_ciudad.id,
				id_municipio_client: fm.clientMash.id_location.id_municipio.id,
				id_parroquia_client: fm.clientMash.id_location.id_parroquia.id,
				codigo_postal_client: 'falta codigo postal',
				sector_client: fm.clientMash.id_location.sector,
				calle_client: fm.clientMash.id_location.calle,
				local_client: fm.clientMash.id_location.local,
			});
			setLocationClient({
				estado: fm.clientMash.id_location.id_estado,
				ciudad: fm.clientMash.id_location.id_ciudad,
				municipio: fm.clientMash.id_location.id_municipio,
				parroquia: fm.clientMash.id_location.id_parroquia,
			});
			setCursedFormError({
				...cursedFormError,
				email: false,
				name: false,
				last_name: false,
				ident_num: false,
				phone1: false,
				phone2: false,
			});
		} else if (!fm.mashClient && oldClientMatsh) {
			setOldClientMatsh(false);
			console.log('vaciar client');
			setCursedForm({
				...cursedForm,
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
			setCursedForm({
				...cursedForm,
				//step1
				name_commerce: fm.commerceMash.name,
				id_activity: fm.commerceMash.id_activity.id,
				special_contributor: fm.commerceMash.special_contributor,
				//step2
				id_estado: fm.clientMash.id_location.id_estado.id,
				id_ciudad: fm.clientMash.id_location.id_ciudad.id,
				id_municipio: fm.clientMash.id_location.id_municipio.id,
				id_parroquia: fm.clientMash.id_location.id_parroquia.id,
				codigo_postal: 'falta codigo postal',
				sector: fm.commerceMash.id_location.sector,
				calle: fm.commerceMash.id_location.calle,
				local: fm.commerceMash.id_location.local,
			});
			setLocationCommerce({
				estado: fm.commerceMash.id_location.id_estado,
				ciudad: fm.commerceMash.id_location.id_ciudad,
				municipio: fm.commerceMash.id_location.id_municipio,
				parroquia: fm.commerceMash.id_location.id_parroquia,
			});
			setActivity(fm.commerceMash.id_activity);
			setCursedFormError({
				...cursedFormError,
				name_commerce: false,
				ident_num_commerce: false,
				id_activity: false,
			});
		} else if (!fm.mashCommerce && oldCommerceMatsh) {
			setOldCommerceMatsh(false);
			console.log('vaciar Commercio', fm.commerceMash);
			setCursedForm({
				...cursedForm,
				name_commerce: '',
				id_activity: 0,
				special_contributor: 0,
				//Step3 Location
				//Location se carga del cliente
			});
			setActivity(null);
		}
	}, [fm.mashCommerce, fm.commerceMash]);

	const handleBlurNumBank = () => {
		if (activeStep === 4 && cursedForm.email !== '' && cursedForm.text_account_number !== '') {
			dispatch(
				validationNumBank({
					email: cursedForm.email,
					bank_account_num: cursedForm.text_account_number,
				})
			);
		}
	};

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCursedForm({
			...cursedForm,
			[event.target.name]: event.target.value,
		});
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
			valids.allInputNotNUll(valids.sizeStep(activeStep), cursedForm, fm.mashClient, fm.mashCommerce) ||
			valids.allImgNotNUll(
				cursedForm,
				valids.sizeImagesStep(activeStep),
				imagesForm,
				cursedForm.special_contributor,
				fm.imagesClient,
				fm.imagesCommerce,
				cursedForm.id_ident_type_commerce
			) ||
			valids.checkErrorAllInput(valids.sizeStep(activeStep), cursedFormError) ||
			valids.validEndPoint(activeStep, fm) ||
			valids.notNullImagenActa(activeStep, imagesActa, cursedForm.id_ident_type_commerce)
		)
			return;
		//Send FM
		handleLoading();
		setSendForm(1);
		if (!fm.mashClient) {
			dispatch(sendClient(cursedForm, codePhone));
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
		//Redirect home
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

	const steps = getSteps();

	const getStep = [
		<Step1
			namesImages={namesImages}
			listIdentType={listIdentType}
			cursedForm={cursedForm}
			error={cursedFormError}
			validEmailIdent={validEmailIdent}
			imagesForm={imagesForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
			handleChangeImages={handleChangeImages}
			handleBlurEmailIdent={handleBlurEmailIdent}
			validateForm={validateForm}
			listLocation={listLocationClient}
			location={locationClient}
			handleUpdateLocation={handleUpdateLocationClient}
			codePhone={codePhone}
		/>,
		<Step2 cursedForm={cursedForm} handleChange={handleChange} codePhone={codePhone} error={cursedFormError} />,
		<Step3
			imagesActa={imagesActa}
			listIdentType={listIdentType}
			listActivity={listActivity}
			activity={activity}
			setActivity={setActivity}
			namesImages={namesImages}
			error={cursedFormError}
			cursedForm={cursedForm}
			imagesForm={imagesForm}
			setCursedForm={setCursedForm}
			handleBlurCommerce={handleBlurCommerce}
			handleChange={handleChange}
			handleChangeImages={handleChangeImages}
			handleChangeImagesMulti={handleChangeImagesMulti}
			deleteImgContributor={deleteImgContributor}
		/>,
		<Step4
			setAutoCompleteCommerce={setAutoCompleteCommerce}
			setAutoCompletePos={setAutoCompletePos}
			listLocation={listLocationCommerce}
			location={locationCommerce}
			setLocation={setLocationCommerce}
			listLocationPos={listLocationPos}
			locationPos={locationPos}
			setLocationPos={setLocationPos}
			cursedForm={cursedForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
			handleUpdateLocationCommerce={handleUpdateLocationCommerce}
			handleUpdateLocationPos={handleUpdateLocationPos}
		/>,
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
			error={cursedFormError}
			cursedForm={cursedForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
			handleChangeImages={handleChangeImages}
			handleBlurNumBank={handleBlurNumBank}
			listRequestSource={listRequestSource}
			requestSource={requestSource}
			setRequestSource={setRequestSource}
			deleteImgContributor={deleteImgContributor}
		/>,
	];

	const stepError = (key: number) => {
		if (key === 0 && fm.errorClient) {
			//Cliente
			return true;
		} else if (key === 2 && fm.errorCommerce) {
			//comercio
			return true;
		} else if (key === 4 && fm.errorNumBank) {
			//comercio
			return true;
		}
		return false;
	};

	return (
		<div className='ed-container container-formMaldito'>
			{listIdentType.length === 0 ||
			listActivity.length === 0 ||
			listPayment.length === 0 ||
			listLocationCommerce.estado.length === 0 ||
			listLocationClient.estado.length === 0 ||
			listLocationPos.estado.length === 0 ? (
				<LoaderPrimary />
			) : (
				<form
					className='container-form'
					//autoComplete="off"
				>
					<div className='capitan-america'></div>
					<Stepper alternativeLabel activeStep={activeStep} style={{ background: 'none', width: '100%' }}>
						{steps.map((label, index) => {
							const stepProps: { completed?: boolean } = {};
							return (
								<Step key={label} {...stepProps}>
									<StepLabel error={stepError(index)}>
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
									onClick={handleBack}
									className={classes.buttonBack}>
									Volver
								</Button>
								<Button
									disabled={!readyStep}
									size='large'
									variant='contained'
									color='primary'
									onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
									className={classes.buttonNext}>
									{activeStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
								</Button>
							</div>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};
