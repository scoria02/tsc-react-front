/* eslint-disable react-hooks/exhaustive-deps */
import { SocketContext } from 'context/SocketContext';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanDataFmDiferido } from 'store/actions/admision/diferido';
import { RootState } from 'store/store';
import Swal from 'sweetalert2';
import { FMDiferidoContextProvider } from 'context/Admision/Diferido/FmDiferidoContext';
import { DataListAdmisionProvider } from 'context/DataList/DatalistAdmisionContext';
import DiferidoValid from './validationDiferido';
import FullModal from 'components/modals/FullModal';
import { LocationsProvider } from 'context/Admision/CreationFM/Location/LocationsContext';
import { getFM_solic } from '../../getFmData';

interface Prop {
	fm: any;
	setFm: Dispatch<SetStateAction<any>>;
	id: number;
	setId: Dispatch<SetStateAction<number>>;
}

const FMDiferido: React.FC<Prop> = ({ fm, setFm, id, setId }) => {
	const dispatch = useDispatch();
	//console.log('fm', fm);
	//const { modalOpenDiferido } = useSelector((state: any) => state.ui);
	const updatedStatus: any = useSelector((state: RootState) => state.fmAdmision.updatedStatusDiferido);

	const [modalOpen, setModelOpen] = useState(true);

	const { socket } = useContext(SocketContext);

	const getFmInfo = async (id_fm: number) => {
		if (!fm) {
			//console.log('buscar', id);
			const data: any = await getFM_solic(id_fm);
			//console.log('data', data.fm);
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
		//console.log('tiene', fm);
		if (!fm && id) {
			//console.log('buscar -> ', id);
			getFmInfo(id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		if (updatedStatus) {
			//console.log('Clean fm from diferdio');
			socket.emit('cliente:disconnet');
			Swal.fire({
				title: 'Formulario Verificado',
				icon: 'success',
				customClass: { container: 'swal2-validated' },
			});
			setFm(null);
			handleClose();
			setModelOpen(false);
			dispatch(cleanDataFmDiferido());
		}
	}, [updatedStatus]);

	const handleClose = () => {
		setId(0);
		setFm(null);
		setModelOpen(false);
		socket.emit('cliente:disconnect');
		//dispatch(CloseModalDiferido());
		dispatch(cleanDataFmDiferido());
	};

	return (
		<DataListAdmisionProvider>
			<FMDiferidoContextProvider fm={fm}>
				<>
					{fm ? (
						<FullModal modalOpen={modalOpen} handleClose={handleClose}>
							<LocationsProvider>
								<DiferidoValid />
							</LocationsProvider>
						</FullModal>
					) : null}
				</>
			</FMDiferidoContextProvider>
		</DataListAdmisionProvider>
	);
};

export default FMDiferido;
