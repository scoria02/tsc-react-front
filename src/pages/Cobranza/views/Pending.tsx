/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from '@material-ui/core/Grid';
import {
	DataGrid,
	GridColDef,
	GridRowParams,
	GridSortDirection,
	GridSortModel,
	GridValueGetterParams,
} from '@material-ui/data-grid';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { FC, useState } from 'react';
import { useStyles } from '..';

export const columns: GridColDef[] = [
	// {
	// 	field: 'id',
	// 	headerName: 'ID',
	// 	width: 180,
	// 	disableColumnMenu: true,
	// 	// sortable: true,
	// },
	{
		field: 'fechaF',
		headerName: 'Fecha',
		// sortable: true,
		width: 180,
		disableColumnMenu: true,
		valueGetter: (params: GridValueGetterParams) => {
			const fecha = params.getValue(params.id, 'fecha')!.toString();
			const fechaFormateada = DateTime.fromISO(fecha).toFormat('dd/LL/yyyy').toLocaleString();
			return `${fechaFormateada}`;
		},
	},
	{
		field: 'fullName',
		headerName: 'Nombre',
		// sortable: true,
		width: 160,
		disableColumnMenu: true,
		valueGetter: (params: GridValueGetterParams) =>
			`${params.getValue(params.id, 'name') || ''} ${params.getValue(params.id, 'last_name') || ''}`,
	},
];

const Pending: FC = () => {
	const classes = useStyles();
	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: 'fechaF',
			sort: 'asc' as GridSortDirection,
		},
	]);

	const [rows, setRows] = useState<any[]>([
		{
			id: 1,
			name: 'Armando',
			last_name: 'Rivas',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 27 }).toISO()),
		},
		{
			id: 2,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 28 }).toISO()),
		},
		{
			id: 3,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 26 }).toISO()),
		},
		{
			id: 4,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 25 }).toISO()),
		},
		{
			id: 5,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 24 }).toISO()),
		},
		{
			id: 6,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 23 }).toISO()),
		},
		{
			id: 7,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 32 }).toISO()),
		},
		{
			id: 8,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 31 }).toISO()),
		},
		{
			id: 9,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 18 }).toISO()),
		},
		{
			id: 10,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 17 }).toISO()),
		},
		{
			id: 11,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 14 }).toISO()),
		},
		{
			id: 12,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 12 }).toISO()),
		},
		{
			id: 13,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 7 }).toISO()),
		},
	]);

	const handleRow = (event: any) => {
		console.log('row', event.row);
	};

	return (
		<Grid xs={12} justifyContent='center'>
			<Grid item spacing={4}>
				<div style={{ height: '70vh', width: '100%' }}>
					<DataGrid
						// components={{
						// 	Toolbar: customToolbar,
						// }}
						sortingOrder={['desc', 'asc']}
						sortModel={sortModel}
						rows={rows}
						columns={columns}
						rowsPerPageOptions={[25, 50, 100]}
						onCellClick={handleRow}
						getRowClassName={(params: GridRowParams) => {
							// obtengo la fecha en formato iso y le hago parse a string
							const fechaRow = params.getValue(params.id, 'fecha')!.toString();
							// obtengo mi tope calculandolo desde la fecha de la celda
							const tope = DateTime.fromISO(fechaRow);
							// obtengo la fecha de hoy
							const today = DateTime.now();
							// resto de 'today' la fecha tope en dias para saber cuantos dias han pasado del ultimo pago
							const daysFromToday = today.diff(tope, ['days']).days;
							//
							return classNames({
								[classes.green]: daysFromToday <= 20,
								[classes.yellow]: daysFromToday <= 30 && daysFromToday > 20,
								[classes.red]: daysFromToday > 30,
							});
						}}
					/>
				</div>
			</Grid>
		</Grid>
	);
};

export default Pending;
