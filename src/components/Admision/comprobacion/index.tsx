/* eslint-disable react-hooks/exhaustive-deps */
import { SocketContext } from 'context/SocketContext';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stepComplete } from 'store/actions/accept';
import { cleanAdmisionFM, updateStatusFM } from 'store/actions/admisionFm';
import { CloseModal } from 'store/actions/ui';
import { RootState } from 'store/store';
import Swal from 'sweetalert2';
import { getAci } from '../../formMaldito/getData';
import ModalSteps from '../../modals/ModalSteps';
import '../scss/index.scss';
import PasoAccountNumber from './pasosComprobacion/PasoAccountNumber';
import PasoActaConst from './pasosComprobacion/PasoActaConst';
//import CancelIcon from '@mui/icons-material/Cancel';
import PasoClient from './pasosComprobacion/PasoClient';
import PasoCommerce from './pasosComprobacion/PasoCommerce';
import PasoCommerce2 from './pasosComprobacion/PasoCommerce2';
import PasoContriSpecial from './pasosComprobacion/PasoContriSpecial';
import PasoPaymentReceipt from './pasosComprobacion/PasoPaymentReceipt';
import PasoSelectAci from './pasosComprobacion/PasoSelectAci';

const Comprobacion: FC = () => {
	function getStepContent(step: number, steps: string[]) {
		switch (steps[step]) {
			case 'Cliente':
				return (
					<div>
						<PasoClient />
					</div>
				);
			case 'Comercio':
				return (
					<div className='comprobar_container_2'>
						<div>
							<PasoCommerce />
						</div>
						<div>
							<PasoCommerce2 />
						</div>
					</div>
				);
			case 'Referencia Bancaria':
				return (
					<div>
						<PasoAccountNumber />
					</div>
				);
			case 'Acta Const.':
				return (
					<div>
						<PasoActaConst />
					</div>
				);
			case 'Cont. Especial':
				return (
					<div>
						<PasoContriSpecial />
					</div>
				);
			case 'Comprobante de Pago':
				return (
					<div>
						<PasoPaymentReceipt />
					</div>
				);
			case 'Asignación ACI':
				return (
					<div>
						<PasoSelectAci aci={aci} setAci={setAci} listAci={listAci} />
					</div>
				);
			default:
				return 'Invalid step';
		}
	}

	const dispatch = useDispatch();
	const { socket } = useContext(SocketContext);
	//selectores
	const { modalOpen } = useSelector((state: any) => state.ui);
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const validated: any = useSelector((state: RootState) => state.acceptance.validado);
	const updatedStatus: any = useSelector((state: RootState) => state.fmAdmision.updatedStatus);
	const id_statusFM: any = useSelector((state: RootState) => state.fmAdmision.id_statusFM);

	//states
	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState(new Set<number>());

	const [aci, setAci] = useState<any>(null);
	const [listAci, setListAci] = useState<any>([]);

	const [getDataControl, setGetDataControl] = useState<number>(0);

	useEffect(() => {
		if (getDataControl === 0) {
			getAci().then((res: any) => {
				res.forEach((item: any, indice: number) => {
					setListAci((prevState: any) => [...prevState, item]);
					if (indice === res.length - 1) {
						setGetDataControl(1);
					}
				});
			});
		} else if (getDataControl === 1) {
			console.log('Get list Acis');
			setGetDataControl(2);
		}
	}, [getDataControl]);

	const steps = getSteps(fm);

	function getSteps(form: any) {
		const list: string[] = ['Cliente', 'Comercio', 'Referencia Bancaria'];
		if (form.id_commerce.rc_constitutive_act.length && !list.includes('Acta Const.')) {
			list.push('Acta Const.');
		}
		if (form.id_commerce.rc_special_contributor && !list.includes('Cont. Especial')) {
			list.push('Cont. Especial');
		}
		if (form.rc_comp_dep && !list.includes('Comprobante de Pago')) {
			list.push('Comprobante de Pago');
		}
		list.push('Asignación ACI');
		return list;
	}

	const totalSteps = () => {
		return getSteps(fm).length;
	};
	const completedSteps = () => {
		return completed.size;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};

	const validStatusFm = (): boolean => {
		for (const item in validated) {
			if (item.slice(0, 3) === 'rc_') {
				const element = validated[item];
				if (element.status === false) {
					return true;
				}
			}
		}
		return false;
	};

	useEffect(() => {
		if (allStepsCompleted() && !updatedStatus) {
			if (validStatusFm()) {
				dispatch(updateStatusFM(fm.id, 4, validated, aci.id));
				console.log('mandado diferido');
			} else {
				dispatch(updateStatusFM(fm.id, 3, validated, aci.id));
				console.log('fin validacion');
			}
		}
		// socket.emit('cliente:loadDiferidos');
		// socket.emit('cliente:dashdatasiempre');
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeStep, dispatch, allStepsCompleted]);

	useEffect(() => {
		if (id_statusFM !== 0 && updatedStatus) {
			const idStatus = id_statusFM;
			socket.emit('cliente:cleansolic');
			if (idStatus === 3) {
				socket.emit('cliente:loadAdministracionTodos');
			}
			Swal.fire({
				icon: `${idStatus === 3 ? 'success' : 'warning'}`,
				title: `${idStatus === 3 ? 'Formulario Verificado' : 'Formulario Diferido'}`,
				customClass: { container: 'swal2-validated' },
				showConfirmButton: false,
				timer: 1500,
			});
			dispatch(cleanAdmisionFM());
		}
	}, [id_statusFM, updatedStatus]);

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? steps.findIndex((step: any, i: any) => !completed.has(i))
				: activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const handleLoading = () => {
		Swal.fire({
			icon: 'info',
			title: 'Enviando Solicitud...',
			showConfirmButton: false,
			customClass: { container: 'swal2-validated' },
			didOpen: () => {
				Swal.showLoading();
			},
		});
	};

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
				if (completed.size + 1 !== totalSteps()) {
					handleNext();
				} else {
					handleLoading();
				}
			}
		});
	};

	const [readyStep, setReadyStep] = useState<boolean>(false);

	useEffect(() => {
		if (activeStep === steps.length - 1) {
			if (aci) setReadyStep(false);
			else setReadyStep(true);
		} else setReadyStep(false);
	}, [activeStep, aci]);

	return (
		<ModalSteps
			stepComplete={stepComplete}
			clean={cleanAdmisionFM}
			updatedStatus={updateStatusFM}
			steps={steps}
			getStepContent={getStepContent}
			fm={fm}
			modalOpen={modalOpen}
			CloseModal={CloseModal}
			id_status={id_statusFM}
			getSteps={getSteps}
			activeStep={activeStep}
			setActiveStep={setActiveStep}
			completed={completed}
			setCompleted={setCompleted}
			readyStep={readyStep}
			handleNext={handleNext}
			handleComplete={handleComplete}
		/>
	);
};

export default Comprobacion;
