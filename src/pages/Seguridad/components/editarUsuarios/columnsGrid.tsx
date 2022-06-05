import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

export const columnsGestionUsuario: GridColDef[] = [
	{
		field: 'email',
		headerName: 'Correo',
		width: 180,
		sortable: false,
		disableColumnMenu: true,
	},
	{
		field: 'fullName',
		headerName: 'Nombre Completo',
		// description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 160,
		valueGetter: (params: GridValueGetterParams) => {
			return `${params.row.name || ''} ${params.row.last_name || ''}`;
		},
	},
	{
		field: 'block',
		headerName: 'Bloqueado',
		sortable: false,
		disableColumnMenu: true,
		valueGetter: (params: GridValueGetterParams) => {
			return params.row.block ? 'Si' : 'No';
		},
	},
];
