import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import { RootState } from '../../store/store';
import { getDataFM } from '../../store/actions/admisionFm';
import { OpenModal } from '../../store/actions/ui';
import { SolicitudesEnEspera } from '../backoffice/SolicitudesEnEspera';
import { SolicitudesEnProceso } from '../backoffice/SolicitudesEnProceso';
import { SolicitudesTerminadas } from '../backoffice/SolicitudesTerminadas';
import { ChartTorta } from '../diagramas/ChartConfig';
import { DiagramaBarra } from '../diagramas/DiagramaBarra';
import Diferidos from './diferidos/Diferidos';
import Comproba from './modalComprobacion/Comproba';

import { SocketContext } from '../../helpers/SocketContext';
import { getNuevosTicket } from '../../sockets/getAdmicion';

import './index.scss';

const Admision: React.FC = () => {
	const dispatch = useDispatch();

	const { socket } = useContext(SocketContext);

	useEffect(() => {
		getNuevosTicket();
	}, []);

	useEffect(() => {
		socket.on('solicitar-nuevosticket', () => {});

		return () => {
			socket.off('solicitar-nuevosticket');
		};
	}, [socket]);

	const handleClick = () => {
		dispatch(getDataFM());
		dispatch(OpenModal());
		console.log('Aqui ta el beta');
	};

	return (
		<div className='ed-container contenedor'>
			<div className='ed-item s-55 fondo'>
				<Diferidos />
			</div>
			<div className='ed-item s-45'>
				<div className='ed-container contenedor '>
					<div className='ed-item s-50 m-main-center solicitudes_contec'>
						<SolicitudesEnEspera />
						<div className='marcos'>
							<SolicitudesTerminadas />
						</div>
						<SolicitudesEnProceso />
					</div>

					<div className='ed-item s-50 aceptacion_torta'>
						<ChartTorta />
					</div>

					<div className='ed-item s-100  m-main-center solicitudes_contec'>
						<DiagramaBarra />
					</div>
				</div>
				<div className='cmn-divfloat'>
					<Fab color='primary' aria-label='add' onClick={handleClick}>
						<AddIcon />
					</Fab>
					<Comproba />
				</div>
			</div>
		</div>
	);
};

export default Admision;
