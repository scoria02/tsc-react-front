import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//Redux
import { RootState } from '../../store/store';
import { 
	validationClient,
	sendClient,
	sendCommerce,
	sendImages, 
	sendFM, 
	//	cleanFM,
} from '../../store/actions/fm';

//Material
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { useStylesFM } from './styles';
import Swal from 'sweetalert2';
import { baseUrl } from '../../routers/url';

import './index.scss';

import * as valids from './validForm';

//steps
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';
import { Step5 } from './steps/Step5';

import { 
	getEstados, 
	getCiudad,
	getMunicipio,
	getParroquia,
	getPayMent,
	getIdentTypes,
	getActivity,
} from './getData'

function getSteps() {
  return ['Informacion Personal del Cliente', 'Informacion del Comercio', 'Ubicacion del Comercio', 'Documentos del Comercio', 'Solicitud de POS'];
}

interface Props{
	setSelectedIndex: any
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

	//Location
	const [listLocation, setListLocation] = useState<any>({
		estado: [],
		ciudad: [],
		municipio: [],
		parroquia: [],
	});

	const [listLocationPos, setListLocationPos] = useState<any>({
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

	const [locationPos, setLocationPos] = useState<any>({
		estado: null,
		ciudad: null,
		municipio: null,
		parroquia: null,
	});

	//Client
	const [listIdentType, setListIdentType] = useState<any>([]);

	//Comercio
	const [listActivity, setListActivity] = useState<any>([]);
	const [activity, setActivity] = useState<any>(null);

	//POS
	const [listPayment, setListPayment] = useState<any>([]);
	const [payment, setPayment] = useState<any>(null);

	const [listModelPos, setListModelPos] = useState<any>([
		{ id: 1, name: 'Par-I'},
		{ id: 2, name: 'Par-II'},
	]);
	const [modelPos, setModelPost] = useState<any>(null);

	const [ cursedForm, setCursedForm ] = useState<any>({
		//step1 Cliente
		email: 'tranred@correito.com',
		name: 'Carlos',
		last_name: 'Polo',
		id_ident_type: 1,
		ident_num: '123456793',
		phone1: '+584121234567',
		phone2: '+584121234566',
		//step2 Comercio
		name_commerce: 'Tranred',
		id_ident_type_commerce: 3,
		ident_num_commerce: '12345678',
		text_account_number: '102816516554',
		id_activity: 0,
		special_contributor: 0,
		//Step3 Location
		id_estado: 1,
		id_ciudad: 1,
		id_municipio: 1,
		id_parroquia: 1,
		sector: 'Urb',
		calle: '13',
		local: 'A1',
		//Step4 Post
		//Images
		//step5 Post
		number_post: 1,
		id_model_post: 1,
		id_payment_method: 1, 
		id_estado_pos: 1,
		id_ciudad_pos: 1,
		id_municipio_pos: 1,
		id_parroquia_pos: 1,
		sector_pos: 'Urb',
		calle_pos: '13',
		local_pos: 'A1',
	});

	//name images
	const [namesImages, setNamesImages] = useState<any>({
		//step1
		rc_ident_card: '', //11
		rc_ref_perso: '', //6
		//step2
		rc_rif: '', //10
		rc_account_number: '', //7
		rc_ref_bank: '', //5
		rc_special_contributor: '', //4
		//step4
		rc_constitutive_act: '', //1
		rc_property_document: '', //2
		rc_service_document: '', //3
	});

	//images
	const [imagesForm, setImagesForm] = useState({
		//Step1
		rc_ident_card: null, //11
		rc_ref_perso: null, //6
		//Step2
		rc_rif: null, //10
		rc_account_number: null, //7
		rc_ref_bank: null, //5
		rc_special_contributor: null, //4
		//Step4
		rc_constitutive_act: null, //1
		rc_property_document: null, //2
		rc_service_document: null, //3
	});

	const [ cursedFormError, setCursedFormError ] = useState<any>({
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
		text_account_number: false,
		id_activity: false,
		//Step3 Location
		sector: false,
		calle: false,
		local: false,
		//step4 Pedido
		number_post: false,
		id_payment_method: false,
	});

	const handleBlurEmailIdent = () => {
		if (activeStep === 0 && cursedForm.email !== '' && cursedForm.id_ident_type !== '' && cursedForm.ident_num !== ''){
			dispatch(validationClient({
				email: cursedForm.email,
				id_ident_type: cursedForm.id_ident_type, 
				ident_num: cursedForm.ident_num,
			})) 
		}	
	}

	useEffect(() => {
		if(fm.errorClient){
			setValidEmailIdent(true)
		}else{
			setValidEmailIdent(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fm])


	//SendForm
	useEffect(() => {
		if(sendForm === 1 && fm.id_client !== 0){
			console.log('Listo Cliente');
			dispatch(sendCommerce(fm.id_client, 
				//Commerce
				{
					id_ident_type: cursedForm.id_ident_type_commerce,
					ident_num: cursedForm.ident_num_commerce,
					special_contributor: 0,
					name: cursedForm.name_commerce,
					bank_account_num: cursedForm.text_account_number,
					id_activity: cursedForm.id_activity,
					location:{
						id_estado: cursedForm.id_estado,
						id_municipio: cursedForm.id_municipio,
						id_parroquia: cursedForm.id_parroquia,
						id_ciudad: cursedForm.id_ciudad,
						sector: cursedForm.sector,
						calle: cursedForm.calle,
						local: cursedForm.local,
					},
				}
			));
			setSendForm(2);
			//Fin comerce
		}else if (sendForm === 2 && fm.id_commerce !== 0 && fm.id_client !== 0) {
			console.log('Listo Comercio');
			console.log('images')
			const formData:any = new FormData();
			for (const item of Object.entries(imagesForm)) {
				if(item[1] !== null){
					formData.append('images', item[1])
				}
			}
			formData.append('id_client', fm.id_client)
			formData.append('id_commerce', fm.id_commerce)
			/*
			for (var value of formData.values()) {
				console.log(value);
			}
		 */
			dispatch(sendImages(formData));
			//update fm_imgaes 
			setSendForm(3);
		}else if (sendForm === 3 && fm.id_images !== null && fm.id_commerce !== 0 && fm.id_client !== 0) {
			console.log('Listo Images, Client/Comercio:', fm.id_client, fm.id_commerce);
			dispatch(sendFM({
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
				}
			}));
			/*
			//mode_post: cursedForm.mode_post,
			{
			}
			*/
			setSendForm(4);
		}
		else if (sendForm === 4 && fm.loadedFM){
			console.log('Ready All FM')
			setSendForm(5);
			handleSendForm();
			//dispatch(cleanFM());
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sendForm, fm])

	useEffect(() => {
		//Get Type Doc Ident
		if(activeStep === 0){
			if(listIdentType.length === 0) {
				getIdentTypes().then( (res) => {
					res.forEach((item) => {
						setListIdentType((prevState:any) => (
							[...prevState, item]
						))
					})
				})
			}	
		//Get List Activity
		}else if (activeStep === 1){
			if(listActivity.length === 0) {
				getActivity().then( (res) => {
					res.forEach((item) => {
						setListActivity((prevState:any) => (
							[...prevState, item]
						))
					})
				})
			}
		//Get Estados 
		}else if(activeStep === 2){
			if(listLocation.estado.length === 0) {
				getEstados().then( (res) => {
					res.forEach((item ) => {
							setListLocation((prevState:any) => ({
								...prevState,
								estado: [...prevState.estado, item],
						}))
							setListLocationPos((prevState:any) => ({
								...prevState,
								estado: [...prevState.estado, item],
						}))
					})
				})
			}
		//Get Payment 
		}else if (activeStep === 3){
			if(listPayment.length === 0) {
				getPayMent().then( (res) => {
					res.forEach((item) => {
						setListPayment((prevState:any) => (
							[...prevState, item]
						))
					})
				})
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeStep])

	//Commerce Location
	useEffect(() => {
		setLocationCommerce({ ...locationCommerce, ciudad: null, municipio: null, parroquia: null });
		if(cursedForm.id_estado){
			setListLocation((prevState:any) => ({ ...prevState, ciudad: [], municipio: [], parroquia: [] }));
			getCiudad(cursedForm.id_estado).then( (res) => {
					setListLocation({
							...listLocation,
							ciudad: res,
				})
			})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationCommerce.estado])

	useEffect(() => {
		setLocationCommerce({ ...locationCommerce, municipio: null, parroquia: null });
		if(cursedForm.id_ciudad){
			getMunicipio(cursedForm.id_estado).then( (res) => {
					setListLocation({
							...listLocation,
							municipio: res,
				})
			})
		}	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationCommerce.ciudad])

	useEffect(() => {
		setLocationCommerce({ ...locationCommerce, parroquia: null });
		if(cursedForm.id_municipio){
			getParroquia(cursedForm.id_municipio).then( (res) => {
					setListLocation({
							...listLocation,
							parroquia: res,
				})
			})
		}	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationCommerce.municipio])

	//Pos Location
	useEffect(() => {
		setLocationPos({ ...locationPos, ciudad: null, municipio: null, parroquia: null });
		if(cursedForm.id_estado){
			setListLocation((prevState:any) => ({ ...prevState, ciudad: [], municipio: [], parroquia: [] }));
			getCiudad(cursedForm.id_estado_pos).then( (res) => {
					setListLocationPos({
							...listLocationPos,
							ciudad: res,
				})
			})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationPos.estado])

	useEffect(() => {
		setLocationPos({ ...locationPos, municipio: null, parroquia: null });
		if(cursedForm.id_ciudad){
			getMunicipio(cursedForm.id_estado_pos).then( (res) => {
					setListLocationPos({
							...listLocationPos,
							municipio: res,
				})
			})
		}	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationPos.ciudad])

	useEffect(() => {
		setLocationPos({ ...locationPos, parroquia: null });
		if(cursedForm.id_municipio){
			getParroquia(cursedForm.id_municipio_pos).then( (res) => {
					setListLocationPos({
							...listLocationPos,
							parroquia: res,
				})
			})
		}	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationPos.municipio])

	const validEndPointFM = () => {
		if(fm.errorClient){
			return false;
		}else {
			return true;
		}
	}

	useEffect(() => {
		if (
			!valids.allInputNotNUll(valids.sizeStep(activeStep), cursedForm, fm.mashClient) && 
			!valids.allImgNotNUll(valids.sizeImagesStep(activeStep), imagesForm, cursedForm.special_contributor, fm.mashClient) && 
			!valids.checkErrorAllInput(valids.sizeStep(activeStep), cursedFormError) &&
			validEndPointFM()
		) {
			setReadyStep(true);
		} else {
			setReadyStep(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cursedForm, imagesForm, activeStep, fm])

	const validateForm = (name: string, value: any) => {
		let temp: any = { ...cursedFormError};
		switch (name) {
			case 'email':
				temp.email = valids.validEmail(value);
				break;
			case 'name':
			case 'last_name':
				temp[name] = valids.validFullName(value);
				break;
			case 'id_ident_type':
				if(cursedForm.ident_num.trim() !== ''){
					temp.ident_num = valids.validIdentNum(cursedForm.ident_num, value);
				}
				break;
			case 'ident_num':
				temp.ident_num = valids.validIdentNum(value, cursedForm.id_ident_type);
				//console.log(temp.ident_num)
				break;
			case 'phone1':
				if(value.slice(0,3) === '+58'){
					temp.phone1 = valids.validPhone(value.slice(3));
					if(cursedForm.phone2.length > 3){
						temp.phone2 = valids.validPhone2(cursedForm.phone2.slice(3), value.slice(3));
					}
				}else{
					temp.phone1 = true;
				}
				break;
			case 'phone2':
				if(value.slice(0,3) === '+58'){
					temp.phone2 = valids.validPhone2(value.slice(3), cursedForm.phone1.slice(3));
				}else
					temp.phone2 = true;
				break;
				case 'number_post':
					temp.number_post = valids.validNum_post(value);
				break;
			default:
				break;
		}
		setCursedFormError({
			...temp,
		});
	};

	//handle
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCursedForm({
			...cursedForm,
			[event.target.name]: event.target.value,
		});
		validateForm(event.target.name, event.target.value);
	};

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



	const handleChangeImages = (event: any) => {
		if(event.target.files[0]){
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
	}


  const handleSubmit = () => {
		if (valids.allInputNotNUll(valids.sizeStep(activeStep), cursedForm, fm.mashClient)  ||
				valids.allImgNotNUll(valids.sizeImagesStep(activeStep), imagesForm, cursedForm.special_contributor, fm.mashClient) ||
				valids.checkErrorAllInput(valids.sizeStep(activeStep), cursedFormError)
		) 
			return
		//Send FM
		console.log('On Submit')
		handleLoading();
		setSendForm(1);
		if(!fm.mashClient){
			dispatch(sendClient(cursedForm));
		}
  };

	const handleLoading = () => {
		Swal.fire({
			icon: 'info',
			title: 'Enviando Solicitud...',
			showConfirmButton: false,
			didOpen: () => {
				Swal.showLoading()
			},
		});
	}

	const handleSendForm = () => {
		Swal.fire({
			icon: 'success',
			title: 'Solicitud Enviada',
			showConfirmButton: false,
			timer: 1500
		});
		//Redirect home
		setSelectedIndex(0);
		history.push(baseUrl);
	}

	const deleteImgContributor = (name: string) => {
		setImagesForm({
			...imagesForm,
			[`rc_${name}`]: null
		});
	}

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
		/>,
		<Step2
			listActivity={listActivity}
			activity={activity}
			setActivity={setActivity}
			namesImages={namesImages}
			cursedForm={cursedForm}
			imagesForm={imagesForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
			handleChangeImages={handleChangeImages}
			deleteImgContributor={deleteImgContributor}
		/>,
		<Step3
			listLocation={listLocation}
			location={locationCommerce}
			setLocation={setLocationCommerce}
			cursedForm={cursedForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
		/>,
		<Step4
			namesImages={namesImages}
			listPayment={listPayment}
			error={cursedFormError}
			payment={payment}
			setPayment={setPayment}
			cursedForm={cursedForm}
			imagesForm={imagesForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
			handleChangeImages={handleChangeImages}
		/>,
		<Step5
			listLocationPos={listLocationPos}
			listModelPos={listModelPos}
			locationPos={locationPos}
			setLocationPos={setLocationPos}
			listPayment={listPayment}
			error={cursedFormError}
			payment={payment}
			modelPos={modelPos}
			setPayment={setPayment}
			setModelPost={setModelPost}
			cursedForm={cursedForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
		/>,
	];

	return (
		<div className='ed-container container-formMaldito'>
			<form className="container-form">
				<div className="capitan-america"></div>
				<h1 className="titleFM">Formulario de Solicitud</h1>
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
						<div>
							<div className='container-steps'>
								{getStep[activeStep]}
								<div style={{marginTop: '1rem' }}>
									<Button 
										size='large'
										disabled={activeStep === 0} 
										variant="contained"
										onClick={handleBack} 
										className={classes.buttonBack}>
										Volver
									</Button>
									<Button
										disabled={!readyStep}
										size='large'
										variant="contained"
										color="primary"
										onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
										className={classes.buttonNext}
									>
										{activeStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
									</Button>
								</div>
							</div>
						</div>
			</form>
		</div>
	);
};
