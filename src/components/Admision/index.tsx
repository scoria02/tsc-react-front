import { Fab, makeStyles, Theme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../context/SocketContext';
// import { SocketContext } from '../../helpers/SocketContext';
import { getDataFM } from '../../store/actions/admisionFm';
import { OpenModal } from '../../store/actions/ui';
import { SolicitudesDiferidos } from '../backoffice/SolicitudesDiferidos';
import { SolicitudesEnEspera } from '../backoffice/SolicitudesEnEspera';
import { SolicitudesEnProceso } from '../backoffice/SolicitudesEnProceso';
import { SolicitudesTerminadas } from '../backoffice/SolicitudesTerminadas';
import { ChartBarra, ChartTorta } from '../diagramas/ChartConfig';
import Comprobacion from './comprobacion';
import Diferidos from './diferidos/Diferidos';
import './index.scss';

export const useStyles = makeStyles((theme: Theme) => ({
	admision: {
		flexGrow: 1,
		display: 'grid',
		gridColumnGap: '2rem',
		gridTemplateColumns: '1fr 1fr',
	},
	dataGrid: {
		width: '100%',
		height: '75vh',
	},
	rightContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	row: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: 16,
	},
	counters: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	status: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	statusTitle: {
		fontSize: 28,
	},
	statusDesc: {
		fontSize: 38,
	},
}));

const Admision: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { modalOpen } = useSelector((state: any) => state.ui);
	const { user } = useSelector((state: any) => state.auth);

	const { socket } = useContext(SocketContext);

	const handleClick = () => {
		dispatch(getDataFM());
		dispatch(OpenModal());

		socket.emit('Trabanjando_Solic', user, (solic: any) => {
			console.log('solic', solic);
		});

		console.log('Aqui ta el beta');
	};

	const [chartData, setChartData] = useState({
		labels: ['Espera', 'Proceso', 'Terminadas'],
		datasets: [
			{
				label: 'Barra',
				axis: 'x',

				backgroundColor: [
					'rgba(20, 17, 152, 0.4)',
					'rgba(238, 99, 82, 0.4)',
					'rgba(63, 167, 214, 0.4)',
					'rgba(248, 249, 72, 0.4)',
					'rgba(95, 72, 66, 0.4)',
					'rgba(240, 162, 2, 0.4)',
					'rgba(247, 157, 132, 0.4)',
				],
				borderColor: [
					'rgb(20, 17, 152)',
					'rgb(238, 99, 82)',
					'rgb(63, 167, 214)',
					'rgb(248, 249, 72)',
					'rgb(95, 72, 66)',
					'rgb(153, 102, 255)',
					'rgb(247, 157, 132)',
				],
				borderWidth: 1,
				data: [10, 3, 32],
			},
		],
	});

	return (
		<div className={classes.admision}>
			<div className={classes.dataGrid}>
				<Diferidos />
			</div>
			<div className={classes.rightContainer}>
				<div className={classes.row}>
					<div className={classes.counters}>
						<SolicitudesEnEspera />
						<SolicitudesEnProceso />
						<SolicitudesDiferidos />
						<SolicitudesTerminadas />
					</div>

					<div style={{ width: '40%' }}>
						<ChartTorta data={chartData} />
					</div>
				</div>
				<div className={classes.row}>
					<ChartBarra data={chartData} />
				</div>
			</div>
			<div className='cmn-divfloat'>
				<Fab color='primary' aria-label='add' size='medium' variant='extended' onClick={handleClick}>
					Validar Planilla
					<AddIcon />
				</Fab>
				{modalOpen && <Comprobacion />}
			</div>
		</div>
	);
};

export default Admision;
