import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import LowPriority from '@material-ui/icons/LowPrioritySharp';
import classNames from 'classnames';
import React, { useContext, useLayoutEffect, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../context/SocketContext';
import { getDataFM } from '../../store/actions/admisionFm';
import { OpenModal, OpenModalListSolic } from '../../store/actions/ui';
import { RootState } from '../../store/store';
import Barra from '../diagramas/Barra';
import Dona from '../diagramas/Dona';
import Comprobacion from './comprobacion';
import Diferidos from './diferidos';
import ListFms from './listFms';
import './scss/index.scss';
import { useStyles } from './styles/styles';

interface AdmisionInt {
	isWorker: boolean;
}

const Admision: React.FC<AdmisionInt> = ({ isWorker = false }) => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const { modalOpen } = useSelector((state: any) => state.ui);

	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const { modalOpenListSolic } = useSelector((state: any) => state.ui);
	const { user } = useSelector((state: any) => state.auth);
	const { socket } = useContext(SocketContext);

	const [valuesChart, setvaluesChart] = useState<number[]>([]);
	const [keyChart, setkeyChart] = useState<string[]>([]);
	const [chartData, setChartData] = useState({});
	const [todos, setTodo] = useState<any>([]);
	const [todostodos, setTodoTodos] = useState<any>({});
	const { solictudesTrabajando, diferidosTranbajando, diferidos } = todos;
	const { allSolic, allTerm } = todostodos;

	//socket 1 a 1
	useLayoutEffect(() => {
		//Este solo se debe ejecutar para obtener la data tras ver el fm
		//console.log('(L1)')
		socket.emit('cliente:dashdata', (data: any) => {
			//console.log('L2',data)
			setChartData(data);
			setTodo(data);
		});
		socket.emit('cliente:todo', (todo: any) => {
			//console.log('L3', todo)
			setTodoTodos(todo);
		});
	}, [])

	//socket io (todos)
	useEffect(() => {
		//console.log('(E1)')

		socket.on('server:dashdata', (data: any) => {
			//console.log('E2',data)
			setChartData(data);
			setTodo(data);
		});

		socket.on('server:todos', (todo: any) => {
			//console.log('E3', todo)
			setTodoTodos(todo);
		});

		/*
		socket.emit('cliente:Todos', user, (todo: any) => {
			//console.log('save 0', todo);
		});
		socket.emit('cliente:dashdata', user, (data: any) => {
			if (Object.keys(data).length) {
				//console.log('save 1', data);
				setChartData(data);
				setTodo(data);
			}
		}); */
		// socket.emit('cliente:loadDiferidos');
		// socket.emit('cliente:dashdatasiempre');
		// socket.on('server:dashdata', (data: any) => {
		// 	if (Object.keys(data).length) {
		// 		//console.log('save 2', data);
		// 		setChartData(data);
		// 		setTodo(data);
		// 	}
		// });
		/*
		socket.on('server:prueba', (data: any) => {
			console.log('aldrin res', data)
		})
		 */


	}, [socket, user]);

	const handleClick = () => {
		socket.emit('Trabanjando_Solic', user);

		socket.on('server:Trabanjando_Solic', (data: any) => {
			console.log('solic', data);
			dispatch(getDataFM(data));
		})

		//dispatch(OpenModal());

		/*
		socket.emit('cliente:Todos', user, (todo: any) => {
			setTodoTodos(todo);
		});
		 */

		//socket.emit('cliente:loadDiferidos');
		//	socket.emit('cliente:dashdatasiempre');
		// socket.emit('cliente:dashdatasiempre');
	};

	useEffect(() => {
		if(Object.keys(fm).length){
			console.log('Abrir modal')
			dispatch(OpenModal());
		}
	}, [fm])

	const handleClickList = () => {
		dispatch(OpenModalListSolic());
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
						<div className={classes.status}>
							<div className={classes.statusTitle}>En Espera:</div>
							<div className={classes.statusDesc}> {allSolic || 0} </div>
						</div>
						<div className={classNames(classes.status, classes.borderLeft)}>
							<div className={classes.statusTitle}>En Proceso:</div>
							<div className={classes.statusDesc}>{solictudesTrabajando + diferidosTranbajando || 0}</div>
						</div>
						<div className={classNames(classes.status, classes.borderTop)}>
							<div className={classes.statusTitle}>Diferidos:</div>
							<div className={classes.statusDesc}>{diferidos || 0}</div>
						</div>
						<div className={classNames(classes.status, classes.borderTop, classes.borderLeft)}>
							<div className={classes.statusTitle}>Terminadas:</div>
							<div className={classes.statusDesc}>{allTerm || 0}</div>
						</div>
					</div>
					<div style={{ width: '45%' }}>
						{/* <ChartTorta /> */}
						<Dona chartData={valuesChart} colsData={keyChart} />
					</div>
				</div>
				<div className={classes.row}>
					<Barra chartData={valuesChart} colsData={keyChart} />
				</div>
			</div>
			{allSolic && (
				<div className='cmn-divfloat'>
					<Fab color='primary' aria-label='add' size='medium' variant='extended' onClick={handleClick}>
						Validar Planilla
						<AddIcon />
					</Fab>
					{modalOpen && Object.keys(fm).length ? <Comprobacion /> : null}
				</div>
			)}
			{!isWorker && (
				<div className='cmn2-divfloat'>
					<Fab color='secondary' aria-label='add' size='large' variant='extended' onClick={handleClickList}>
						<LowPriority />
					</Fab>
					{modalOpenListSolic ? <ListFms /> : null}
				</div>
			)}
		</div>
	);
};

export default Admision;
