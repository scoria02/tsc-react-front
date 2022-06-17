import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { FC } from 'react';
import { useStyles } from 'pages/Terminales/styles';
import { DateTime } from 'luxon';

interface Props {
	status: any;
}

const TableStatusFM: FC<Props> = ({ status }) => {
	//console.log(status);
	const classes = useStyles();

	const columns: GridColDef[] = [
		{
			field: 'id_department',
			headerName: 'Departamento',
			type: 'string',
			width: 160,
			editable: false,
			valueGetter: (params: GridValueGetterParams) => params.row.id_department.name,
		},
		{
			field: 'id_status_request',
			headerName: 'Estatus',
			type: 'string',
			width: 150,
			editable: false,
			valueGetter: (params: GridValueGetterParams) => params.row.id_status_request.name,
		},
		{
			field: 'updatedAt',
			headerName: 'Fecha de Actulizacion',
			width: 170,
			sortable: false,
			valueGetter: (params: GridValueGetterParams) => {
				return DateTime.fromISO(params.row?.updatedAt.toString()).toFormat('dd/LL/yyyy').toLocaleString().trim();
			},
		},
	];

	return (
		<div className={classes.terminales}>
			<div style={{ height: 400, width: 500 }}>
				<DataGrid
					columns={columns}
					hideFooter
					//getRowId={getRowId}
					rows={status}
					//rowsPerPageOptions={[25, 50, 100]}
					//onCellDoubleClick={doubleClick}
				/>
			</div>
		</div>
	);
};

export default TableStatusFM;
