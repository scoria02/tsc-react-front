/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, makeStyles, Paper, Theme } from '@material-ui/core';
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
import React, { FC, useContext, useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '../components/administration/Form';
import { getPayMent } from '../components/formMaldito/getData';

import { SocketContext } from '../context/SocketContext';

import { getDataFMAdministration } from '../store/actions/administration';
import { RootState } from '../store/store';
import LoaderPrimary from '../components/loaders/LoaderPrimary';
import '../components/administration/styles/index.scss';

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
		top: 8,
		right: 8,
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
		width: 150,//120,
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
		field: 'pagadero',
		headerName: 'Paga Despues',
		width: 150,
		editable: false,
		sortable: false,
		valueFormatter: (value: GridValueGetterParams) => {
			return value.row?.id_request.pagadero ? 'Si' : 'No';
		},
	},
];

const Administracion: FC<AdministracionProp> = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	//list tipo de pago
	const [listTypePay, setListListTypePay] = useState<any>([
		{
			id: 1,
			name: 'De Contado',
		},
		{
			id: 2,
			name: 'Inicial',
		},
	]);
	const [typePay, setTypePay] = useState<any>(null);

	//POS
	const [listPayment, setListPayment] = useState<any[]>([]);
	const [payment, setPayment] = useState<any>(null);
	const [path, setPath] = useState<string>('');

	const administration: any = useSelector((state: RootState) => state.administration);

	const [selected, setSelected] = useState(false);
	const [rowSelected, setRowSelect] = useState(null);

	const [rowsAd, setRowsAd] = useState([]);

	const [uploadImg, setUploadImg] = useState<any>(null);
	const [nameImg, setNameImage] = useState<string>('');

	const [getDataControl, setGetDataControl] = useState<number>(0);

	const { socket } = useContext(SocketContext);

	useLayoutEffect(() => {
		console.log('LA1')
		socket.emit('cliente:loadAdministracion');
	}, [])

	//socket io (todos)
	useEffect(() => {
		console.log('EA1')
		socket.on('server:loadAdministracion', (data: any) => {
			console.log('list adminis', data)
			setDiferidos(data);
		});
	}, [socket]);

	useEffect(() => {
		//Get Type Doc Ident
		if (getDataControl === 0) {
			if (listPayment.length === 0) {
				getPayMent().then((res) => {
					res.forEach((item, indice) => {
						setListPayment((prevState: any) => [...prevState, item]);
						if (indice === res.length - 1) {
							setGetDataControl(1);
						}
					});
				});
			}
		} else if (getDataControl === 1) {
			console.log('Todo correcto');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getDataControl]);

	useEffect(() => {
		//dispatch(getDataFMAdministration());
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

	const handleRow = (event: any) => {
		setUploadImg(null);
		setNameImage('');
		setPayment(event.row?.id_request.id_payment_method);
		setTypePay(event.row?.id_request.id_type_payment);
		setRowSelect(event.row?.id_request);
		setPath(event.row?.id_request?.rc_comp_dep ? event.row?.id_request?.rc_comp_dep.path : '');
		setSelected(true);
	};

	const handleCloseRow = (event: any) => {
		setSelected(false);
	};

	return (
		<>
			<div className={classes.administracion}>
				{!rowsAd.length ? (
					<LoaderPrimary />
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
					{getDataControl === 1 &&
							<Form
								fm={rowSelected}
								setFm={setRowSelect}
								uploadImg={uploadImg}
								nameImg={nameImg}
								setUploadImg={setUploadImg}
								setNameImage={setNameImage}
								payment={payment}
								setPayment={setPayment}
								listPayment={listPayment}
								typePay={typePay}
								setTypePay={setTypePay}
								listTypePay={listTypePay}
								path={path}
								setPath={setPath}
							/>
					}
						</Paper>
					</>
				)}
			</div>
		</>
	);
};

export default Administracion;
