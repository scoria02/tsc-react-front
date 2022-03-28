import { TextField } from '@mui/material';
import { GridCallbackDetails, GridCellParams, GridColDef, GridRowData, MuiEvent } from '@mui/x-data-grid';
import Table from 'components/table';
import { FC, useState } from 'react';
import { useStyles } from './styles';

const Terminales: FC = () => {
	const classes = useStyles();
	const [searchInput, setSearch] = useState<string>('');
	const columns: GridColDef[] = [
		{ field: 'terminal', headerName: 'Terminal', type: 'string', width: 240, editable: false },
		{ field: 'comercio', headerName: 'Comercio', type: 'string', width: 240, editable: false },
		{ field: 'estatus', headerName: 'Estatus', type: 'string', width: 240, editable: false },
	];
	const rows: GridRowData[] = [
		{
			id: 11,
			terminal: '10101010',
			comercio: 'Dame 2',
			estatus: 'Activo',
		},
		{
			id: 12,
			terminal: '10101010',
			comercio: 'Dame 2',
			estatus: 'Activo',
		},
		{
			id: 13,
			terminal: '10101010',
			comercio: 'Dame 2',
			estatus: 'Activo',
		},
		{
			id: 14,
			terminal: '10101010',
			comercio: 'Dame 2',
			estatus: 'Activo',
		},
		{
			id: 15,
			terminal: '10101010',
			comercio: 'Dame 2',
			estatus: 'Activo',
		},
	];
	const handleSearchChange = (e: any) => {
		const value = e.target.value;
		console.log(typeof value);
		setSearch(value);
	};

	const DoubleClickTable = (
		params: GridCellParams,
		event: MuiEvent<React.MouseEvent>,
		details: GridCallbackDetails
	) => {
		console.log('valor seleccionado en la fila', params.row);
	};

	return (
		<div className={classes.terminales}>
			<div className={classes.searchRow}>
				<TextField
					id='searchvalue'
					label='Ingrese Terminal a buscar'
					variant='outlined'
					value={searchInput}
					onChange={handleSearchChange}
				/>
			</div>
			<Table doubleClick={DoubleClickTable} columns={columns} rows={rows} />
		</div>
	);
};

export default Terminales;
