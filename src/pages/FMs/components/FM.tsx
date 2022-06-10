import { Typography, Button, Step, StepLabel, Stepper } from '@mui/material';
import { FC, useContext, useLayoutEffect, useState } from 'react';
//steps
import StepClient from './steps/StepClient';
import StepCommerce from './steps/StepCommerce';
import StepRefBank from './steps/StepRefBank';
import StepPlanilla from './steps/StepPlanilla';
import StepActaConst from './steps/StepActaConst';
import StepContribuyenteSpecial from './steps/StepContribuyenteSpecial';
import StepCompDep from './steps/StepCompDep';
import StepPos from './steps/StepPos';
import { useStylesFM } from 'pages/Admision/components/validation/styles';
//context
import LoaderLine from 'components/loaders/LoaderLine';
import FMContextData from 'context/FM/FMContextData';

const FM: FC = () => {
	const classes = useStylesFM();

	const [steps, setSteps] = useState<string[]>([]);

	const [activeStep, setActiveStep] = useState<number>(0);

	const { client, commerce, solic, codeFM, stepsFM } = useContext(FMContextData);
	console.log(solic);

	const [step, setStep] = useState([]);

	useLayoutEffect(() => {
		if (stepsFM) setSteps(stepsFM);
		if (solic) setStep(getContentSteps());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stepsFM, solic]);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const getContentSteps = () => {
		let listSteps: any = [];
		if (solic.rc_planilla.length && !listSteps.includes(<StepPlanilla />)) listSteps.push(<StepPlanilla />);
		if (client && !listSteps.includes(<StepClient />)) listSteps.push(<StepClient />);
		if (commerce) {
			if (!listSteps.includes(<StepCommerce />)) listSteps.push(<StepCommerce />);
			if (commerce.rc_constitutive_act.length && !listSteps.includes(<StepActaConst />))
				listSteps.push(<StepActaConst />);
			if (commerce.rc_special_contributor && !listSteps.includes(<StepContribuyenteSpecial />))
				listSteps.push(<StepContribuyenteSpecial />);
		}
		if (solic && !listSteps.includes(<StepPos />)) listSteps.push(<StepPos />);
		if (solic.rc_ref_bank && !listSteps.includes(<StepRefBank />)) listSteps.push(<StepRefBank />);
		if (solic.rc_comp_dep && !listSteps.includes(<StepCompDep />)) listSteps.push(<StepCompDep />);

		return listSteps;
	};

	return (
		<div className={classes.containerSolic}>
			{!solic ? (
				<LoaderLine />
			) : (
				<div>
					<h2
						style={{
							marginTop: 1,
							fontSize: '12px',
						}}>
						Code: <span style={{ color: 'red' }}>{codeFM}</span>
					</h2>
					<div className={classes.containerSteps}>
						<Stepper alternativeLabel activeStep={activeStep} style={{ background: 'none', width: '100%' }}>
							{steps.map((label, index) => {
								const stepProps: { completed?: boolean } = {};
								return (
									<Step key={label} {...stepProps}>
										<StepLabel>
											<Typography
												variant={activeStep === index ? 'body1' : 'body2'}
												color={activeStep === index ? 'primary' : 'info'}>
												<b>{label}</b>
											</Typography>
										</StepLabel>
									</Step>
								);
							})}
						</Stepper>
						<div className={classes.containerFM}>
							<div>
								{step[activeStep]}
								<div className={classes.buttonFixed}>
									<Button
										sx={{
											ml: 20,
											mr: 20,
										}}
										size='large'
										disabled={activeStep === 0}
										variant='contained'
										style={{ opacity: activeStep ? 1 : 0 }}
										onClick={handleBack}
										className={classes.buttonBack}>
										<span className={classes.textButton}>Volver</span>
									</Button>
									{activeStep === steps.length - 1 ? null : (
										<Button
											sx={{
												mr: 40,
											}}
											size='large'
											variant='contained'
											color='primary'
											onClick={handleNext}
											className={classes.buttonNext}>
											<span className={classes.textButton}>Siguente</span>
										</Button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FM;
