import React, { useState } from "react"
//import { useDispatch } from 'react-redux';

//Material
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { useStylesFM } from './styles';

import './index.scss';

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
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
	const [ cursedForm, setCursedForm ] = useState<any>({
		//step1 Cliente
		email: '',
		name: '',
		last_name: '',
		id_ident_type: 1,
		ident_num: '',
		rc_ident_card: '',
		phone1: '+58',
		phone2: '+58',
		rc_ref_perso: '',
		//step2 Comercio
		contributor: false,
		name_commerce: '',
		id_ident_type_commerce: 3,
		ident_num_commerce: '',
		rc_rif: '',
		text_account_number: '',
		rc_ref_bank: '',
		id_activity: '',
		//Step3 Location
		estado: '',
		ciudad: '',
		municipio: '',
		parroquia: '',
		sector: '',
		calle: '',
		local: '',
		codigo_postal: '',
		//step4 Pedido
		number_post: '',
		id_payment_method: '',
		rc_constitutive_act: '',
		rc_property_document: '',
		rc_service_document: '',
		rc_front_local: '',
		rc_in_local: '',
	});

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

	const inputNUll = () => {
		for (const item of Object.entries(cursedForm)) {
			if (item[1] === '') {
				return true;
			}
		}
		return false;
	}

	//handle
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCursedForm({
			...cursedForm,
			[event.target.name]: event.target.value,
		});
	};

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleSubmit = () => {
		if(inputNUll()){
			return;
		}
		console.log(cursedForm)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = getSteps();

	const getStep = [
		<Step1
			cursedForm={cursedForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
		/>,
		<Step2
			cursedForm={cursedForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
		/>,
		<Step3
			cursedForm={cursedForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
		/>,
		<Step4
			cursedForm={cursedForm}
			setCursedForm={setCursedForm}
			handleChange={handleChange}
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
									<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
										Volver
									</Button>
									<Button
										variant="contained"
										disabled={
											activeStep === steps.length - 1 ? (inputNUll() ?  true : false) 
											: 
											false
										}
										color="primary"
										onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext }
										className={classes.button}
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
