/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
//Material
import Stepper from '@material-ui/core/Stepper';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseUrl } from '../../routers/url';
import {
	cleanFM,
	sendClient,
	sendCommerce,
	sendFM,
	sendImages,
	validationClient,
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
import { useStylesFM } from './styles';
import * as valids from './validForm';

function getSteps() {
	return [
		'Informacion Personal del Cliente',
		'Informacion del Comercio',
		'Ubicacion del Comercio/POS',
		'Solicitud de POS',
	];
}

interface Props {
	setSelectedIndex: any;
}

export const FormMaldito: React.FC<Props> = ({ setSelectedIndex }) => {
	const history = useHistory();
	const classes = useStylesFM();
	const dispatch = useDispatch();
	const [validEmailIdent, setValidEmailIdent] = useState<boolean>(false);
	const [activeStep, setActiveStep] = useState<number>(0);
	const [readyStep, setReadyStep] = React.useState<boolean>(false);
	const [sendForm, setSendForm] = React.useState<number>(0);

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

	//Location Commerce
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

	const [listIdentType, setListIdentType] = useState<any>([]);

	//Activity commerce
	const [listActivity, setListActivity] = useState<any>([]);
	const [activity, setActivity] = useState<any>(null);

	//
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
	const [listPayment, setListPayment] = useState<any>([]);
	const [payment, setPayment] = useState<any>(null);

	const [listModelPos, setListModelPos] = useState<any>([]);
	const [modelPos, setModelPost] = useState<any>(null);

	const [cursedForm, setCursedForm] = useState<any>({
		//step1 Cliente
		email: '',
		name: '',
		last_name: '',
		id_ident_type: 1,
		ident_num: '',
		phone1: '+58',
		phone2: '+58',
		id_estado_client: 0,
		id_ciudad_client: 0,
		id_municipio_client: 0,
		id_parroquia_client: 0,
		sector_client: '',
		calle_client: '',
		local_client: '',
		codigo_postal_client: '',
		//step2 Comercio
		name_commerce: '',
		id_activity: 0,
		id_ident_type_commerce: 3,
		ident_num_commerce: '',
		special_contributor: 0,
		//Step3 Location
		//Commerce
		id_estado: 0,
		id_ciudad: 0,
		id_municipio: 0,
		id_parroquia: 0,
		sector: '',
		calle: '',
		local: '',
		codigo_postal: '',
		//Pos
		id_estado_pos: 0,
		id_ciudad_pos: 0,
		id_municipio_pos: 0,
		id_parroquia_pos: 0,
		sector_pos: '',
		calle_pos: '',
		local_pos: '',
		codigo_postal_pos: '',
		//Step4 Post
		id_payment_method: 0,
		id_type_pay: 0,
		text_account_number: '',
		number_post: 1,
		id_model_post: 0,
	});

	/*
	const [cursedForm, setCursedForm] = useState<any>({
		//step1 Cliente
		email: '1000pagos@correo.com',
		name: 'Mil',
		last_name: 'Pagos',
		id_ident_type: 1,
		ident_num: '187654321',
		phone1: '+584121234567',
		phone2: '+584121234566',
		id_estado_client: 1,
		id_ciudad_client: 1,
		id_municipio_client: 1,
		id_parroquia_client: 1,
		sector_client: 'Uno client',
		calle_client: '11 client',
		local_client: 'A client',
		codigo_postal_client: '1111',
		//step2 Comercio
		name_commerce: 'MilPagos',
		id_ident_type_commerce: 3,
		ident_num_commerce: '12344321',
		id_activity: 0,
		special_contributor: 0,
		//Step3 Location
			//Commerce
		id_estado: 1,
		id_ciudad: 1,
		id_municipio: 1,
		id_parroquia: 1,
		sector: 'Uno',
		calle: '13',
		local: 'A1',
		codigo_postal: '2222',
			//Pos
		id_estado_pos: 1,
		id_ciudad_pos: 1,
		id_municipio_pos: 1,
		id_parroquia_pos: 1,
		sector_pos: 'Dos',
		calle_pos: '15',
		local_pos: 'A2',
		codigo_postal_pos: '33333',
		//Step4 Post
		id_payment_method: 1,
		id_type_pay: 0,
		text_account_number: '01021565144444344444',
		number_post: 1,
		id_model_post: 1,
	});
	*/

	//name images
	const [namesImages, setNamesImages] = useState<any>({
		//step1
		rc_ident_card: '', //11
		//rc_ref_perso: '', //6
		//step2
		rc_rif: '', //10
		rc_constitutive_act: '', //1
		rc_special_contributor: '', //4
		//step4
		rc_ref_bank: '', //5
	});

	//images
	const [imagesForm, setImagesForm] = useState({
		//Step1
		rc_ident_card: null, //11
		//rc_ref_perso: null, //6
		//Step2
		rc_rif: null, //10
		rc_constitutive_act: null, //1
		rc_special_contributor: null, //4
		//Step4
		rc_ref_bank: null, //5
	});

	const [cursedFormError, setCursedFormError] = useState<any>({
		//step1 Cliente
		email: false,
		name: false,
		last_name: false,
		ident_num: false,
		phone1: false,
		phone2: false,
		//step2 Comercio
		name_commerce: false,
		ident_num_commerce: false,
		id_activity: false,
		//step4 Pedido
		text_account_number: false,
		number_post: false,
		id_payment_method: false,
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
			dispatch(
				sendCommerce(
					fm.id_client,
					//Commerce
					{
						id_ident_type: cursedForm.id_ident_type_commerce,
						ident_num: cursedForm.ident_num_commerce,
						special_contributor: cursedForm.special_contributor,
						name: cursedForm.name_commerce,
						bank_account_num: cursedForm.text_account_number,
						id_activity: cursedForm.id_activity,
						location: {
							id_estado: cursedForm.id_estado,
							id_municipio: cursedForm.id_municipio,
							id_parroquia: cursedForm.id_parroquia,
							id_ciudad: cursedForm.id_ciudad,
							sector: cursedForm.sector,
							calle: cursedForm.calle,
							local: cursedForm.local,
						},
					}
				)
			);
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
			formData.append('id_client', fm.id_client);
			formData.append('id_commerce', fm.id_commerce);
			formData.append('bank_account_num', cursedForm.text_account_number);
			/*
			for (var value of formData.values()) {
				console.log(value);
			}
		 */
			dispatch(sendImages(formData));
			//update fm_imgaes
			setSendForm(3);
		} else if (sendForm === 3 && fm.id_images !== null && fm.id_commerce !== 0 && fm.id_client !== 0) {
			console.log('Listo Images, Client/Comercio:', fm.id_client, fm.id_commerce);
			dispatch(
				sendFM({
					...fm.id_images,
					number_post: cursedForm.number_post,
					bank_account_num: cursedForm.text_account_number,
					id_payment_method: cursedForm.id_payment_method,
					id_client: fm.id_client,
					id_commerce: fm.id_commerce,
					dir_pos: {
						id_estado: cursedForm.id_estado_pos,
						id_municipio: cursedForm.id_municipio_pos,
						id_parroquia: cursedForm.id_parroquia_pos,
						id_ciudad: cursedForm.id_ciudad_pos,
						sector: cursedForm.sector_pos,
						calle: cursedForm.calle_pos,
						local: cursedForm.local_pos,
					},
				})
			);
			/*
			//mode_post: cursedForm.mode_post,
			*/
			setSendForm(4);
		} else if (sendForm === 4 && fm.loadedFM) {
			console.log('Ready All FM');
			setSendForm(5);
			handleSendForm();
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

	//Copyrighter
	useEffect(() => {
		if (activeStep === 1 && autoCompleteCommerce) {
			setLocationCommerce(locationClient);
			setListLocationCommerce(listLocationClient);
			setLocationPos(locationClient);
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
				id_estado_pos: cursedForm.id_estado_client,
				id_ciudad_pos: cursedForm.id_ciudad_client,
				id_municipio_pos: cursedForm.id_municipio_client,
				id_parroquia_pos: cursedForm.id_parroquia_client,
				sector_pos: cursedForm.sector_client,
				calle_pos: cursedForm.calle_client,
				local_pos: cursedForm.local_client,
				codigo_postal_pos: cursedForm.codigo_postal_client,
			});
		}
	}, [activeStep]);

	//Copyrighter
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
	}, [locationCommerce, cursedForm.sector, cursedForm.calle, cursedForm.local, cursedForm.codigo_postal]);

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
			if (value) {
				setListLocationCommerce((prevState: any) => ({ ...prevState, parroquia: [] }));
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
			if (value) {
				setListLocationPos((prevState: any) => ({ ...prevState, parroquia: [] }));
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

	const validEndPointFM = () => {
		if (fm.errorClient) {
			return false;
		} else {
			return true;
		}
	};

	useEffect(() => {
		if (
			!valids.allInputNotNUll(valids.sizeStep(activeStep), cursedForm, fm.mashClient) &&
			!valids.allImgNotNUll(
				valids.sizeImagesStep(activeStep),
				imagesForm,
				cursedForm.special_contributor,
				fm.mashClient
			) &&
			!valids.checkErrorAllInput(valids.sizeStep(activeStep), cursedFormError) &&
			validEndPointFM()
		) {
			setReadyStep(true);
		} else {
			setReadyStep(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cursedForm, imagesForm, activeStep, fm]);

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
				//console.log(temp.ident_num)
				break;
			case 'phone1':
				if (value.slice(0, 3) === '+58') {
					temp.phone1 = valids.validPhone(value.slice(3));
					if (cursedForm.phone2.length > 3) {
						temp.phone2 = valids.validPhone2(cursedForm.phone2.slice(3), value.slice(3));
					}
				} else {
					temp.phone1 = true;
				}
				break;
			case 'phone2':
				if (value.slice(0, 3) === '+58') {
					temp.phone2 = valids.validPhone2(value.slice(3), cursedForm.phone1.slice(3));
				} else temp.phone2 = true;
				break;
			case 'name_commerce':
				temp.name_commerce = valids.validNameCommere(value);
				break;
			case 'number_post':
				temp.number_post = valids.validNum_post(value);
				break;
			case 'text_account_number':
				temp.text_account_number = valids.validNumBank(value);
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

	const handleBlurNumBank = () => {
		if (activeStep === 3 && cursedForm.email !== '' && cursedForm.text_account_number !== '') {
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
			let newFile = new File([file], `${event.target.name}.${file.type.split('/')[1]}`, { type: 'image/jpeg' });
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

	const handleSubmit = () => {
		if (
			valids.allInputNotNUll(valids.sizeStep(activeStep), cursedForm, fm.mashClient) ||
			valids.allImgNotNUll(
				valids.sizeImagesStep(activeStep),
				imagesForm,
				cursedForm.special_contributor,
				fm.mashClient
			) ||
			valids.checkErrorAllInput(valids.sizeStep(activeStep), cursedFormError)
		)
			return;
		//Send FM
		handleLoading();
		setSendForm(1);
		if (!fm.mashClient) {
			dispatch(
				sendClient({
					email: cursedForm.email,
					name: cursedForm.name,
					last_name: cursedForm.last_name,
					id_ident_type: cursedForm.id_ident_type,
					ident_num: cursedForm.ident_num,
					phone1: cursedForm.phone1,
					phone2: cursedForm.phone2,
					location: {
						id_estado: cursedForm.id_estado_client,
						id_municipio: cursedForm.id_municipio_client,
						id_parroquia: cursedForm.id_parroquia_client,
						id_ciudad: cursedForm.id_ciudad_client,
						sector: cursedForm.sector_client,
						calle: cursedForm.calle_client,
						local: cursedForm.local_client,
					},
				})
			);
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
		setSelectedIndex(0);
		history.push(baseUrl);
	};

	const deleteImgContributor = (name: string) => {
		setImagesForm({
			...imagesForm,
			[`rc_${name}`]: null,
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
			setLocation={setLocationClient}
			handleUpdateLocation={handleUpdateLocationClient}
		/>,
		<Step2
			listIdentType={listIdentType}
			listActivity={listActivity}
			activity={activity}
			setActivity={setActivity}
			namesImages={namesImages}
			error={cursedFormError}
			cursedForm={cursedForm}
			imagesForm={imagesForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
			handleChangeImages={handleChangeImages}
			deleteImgContributor={deleteImgContributor}
		/>,
		<Step3
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
		<Step4
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
		/>,
	];

	return (
		<div className='ed-container container-formMaldito'>
			{listIdentType.length === 0 ||
			listActivity === 0 ||
			listPayment === 0 ||
			listLocationCommerce.estado.length === 0 ||
			listLocationClient.estado.length === 0 ||
			listLocationPos.estado.length === 0 ? (
				<LoaderPrimary />
			) : (
				<form className='container-form'>
					<div className='capitan-america'></div>
					<h1 className='titleFM'>Formulario de Solicitud</h1>
					<Stepper
						alternativeLabel
						nonLinear
						activeStep={activeStep}
						style={{ background: 'none', width: '100%' }}>
						{steps.map((label) => {
							const stepProps: { completed?: boolean } = {};
							return (
								<Step key={label} {...stepProps}>
									<StepLabel>{label}</StepLabel>
								</Step>
							);
						})}
					</Stepper>
					<div className={classes.containerFM}>
						<div className='container-steps'>
							{getStep[activeStep]}
							<div style={{ marginTop: '1rem' }}>
								<Button
									size='large'
									disabled={activeStep === 0}
									variant='contained'
									onClick={handleBack}
									className={classes.buttonBack}>
									Volver
								</Button>
								<Button
									//disabled={!readyStep}
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
