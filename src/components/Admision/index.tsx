/* eslint-disable react-hooks/exhaustive-deps */
import AddIcon from '@mui/icons-material/Add';
import LowPriority from '@mui/icons-material/LowPrioritySharp';
import { Fab, Button } from '@mui/material';
import classNames from 'classnames';
import { DataListAdmisionProvider } from 'context/DataList/DatalistAdmisionContext';
import { SocketContext } from 'context/SocketContext';
import { FC, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { getDataFM } from 'store/actions/admisionFm';
import { OpenModal, OpenModalListSolic } from 'store/actions/ui';
//import { RootState } from 'store/store';
import Swal from 'sweetalert2';
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

const Admision: FC<AdmisionInt> = ({ isWorker = false }) => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const { modalOpen } = useSelector((state: any) => state.ui);

	const { modalOpenListSolic } = useSelector((state: any) => state.ui);
	const { user } = useSelector((state: any) => state.auth);
	const { socket } = useContext(SocketContext);

	const [fm, setFm] = useState(null);

	const [valuesChart, setvaluesChart] = useState<number[]>([]);
	const [keyChart, setkeyChart] = useState<string[]>([]);
	const [chartData, setChartData] = useState({});
	const [todos, setTodo] = useState<any>([]);
	const [todostodos, setTodoTodos] = useState<any>({});
	const { solictudesTrabajando, diferidosTranbajando, diferidos } = todos;
	const { allSolic, allTerm } = todostodos;

	const [selectModal, setSelectModal] = useState<boolean>(false);

	useLayoutEffect(() => {
		//Este solo se debe ejecutar para obtener la data tras ver el fm
		socket.emit('cliente:dashdata', (data: any) => {
			setChartData(data);
			setTodo(data);
		});
		socket.emit('cliente:todo', (todo: any) => {
			setTodoTodos(todo);
		});
	}, []);

	//socket io (todos)
	useEffect(() => {
		socket.on('server:dashdata', (data: any) => {
			setChartData(data);
			setTodo(data);
		});

		socket.on('server:todos', (todo: any) => {
			setTodoTodos(todo);
		});
	}, [socket, user]);

	const handleClick = () => {
		if (!selectModal) {
			setSelectModal(true);
			socket.emit('client:atrabajar', user);
			//
			socket.on('server:atrabajar', (data: any) => {
				if (data.code === 400) {
					setSelectModal(false);
					Swal.fire({
						icon: 'warning',
						title: 'No hay Formularios en espera',
						customClass: { container: 'swal2-validated' },
						showConfirmButton: false,
						timer: 2500,
					});
					return;
				}

				if (data?.status === true) {
					Swal.fire({
						icon: 'warning',
						title: 'Ya tienes una Solicitud',
						customClass: { container: 'swal2-validated' },
						showConfirmButton: false,
						timer: 3500,
					});
					setSelectModal(false);
				} else {
					//dispatch(getDataFM(data));
					setFm(data);
					if (data.length === 0) {
						setSelectModal(false);
						Swal.fire({
							icon: 'warning',
							title: 'No hay Formularios en espera',
							customClass: { container: 'swal2-validated' },
							showConfirmButton: false,
							timer: 2500,
						});
					}
				}
			});
		}
	};

	useEffect(() => {
		if (fm && !modalOpen) {
			dispatch(OpenModal());
		}
		if (!fm) {
			setTimeout(() => {
				setSelectModal(false);
			}, 1500);
		}
	}, [fm, modalOpen]);

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
		<DataListAdmisionProvider>
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
				{allSolic ? (
					<Button
						variant='contained'
						sx={{
							position: 'absolute',
							borderRadius: '1rem',
							padding: '10px',
							right: '2rem',
							bottom: '1rem',
						}}
						onClick={handleClick}
						disabled={selectModal}>
						<span style={{ textTransform: 'none', fontSize: 15 }}>Validar Solicitud</span>
						<AddIcon />
					</Button>
				) : null}
				{!isWorker ? (
					<div className='cmn2-divfloat'>
						<Fab color='secondary' aria-label='add' size='large' variant='extended' onClick={handleClickList}>
							<LowPriority />
						</Fab>
						{modalOpenListSolic ? <ListFms /> : null}
					</div>
				) : null}
				{fm ? <Comprobacion fm={fm} setFm={setFm} /> : null}
			</div>
		</DataListAdmisionProvider>
	);
};

export default Admision;
