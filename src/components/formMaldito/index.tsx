import React, { useState, useEffect } from "react"
//import { useDispatch } from 'react-redux';

//Material
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { useStylesFM } from './styles';

import './index.scss';


import * as valids from './validForm';

//steps
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';

function getSteps() {
  return ['Informacion Personal del Cliente', 'Informacion del Comercio I', 'Ubicacion del Comercio', 'Pedido'];
}

export const FormMaldito = () => {
	const classes = useStylesFM();
	const [activeStep, setActiveStep] = useState<number>(0);
	const [readyStep, setReadyStep] = React.useState<boolean>(false);
  const [skipped, setSkipped] = useState(new Set<number>());

	const [ cursedForm, setCursedForm ] = useState<any>({
		//step1 Cliente
		email: 'jesus',
		name: 'hola',
		last_name: 'hola',
		id_ident_type: 1,
		ident_num: '1234567',
		phone1: '+584121234567',
		phone2: '+584121234566',
		name_rc_ident_card: '', //11
		name_rc_ref_perso: '', //6
		//step2 Comercio
		name_commerce: 'Juan',
		id_ident_type_commerce: 3,
		ident_num_commerce: '12345678',
		text_account_number: '434343434',
		id_activity: 'jugar',
		name_rc_rif: '', //10
		name_rc_account_number: '', //7
		name_rc_ref_bank: '', //5
		special_contributor: false,
		name_rc_special_contributor: '', //4
		//Step3 Location
		estado: '',
		ciudad: '',
		municipio: '',
		parroquia: '',
		sector: '',
		calle: '',
		local: '',
		name_rc_front_local: '', //8
		name_rc_in_local: '', //9
		//step4 Pedido
		number_post: '',
		id_payment_method: '',
		name_rc_constitutive_act: '', //1
		name_rc_property_document: '', //2
		name_rc_service_document: '', //3
	});

	const [imagesForm, setImagesForm] = useState({
		//Step1
		rc_ident_card: { name: '' }, //11
		rc_ref_perso: { name: '' }, //6
		//Step2
		rc_rif: { name: '' }, //10
		rc_account_number: { name: '' }, //7
		rc_ref_bank: { name: '' }, //5
		rc_special_contributor: { name: '' }, //4
		//Step3
		rc_front_local: { name: '' }, //8
		rc_in_local: { name: '' }, //9
		//Step4
		rc_constitutive_act: { name: '' }, //1
		rc_property_document: { name: '' }, //2
		rc_service_document: { name: '' }, //3
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
		//step4 Pedido
		number_post: false,
		id_payment_method: false,
	});

	useEffect(() => {
		if (!valids.allInputNotNUll(valids.sizeStep(activeStep, cursedForm), cursedForm, imagesForm) && 
				!valids.checkErrorAllInput(valids.sizeStep(activeStep, cursedForm), cursedFormError)
		) {
			setReadyStep(true);
		} else {
			setReadyStep(false);
		}
	//eslint-disable react-hooks/exhaustive-deps
	}, [cursedForm, imagesForm, activeStep])

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

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
						temp.phone2 = valids.validPhone2(cursedForm.phone1.slice(3), value.slice(3));
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
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = () => {
		if (valids.allInputNotNUll(valids.sizeStep(activeStep, cursedForm), cursedForm, imagesForm)  ||
				valids.checkErrorAllInput(valids.sizeStep(activeStep, cursedForm), cursedFormError)
		) 
			return
		const formData = new FormData();
		for (const item of Object.entries(imagesForm)) {
			const file:any = item[1]
			if(item[1].name !== ''){
				formData.append('images', file)
			}
		}
		console.log(formData.getAll('images'))
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

	const handleChangeImages = (event: any) => {
		let name = `name_${event.target.name}`;
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
		}
	}

	const deleteImgContributor = (name: string) => {
		setImagesForm({
			...imagesForm,
			[`rc_${name}`]: { name: '' }
		});
	}

  const steps = getSteps();

	const getStep = [
		<Step1
			cursedForm={cursedForm}
			error={cursedFormError}
			imagesForm={imagesForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
			handleChangeImages={handleChangeImages}
			validateForm={validateForm}
		/>,
		<Step2
			cursedForm={cursedForm}
			imagesForm={imagesForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
			handleChangeImages={handleChangeImages}
			deleteImgContributor={deleteImgContributor}
		/>,
		<Step3
			cursedForm={cursedForm}
			imagesForm={imagesForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
			handleChangeImages={handleChangeImages}
		/>,
		<Step4
			cursedForm={cursedForm}
			imagesForm={imagesForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
			handleChangeImages={handleChangeImages}
		/>,
	];

	return (
		<div className='ed-container container-formMaldito'>
			<form className="container-form ed-grid">
				<div className="capitan-america"></div>
				<h1 className="titleFM">Formulario de Activacion</h1>
						<Stepper activeStep={activeStep} style={{ background: 'none', width: '70vw' }}>
							{steps.map((label, index) => {
								const stepProps: { completed?: boolean } = {};
								const labelProps: { optional?: React.ReactNode } = {};
								return (
									<Step key={label} {...stepProps}>
										<StepLabel {...labelProps}>{label}</StepLabel>
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
