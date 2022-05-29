import FullModal from 'components/modals/FullModal';
import { FMValidContextProvider } from 'context/Admision/Validation/FMValidDataContext';
import { SocketContext } from 'context/SocketContext';
import { FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanAdmisionFM } from 'store/actions/admisionFm';
import { RootState } from 'store/store';
import Swal from 'sweetalert2';
import { getFM_solic } from '../getFmData';
import Validacion from './Validacion';

interface Prop {
	fm: any;
	setFm: any;
	id: number;
	setId: any;
}

const Comprobacion: FC<Prop> = ({ fm, setFm, id, setId }) => {
	//console.log('solic', fm);
	const dispatch = useDispatch();

	const { socket } = useContext(SocketContext);

	//const { modalOpen } = useSelector((state: any) => state.ui);
	//const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const updatedStatus: any = useSelector((state: RootState) => state.fmAdmision.updatedStatus);
	const id_statusFM: any = useSelector((state: RootState) => state.fmAdmision.id_statusFM);

	const [modalOpen, setModelOpen] = useState(true);

	const getFmInfo = async (id_fm: number) => {
		if (!fm) {
			console.log('buscar', id);
			const data: any = await getFM_solic(id_fm);
			if (data.ok) {
				setFm(data.fm);
				console.log('fm', data);
			} else {
				setFm(null);
				socket.emit('cliente:disconnect');
				console.log('No hay info del fm');
			}
		}
	};

	useEffect(() => {
		console.log('tiene', fm);
		console.log('tiene2', id);
		if (!fm && id) {
			console.log('buscar -> ', id);
			getFmInfo(id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		if (updatedStatus && id_statusFM !== 0) {
			const idStatus = id_statusFM;
			//socket.emit('cliente:cleansolic');
			if (idStatus === 3) {
				socket.emit('cliente:loadAdministracionTodos');
			} else {
				socket.emit('cliente:loadDiferidos');
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
			socket.emit('cliente:disconnect');
			setFm(null);
			setModelOpen(false);
			dispatch(cleanAdmisionFM());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id_statusFM, updatedStatus]);

	const handleClose = () => {
		socket.emit('cliente:disconnect');
		setId(0);
		setFm(null);
		setModelOpen(false);
		//dispatch(CloseModal());
		dispatch(cleanAdmisionFM());
	};

	return (
		<FullModal modalOpen={modalOpen} handleClose={handleClose}>
			<FMValidContextProvider fm={fm}>
				<>{fm ? <Validacion /> : null}</>
			</FMValidContextProvider>
		</FullModal>
	);
};

export default Comprobacion;
