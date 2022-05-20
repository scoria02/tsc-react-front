/* eslint-disable react-hooks/exhaustive-deps */
import { getAci } from 'components/formMaldito/getData';
import FullModal from 'components/modals/FullModal';
import ModalSteps from 'components/modals/ModalSteps';
import { FMValidContextProvider } from 'context/Admision/Validation/FmContext';
import { DataListAdmisionProvider } from 'context/DataList/DatalistAdmisionContext';
import { SocketContext } from 'context/SocketContext';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stepComplete } from 'store/actions/accept';
import { cleanAdmisionFM, updateStatusFM } from 'store/actions/admisionFm';
import { CloseModal } from 'store/actions/ui';
import { RootState } from 'store/store';
import Swal from 'sweetalert2';
import '../scss/index.scss';
import PasoAccountNumber from './pasosComprobacion/PasoAccountNumber';
import PasoActaConst from './pasosComprobacion/PasoActaConst';
//import CancelIcon from '@mui/icons-material/Cancel';
import PasoClient from './pasosComprobacion/PasoClient';
import PasoCommerce from './pasosComprobacion/PasoCommerce';
import PasoCommerce2 from './pasosComprobacion/PasoCommerce2';
import PasoContriSpecial from './pasosComprobacion/PasoContriSpecial';
import PasoPaymentReceipt from './pasosComprobacion/PasoPaymentReceipt';
import PasoPlanilla from './steps/PasoPlanilla';
import PasoSelectAci from './pasosComprobacion/PasoSelectAci';
import { useStyles } from './pasosComprobacion/styles/styles';
import Validacion from './Validacion';

const Comprobacion: FC = () => {
	const dispatch = useDispatch();

	const { socket } = useContext(SocketContext);

	const { modalOpen } = useSelector((state: any) => state.ui);
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const validated: any = useSelector((state: RootState) => state.acceptance.validado);
	const updatedStatus: any = useSelector((state: RootState) => state.fmAdmision.updatedStatus);
	const id_statusFM: any = useSelector((state: RootState) => state.fmAdmision.id_statusFM);

	console.log(fm);

	//console.log('actual fm', fm);

	//states
	const [activeStep, setActiveStep] = useState(0);
	//const [send, setSend] = useState(false);
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
			// console.log('Get list Acis');
			setGetDataControl(2);
		}
	}, [getDataControl]);

	/*
	const handleSend = async () => {
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
				handleLoading();
				if (validStatusFm()) {
					dispatch(updateStatusFM(fm.id, 4, validated, aci.id));
					console.log('mandado diferido');
				} else {
					dispatch(updateStatusFM(fm.id, 3, validated, aci.id));
					console.log('fin validacion');
				}
			}
		});
	};
	*/

	/*
	useEffect(() => {
		if (updatedStatus && id_statusFM !== 0) {
			const idStatus = id_statusFM;
			//socket.emit('cliente:cleansolic');
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
			socket.emit('cliete:disconnect');
			socket.emit('cliente:loadDiferidos');
			dispatch(cleanAdmisionFM());
		}
	}, [id_statusFM, updatedStatus]);
	*/

	/*
	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? steps.findIndex((step: any, i: any) => !completed.has(i))
				: activeStep + 1;
		setActiveStep(newActiveStep);
	};
	*/

	/*
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
	*/

	/*
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
	*/

	const handleClose = () => {
		socket.emit('cliente:disconnect');
		// console.log('clean for close');
		dispatch(CloseModal());
		dispatch(cleanAdmisionFM());
	};

	return (
		<DataListAdmisionProvider>
			<FMValidContextProvider fm={fm}>
				<FullModal modalOpen={modalOpen} handleClose={handleClose}>
					<Validacion />
				</FullModal>
			</FMValidContextProvider>
		</DataListAdmisionProvider>
	);
};

export default Comprobacion;
