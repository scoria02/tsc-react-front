import { Button, makeStyles, Paper, Theme } from '@material-ui/core';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton } from '@material-ui/data-grid';
import CloseIcon from '@material-ui/icons/Close';
import { FC, useEffect, useState } from 'react';

interface AdministracionProp {}

const useStyles = makeStyles((theme: Theme) => ({
	administracion: {
		flexGrow: 1,
		display: 'grid',
		gridColumnGap: '2rem',
		gridTemplateColumns: '1fr 1fr',
	},
	button: {
		width: 200,
		height: 70,
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
	dataGrid: {
		width: '100%',
		height: '75vh',
	},
	tableTitle: {
		fontSize: 32,
		fontWeight: 'bold',
		padding: '0 8px',
	},
	view: {
		width: '100%',
		padding: '1rem',
		// height: '75vh',
		position: 'relative',
	},
	closeBtn: {
		width: 40,
		height: 40,
		position: 'absolute',
		top: 4,
		right: 16,
		padding: 0,
		minWidth: 'unset',
		borderRadius: 20,
	},
}));

const Administracion: FC<AdministracionProp> = () => {
	const classes = useStyles();

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className='m-main-justify m-px-2'>
				<div className={classes.tableTitle}>Formularios</div>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'ID',
			width: 60,
			disableColumnMenu: true,
			sortable: false,
		},
		{
			field: 'name',
			headerName: 'Nombre',
			width: 200,
			disableColumnMenu: true,
			sortable: false,
		},
	];
	const [selected, setSelected] = useState(false);
	const [rowSelected, setRowSelect] = useState({ id: null, name: '' });
	const [rows, setRows] = useState([
		{ id: 1, name: 'Armando' },
		{ id: 2, name: 'Jesus' },
	]);

	const handleRow = (event: any) => {
		console.log('row', event.row);
		setRowSelect((prev): any => rows.find((value) => value.id === event.row.id));
		setSelected(true);
	};

	const handleCloseRow = (event: any) => {
		setSelected(false);
	};

	useEffect(() => {
		console.log('rowSelected', rowSelected);
	}, [rowSelected]);

	return (
		<>
			<div className={classes.administracion}>
				<DataGrid
					onCellClick={handleRow}
					components={{
						Toolbar: customToolbar,
					}}
					rows={rows}
					columns={columns}
					rowsPerPageOptions={[25, 100]}
					className={classes.dataGrid}
				/>
				{selected && (
					<>
						<Paper variant='outlined' elevation={3} className={classes.view}>
							<div className={classes.tableTitle}>Formularios</div>
							<Button className={classes.closeBtn} onClick={handleCloseRow}>
								<CloseIcon />
							</Button>
						</Paper>
					</>
				)}
			</div>
		</>
	);
};

export default Administracion;
