import {
	DataGrid,
	GridColDef,
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridValueGetterParams,
} from '@material-ui/data-grid';
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import { DateTime } from 'luxon';

import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from '../styles/styles';

import { RootState } from '../../../store/store';

import { OpenModalDiferido } from '../../../store/actions/ui';

import Diferido from './Diferido';

const columns: GridColDef[] = [
	{
		field: 'code',
		headerName: 'Cod.',
		width: 80,
		editable: false,
		sortable: false,
	},
	{
		field: 'nameComer',
		headerName: 'Nombre Comercio',
		width: 150,
		editable: false,
		sortable: false,
	},
	{
		field: 'nameClient',
		headerName: 'Cliente',
		width: 120,
		valueFormatter: (value: GridValueGetterParams) => {
			return `${value.row?.nameClient} ${value.row?.lastnameClient}`;
		},
		sortable: false,
	},
	{
		field: 'identNumComer',
		headerName: 'DI Comercio',
		width: 140,
		valueFormatter: (value: GridValueGetterParams) => {
			return `${value.row?.identTypeComer} ${value.row?.identNumComer}`;
		},
		sortable: false,
	},
	{
		field: 'updatedAt',
		headerName: 'Fecha',
		width: 120,
		valueFormatter: (value: GridValueGetterParams) => {
			const fechaFormateada = DateTime.fromISO(value.row?.updatedAt).toFormat('dd/LL/yyyy').toLocaleString();
			return `${fechaFormateada}`;
		},
		sortable: false,
	},
];

const Diferidos: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { modalOpenDiferido } = useSelector((state: any) => state.ui);
	const updatedStatus: any = useSelector((state: RootState) => state.fmAdmision.updatedStatusDiferido);
	const { user } = useSelector((state: any) => state.auth);

	const [rowSelected, setRowSelect] = useState(null);

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className='m-main-justify m-px-2' style={{ minHeight: '4rem' }}>
				<h1 className={classes.tableTitle}>Diferidos</h1>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	const { socket } = useContext(SocketContext);

	const [diferidos, setDiferidos] = useState([]);

	useEffect(() => {
		socket.emit('prueba');
		socket.emit('cliente:loadDiferidos');
	}, [socket, updatedStatus]);

	useEffect(() => {
		// getDiferidos();

		socket.emit('cliente:loadDiferidos');
		socket.emit('cliente:dashdatasiempre');

		socket.on('server:loadDiferidos', (data: any) => {
			setDiferidos(data);
		});

		/*socket.on('server:dashdata', (data: any) => {
			console.log('MENOL EMITE AQUI ', data);
		});*/
	}, [socket, modalOpenDiferido]);
	//updatedStatus

	const handleRow = (event: any) => {
		setRowSelect(null);
		socket.emit('Editar_diferido', event.row?.id, (res: any) => {
			setRowSelect({
				...res,
				id: event.row?.id,
			});
		});

		socket.emit('cliente:trabanjandoDiferido', user, event.row?.id);
		dispatch(OpenModalDiferido());
	};

	return (
		<div style={{ height: '100%', width: '100%' }}>
			<DataGrid
				components={{
					Toolbar: customToolbar,
				}}
				rows={diferidos}
				columns={columns}
				pageSize={5}
				onCellClick={handleRow}
				rowsPerPageOptions={[5]}
				disableColumnMenu
				getRowId={(row) => row.id}
			/>
			{modalOpenDiferido && rowSelected && <Diferido fm={rowSelected} />}
		</div>
	);
};

export default Diferidos;
