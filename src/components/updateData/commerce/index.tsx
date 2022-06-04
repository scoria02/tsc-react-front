/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Grid } from '@mui/material';
import { DataGrid, GridSortModel, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import { FC, useLayoutEffect, useState } from 'react';
import { useStyles } from '..';
import DataCommerce from './DataCommerce';
import { DataListProvider } from 'context/DataList/DataListContext';
import LoaderLine from 'components/loaders/LoaderLine';
import { columnsGridCommerce } from './dataGridColumn';
import { editCommerce, getAllCommerces } from 'services/edit/commerce';
import { handleLoadingSearch } from 'utils/handleSwal';

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

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className={classes.containerFlex}>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	const getCommerces = async () => {
		const commerces: any = await getAllCommerces();
		//console.log(commerces);
		if (commerces.length) {
			setRows(commerces);
		}
	};

	useLayoutEffect(() => {
		getCommerces();
	}, []);

	const [click, setClick] = useState(false);

	const getCommerce = async (id: number) => {
		const res: any = await editCommerce.getDataCommerce(id);
		if (res?.ok) {
			setSelected(res.commerce);
		} else {
			setSelected(null);
		}
	};

	const handleRow = (event: any) => {
		setSelected(null);
		if (event.field === 'opciones') {
			setClick(!click);
			handleLoadingSearch();
			getCommerce(event.row.id);
			//console.log(event);
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
