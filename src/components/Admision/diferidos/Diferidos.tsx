import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import { getDiferidos } from '../../../helpers/getDiferidos';
// import { getDiferidos } from '../../../helpers/getDiferidos';
//Socket
// import WebSocket from '../../../hooks/WebSocket';

const useStyle = makeStyles(() => ({
	tableTitle: {
		margin: '1rem',
	},
}));

const columns: GridColDef[] = [{ field: 'id', headerName: 'ID', width: 75 }];

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
				getRowId={(row) => row.id}
			/>
		</div>
	);
};

export default Diferidos;
