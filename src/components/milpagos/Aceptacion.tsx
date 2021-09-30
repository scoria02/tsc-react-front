import React, { useEffect, useState } from 'react';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { OpenModal } from '../../store/actions/ui';

import { SolicitudesEnEspera } from '../backoffice/SolicitudesEnEspera';
import { SolicitudesEnProceso } from '../backoffice/SolicitudesEnProceso';
import { SolicitudesTerminadas } from '../backoffice/SolicitudesTerminadas';
import { ChartTorta } from '../diagramas/ChartConfig';
import { DiagramaBarra } from '../diagramas/DiagramaBarra';
import Diferidos from '../diferidos/Diferidos';
import Comproba from '../modalComprobacion/Comproba';

import {io} from 'socket.io-client';

//import { RootState } from '../../store/store';
import { getDataFM } from '../../store/actions/admisionFm';

import { ioURL, Port, URL } from '../../config';

import './index.scss';

export const Aceptacion = () => {
	const dispatch = useDispatch();

	const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(`${URL}:${Port}`);
		newSocket.on("diferidos", (data:any) => {
			console.log(data);
		});

		/*
    const newSocket = io(`${URL}:${Port}/socket.io/socket.io.main.js`);
    newSocket.on("diferidos", (data:any) => {
			console.log('socket',data)
    });
    setSocket(newSocket);
		 */
  }, []);

	const handleClick = () => {
		dispatch(getDataFM());
		dispatch(OpenModal());
		console.log('Aqui ta el beta');
		// console.log(object)
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
