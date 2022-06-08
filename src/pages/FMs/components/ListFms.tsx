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
import { FC } from 'react';
import Swal from 'sweetalert2';
import { useStyles } from 'pages/Terminales/styles';

interface Props {
	listFms: any;
}

const ListSolicitudes: FC<Props> = ({ listFms }) => {
	const classes = useStyles();

	const getRowId = (row: GridRowData) => row.id;

	const columns: GridColDef[] = [
		{ field: 'code', headerName: 'Code', type: 'string', width: 240, editable: false },
		{ field: `id_commerce['name']`, headerName: 'Nombre Comercio', type: 'string', width: 240, editable: false },
		{
			field: 'status',
			headerName: 'Estatus',
			type: 'string',
			width: 240,
			editable: false,
			valueGetter: (params: GridValueGetterParams) => {
				if (params.row.status === 0) {
					return 'Sin asignar';
				}
				return params.row.status - 1;
			},
		},
	];

	const DoubleClickTable = (
		params: GridCellParams,
		event: MuiEvent<React.MouseEvent>,
		details: GridCallbackDetails
	) => {
		const commerce = params.row;
		//handleLoadingSearch();
		//Buscar terminales
		//await terminales from commerce
		let terminales = [
			{
				terminalId: '00001',
				net_id: 2,
				merchantId: '072000410800100',
			},
			{
				terminalId: '000002',
				net_id: 2,
				merchantId: '072000410800101',
			},
		];

		let listTerm: any = {};
		terminales.map((item: any, index: number) => {
			listTerm[index] = item.terminalId;
			return null;
		});

		Swal.fire({
			icon: 'question',
			html: `<p>Terminales de <b>${commerce.taxId}</b></p>`,
			input: 'select',
			inputOptions: listTerm,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Selecionar',
			showCancelButton: true,
		}).then((result) => {
			if (result.value) {
				console.log(listTerm[result.value]);
			}
		});
	};

	return (
		<div className={classes.terminales}>
			<Table doubleClick={DoubleClickTable} columns={columns} rows={listFms} getRowId={getRowId} />
		</div>
	);
};

export default ListSolicitudes;
