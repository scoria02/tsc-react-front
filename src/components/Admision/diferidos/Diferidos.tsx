import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';

//Socket
import WebSocket from '../../../hooks/WebSocket';

const columns: GridColDef[] = [
	{ field: 'id_fm', headerName: 'Nro', width: 100 },
	{
		field: 'email_client',
		headerName: 'Correo Cliente',
		width: 220,
		editable: false,
	},
	{
		field: 'ident_type_client',
		headerName: 'Cliente',
		width: 150,
		editable: false,
		valueFormatter: (value) => {
			return `${value.row?.ident_type_client}${value.row?.ident_num_client}` 
		}
	},
	{
		field: 'ident_type_commerce',
		headerName: 'Comercio RIF',
		width: 200,
		editable: false,
		valueFormatter: (value) => {
			return `${value.row?.ident_type_commerce}${value.row?.ident_num_commerce}` 
		}
	},
];

const rows = [
	{ id: 100000000, email: 'Snow@gmail.com', cirif: '67435425', tel: null },
	{ id: 200000000, email: 'Lannister@gmail.com', cirif: '67435425' },
	{ id: 300000000, email: 'Lannister@gmail.com', cirif: '67435425' },
	{ id: 400000000, email: 'Stark@gmail.com', cirif: '67435425' },
	{ id: 500000000, email: 'Targaryen@gmail.com', cirif: '67435425' },
	{ id: 700000000, email: 'Clifford@gmail.com', cirif: '67435425' },
	{ id: 800000000, email: 'Frances@gmail.com', cirif: '67435425' },
	{ id: 900040000, email: 'Roxi@gmail.come', cirif: '67435425' },
	{ id: 9000400000, email: 'Roxi@gmail.come', cirif: '67435425' },
	{ id: 901200000, email: 'Roxi@gmail.come', cirif: '67435425' },
	{ id: 900100000, email: 'Roxi@gmail.come', cirif: '67435425' },
	{ id: 900200000, email: 'Roxi@gmail.come', cirif: '67435425' },
	{ id: 9000500, email: 'Roxi@gmail.come', cirif: '67435425' },
	{ id: 900000300, email: 'Roxi@gmail.come', cirif: '67435425' },
	{ id: 90000000, email: 'Roxi@gmail.come', cirif: '67435425' },
	{ id: 900000010, email: 'Roxi@gmail.come', cirif: '67435425' },
	{ id: 900000000, email: 'Roxi@gmail.come', cirif: '67435425' },
];

const Diferidos: React.FC = () => {
	// const {id, email, cirif} = rows
	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className='m-main-justify m-px-2'>
				<h1 className='m-px-1'>Diferidos</h1>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	const { socket } = WebSocket();

	const [diferidos, setDiferidos] = useState([]);

	useEffect(() => {
		if(socket){
			//socket.emit("list_diferidos", 'Mamaloooooooo');
			socket.on("list_diferidos", (list:any) => {
				setDiferidos(list.diferidos)
				console.log(list.diferidos)
			});
		}
	}, [socket]);

	const handleRow = (event: any) => {
		console.log(event.row);
	};

	return (
		<div style={{ height: '100%', width: '100%' }}>
			{diferidos.length > 0 ?
				<DataGrid
					components={{
						Toolbar: customToolbar,
					}}
					rows={diferidos}
					columns={columns}
					pageSize={5}
					onCellClick={handleRow}
					rowsPerPageOptions={[25]}
					getRowId={(row) => row.id_fm}
				/>
				: 
				null
				}
		</div>
	);
};

export default Diferidos;
