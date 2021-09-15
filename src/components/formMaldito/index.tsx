import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//Redux
import { RootState } from '../../store/store';
import { sendClient, sendImages, cleanFM } from '../../store/actions/fm';

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
} from './getData'

function getSteps() {
  return ['Informacion Personal del Cliente', 'Informacion del Comercio', 'Ubicacion del Comercio', 'Solicitud de POS', 'Solicitud II'];
}

interface Props{
	setSelectedIndex: any
}

export const FormMaldito: React.FC<Props> = ({ setSelectedIndex }) => {
	const history = useHistory();
	const classes = useStylesFM();
	const dispatch = useDispatch();
	const [activeStep, setActiveStep] = useState<number>(0);
	const [readyStep, setReadyStep] = React.useState<boolean>(false);
	const [sendForm, setSetForm] = React.useState<number>(0);

	const idsFM: any = useSelector((state: RootState) => state.fm);

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

	const [listPayment, setListPayment] = useState<any>([]);
	const [payment, setPayment] = useState<any>(null);

	const [listIdentType, setListIdentType] = useState<any>([]);

	const [listModelPos, setListModelPos] = useState<any>([
		{ id: 1, name: 'Par-I'},
		{ id: 2, name: 'Par-II'},
	]);
	const [modelPos, setModelPost] = useState<any>(null);

	const [ cursedForm, setCursedForm ] = useState<any>({
		//step1 Cliente
		email: 'tranred@correo3.com',
		name: 'Tran',
		last_name: 'Red',
		id_ident_type: '',
		ident_num: '12345670',
		phone1: '+584121234567',
		phone2: '+584121234566',
		//step2 Comercio
		name_commerce: 'Tranred',
		id_ident_type_commerce: 3,
		ident_num_commerce: '12345678',
		text_account_number: '010212345678910',
		id_activity: 'jugar',
		special_contributor: false,
		//Step3 Location
		id_estado: 0,
		id_ciudad: 0,
		id_municipio: 0,
		id_parroquia: 0,
		sector: 'Urb',
		calle: '13',
		local: 'A1',
		//Step4 Post
		number_post: 1,
		id_model_post: 0,
		id_payment_method: 0, 
		id_estado_pos: 0,
		id_ciudad_pos: 0,
		id_municipio_pos: 0,
		id_parroquia_pos: 0,
		sector_pos: 'Urb',
		calle_pos: '13',
		local_pos: 'A1',
		//step5 Pedido
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
		//step5
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
		//Step5
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
		estado: false,
		ciudad: false,
		municipio: false,
		parroquia: false,
		sector: false,
		calle: false,
		local: false,
		//step5 Pedido
		number_post: false,
		id_payment_method: false,
	});

	//UseEffect for deleting after
	useEffect(() => {
		if (activeStep === 1){
			//dispatch(validClient()) 
			console.log('validar Client')
		}else if(activeStep === 3){
			console.log('no send')
		}
	}, [activeStep])

	//SendForm
	useEffect(() => {
		if(sendForm === 1 && idsFM.id_client !== 0){
			//update  id_comerce
			setSetForm(2);
			dispatch(cleanFM());
			handleSendForm();
		}else if (sendForm === 2 && idsFM.id_commerce !== 0) {
			//update  ids_images
			setSetForm(3);
		}
		/*
		else if (sendForm === 3 &&  idsFM.id_commerce !== 0) {
			setSetForm(4);
			//update  getImages
		}else if (sendForm === 4 && validarIdImages(idsFM.id_images)){
			setSetForm(5);
			//update FM
		}
		}else if (sendForm === 5 && todoOk()){
			//update FM
			dispatch(CleanFM());
			handleSendForm();
		}
		*/
	}, [sendForm, idsFM])

	useEffect(() => {
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
		setLocationPos({ ...locationCommerce, ciudad: null, municipio: null, parroquia: null });
		if(cursedForm.id_estado){
			setListLocation((prevState:any) => ({ ...prevState, ciudad: [], municipio: [], parroquia: [] }));
			getCiudad(cursedForm.id_estado).then( (res) => {
					setListLocationPos({
							...listLocation,
							ciudad: res,
				})
			})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationPos.estado])

	useEffect(() => {
		setLocationPos({ ...locationPos, municipio: null, parroquia: null });
		if(cursedForm.id_ciudad){
			getMunicipio(cursedForm.id_estado).then( (res) => {
					setListLocationPos({
							...listLocation,
							municipio: res,
				})
			})
		}	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationPos.ciudad])

	useEffect(() => {
		setLocationPos({ ...locationPos, parroquia: null });
		if(cursedForm.id_municipio){
			getParroquia(cursedForm.id_municipio).then( (res) => {
					setListLocationPos({
							...listLocation,
							parroquia: res,
				})
			})
		}	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationPos.municipio])

	useEffect(() => {
		if (!valids.allInputNotNUll(valids.sizeStep(activeStep), cursedForm) && 
				!valids.allImgNotNUll(valids.sizeImagesStep(activeStep), imagesForm, cursedForm.special_contributor) && 
				!valids.checkErrorAllInput(valids.sizeStep(activeStep), cursedFormError)
		) {
			setReadyStep(true);
		} else {
			setReadyStep(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cursedForm, imagesForm, activeStep])

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
		//Save Name
		if(event.target.files[0]){
			let file = event.target.files[0];
			let blob = file.slice(0, file.size, 'image/png'); 
			let newFile = new File([blob], `${event.target.name}`, {type: 'image/png'});
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
		if (valids.allInputNotNUll(valids.sizeStep(activeStep), cursedForm)  ||
				valids.allImgNotNUll(valids.sizeImagesStep(activeStep), imagesForm, cursedForm.special_contributor) || 
				valids.checkErrorAllInput(valids.sizeStep(activeStep), cursedFormError)
		) 
			return
		const formData = new FormData();
		for (const item of Object.entries(imagesForm)) {
			const file:any = item[1]
			if(item[1] !== null){
				formData.append('images', file)
			}
		}
		//Dispach
		handleLoading();
		setSetForm(1);
		dispatch(sendClient(cursedForm));
		//dispatch(sendImages(emailClient,formData));
		//console.log(formData.getAll('images'))
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
			imagesForm={imagesForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
			handleChangeImages={handleChangeImages}
			validateForm={validateForm}
		/>,
		<Step2
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
			listLocation={listLocationPos}
			listModelPos={listModelPos}
			location={locationPos}
			setLocation={setLocationPos}
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
		<Step5
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
										//disabled={!readyStep}
										size='large'
										variant="contained"
										color="primary"
										onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext }
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
