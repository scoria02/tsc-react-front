/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { SocketContext } from '../../../context/SocketContext';
import { stepComplete } from '../../../store/actions/accept';
import { cleanAdmisionFM, updateStatusFM } from '../../../store/actions/admisionFm';
import { CloseModal } from '../../../store/actions/ui';
import { RootState } from '../../../store/store';
import '../scss/index.scss';
import PasoAccountNumber from './pasosComprobacion/PasoAccountNumber';
import PasoActaConst from './pasosComprobacion/PasoActaConst';
//import CancelIcon from '@material-ui/icons/Cancel';
import PasoClient from './pasosComprobacion/PasoClient';
import PasoCommerce from './pasosComprobacion/PasoCommerce';
import PasoCommerce2 from './pasosComprobacion/PasoCommerce2';
import PasoContriSpecial from './pasosComprobacion/PasoContriSpecial';
import PasoPaymentReceipt from './pasosComprobacion/PasoPaymentReceipt';
import ModalSteps from '../../modals/ModalSteps';

const Comprobacion: React.FC<any> = () => {

	function getStepContent(step: number) {
		switch (step) {
			case 0:
				return (
					<div>
						<PasoClient />
					</div>
				);
			case 1:
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
			case 2:
				return (
					<div>
						<PasoAccountNumber />
					</div>
				);
			case 3:
				if (fm.rc_constitutive_act || fm.rc_special_contributor) {
					return (
						<div className={fm.rc_constitutive_act && fm.rc_special_contributor && 'comprobar_container_2'}>
							<div>
								{fm.rc_constitutive_act && (
									<PasoActaConst
										positionImg={
											fm.rc_constitutive_act && fm.rc_special_contributor ? 'img_container_1' : 'img_container'
										}
									/>
								)}
							</div>
							<div>
								{fm.rc_special_contributor && (
									<PasoContriSpecial
										positionImg={
											fm.rc_constitutive_act && fm.rc_special_contributor ? 'img_container_2' : 'img_container'
										}
									/>
								)}
							</div>
						</div>
					);
				} else if (fm.rc_comp_dep) {
					return (
						<div>
							<PasoPaymentReceipt />
						</div>
					);
				} else return;
			case 4:
				return (
					<div>
						<PasoPaymentReceipt />
					</div>
				);
			default:
				return 'Invalid step';
		}
	}

	const dispatch = useDispatch();

	//selectores
	const { modalOpen } = useSelector((state: any) => state.ui);
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const validated: any = useSelector((state: RootState) => state.acceptance.validado);
	const updatedStatus: any = useSelector((state: RootState) => state.fmAdmision.updatedStatus);
	const id_statusFM: any = useSelector((state: RootState) => state.fmAdmision.id_statusFM);

	//states
	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState(new Set<number>());

	const steps = getSteps(fm);
	function getSteps(form: any) {
		if (form.rc_constitutive_act || form.rc_special_contributor) {
			if (form.rc_comp_dep) {
				//existe deposito
				return [
					'Validacion (Cliente)',
					'Validacion (Comercio)',
					'Validacion (Referencia Bancaria)',
					`
					Validacion (
					${form.rc_constitutive_act ? `Acta Const. ${form.rc_special_contributor ? '/' : ''}` : ''}
					${form.rc_special_contributor ? 'Con. Especial' : ''}
					)`,
					'Validacion (Comprobante de Pago)',
				];
			} else {
				return [
					'Validacion (Cliente)',
					'Validacion (Comercio)',
					'Validacion (Referencia Bancaria)',
					`
					Validacion (
					${form.rc_constitutive_act ? `Acta Const. ${form.rc_special_contributor ? '/' : ''}` : ''}
					${form.rc_special_contributor ? 'Con. Especial' : ''}
					)`,
				];
			}
		} else {
			if (form.rc_comp_dep) {
				return [
					'Validacion (Cliente)',
					'Validacion (Comercio)',
					'Validacion (Referencia Bancaria)',
					'Validacion (Comprobante de Pago)',
				];
			} else {
				return ['Validacion (Cliente)', 'Validacion (Comercio)', 'Validacion (Referencia Bancaria)'];
			}
		}
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
				dispatch(updateStatusFM(fm.id, 4, validated));
				console.log('mandado diferido');
			} else {
				dispatch(updateStatusFM(fm.id, 3, validated));
				console.log('fin validacion');
			}
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeStep, dispatch, allStepsCompleted]);

	const { socket } = useContext(SocketContext);

	useEffect(() => {
		if (id_statusFM !== 0 && updatedStatus) {
			const idStatus = id_statusFM;
			Swal.fire({
				icon: `${idStatus === 3 ? 'success' : 'warning'}`,
				title: `${idStatus === 3 ? 'Formulario Verificado' : 'Formulario Diferido'}`,
				customClass: { container: 'swal2-validated' },
				showConfirmButton: false,
				timer: 1500,
			});
			dispatch(cleanAdmisionFM());
			socket.emit('cliente:loadDiferidos');
		}
	}, [id_statusFM, updatedStatus]);

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted() ? steps.findIndex((step:any, i:any) => !completed.has(i)) : activeStep + 1;
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

	const handleComplete = async () => { const newCompleted = new Set(completed);
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
				console.log('revisar fin', completed.size+1, totalSteps())
				if (completed.size+1 !== totalSteps()) {
					handleNext();
				}else{
					handleLoading()
				}
			}
		});
	};

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
			readyStep={false}
			handleNext={handleNext}
			handleComplete={handleComplete}
		/>
	);
};

export default Comprobacion;
