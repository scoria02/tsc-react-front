/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Grid } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import {
	DataGrid,
	GridColDef,
	GridRowParams,
	GridSortDirection,
	GridSortModel,
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridValueGetterParams,
} from '@mui/x-data-grid';
import { DateTime } from 'luxon';
import { FC, useState } from 'react';
import { useStyles } from '..';
import DataCommerce from './DataCommerce';
import { DataListProvider } from 'context/DataList/DataListContext';

export const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'Nro',
		sortable: true,
		width: 70,
		disableColumnMenu: true,
		valueGetter: (params: GridValueGetterParams) => `${params.row.id}`,
	},
	{
		field: 'fullName',
		headerName: 'Nombre',
		// sortable: true,
		width: 160,
		disableColumnMenu: true,
		valueGetter: (params: GridValueGetterParams) => `${params.row.name || ''}`,
	},
	{
		field: 'docIdent',
		headerName: 'Doc Ident.',
		// sortable: true,
		width: 160,
		disableColumnMenu: true,
		valueGetter: (params: GridValueGetterParams) =>
			`${params.row.id_ident_type.name || ''}${params.row.ident_num}`,
	},
	{
		field: 'direcicon',
		headerName: 'Direccion',
		// sortable: true,
		width: 160,
		disableColumnMenu: true,
		valueGetter: (params: GridValueGetterParams) => `${params.row.id_location.id_direccion.estado || ''}`,
	},
	{
		field: 'Imagen Rif',
		headerName: 'Imagen Rif',
		// sortable: true,
		width: 160,
		disableColumnMenu: true,
		renderCell: (params: GridValueGetterParams) => (params.row.rc_rif ? <ImageIcon /> : <ErrorOutlineIcon />),
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
		field: 'opciones',
		headerName: 'Opciones',
		width: 180,
		disableColumnMenu: true,
		renderCell: (params: GridValueGetterParams) => (
			<Button sx={{ cursor: 'pointer' }} variant='contained'>
				<EditIcon /> <span>Editar</span>
			</Button>
		),
	},
];

const Comercio: FC = () => {
	const classes = useStyles();
	const [selected, setSelected] = useState(null);
	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: 'id',
			sort: 'asc' as GridSortDirection,
		},
	]);
	const [modalOpen, setModelOpen] = useState(true);

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className={classes.containerFlex}>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	const [rows, setRows] = useState<any[]>([
		{
			id: 1,
			name: 'Armando Trand',
			id_ident_type: {
				id: 1,
				name: 'V',
			},
			ident_num: '123456',
			special_contributor: 0,
			rc_rif: null, // or data
			id_location: {
				id: 1,
				id_direccion: {
					id: 1,
					estado: 'Distrito Capital',
				},
			},
			id_activity: {
				id: '15422',
				name: `Alimentación\tProveedores de cavas y estantes`,
				id_afiliado: {
					id: 720008172,
					bank_account_number: '01040107160107199659',
					name: 'TRANRED BIENES Y SERVICIOS (BVC) ',
				},
			},
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 26 }).toISO()),
		},
		{
			id: 2,
			name: 'Jesus Twen',
			id_ident_type: {
				id: 1,
				name: 'J',
			},
			ident_num: '123457',
			special_contributor: 0,
			rc_rif: {
				id: 1,
				algo: 'algo',
			},
			id_location: {
				id: 1,
				id_direccion: {
					id: 1,
					estado: 'Vargas',
				},
			},
			id_activity: {
				id: '15422',
				name: `Alimentación\tProveedores de cavas y estantes`,
				id_afiliado: {
					id: 720008172,
					bank_account_number: '01040107160107199659',
					name: 'TRANRED BIENES Y SERVICIOS (BVC) ',
				},
			},
			fecha: DateTime.fromISO(DateTime.now().minus({ days: 24 }).toISO()),
		},
	]);

	const [click, setClick] = useState(false);

	const handleRow = (event: any) => {
		if (event.field === 'opciones') {
			setClick(!click);
			setSelected(null);
			setSelected(event.row);
			console.log(event);
		}
	};

	return (
		<>
			<Grid>
				<Grid xs={12} item>
					<div style={{ height: '70vh', width: '100%' }}>
						<DataGrid
							disableColumnSelector
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
							/*
						onSelectionModelChange={(item) => {
							console.log(rows[item]);
							//console.log('item', rows[item]);
						}}
						*/
						/>
					</div>
				</Grid>
			</Grid>
			<DataListProvider>
				<>{selected && <DataCommerce commerce={selected} click={click} />}</>
			</DataListProvider>
		</>
	);
};

export default Comercio;
