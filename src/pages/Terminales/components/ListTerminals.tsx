import {
	GridCallbackDetails,
	GridCellParams,
	GridColDef,
	GridRowData,
	GridValueGetterParams,
	MuiEvent,
} from '@mui/x-data-grid';
import Table from 'components/table';
import { FC, useLayoutEffect } from 'react';
import { useStyles } from '../styles';
import { DateTime } from 'luxon';
import { listRedesTms7, listStatusTermObject, listStatusTermTms7 } from '../tms7';
import Swal from 'sweetalert2';
import { handleLoadingSave } from 'utils/handleSwal';
import { activacion } from '../services';

interface Terminal {
	merchantId: string;
	net_id: number;
	parametrizationName: string;
	parametrizationVersion: number;
	register_date: Date;
	status: number;
	tecnology_type: number;
	terminalId: string;
}

interface Props {
	terminals: Terminal[];
}

const ListTerminals: FC<Props> = ({ terminals }) => {
	const classes = useStyles();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const columns: GridColDef[] = [
		{ field: 'terminalId', headerName: 'Terminal', type: 'string', width: 240, editable: false },
		{
			field: 'status',
			headerName: 'Estatus',
			type: 'string',
			width: 240,
			editable: false,
			valueGetter: (params: GridValueGetterParams) => {
				return listStatusTermTms7[params.row.status - 1];
			},
		},
		{
			field: 'register_date',
			headerName: 'Fecha de Registro',
			type: 'date',
			width: 180,
			valueGetter: (params: GridValueGetterParams) => {
				return DateTime.fromISO(params.row?.register_date.toString())
					.toFormat('dd/LL/yyyy')
					.toLocaleString()
					.trim();
			},
			sortable: false,
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
	];

	//console.log(terminals);

	useLayoutEffect(() => {}, []);

	const getRowId = (row: GridRowData) => row.terminalId;

	const saveDataTerm = async (term: Terminal, status: number) => {
		const res: any = await activacion.saveStatusTerminal(term.terminalId, status);
		console.log(res);
		//Swal.close();
		if (res.ok) {
			Swal.close();
			//upate terminal
		}
	};

	const DoubleClickTable = (
		params: GridCellParams,
		event: MuiEvent<React.MouseEvent>,
		details: GridCallbackDetails
	) => {
		const { row: term } = params;
		Swal.fire({
			icon: 'question',
			title: `Terminal: ${term.terminalId}`,
			input: 'select',
			inputOptions: listStatusTermObject,
			inputValue: term.status,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Guardar',
			showCancelButton: true,
		}).then((result) => {
			if (result.value > 0 && result.value < 10) {
				handleLoadingSave();
				saveDataTerm(term, result.value);
			}
		});
	};

	return (
		<div className={classes.terminales}>
			<Table doubleClick={DoubleClickTable} columns={columns} rows={terminals} getRowId={getRowId} />
		</div>
	);
};

export default ListTerminals;
