import {
	DataGrid,
	GridColDef,
	GridRowParams,
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridValueGetterParams,
} from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
//Socket
import WebSocket from '../../../hooks/WebSocket';
import { PortFiles, URL } from '../../../config';

import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from './styles';
import classNames from 'classnames';

import { RootState } from '../../../store/store';
import { getDataFMAdministration } from '../../../store/actions/administration';

import { OpenModalDiferido } from '../../../store/actions/ui';

import Diferido from './Diferido';

const columns: GridColDef[] = [
	{
		field: 'id_request',
		headerName: 'Cod.',
		width: 120,
		editable: false,
		sortable: false,
		valueFormatter: (value: GridValueGetterParams) => {
			return value.row?.id_request.code;
		},
	},
	{
		field: 'name_commerce',
		headerName: 'Comercio',
		width: 160,
		valueFormatter: (value: GridValueGetterParams) => {
			return value.row?.id_request.id_commerce.name;
		},
		sortable: false,
	},
	{
		field: 'name_client',
		headerName: 'Cliente',
		width: 160,
		valueFormatter: (value: GridValueGetterParams) => {
			return `${value.row?.id_request.id_client.name} ${value.row?.id_request.id_client.last_name}`;
		},
		sortable: false,
	},
	{
		field: 'id_type_payment',
		headerName: 'Paga Despues',
		width: 200,
		editable: false,
		sortable: false,
		valueFormatter: (value: GridValueGetterParams) => {
			return value.row?.id_request.pagadero ? 'Si' : 'No';
		},
	},
];

const Diferidos: React.FC = () => {
	const classes = useStyles();

	const administration: any = useSelector((state: RootState) => state.administration);

	const [rowSelected, setRowSelect] = useState({ 
		id: null ,
		code: '',
		pagadero: false,
		paymentmethod: {
			name: '',
			id: null,
		},
		type_payment: {
			name: '',
			id: null,
		},
		nro_comp_dep: '',
		urlImgCompDep: '',
		id_commerce: 0,
		id_client: 0,
	});

	const [rowsAd, setRowsAd] = useState([]);

	const [uploadImg, setUploadImg] = useState<any>(null);
	const [nameImg, setNameImage] = useState<string>('');
	const [selected, setSelected] = useState(false);

	const [select, setSelect] = useState({});

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getDataFMAdministration());
		// console.log('rowSelected', rowSelected);
	}, []);

	useEffect(() => {
		setRowsAd(administration.fmAd);
	}, [administration]);

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className='m-main-justify m-px-2' style={{ minHeight: '4rem' }}>
				<h1 className={classes.tableTitle}>Diferidos</h1>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	const { socket } = WebSocket();

	const [diferidos, setDiferidos] = useState([]);

	useEffect(() => {
		if (socket) {
			//socket.emit("list_diferidos", 'Mamaloooooooo');
			socket.on('list_diferidos', (list: any) => {
				if (list.diferidos) {
					setDiferidos(list.diferidos);
				}
			});
		}
	}, [socket]);

	const handleRow = (event: any) => {
		dispatch(OpenModalDiferido());
		setUploadImg(null); 
		setNameImage('');
		setRowSelect({
			id: event.row.id_request.id,
			pagadero: event.row.id_request.pagadero,
			paymentmethod: event.row.id_request.id_payment_method,
			type_payment: event.row.id_request.id_type_payment,
			nro_comp_dep: event.row.id_request.nro_comp_dep,
			urlImgCompDep: 
			event.row.id_request.rc_comp_dep ? 
				`${URL}:${PortFiles}/${event.row.id_request.rc_comp_dep.path}`
			:
				'',
			code: event.row.id_request.code,
			id_commerce: event.row.id_request.id_commerce.id,
			id_client: event.row.id_request.id_client.id,
		});
		setSelect(event.row.id_request);
		setSelected(true);
	};

	const handleCloseRow = (event: any) => {
		setSelected(false);
	};

	return (
		<div style={{ height: '100%', width: '100%' }}>
			{!rowsAd.length ? (
				<h1>loading...</h1>
			) : (
				<DataGrid
					onCellClick={handleRow}
					components={{
						Toolbar: customToolbar,
					}}
					rows={rowsAd}
					columns={columns}
					rowsPerPageOptions={[25, 100]}
					className={classes.dataGrid}
					getRowClassName={(params: GridRowParams) =>
						classNames({
							[classes.red]: false,
							[classes.yellow]: false,
							[classes.green]: false,
						})
					}
				/>
			)}
			{(select && selected) &&
				<Diferido 
					fm={select}
				/>
			}
		</div>
	);
};

export default Diferidos;
