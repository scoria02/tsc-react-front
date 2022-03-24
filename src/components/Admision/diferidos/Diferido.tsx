/* eslint-disable react-hooks/exhaustive-deps */
import ModalSteps from 'components/modals/ModalSteps';
import { SocketContext } from 'context/SocketContext';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stepComplete } from 'store/actions/accept';
import { cleanDataFmDiferido, updateStatusFMDiferido } from 'store/actions/admisionFm';
import { CloseModalDiferido } from 'store/actions/ui';
import { RootState } from 'store/store';
import Swal from 'sweetalert2';
import '../scss/index.scss';
import StepActaConst from './StepActaConst';
import StepDiferido from './StepDiferido';

const Diferido: React.FC<any> = ({ fm }) => {
	const dispatch = useDispatch();

	const { id, id_valid_request, ...recaudos } = fm;

	console.log(fm);

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
		const validStep = () => {
			if (uploadImgs[nameStep]) {
				return true;
			} else if (nameStep === 'rc_constitutive_act') {
				if (Object.keys(actaImages).length) return true;
				else return false;
			} else return false;
		};
		setReadyStep(!validStep());
	}, [nameStep, uploadImgs, actaImages]);

	useEffect(() => {
		if (updatedStatus) {
			Swal.fire({
				title: 'Formulario Verificado',
				icon: 'success',
				customClass: { container: 'swal2-validated' },
			});
			dispatch(cleanDataFmDiferido()); //hoy
		}
	}, [updatedStatus]);

	const steps = getSteps();

	function nameSteps(name: any) {
		switch (name) {
			case 'rc_ident_card':
				return 'Documento de identidad del Cliente';
			case 'rc_rif':
				return 'Documento de identidad del Comercio';
			case 'rc_constitutive_act':
				return 'Acta Constitutiva';
			case 'rc_special_contributor':
				return 'Contribuyente Especial';
			case 'rc_ref_bank':
				return 'Referencia Bancaria';
			case 'rc_comp_dep':
				return 'Comprobante de Pago';
			default:
				return 'Otros';
		}
	}

	function getSteps() {
		let list: string[] = [];
		for (const item of Object.entries(recaudos).reverse()) {
			list.push(nameSteps(item[0]));
		}
		return list;
	}

	const validStep = (item: any, list: any) => {
		for (const element of Object.entries(list)) {
			if (item.slice(3, item.length) === element[0].slice(6, element[0].length)) {
				return element[1];
			}
		}
		return '';
	};

	function getStepContent(step: number) {
		let index = 0;
		for (const item of Object.entries(recaudos).reverse()) {
			//const element: any = item[1];
			if (step === index) {
				const ready = completed.has(activeStep);
				setNameStep(item[0]);
				if (item[0] === 'rc_constitutive_act') {
					return (
						<StepActaConst
							key={index}
							name={item[0]}
							acta={item[1]}
							paths={actaPaths}
							handleChangeImages={handleChangeImagesActa}
							uploadImg={actaImages}
							readyStep={readyStep}
							ready={ready}
							deleteActa={deleteActa}
							setDeleteActa={setDeleteActa}
						/>
					);
				} else {
					return (
						<StepDiferido
							key={index}
							name={item[0]}
							fm={item[1]}
							valid={validStep(item[0], fm.id_valid_request)}
							path={paths[item[0]]}
							handleChangeImages={handleChangeImages}
							uploadImg={uploadImgs[item[0]]}
							readyStep={readyStep}
							ready={ready}
						/>
					);
				}
			}
			index++;
		}
	}

	const totalSteps = () => {
		return getSteps().length;
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
		return index === Object.keys(recaudos).length ? true : false;
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

	return (
		<ModalSteps
			stepComplete={stepComplete}
			clean={cleanDataFmDiferido}
			updatedStatus={updatedStatus}
			CloseModal={CloseModalDiferido}
			steps={steps}
			getStepContent={getStepContent}
			fm={fm}
			modalOpen={modalOpenDiferido}
			id_status={0}
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

export default Diferido;
