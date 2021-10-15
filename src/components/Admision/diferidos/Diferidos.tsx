import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
//Socket
import WebSocket from '../../../hooks/WebSocket';

const useStyle = makeStyles(() => ({
	tableTitle: {
		margin: '1rem',
	},
}));

const columns: GridColDef[] = [
	{ field: 'id_fm', headerName: 'ID', width: 75 },
	{
		field: 'dif_date',
		headerName: 'Fecha diferido',
		width: 150,
		editable: false,
	},
	{
		field: 'name_commerce',
		headerName: 'Nombre comercio',
		width: 220,
		editable: false,
	},
	{
		field: 'name_client',
		headerName: 'Nombre cliente',
		width: 200,
		editable: false,
		valueFormatter: (value) => {
			return `${value.row?.name_client} ${value.row?.last_name_client}`;
		},
	},
	{
		field: 'ident_type_commerce',
		headerName: 'RIF',
		width: 150,
		editable: false,
		valueFormatter: (value) => {
			return `${value.row?.ident_type_commerce}${value.row?.ident_num_commerce}`;
		},
	},
];

const Diferidos: React.FC = () => {
	const classes = useStyle();
	// const {id, email, cirif} = rows
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
		console.log(event.row);
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
				getRowId={(row) => row.id_fm}
			/>
		</div>
	);
};

export default Diferidos;
