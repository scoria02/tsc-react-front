/* eslint-disable react-hooks/exhaustive-deps */
import FullModal from 'components/modals/FullModal';
import { FMValidContextProvider } from 'context/Admision/Validation/FMValidDataContext';
import { DataListAdmisionProvider } from 'context/DataList/DatalistAdmisionContext';
import { SocketContext } from 'context/SocketContext';
import { FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanAdmisionFM } from 'store/actions/admisionFm';
import { RootState } from 'store/store';
import Swal from 'sweetalert2';
import Validacion from './Validacion';

interface Prop {
	fm: any;
	setFm: any;
}

const Comprobacion: FC<Prop> = ({ fm, setFm }) => {
	//console.log('solic', fm);
	const dispatch = useDispatch();

	const { socket } = useContext(SocketContext);

	//const { modalOpen } = useSelector((state: any) => state.ui);
	//const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const updatedStatus: any = useSelector((state: RootState) => state.fmAdmision.updatedStatus);
	const id_statusFM: any = useSelector((state: RootState) => state.fmAdmision.id_statusFM);

	const [modalOpen, setModelOpen] = useState(true);

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
				allowOutsideClick: false,
				allowEscapeKey: false,
				timer: 1500,
			});
			socket.emit('cliente:loadDiferidos');
			socket.emit('cliente:disconnect');
			setFm(null);
			setModelOpen(false);
			dispatch(cleanAdmisionFM());
		}
	}, [id_statusFM, updatedStatus]);

	const handleClose = () => {
		socket.emit('cliente:disconnect');
		setFm(null);
		setModelOpen(false);
		//dispatch(CloseModal());
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
