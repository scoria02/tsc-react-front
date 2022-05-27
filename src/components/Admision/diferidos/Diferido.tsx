/* eslint-disable react-hooks/exhaustive-deps */
import { SocketContext } from 'context/SocketContext';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanDataFmDiferido } from 'store/actions/admisionFm';
import { CloseModalDiferido } from 'store/actions/ui';
import { RootState } from 'store/store';
import Swal from 'sweetalert2';
import '../scss/index.scss';
import { FMDiferidoContextProvider } from 'context/Admision/Diferido/FmDiferidoContext';
import { DataListAdmisionProvider } from 'context/DataList/DatalistAdmisionContext';
import DiferidoValid from './diferido/DiferidoValid';
import FullModal from 'components/modals/FullModal';
import { DataListProvider } from 'context/DataList/DataListContext';
import { LocationsProvider } from 'context/Admision/CreationFM/Location/LocationsContext';

interface Prop {
	fmData: any;
}

const Diferido: React.FC<Prop> = ({ fmData }) => {
	const dispatch = useDispatch();
	const { modalOpenDiferido } = useSelector((state: any) => state.ui);
	const updatedStatus: any = useSelector((state: RootState) => state.fmAdmision.updatedStatusDiferido);

	const { socket } = useContext(SocketContext);

	useEffect(() => {
		if (updatedStatus) {
			console.log('Clean fm from diferdio');
			socket.emit('cliente:disconnet');
			socket.emit('cliente:cleansolic');
			Swal.fire({
				title: 'Formulario Verificado',
				icon: 'success',
				customClass: { container: 'swal2-validated' },
			});
			dispatch(cleanDataFmDiferido());
		}
	}, [updatedStatus]);

	const handleClose = () => {
		socket.emit('cliente:disconnect');
		dispatch(CloseModalDiferido());
		dispatch(cleanDataFmDiferido());
	};

	return (
		<DataListAdmisionProvider>
			<FMDiferidoContextProvider fm={fmData}>
				<FullModal modalOpen={modalOpenDiferido} handleClose={handleClose}>
					<LocationsProvider>
						<DiferidoValid />
					</LocationsProvider>
				</FullModal>
			</FMDiferidoContextProvider>
		</DataListAdmisionProvider>
	);
};

export default Diferido;
