import React from "react"
//import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";

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


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
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
  return ['Informacion Personal del Cliente', 'Informacion del Comercio'];
}

export const FormMaldito = () => {
	const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const steps = getSteps();
	const { register, handleSubmit }:any = useForm();

	const getStep = [
		<Step1
			maldito={register}
		/>,
		<Step2/>,
	];


  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
		console.log(register)
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

	const onSubmit = (data:any) => console.log(data)

	return (
		<div className='ed-container container-formMaldito'>
			<form className="container-form" onSubmit={handleSubmit(onSubmit)}>
				<div className="capitan-america"></div>
				<h1 style={{ fontSize: '2rem', padding: 0, margin:0 }}>FM</h1>
						<Stepper activeStep={activeStep} style={{ background: 'none' }}>
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
									<div>
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
