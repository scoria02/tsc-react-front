/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, FormControlLabel, makeStyles, Paper, Switch, TextField, Theme } from '@material-ui/core';
import {
	DataGrid,
	GridColDef,
	GridRowParams,
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridValueGetterParams,
} from '@material-ui/data-grid';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
// @ts-expect-error
import ReactImageZoom from 'react-image-zoom';
import { useDispatch, useSelector } from 'react-redux';
import img from '../img/17009.jpg';
import { getDataFMAdministration } from '../store/actions/administration';
import { RootState } from '../store/store';

import { Form } from '../components/administration/Form'

import { PortFiles, URL } from '../config';

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
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
	},
	closeBtn: {
		width: 40,
		height: 40,
		position: 'absolute',
		top: 16,
		right: 16,
		padding: 0,
		minWidth: 'unset',
		borderRadius: 20,
	},
	red: {
		backgroundColor: theme.palette.error.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.error.light} !important`,
		},
	},
	yellow: {
		backgroundColor: theme.palette.warning.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.warning.light} !important`,
		},
	},
	green: {
		backgroundColor: theme.palette.success.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.success.light} !important`,
		},
	},
	wrapper: {
		padding: '16px 0',
		height: '100%',
	},
	img_zoom: {
		position: 'fixed',
		display: 'flex',
		justifyContent: 'center',
	},
	content: {
		display: 'flex',
		height: '100%',
		flexDirection: 'column',
	},
	row: {
		display: 'flex',
		width: '100%',
		marginBottom: 8,
		justifyContent: 'space-around',
	},
	textfieldLeft: {
		marginRight: 8,
	},
	switchControl: {
		position: 'absolute',
		bottom: 0,
		left: '35%',
	},
}));

const columns: GridColDef[] = [
	{
		field: 'id_request',
		headerName: 'Cod.',
		width: 120,
		editable: false,
		sortable: false,
		valueFormatter: (value: GridValueGetterParams) => {
			return value.row?.id_request.code;
		},
	},
	{
		field: 'name_commerce',
		headerName: 'Comercio',
		width: 160,
		valueFormatter: (value: GridValueGetterParams) => {
			return value.row?.id_request.id_commerce.name;
		},
		sortable: false,
	},
	{
		field: 'name_client',
		headerName: 'Cliente',
		width: 160,
		valueFormatter: (value: GridValueGetterParams) => {
			return `${value.row?.id_request.id_client.name} ${value.row?.id_request.id_client.last_name}`;
		},
		sortable: false,
	},
	{
		field: 'id_type_payment',
		headerName: 'Paga Despues',
		width: 200,
		editable: false,
		sortable: false,
		valueFormatter: (value: GridValueGetterParams) => {
			return value.row?.id_request.pagadero ? 'Si' : 'No';
		},
	},
	/*
	{
		field: 'fullname',
		headerName: 'Nombre',
		width: 120,
		valueGetter: (params: GridValueGetterParams) =>
			`${params.getValue(params.id, 'name') || ''} ${params.getValue(params.id, 'lastname') || ''}`,
		disableColumnMenu: true,
		sortable: false,
	},
	{
		field: 'fecha',
		headerName: 'Fecha',
		width: 120,
		disableColumnMenu: true,
		sortable: false,
	},
	 */
];

const Administracion: FC<AdministracionProp> = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const administration: any = useSelector((state: RootState) => state.administration);

	const [selected, setSelected] = useState(false);
	const [pagadero, setPagadero] = useState(false);
	const [rowSelected, setRowSelect] = useState({ 
		id: null ,
		paymentmethod: {
			name: '',
			id: null,
		},
		type_payment: {
			name: '',
			id: null,
		},
		nro_comp_dep: '',
		urlImgCompDep: {
			path: null,
		},
	});
	const d = new Date();
	const [rowsAd, setRowsAd] = useState([]);

	const [rows, setRows] = useState([
		{
			id: 1,
			name: 'Armando',
			lastname: 'Rivas',
			fecha: d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear(),
		},
		{
			id: 2,
			name: 'Jesus',
			lastname: 'Creador',
			fecha: d.getDay() - 1 + '/' + d.getMonth() + '/' + d.getFullYear(),
		},
	]);

	useEffect(() => {
		dispatch(getDataFMAdministration());
		// console.log('rowSelected', rowSelected);
	}, []);

	useEffect(() => {
		setRowsAd(administration.fmAd);
	}, [administration]);

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className='m-main-justify m-px-2'>
				<div className={classes.tableTitle}>Formularios</div>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

	const handleRow = (event: any) => {
		console.log('viene pagadero', event.row?.id_request.pagadero);
		setPagadero(event.row?.id_request.pagadero || false);
		console.log(event.row.id_request)
		setRowSelect({
			id: event.row.id_request.id,
			paymentmethod: event.row.id_request.id_payment_method,
			type_payment: event.row.id_request.id_type_payment,
			nro_comp_dep: event.row.id_request.nro_comp_dep,
			urlImgCompDep: event.row.id_request.rc_comp_dep,
		});
		setSelected(true);
	};

	const handleCloseRow = (event: any) => {
		setSelected(false);
	};

	const getModalContent = () => {
		switch (pagadero) {
			// case true:
			// 	return (
			// 		<div
			// 		// className={ }
			// 		>
			// 			true
			// 		</div>
			// 	);

			default:
			break;
			//				return ();
		}
	};

	return (
		<>
			<div className={classes.administracion}>
				{!rowsAd.length ? (
					<h1>loading...</h1>
				) : (
					<DataGrid
						onCellClick={handleRow}
						components={{
							Toolbar: customToolbar,
						}}
						rows={rowsAd}
						columns={columns}
						rowsPerPageOptions={[25, 100]}
						className={classes.dataGrid}
						getRowClassName={(params: GridRowParams) =>
							classNames({
								[classes.red]: false,
								[classes.yellow]: false,
								[classes.green]: false,
							})
						}
					/>
				)}
				{selected && (
					<>
						<Paper variant='outlined' elevation={3} className={classes.view}>
							<Button className={classes.closeBtn} onClick={handleCloseRow}>
								<CloseIcon />
							</Button>
							<div className={classes.tableTitle}>Formularios</div>
							<Form fm={rowSelected} handleChange={handleChange}/>
						</Paper>
					</>
				)}
			</div>
		</>
	);
};

export default Administracion;
