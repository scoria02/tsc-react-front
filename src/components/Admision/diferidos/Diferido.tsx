/* eslint-disable react-hooks/exhaustive-deps */
import ModalSteps from 'components/modals/ModalSteps';
import { SocketContext } from 'context/SocketContext';
import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stepComplete } from 'store/actions/accept';
import { cleanDataFmDiferido, updateStatusFMDiferido } from 'store/actions/admisionFm';
import { CloseModalDiferido } from 'store/actions/ui';
import { RootState } from 'store/store';
import Swal from 'sweetalert2';
import '../scss/index.scss';

import PasoAccountNumber from './pasosComprobacion/PasoAccountNumber';
import PasoActaConst from './pasosComprobacion/PasoActaConst';
import PasoClient from './pasosComprobacion/PasoClient';
import PasoCommerce from './pasosComprobacion/PasoCommerce';
import PasoCommerce2 from './pasosComprobacion/PasoCommerce2';
import PasoContriSpecial from './pasosComprobacion/PasoContriSpecial';
import PasoPaymentReceipt from './pasosComprobacion/PasoPaymentReceipt';
import PasoPlanilla from './pasosComprobacion/PasoPlanilla';
import { useStyles } from './pasosComprobacion/styles/styles';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import { handleLoading } from 'components/utilis/swals';

const Diferido: React.FC<any> = ({ fmData: any }) => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const { fm, setDisabled, imagePlanilla, imagesForm, imagesActa, initFm, resetFm } =
		useContext(FMDiferidoContext);

	console.log(fm);

	useLayoutEffect(() => {
		if (!fm) {
			initFm(fm);
		}
	}, []);

	function getStepContent(step: number, steps: string[]) {
		switch (steps[step]) {
			case 'Cliente':
				return <PasoClient />;
			case 'Comercio':
				return (
					<div className={classes.wrapperGrid}>
						<PasoCommerce />
						<div>
							<PasoCommerce2 />
						</div>
					</div>
				);
			case 'Referencia Bancaria':
				return <PasoAccountNumber />;
			case 'Planilla de Solicitud':
				return <PasoPlanilla />;
			case 'Acta Const.':
				return <PasoActaConst />;
			case 'Cont. Especial':
				return <PasoContriSpecial />;
			case 'Comprobante de Pago':
				return <PasoPaymentReceipt />;
			default:
				return 'Invalid step';
		}
	}

	const { modalOpenDiferido } = useSelector((state: any) => state.ui);

	const updatedStatus: any = useSelector((state: RootState) => state.fmAdmision.updatedStatusDiferido);

	//const [actaImages, setActaImages] = useState<any>([]);
	//const [actaPaths, setActaPaths] = useState<any>([]);

	//const [planillas, setPlanilla] = useState<any>([]);
	//const [planillasPath, setPlanillaPaths] = useState<any>([]);

	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState(new Set<number>());
	//const [readyStep, setReadyStep] = useState<boolean>(true);

	useEffect(() => {
		if (updatedStatus) {
			Swal.fire({
				title: 'Formulario Verificado',
				icon: 'success',
				customClass: { container: 'swal2-validated' },
			});
			cleanDiferido();
		}
	}, [updatedStatus]);

	const cleanDiferido = () => {
		dispatch(cleanDataFmDiferido()); //hoy
		resetFm();
	};

	const steps = !fm ? [] : getSteps(fm.id_valid_request);

	function getSteps(valid: any) {
		const list: string[] = [];
		if (fm) {
			if (valid.id_typedif_client !== null && !list.includes('Cliente')) list.push('Cliente');
			if (valid.id_typedif_commerce !== null && !list.includes('Comercio')) list.push('Comercio');
			if (valid.id_typedif_ref_bank !== null && !list.includes('Referencia Bancaria'))
				list.push('Referencia Bancaria');
			if (valid.id_typedif_planilla !== null && !list.includes('Planilla de Solicitud'))
				list.push('Planilla de Solicitud');
			if (valid.id_typedif_consitutive_acta !== null && !list.includes('Acta Const.')) list.push('Acta Const.');
			if (valid.id_typedif_special_contributor && !list.includes('Cont. Especial')) list.push('Cont. Especial');
			if (valid.id_typedif_comp_num !== null && !list.includes('Comprobante de Pago'))
				list.push('Comprobante de Pago');
		}
		//
		return list;
	}

	const totalSteps = () => {
		console.log('total', getSteps(fm).length);
		return getSteps(fm).length;
	};

	const handleNext = () => {
		console.log(steps.length);
		const newActiveStep = activeStep === steps.length - 1 ? 0 : activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const { socket } = useContext(SocketContext);

	useEffect(() => {
		if (updatedStatus) {
			console.log('Clean fm from diferdio');

			dispatch(cleanDataFmDiferido());
			socket.emit('cliente:cleansolic');

			setTimeout(() => {
				Swal.fire({
					title: 'Formulario Verificado',
					icon: 'success',
					customClass: { container: 'swal2-validated' },
				});
			}, 10);
		}
	}, [updatedStatus]);

	const handleComplete = async () => {
		const newCompleted = new Set(completed);
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
				newCompleted.add(activeStep);
				dispatch(stepComplete(newCompleted));
				setCompleted(newCompleted);
				console.log('bug1', completed.size, totalSteps() - 1, steps[activeStep], activeStep);
				if (completed.size !== totalSteps() - 1) {
					handleNext();
				}
			}
		});
	};

	const handleSend = async () => {
		Swal.fire({
			title: 'Confirmar Solicitud',
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
				handleLoading();
				dispatch(updateStatusFMDiferido(fm.id, fm, imagesForm, imagePlanilla, imagesActa));
				console.log('mandado a administracion');
			}
		});
	};

	useEffect(() => {
		if (activeStep !== steps.length - 1 && completed.has(activeStep)) setDisabled(true);
		else setDisabled(false);
	}, [activeStep]);

	return (
		<>
			{fm ? (
				<ModalSteps
					stepComplete={stepComplete}
					clean={cleanDataFmDiferido}
					updatedStatus={updateStatusFMDiferido}
					steps={steps}
					getStepContent={getStepContent}
					fm={fm}
					modalOpen={modalOpenDiferido}
					CloseModal={CloseModalDiferido}
					id_status={0}
					getSteps={getSteps}
					activeStep={activeStep}
					setActiveStep={setActiveStep}
					completed={completed}
					setCompleted={setCompleted}
					readyStep={true}
					handleNext={handleNext}
					handleComplete={handleComplete}
					handleSend={handleSend}
					cleanContext={resetFm}
				/>
			) : null}
		</>
	);
};

export default Diferido;
