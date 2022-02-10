/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { FC, useState } from 'react';

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 60,
		disableColumnMenu: true,
		sortable: false,
	},
	// {
	// 	field: 'name',
	// 	width: 180,
	// 	headerName: 'Nombre',
	// 	sortable: false,
	// 	disableColumnMenu: true,
	// },
	{
		field: 'fullName',
		headerName: 'Nombre',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 160,
		valueGetter: (params: GridValueGetterParams) =>
			`${params.getValue(params.id, 'name') || ''} ${params.getValue(params.id, 'last_name') || ''}`,
	},
];

const Completed: FC = () => {
	const [rows, setRows] = useState<any[]>([]);

	const handleRow = (event: any) => {
		console.log('row', event.row);
	};
	return (
		<Grid>
			<Grid item xs={12}>
				<div style={{ height: '65vh', width: '100%' }}>
					<DataGrid
						// components={{
						// 	Toolbar: customToolbar,
						// }}
						rows={rows}
						columns={columns}
						rowsPerPageOptions={[25, 100]}
						onCellClick={handleRow}
					/>
				</div>
			</Grid>
		</Grid>
	);
};

export default Completed;
