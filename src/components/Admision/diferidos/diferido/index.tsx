/* eslint-disable react-hooks/exhaustive-deps */
import FullModal from 'components/modals/FullModal';
import { FMValidContextProvider } from 'context/Admision/Validation/FmContext';
import { DataListAdmisionProvider } from 'context/DataList/DatalistAdmisionContext';
import { SocketContext } from 'context/SocketContext';
import { FC, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanAdmisionFM } from 'store/actions/admisionFm';
import { CloseModal } from 'store/actions/ui';
import { RootState } from 'store/store';
import Swal from 'sweetalert2';
import Validacion from './DiferidoValid';

const Comprobacion: FC = () => {
	const dispatch = useDispatch();

	const { socket } = useContext(SocketContext);

	const { modalOpen } = useSelector((state: any) => state.ui);
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const updatedStatus: any = useSelector((state: RootState) => state.fmAdmision.updatedStatus);
	const id_statusFM: any = useSelector((state: RootState) => state.fmAdmision.id_statusFM);

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
				html: `<span>Codigo de Solicitud: <b>${fm.code}</b><span>`,
				customClass: { container: 'swal2-validated' },
				showConfirmButton: false,
				allowOutsideClick: false,
				allowEscapeKey: false,
				timer: 1500,
			});
			socket.emit('cliente:loadDiferidos');
			socket.emit('cliente:disconnect');
			dispatch(cleanAdmisionFM());
		}
	}, [id_statusFM, updatedStatus]);

	const handleClose = () => {
		socket.emit('cliente:disconnect');
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
