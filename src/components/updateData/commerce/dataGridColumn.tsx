import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { DateTime } from 'luxon';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';

export const columnsGridCommerce: GridColDef[] = [
	{
		field: 'id',
		headerName: 'N',
		//sortable: true,
		width: 80,
		disableColumnMenu: true,
	},
	{
		field: 'fullName',
		headerName: 'Nombre',
		// sortable: true,
		width: 220,
		disableColumnMenu: true,
		valueGetter: (params: GridValueGetterParams) => `${params.row.name || ''}`,
	},
	{
		field: 'docIdent',
		headerName: 'Doc Ident.',
		// sortable: true,
		width: 120,
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
		field: 'rc_rif',
		headerName: 'Img Rif',
		// sortable: true,
		width: 120,
		disableColumnMenu: true,
		renderCell: (params: GridValueGetterParams) => (params.row.rc_rif ? <ImageIcon /> : <ErrorOutlineIcon />),
	},
	{
		field: 'updatedAt',
		headerName: 'Ultima Actulizacion',
		width: 180,
		valueGetter: (params: GridValueGetterParams) => {
			return DateTime.fromISO(params.row?.updatedAt.toString()).toFormat('dd/LL/yyyy').toLocaleString();
		},
		sortable: false,
	},
	{
		field: 'opciones',
		headerName: 'Opciones',
		width: 180,
		disableColumnMenu: true,
		renderCell: (params: GridValueGetterParams) => (
			<Button sx={{ cursor: 'pointer' }} variant='contained'>
				<EditIcon /> <span style={{ textTransform: 'none' }}>Editar</span>
			</Button>
		),
	},
];
