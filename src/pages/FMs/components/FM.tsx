import { Typography, Button, Step, StepLabel, Stepper } from '@mui/material';
import DataListAdmisionContext from 'context/DataList/DatalistAdmisionContext';
import React, { FC, useContext, useLayoutEffect, useState } from 'react';
import Swal from 'sweetalert2';
//steps
// import StepDataPreValidate from './steps/StepDataPreValidate';
// import StepClient from './steps/StepClient';
// import StepCommerce from './steps/StepCommerce';
// import StepRefBank from './steps/StepRefBank';
// import StepPlanilla from './steps/StepPlanilla';
// import StepActaConst from './steps/StepActaConst';
// import StepContribuyenteSpecial from './steps/StepContribuyenteSpecial';
// import StepCompDep from './steps/StepCompDep';
// import StepPos from './steps/StepPos';
// import StepSelectAci from './steps/StepSelectAci';
 import { useStylesFM } from 'pages/Admision/components/validation/styles';
//import { updateStatusFM } from 'store/actions/admisionFm';
//context
import FMValidDataContext from 'context/Admision/Validation/FMValidDataContext';
import LoaderLine from 'components/loaders/LoaderLine';
import { handleLoading, handleLoadingProvider } from 'utils/handleSwal';

interface Props {
	fm: any;
}

const FM: FC<Props> = ({ fm }) => {
	const classes = useStylesFM();
  console.log(fm)
	/*

	const [steps, setSteps] = useState<string[]>([]);

	const [activeStep, setActiveStep] = useState<number>(0);

	const [stepsValid, setStepsValid] = useState<number>(0);

	const { listAci } = useContext(DataListAdmisionContext);
	const { client, commerce, solic, codeFM, stepsFM, aci, listValidated } = useContext(FMValidDataContext);

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

	const validStatusFm = () => {
		for (const item of Object.entries(listValidated)) {
			if (!item[1].status) {
				return true;
			}
		}
		return false;
	};

	const handleSend = () => {
		if (aci !== null) {
			Swal.fire({
				icon: 'warning',
				title: 'Enviar solicitud verificada',
				html: solic.pagadero
					? `<p>Esto puede tardar <b>unos minutos</b></p>`
					: `<p>Esta solicitud se enviara al siguente departamento</p>`,
				showConfirmButton: true,
				allowOutsideClick: false,
				allowEscapeKey: false,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Verificado',
				showCancelButton: true,
				cancelButtonText: 'Cancelar',
				showCloseButton: true,
				customClass: { container: 'swal2-validated' },
			}).then((result) => {
				if (result.isConfirmed) {
					if (solic.pagadero) {
						handleLoadingProvider();
					} else {
						handleLoading();
					}
					if (aci?.id) {
						if (!validStatusFm()) {
							validatedFM(3, listValidated, aci!.id);
							console.log('Enviado al siguente Modulo (Pagadero: Tms7 & 1000pagos)');
						} else {
							validatedFM(4, listValidated, aci!.id);
							console.log('Enviado a diferido');
						}
					}
				}
			});
		}
	};

	const handleVerificar = async () => {
		Swal.fire({
			title: 'Confirmar verificación',
			icon: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Verificado',
			showCancelButton: true,
			cancelButtonText: 'Atras',
			showCloseButton: true,
			customClass: { container: 'swal2-validated' },
		}).then((result) => {
			if (result.isConfirmed) {
				//setList()
				if (stepsValid !== steps.length - 1) {
					setStepsValid(stepsValid + 1);
					handleNext();
				} else {
					handleLoading();
				}
			}
		});
	};

	//console.log('validados:', stepsValid, ' steps', steps.length - 1);

	const getContentSteps = () => {
		let listSteps: any = [];
		if (client?.validate || commerce.valid_cliente)
			if (!listSteps.includes(<StepDataPreValidate />)) listSteps.push(<StepDataPreValidate />);
		if (solic.rc_planilla.length && !listSteps.includes(<StepPlanilla />)) listSteps.push(<StepPlanilla />);
		if (client && !client.validate && !listSteps.includes(<StepClient />)) listSteps.push(<StepClient />);
		if (commerce && !commerce.validate) {
			if (!listSteps.includes(<StepCommerce />)) listSteps.push(<StepCommerce />);
			if (commerce.rc_constitutive_act.length && !listSteps.includes(<StepActaConst />))
				listSteps.push(<StepActaConst />);
			if (commerce.rc_special_contributor && !listSteps.includes(<StepContribuyenteSpecial />))
				listSteps.push(<StepContribuyenteSpecial />);
		}
		if (solic && !listSteps.includes(<StepPos />)) listSteps.push(<StepPos />);
		if (solic.rc_ref_bank && !listSteps.includes(<StepRefBank />)) listSteps.push(<StepRefBank />);
		if (solic.rc_comp_dep && !listSteps.includes(<StepCompDep />)) listSteps.push(<StepCompDep />);
		if (!listSteps.includes(<StepSelectAci />)) listSteps.push(<StepSelectAci />);

		return listSteps;
	};

	const handleClickButton = () => {
		if (activeStep > stepsValid - 1) {
			handleVerificar();
		} else {
			handleNext();
		}
	};
  */

	return {
		<div className={classes.containerSolic}>
		/*
			{!listAci.length || !solic ? (
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
											<Typography
												style={{
													fontSize: '10px',
												}}
												variant={activeStep === index ? 'body1' : 'body2'}
												color={activeStep === index ? 'primary' : 'info'}>
												<span>{index > stepsValid - 1 ? '' : 'Verificado'}</span>
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
									{stepsValid === steps.length - 1 && activeStep === steps.length - 1 ? (
										<Button
											sx={{
												mr: 40,
											}}
											size='large'
											variant='contained'
											disabled={activeStep === steps.length - 1 && !aci ? true : false}
											color='success'
											onClick={handleSend}
											className={classes.buttonNext}>
											<span className={classes.textButton}>Enviar</span>
										</Button>
									) : (
										<Button
											sx={{
												mr: 40,
											}}
											size='large'
											variant='contained'
											color='primary'
											onClick={handleClickButton}
											className={classes.buttonNext}>
											<span className={classes.textButton}>
												{activeStep > stepsValid - 1 ? 'Verificar' : 'Siguente'}
											</span>
										</Button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
    */
		</div>
	};
};

export default FM;