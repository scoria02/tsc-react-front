import { GridCellParams, GridColDef, GridRowData, GridValueGetterParams } from '@mui/x-data-grid';
import Table from 'components/table';
import { DateTime } from 'luxon';
import { FC, useState } from 'react';
import Swal from 'sweetalert2';
import { useStyles } from 'pages/Terminales/styles';
import FM from './FM';
import { getFM } from 'utils/getFm';
import { handleLoadingSearch } from 'utils/handleSwal';
import FullModal from 'components/modals/FullModal';
import { FMContextDataProvider } from 'context/FM/FMContextData';

interface Props {
	listFms: any;
}

const ListSolicitudes: FC<Props> = ({ listFms }) => {
	const classes = useStyles();
	const [idFM, setIdFM] = useState<number>(0);
	const [solic, setSolic] = useState<any>(null);

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
			width: 180,
			editable: false,
			valueGetter: (params: GridValueGetterParams) =>
				params.row.id_client.id_ident_type.name + params.row.id_client.ident_num,
		},
		{
			field: 'createdAt',
			headerName: 'Fecha de Actualizacion',
			width: 170,
			sortable: false,
			valueGetter: (params: GridValueGetterParams) => {
				if (params.row.createdAt) {
					return DateTime.fromISO(params.row?.createdAt.toString()).toFormat('dd/LL/yyyy').toLocaleString().trim();
				} else {
					return 'No tiene fecha';
				}
			},
		},
	];

	console.log('d', listFms);

	const DoubleClickTable = async (params: GridCellParams) => {
		//swal validar open
		setIdFM(params.row.id);
		handleLoadingSearch();
		const data: any = await getFM(params.row.id);
		if (data.ok) {
			setSolic(data.fm);
			setModelOpen(true);
		} else {
			Swal.close();
			setIdFM(0);
			setSolic(null);
			handleClose();
		}
	};

	console.log('solic', solic);

	const [modalOpen, setModelOpen] = useState(true);

	const handleClose = () => {
		//setId(0);
		//setFm(null);
		setModelOpen(false);
	};

	return (
		<div className={classes.terminales}>
			<Table doubleClick={DoubleClickTable} columns={columns} rows={listFms} getRowId={getRowId} />
			{idFM ? (
				<FullModal modalOpen={modalOpen} handleClose={handleClose}>
					<FMContextDataProvider fm={solic}>
						<FM />
					</FMContextDataProvider>
				</FullModal>
			) : null}
		</div>
	);
};

export default ListSolicitudes;
