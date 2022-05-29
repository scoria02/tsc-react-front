/* eslint-disable react-hooks/exhaustive-deps */
import {
	DataGrid,
	GridColDef,
	GridSortDirection,
	GridSortModel,
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridValueGetterParams,
} from '@mui/x-data-grid';
import { DataListProvider } from 'context/DataList/DataListContext';
import { SocketContext } from 'context/SocketContext';
import { DateTime } from 'luxon';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataFMDiferido } from 'store/actions/admision/diferido';
import { OpenModalDiferido } from 'store/actions/ui';
import { useStyles } from '../styles/styles';
import Diferido from './Diferido';
//import { RootState } from 'store/store';

const columns: GridColDef[] = [
	{
		field: 'code',
		headerName: 'Cod.',
		width: 140,
		editable: false,
		sortable: false,
	},
	{
		field: 'nameComer',
		headerName: 'Comercio',
		width: 120,
		editable: false,
		sortable: false,
	},
	{
		field: 'nameClient',
		headerName: 'Cliente',
		width: 120,
		valueGetter: (value: GridValueGetterParams) => `${value.row?.nameClient} ${value.row?.lastnameClient}`,
		sortable: false,
	},
	{
		field: 'identNumComer',
		headerName: 'DI Comercio',
		width: 120,
		valueGetter: (params: GridValueGetterParams) => `${params.row?.identTypeComer} ${params.row?.identNumComer}`,
		sortable: false,
	},
	{
		field: 'updatedAt',
		headerName: 'Fecha',
		width: 90,
		valueGetter: (params: GridValueGetterParams) => {
			return DateTime.fromISO(params.row?.updatedAt.toString()).toFormat('dd/LL/yyyy').toLocaleString();
		},
		sortable: false,
	},
];

const Diferidos: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { modalOpenDiferido } = useSelector((state: any) => state.ui);

	//const fm: any = useSelector((state: RootState) => state.fmAdmision.diferido);

	// const updatedStatus: any = useSelector((state: RootState) => state.fmAdmision.updatedStatusDiferido);
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

	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: 'updatedAt',
			sort: 'asc' as GridSortDirection,
		},
	]);

	const { socket } = useContext(SocketContext);

	const [diferidos, setDiferidos] = useState([]);

	useLayoutEffect(() => {
		socket.emit('cliente:loadDiferidos');
	}, []);

	//socket io (todos)
	useEffect(() => {
		socket.on('server:loadDiferidos', (data: any) => {
			//console.log('diferidos', data);
			setDiferidos(data);
		});
		if (!modalOpenDiferido) {
			setRowSelect(null);
		}
	}, [socket, modalOpenDiferido]);

	const handleRow = (event: any) => {
		//setRowSelect(null);
		socket.emit('Editar_diferido', event.row.id, (res: any) => {
			//console.log('editar este', res);
			setRowSelect({
				...res.id_request,
			});
			dispatch(getDataFMDiferido(res.id_request));
		});
		//dispatch(OpenModalDiferido());
		socket.emit('cliente:trabanjandoDiferido', user, event.row.id);
	};

	useEffect(() => {
		//console.log('index', rowSelected);
		if (rowSelected && !modalOpenDiferido) {
			dispatch(OpenModalDiferido());
		}
	}, [rowSelected, modalOpenDiferido]);

	//console.log('s', rowSelected);

	return (
		<div style={{ height: '100%', width: '100%' }}>
			<DataGrid
				components={{
					Toolbar: customToolbar,
				}}
				sortingOrder={['desc', 'asc']}
				sortModel={sortModel}
				onSortModelChange={(model) => setSortModel(model)}
				rows={diferidos}
				columns={columns}
				pageSize={5}
				onCellClick={handleRow}
				rowsPerPageOptions={[5]}
				disableColumnMenu
				getRowId={(row) => row.id}
			/>
			<DataListProvider>
				<>{modalOpenDiferido && rowSelected ? <Diferido fmData={rowSelected} /> : null}</>
			</DataListProvider>
		</div>
	);
};

export default Diferidos;
