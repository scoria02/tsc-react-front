import {
	GridCallbackDetails,
	GridCellParams,
	GridColDef,
	GridRowData,
	GridValueGetterParams,
	MuiEvent,
} from '@mui/x-data-grid';
import Table from 'components/table';
import { DateTime } from 'luxon';
import { FC, useState } from 'react';
import Swal from 'sweetalert2';
import { useStyles } from 'pages/Terminales/styles';
import FM from './FM';

interface Props {
	listFms: any;
}

const ListSolicitudes: FC<Props> = ({ listFms }) => {
	const classes = useStyles();
	const [idFM, setIdFM] = useState<number>(0);
	const [fm, setFm] = useState<number>(0);

	const getRowId = (row: GridRowData) => row.id;

	console.log('list', listFms);

	const columns: GridColDef[] = [
		{ field: 'code', headerName: 'Code', type: 'string', width: 150, editable: false },
		{
			field: `id_commerce['name']`,
			headerName: 'Nombre Comercio',
			type: 'string',
			width: 200,
			editable: false,
			valueGetter: (params: GridValueGetterParams) => params.row.id_commerce.name,
		},
		{
			field: `id_commerce['ident_num']`,
			headerName: 'Rif',
			type: 'string',
			width: 200,
			editable: false,
			valueGetter: (params: GridValueGetterParams) =>
				params.row.id_commerce.id_ident_type.name + params.row.id_commerce.ident_num,
		},
		{
			field: `id_client['name']`,
			headerName: 'Cliente',
			type: 'string',
			width: 200,
			editable: false,
			valueGetter: (params: GridValueGetterParams) => params.row.id_client.name,
		},
		{
			field: `id_client['ident_num']`,
			headerName: 'Doc. Ident',
			type: 'string',
			width: 200,
			editable: false,
			valueGetter: (params: GridValueGetterParams) =>
				params.row.id_client.id_ident_type.name + params.row.id_client.ident_num,
		},
	];

	const DoubleClickTable = (params: GridCellParams) => {
		//swal validar open
		setIdFM(params.row.id);
	};

	return (
		<div className={classes.terminales}>
			<Table doubleClick={DoubleClickTable} columns={columns} rows={listFms} getRowId={getRowId} />
			{idFM ? <FM fm={fm} /> : null}
		</div>
	);
};

export default ListSolicitudes;
