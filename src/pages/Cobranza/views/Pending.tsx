/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from '@material-ui/core/Grid';
import {
	DataGrid,
	GridColDef,
	GridRowParams,
	GridSortDirection,
	GridSortModel,
	GridToolbarContainer,
	GridToolbarFilterButton,
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
		field: 'sinceToday',
		headerName: 'Dias',
		sortable: true,
		width: 90,
		disableColumnMenu: true,
		valueGetter: (params: GridValueGetterParams) => {
			const celda = params.row.fecha!.toString();
			// obtengo la fecha de la celta
			const tope = DateTime.fromISO(celda);
			// obtengo la fecha de hoy
			const today = DateTime.now();
			// resto de 'today' la fecha tope en dias para saber cuantos dias han pasado del ultimo pago y redondeo
			const daysFromToday = Math.round(today.diff(tope, ['days']).days);
			return daysFromToday;
		},
	},
	{
		field: 'fechaF',
		headerName: 'Fecha',
		// sortable: true,
		width: 180,
		disableColumnMenu: true,
		valueGetter: (params: GridValueGetterParams) => {
			const fecha = params.row.fecha!.toString();
			const fechaFormateada = DateTime.fromISO(fecha).toFormat('dd/LL/yyyy').toLocaleString();
			return fechaFormateada;
		},
	},
	{
		field: 'fullName',
		headerName: 'Nombre',
		// sortable: true,
		width: 160,
		disableColumnMenu: true,
		valueGetter: (params: GridValueGetterParams) => `${params.row.name || ''} ${params.row.last_name || ''}`,
	},
];

const Pending: FC = () => {
	const classes = useStyles();
	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: 'sinceToday',
			sort: 'desc' as GridSortDirection,
		},
	]);

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className={classes.containerFlex}>
				{/* <div className={classes.tableTitle}>Formularios</div> */}
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

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
		{
			id: 14,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 1 }).toISO()),
		},
		{
			id: 15,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 2 }).toISO()),
		},
		{
			id: 16,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 3 }).toISO()),
		},
		{
			id: 17,
			name: 'Jose',
			last_name: 'Joaquin',
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 4 }).toISO()),
		},
	]);

	const handleRow = (event: any) => {
		console.log('row', event.row);
	};

	return (
		<Grid>
			<Grid xs={12} item>
				<div style={{ height: '70vh', width: '100%' }}>
					<DataGrid
						components={{
							Toolbar: customToolbar,
						}}
						sortingOrder={['desc', 'asc']}
						sortModel={sortModel}
						onSortModelChange={(model) => setSortModel(model)}
						rows={rows}
						columns={columns}
						rowsPerPageOptions={[25, 50, 100]}
						onCellClick={handleRow}
						getRowClassName={(params: GridRowParams) => {
							// obtengo los dias y le hago parse de RowCell a string
							const fechaRow = params.getValue(params.id, 'sinceToday')!.toString();
							// transformo el string a number y lo redondeo
							const number = Math.round(parseInt(fechaRow, 10));
							// si el number esta entre los siguientes valores debera elegir la clase correspondiente
							return classNames({
								[classes.green]: number <= 20,
								[classes.yellow]: number <= 30 && number > 20,
								[classes.red]: number > 30,
							});
						}}
					/>
				</div>
			</Grid>
		</Grid>
	);
};

export default Pending;
