import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../context/SocketContext';
import { getDataFM } from '../../store/actions/admisionFm';
import { OpenModal } from '../../store/actions/ui';
import Barra from '../diagramas/Barra';
import { ChartTorta } from '../diagramas/ChartConfig';
import Comprobacion from './comprobacion';
import Diferidos from './diferidos';
import './scss/index.scss';
import { useStyles } from './styles/styles';

const Admision: React.FC = () => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const { modalOpen } = useSelector((state: any) => state.ui);
	const { user } = useSelector((state: any) => state.auth);
	const { socket } = useContext(SocketContext);

	const [valuesChart, setvaluesChart] = useState<number[]>([]);
	const [keyChart, setkeyChart] = useState<string[]>([]);
	const [chartData, setChartData] = useState({});
	const [todos, setTodo] = useState<any>([]);
	const [todostodos, setTodoTodos] = useState<any>([]);
	const { solictudesTrabajando } = todos;
	const { allSolic, allTerm, diferidos } = todostodos;
	console.log('MENOL DIMAS AQUI', allSolic);

	useEffect(() => {
		socket.emit('cliente:Todos', user, (todo: any) => {
			console.log('Aqui mmg devuelve', todo);
			setTodoTodos(todo);
		});

		socket.emit('cliente:dashdata', user, (data: any) => {
			if (Object.keys(data).length) {
				console.log('save 1', data);
				setChartData(data);
				setTodo(data);
			}
		});

		socket.on('server:dashdata', (data: any) => {
			console.log('Resive AQUI ', data);
			if (Object.keys(data).length) {
				console.log('save 2', data);
				setChartData(data);
				setTodo(data);
			}
		});
	}, [socket, user]);

	const handleClick = () => {
		socket.emit('cliente:Todos', user, (todo: any) => {
			console.log('Aqui mmg devuelve', todo);
			setTodoTodos(todo);
		});

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

	console.log('data', chartData);

	return (
		<div className={classes.admision}>
			<div className={classes.dataGrid}>
				<Diferidos />
			</div>
			<div className={classes.rightContainer}>
				<div className={classes.row}>
					<div className={classes.counters}>
						<div className={classes.status}>
							<div className={classes.statusTitle}>En Espera:</div>

							<div className={classes.statusDesc}> {allSolic} </div>
						</div>
						<div className={classes.status} style={{ borderLeft: '1px solid rgba(0,0,0,0.4)' }}>
							<div className={classes.statusTitle}>En Proceso:</div>

							<div className={classes.statusDesc}>{solictudesTrabajando}</div>
						</div>
						<div className={classes.status} style={{ borderTop: '1px solid  rgba(0,0,0,0.4)' }}>
							<div className={classes.statusTitle}>Diferidos:</div>

							<div className={classes.statusDesc}>{allTerm}</div>
						</div>
						<div
							className={classes.status}
							style={{ borderTop: '1px solid rgba(0,0,0,0.4)', borderLeft: '1px solid rgba(0,0,0,0.4)' }}>
							<div className={classes.statusTitle}>Terminadas:</div>

							<div className={classes.statusDesc}>{allTerm}</div>
						</div>
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
