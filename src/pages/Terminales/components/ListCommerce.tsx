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
import { useStyles } from '../styles';
import { listRedesTms7, listStatusCommerTms7 } from '../tms7';

interface CommerceTMS7 {
	address: string;
	address_line1: string;
	address_line2: string;
	address_number: string;
	bank_account: string;
	bank_name: string;
	business_hours: string;
	city: string;
	company_name: string;
	contact_email: string;
	contact_name: string;
	contact_phone: string;
	contact_phone2: string;
	coordinates: string;
	geografic_code: string;
	group: {
		name: string;
		installments: number;
	};
	installments: any;
	last_change: any;
	mcc: any;
	merchantId: string;
	neighborhood: null;
	net_id: number;
	postalcode: string;
	promotional_message: any;
	receipt_name: string;
	register_date: Date;
	softdescriptor: any;
	state: string;
	status: number | string;
	subacquirer_code: string;
	taxId: string;
	trade_name: string;
}

interface Props {
	commerces: CommerceTMS7[];
}

const ListCommerce: FC<Props> = ({ commerces }) => {
	const classes = useStyles();

	const getRowId = (row: GridRowData) => row.merchantId + row.receipt_name;

	const columns: GridColDef[] = [
		{ field: 'taxId', headerName: 'Rif', type: 'string', width: 240, editable: false },
		{ field: 'receipt_name', headerName: 'Nombre del Comercio', type: 'string', width: 240, editable: false },
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
				return listStatusCommerTms7[params.row.status - 1];
			},
		},
		{
			field: 'net_id',
			headerName: 'Red',
			type: 'string',
			width: 240,
			editable: false,
			valueGetter: (params: GridValueGetterParams) => {
				return listRedesTms7[params.row.net_id];
			},
		},
		{
			field: 'register_date',
			headerName: 'Fecha de Registro',
			type: 'date',
			width: 180,
			valueGetter: (params: GridValueGetterParams) => {
				if (params.row.register_date) {
					return DateTime.fromISO(params.row?.register_date.toString())
						.toFormat('dd/LL/yyyy')
						.toLocaleString()
						.trim();
				} else {
					return 'No tiene fecha';
				}
			},
			sortable: false,
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
			<Table doubleClick={DoubleClickTable} columns={columns} rows={commerces} getRowId={getRowId} />
		</div>
	);
};

export default ListCommerce;
