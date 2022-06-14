import { Button } from '@mui/material';
import { FC, useContext, useLayoutEffect, useState } from 'react';
//steps
import InfoGeneral from './steps/InfoGeneral';
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

	//const [steps, setSteps] = useState<string[]>([]);

	const { activeStep, setActiveStep, client, commerce, solic, codeFM, stepsFM } = useContext(FMContextData);

	const [step, setStep] = useState([]);

	useLayoutEffect(() => {
		//if (stepsFM) setSteps(stepsFM);
		if (solic) setStep(getContentSteps());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stepsFM, solic]);

	const handleBack = () => {
		setActiveStep(0);
	};

	const getContentSteps = () => {
		let listSteps: any = [];
		if (!listSteps.includes(<InfoGeneral />)) listSteps.push(<InfoGeneral />);
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
		<div style={{ marginTop: '1rem' }}>
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
						{activeStep ? (
							<h2
								style={{
									marginTop: '10px',
									fontSize: '20px',
									marginRight: '10px',
								}}>
								{stepsFM[activeStep]}
							</h2>
						) : null}
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
