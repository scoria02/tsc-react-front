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
import { FC, useLayoutEffect, useState } from 'react';
import { useStyles } from '..';
import DataCommerce from './DataCommerce';
import { DataListProvider } from 'context/DataList/DataListContext';
import LoaderLine from 'components/loaders/LoaderLine';
import { columnsGridCommerce } from './dataGridColumn';
import { getAllCommerces } from 'services/edit/commerce';
import { LocationsProvider } from 'context/Admision/CreationFM/Location/LocationsContext';

const ComercioList: FC = () => {
	const classes = useStyles();
	const [selected, setSelected] = useState(null);
	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: 'id',
			sort: 'asc',
		},
	]);
	const [rows, setRows] = useState<any[]>([]);
	console.log(rows);

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className={classes.containerFlex}>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	const getCommerces = async () => {
		const commerces: any = await getAllCommerces();
		console.log(commerces);
		if (commerces.length) {
			setRows(commerces);
		}
	};

	useLayoutEffect(() => {
		getCommerces();
	}, []);

	/*
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
	*/

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
			{!rows.length ? (
				<>
					<LoaderLine />
				</>
			) : (
				<>
					{console.log('not show')}
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
									columns={columnsGridCommerce}
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
			)}
		</>
	);
};

export default ComercioList;
