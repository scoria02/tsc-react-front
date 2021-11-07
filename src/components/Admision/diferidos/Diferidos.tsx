import {
	DataGrid,
	GridColDef,
	GridRowParams,
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridValueGetterParams,
} from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import { DateTime } from 'luxon';
import { getDiferidos } from '../../../helpers/getDiferidos';
// import { getDiferidos } from '../../../helpers/getDiferidos';
//Socket
// import WebSocket from '../../../hooks/WebSocket';

import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from './styles';
import classNames from 'classnames';

import { RootState } from '../../../store/store';
import { getDataFMAdministration } from '../../../store/actions/administration';

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

	const administration: any = useSelector((state: RootState) => state.administration);

	const [rowSelected, setRowSelect] = useState({
		id: null,
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

	const { socket } = useContext(SocketContext);

	const [diferidos, setDiferidos] = useState([]);

	useEffect(() => {
		socket.emit('prueba');
		socket.emit('cliente:loadDiferidos');
	}, [socket]);

	useEffect(() => {
		// getDiferidos();
		socket.emit('cliente:loadDiferidos');

		socket.on('server:loadDiferidos', (data: any) => {
			setDiferidos(data);
			console.log(data);
		});
	}, []);

	const handleRow = (event: any) => {
		dispatch(OpenModalDiferido());
		setSelected(true);
	};

	const handleCloseRow = (event: any) => {
		setSelected(false);
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
				rowsPerPageOptions={[25]}
				disableColumnMenu
				getRowId={(row) => row.id}
			/>
		</div>
	);
};

export default Diferidos;
