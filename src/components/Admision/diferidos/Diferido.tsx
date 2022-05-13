/* eslint-disable react-hooks/exhaustive-deps */
import ModalSteps from 'components/modals/ModalSteps';
import { SocketContext } from 'context/SocketContext';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stepComplete } from 'store/actions/accept';
import { cleanDataFmDiferido, updateStatusFMDiferido } from 'store/actions/admisionFm';
import { CloseModalDiferido } from 'store/actions/ui';
import { RootState } from 'store/store';
import Swal from 'sweetalert2';
import '../scss/index.scss';
import StepActaConst from './StepActaConst';
import StepDiferido from './StepDiferido';

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

const Diferido: React.FC<any> = ({ fmData: any }) => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const { fm, initFm, resetFm } = useContext(FMDiferidoContext);

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

	const [deleteActa, setDeleteActa] = useState<any>([]);

	const [actaImages, setActaImages] = useState<any>([]);
	const [actaPaths, setActaPaths] = useState<any>([]);

	//const [planillas, setPlanilla] = useState<any>([]);
	//const [planillasPath, setPlanillaPaths] = useState<any>([]);

	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState(new Set<number>());
	const [readyStep, setReadyStep] = useState<boolean>(true);

	const [uploadImgs, setUploadImgs] = useState<any>({
		rc_ident_card: null,
		rc_rif: null,
		rc_special_contributor: null,
		rc_ref_bank: null,
		rc_comp_dep: null,
	});

	const [paths, setPaths] = useState<any>({
		rc_ident_card: '',
		rc_rif: '',
		rc_special_contributor: '',
		rc_ref_bank: '',
		rc_comp_dep: '',
	});

	const handleChangeImages = (event: any) => {
		if (event.target.files[0]) {
			let file = event.target.files[0];
			let newFile = new File([file], `${event.target.name}.${file.type.split('/')[1]}`, { type: file.type });
			const path = URL.createObjectURL(newFile);
			//Save img
			setUploadImgs({
				...uploadImgs,
				[event.target.name]: newFile,
			});
			//prueba
			setPaths({
				...paths,
				[event.target.name]: path,
			});
		}
	};

	const handleChangeImagesActa = (event: any) => {
		if (event.target.files[0]) {
			let files = event.target.files;
			let path: string[] = [];
			Object.keys(files).map((item: any, index: number) => {
				path.push(URL.createObjectURL(files[index]));
				return item;
			});
			setActaImages(files);
			setActaPaths(path);
		}
	};

	const [nameStep, setNameStep] = useState<string>('');

	useEffect(() => {
		if (activeStep === steps.length - 1) {
			setReadyStep(true);
		} else setReadyStep(false);
	}, [nameStep, uploadImgs, actaImages, activeStep]);

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

	const validStep = (item: any, list: any) => {
		for (const element of Object.entries(list)) {
			if (item.slice(3, item.length) === element[0].slice(6, element[0].length)) {
				return element[1];
			}
		}
		return '';
	};

	const steps = !fm ? [] : getSteps(fm.id_valid_request);

	function getSteps(valid: any) {
		const list: string[] = [];
		if (fm) {
			if (valid.id_typedif_client !== null && !list.includes('Cliente')) list.push('Cliente');
			if (valid.id_typedif_commerce !== null && !list.includes('Comercio')) list.push('Comercio');
			if (valid.id_typedif_ref_bank !== null && !list.includes('Referencia Bancaria'))
				list.push('Referencia Bancaria');
			if (valid.id_typedif_planilla && !list.includes('Planilla de Solicitud')) list.push('Planilla de Solicitud');
			if (valid.id_typedif_consitutive_acta !== null && !list.includes('Acta Const.')) list.push('Acta Const.');
			if (valid.id_typedif_special_contributor && !list.includes('Cont. Especial')) list.push('Cont. Especial');
			if (valid.id_comp_dep && !list.includes('Comprobante de Pago')) list.push('Comprobante de Pago');
		}
		//
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

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !completed.has(i)) : activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const validStatusFm = (): boolean => {
		let index: number = 0;
		for (const item of Object.entries(uploadImgs)) {
			if (item[1]) {
				index++;
			}
		}
		if (Object.keys(actaImages).length) {
			index++;
		}
		return false;
		//return index === Object.keys(recaudos).length ? true : false;
	};

	useEffect(() => {
		if (allStepsCompleted() && !updatedStatus) {
			if (validStatusFm()) {
				console.log('todo listo');
				const formData: any = new FormData();
				for (const item of Object.entries(uploadImgs)) {
					if (item[1] !== null) {
						formData.append('images', item[1]);
						console.log('imagen updateada', item[0]);
					}
				}
				for (const item of actaImages) {
					formData.append('constitutive_act', item);
				}
				let text: string = '';
				for (const item of deleteActa) {
					if (item) {
						text = text + (text.length ? ',' : '') + item;
					}
				}
				formData.append('constitutive_act_ids', text);
				dispatch(updateStatusFMDiferido(fm.id, formData));
			}
		}
	}, [activeStep, allStepsCompleted]);

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
				if (completed.size !== totalSteps()) {
					handleNext();
				}
			}
		});
	};

	const handleSend = () => {
		console.log('Send Diferidos');
	};

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
					readyStep={readyStep}
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
