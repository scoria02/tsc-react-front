import React, { useState } from "react"
//import { useDispatch } from 'react-redux';

//Material
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './index.scss';

//steps
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    button: {
      marginRight: theme.spacing(1),
			textTransform: 'none',
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['Informacion Personal del Cliente', 'Informacion del Comercio I', 'Informacion del Comercio II'];
}

export const FormMaldito = () => {
	const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
	const [ cursedForm, setCursedForm ] = useState<any>({
		//step1
		email: '',
		name: '',
		last_name: '',
		id_ident_type: 1,
		ident_num: '',
		phone1: '',
		phone2: '',
		//step2
		contributor: false,
		nro_post: '',
		name2: '',
		last_name2: '',
		id_ident_type2: 1,
		ident_num2: '',
		nro_account: '',
		id_activity: '',
		//step3
		payment_method: '',
		estado: '',
		ciudad: '',
		municipio: '',
		parroquia: '',
		sector: '',
		calle: '',
		local: '',
		codigo_postal: '',
	});

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
	];

	return (
		<div className='ed-container container-formMaldito'>
			<form className="container-form ed-grid">
				<div className="capitan-america"></div>
				<h1 style={{ fontSize: '2rem', padding: 0, margin:0 }}>FM</h1>
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
							{activeStep === steps.length ? (
								<div>
									<Typography className={classes.instructions}>
										All steps completed - you&apos;re finished
									</Typography>
									<Button onClick={handleReset} className={classes.button}>
										Reset
									</Button>
								</div>
							) : (
								<div className='container-steps'>
									{getStep[activeStep]}
									<div style={{marginTop: '1rem' }}>
										<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
											Volver
										</Button>
										<Button
											variant="contained"
											color="primary"
											onClick={handleNext}
											className={classes.button}
										>
											{activeStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
										</Button>
									</div>
								</div>
							)}
						</div>
			</form>
		</div>
	);
};
