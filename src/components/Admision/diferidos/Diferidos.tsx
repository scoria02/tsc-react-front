import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton } from '@material-ui/data-grid';
import React, { useEffect } from 'react';

//Socket
import WebSocket from '../../../hooks/WebSocket';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'N-Solic', width: 150 },
	{
		field: 'email',
		headerName: 'Correo',
		width: 300,
		editable: false,
	},
	{
		field: 'cirif',
		headerName: 'RIF',
		width: 150,
		editable: false,
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

	useEffect(() => {
		if(socket){
			//socket.emit("list_diferidos", 'Mamaloooooooo');
			socket.on("list_diferidos", (list:any) => {
				console.log(list.diferidos);
				console.log(list.diferidos.length);
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
				rows={rows}
				columns={columns}
				pageSize={25}
				onCellClick={handleRow}
				rowsPerPageOptions={[25]}
			/>
		</div>
	);
};

export default Diferidos;
