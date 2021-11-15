import { Fab, makeStyles, Theme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../context/SocketContext';
// import { SocketContext } from '../../helpers/SocketContext';
import { getDataFM } from '../../store/actions/admisionFm';
import { OpenModal } from '../../store/actions/ui';
import { SolicitudesDiferidos } from '../backoffice/SolicitudesDiferidos';
import { SolicitudesEnEspera } from '../backoffice/SolicitudesEnEspera';
import { SolicitudesEnProceso } from '../backoffice/SolicitudesEnProceso';
import { SolicitudesTerminadas } from '../backoffice/SolicitudesTerminadas';
import Barra from '../diagramas/Barra';
import { ChartTorta } from '../diagramas/ChartConfig';
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
	const dispatch = useDispatch();
	const classes = useStyles();

	const { modalOpen } = useSelector((state: any) => state.ui);
	const { user } = useSelector((state: any) => state.auth);
	const { socket } = useContext(SocketContext);

	const [valuesChart, setvaluesChart] = useState<number[]>([]);
	const [keyChart, setkeyChart] = useState<string[]>([]);
	const [chartData, setChartData] = useState({});

	useEffect(() => {
		socket.emit('cliente:dashdata', user, (data: any) => {
			// console.log('data', data);
			if (Object.keys(data).length) {
				setChartData(data);
			}
		});
		// socket.emit('cliente:dashdatasiempre');
	}, [socket, user]);

	const handleClick = () => {
		dispatch(OpenModal());

		socket.emit('Trabanjando_Solic', user, (solic: any) => {
			dispatch(getDataFM(solic));
		});

		socket.emit('cliente:dashdatasiempre');
		console.log('Aqui ta el beta');
	};

	const handleUpdateChart = (chartData: any) => {
		const col = Object.keys(chartData!);
		let valores: any = [];
		Object.values(chartData).forEach((val, i) => {
			valores[i] = val;
		});
		setvaluesChart(valores);
		setkeyChart(col);
	};

	useEffect(() => {
		console.log('A C T U A L I Z Ó', !Object.keys(chartData).length, chartData);
		if (Object.keys(chartData).length) {
			handleUpdateChart(chartData);
		}
	}, [chartData]);

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
						<ChartTorta />
						{/* <Dona chartData={valuesChart} colsData={keyChart} /> */}
					</div>
				</div>
				<div className={classes.row}>
					<Barra chartData={valuesChart} colsData={keyChart} />
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
