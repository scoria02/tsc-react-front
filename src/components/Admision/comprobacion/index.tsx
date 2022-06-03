import FullModal from 'components/modals/FullModal';
import { FMValidContextProvider } from 'context/Admision/Validation/FMValidDataContext';
import { SocketContext } from 'context/SocketContext';
import { FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanAdmisionFM, updateStatusFM } from 'store/actions/admisionFm';
import { RootState } from 'store/store';
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
			//console.log('buscar', id);
			const data: any = await getFM_solic(id_fm);
			if (data.ok) {
				setFm(data.fm);
				//console.log('fm', data);
			} else {
				setFm(null);
				socket.emit('cliente:disconnect');
				//console.log('No hay info del fm');
			}
		}
	};

	useEffect(() => {
		//console.log('tiene', fm, id);
		if (!fm && id) {
			//console.log('buscar -> ', id);
			getFmInfo(id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const validatedFM = (status: number, listValidated: any, idAci: number) => {
		dispatch(updateStatusFM(id, status, listValidated, idAci, socket, setFm, setModelOpen));
	};

	useEffect(() => {
		if (updatedStatus && id_statusFM !== 0) {
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id_statusFM, updatedStatus]);

	const handleClose = () => {
		socket.emit('cliente:disconnect');
		setId(0);
		setFm(null);
		setModelOpen(false);
		dispatch(cleanAdmisionFM());
	};

	return (
		<FullModal modalOpen={modalOpen} handleClose={handleClose}>
			<FMValidContextProvider fm={fm}>
				<>{fm ? <Validacion validatedFM={validatedFM} /> : null}</>
			</FMValidContextProvider>
		</FullModal>
	);
};

export default Comprobacion;
