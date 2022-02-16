/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CloseIcon from '@mui/icons-material/Close';
import { Button, Paper, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
	DataGrid,
	GridColDef,
	GridRowParams,
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridValueGetterParams,
} from '@mui/x-data-grid';
import classNames from 'classnames';
import { FC, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '../components/administration/Form';
import '../components/administration/styles/index.scss';
import { getPayMent } from '../components/formMaldito/getData';
import { SocketContext } from '../context/SocketContext';
import { cleanAdmisionFMAdministration } from '../store/actions/administration';
import { RootState } from '../store/store';

interface AdministracionProp {}

const useStyles = makeStyles((theme: Theme) => ({
	administracion: {
		flexGrow: 1,
		display: 'grid',
		gridColumnGap: '2rem',
		gridTemplateColumns: '1fr 1fr',
		height: '80vh',
	},
	button: {
		width: 200,
		height: 70,
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
	tableTitle: {
		fontSize: 32,
		fontWeight: 'bold',
		padding: '0 8px',
	},
	view: {
		padding: '1rem',
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
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

export const sxStyled = {
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
};

const columns: GridColDef[] = [
	{
		field: 'id_request',
		headerName: 'Cod.',
		width: 60, //120,
		editable: false,
		sortable: false,
		valueGetter: (value: GridValueGetterParams) => value.row?.id_request.code,
	},
	{
		field: 'name_commerce',
		headerName: 'Comercio',
		width: 160,
		valueGetter: (value: GridValueGetterParams) => value.row?.id_request.id_commerce.name,
		sortable: false,
	},
	{
		field: 'name_client',
		headerName: 'Cliente',
		width: 160,
		valueGetter: (value: GridValueGetterParams) =>
			`${value.row?.id_request.id_client.name} ${value.row?.id_request.id_client.last_name}`,
		sortable: false,
	},
	{
		field: 'pagadero',
		headerName: 'Paga Despues',
		width: 150,
		editable: false,
		sortable: false,
		valueGetter: (value: GridValueGetterParams) => (value.row?.id_request.pagadero ? 'Si' : 'No'),
	},
];

const Administracion: FC<AdministracionProp> = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	//POS
	const [path, setPath] = useState('');
	const [rowsAd, setRowsAd] = useState([]);
	const [nameImg, setNameImage] = useState('');
	const [typePay, setTypePay] = useState(null);
	const [payment, setPayment] = useState(null);
	const [selected, setSelected] = useState(false);
	const [uploadImg, setUploadImg] = useState(null);
	const [listPayment, setListPayment] = useState<any[]>([]);
	const [rowSelected, setRowSelect] = useState(null);
	const [getDataControl, setGetDataControl] = useState(0);
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

	const { socket } = useContext(SocketContext);
	const { user } = useSelector((state: any) => state.auth);
	const administration: any = useSelector((state: RootState) => state.administration);

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className='m-main-justify m-px-2'>
				<div className={classes.tableTitle}>Formularios</div>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	const handleRow = (event: any) => {
		socket.emit('cliente:disconnect');
		setUploadImg(null);
		setNameImage('');
		setPayment(event.row.id_request.id_payment_method);
		setTypePay(event.row.id_request.id_type_payment);
		setRowSelect(event.row.id_request);
		setPath(
			event.row.id_request.rc_comp_dep
				? process.env.REACT_APP_API_IMAGES + '/' + event.row?.id_request?.rc_comp_dep.path
				: ''
		);
		setSelected(true);
		socket.emit('cliente:trabajandoAdministra', user, event.row.id);
	};

	const handleCloseRow = () => {
		socket.emit('cliente:disconnect');
		setSelected(false);
		dispatch(cleanAdmisionFMAdministration());
	};

	useEffect(() => {
		if (administration.updatedStatusAd) {
			socket.emit('cliente:cleansolicadminis');
			handleCloseRow();
		}
	}, [administration.updatedStatusAd]);

	//socket io (todos)
	useEffect(() => {
		socket.on('server:loadAdministracion', (data: any) => {
			setRowsAd(data);
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
		}
	}, [getDataControl]);

	useEffect(() => {
		//setRowsAd(administration.fmAd);
	}, [administration]);

	useLayoutEffect(() => {
		//dispatch(getDataFMAdministration());
		socket.emit('cliente:loadAdministracion');
	}, []);

	console.log(selected);

	return (
		<>
			<div className={classes.administracion}>
				<DataGrid
					onCellClick={handleRow}
					components={{
						Toolbar: customToolbar,
					}}
					rows={rowsAd}
					columns={columns}
					rowsPerPageOptions={[25, 100]}
					getRowClassName={(params: GridRowParams) =>
						classNames({
							[classes.red]: false,
							[classes.yellow]: false,
							[classes.green]: false,
						})
					}
				/>
				{/* {!rowsAd.length ? (
					<LoaderPrimary />
				) : (
					)
				} */}
				{selected && (
					<>
						<Paper variant='outlined' elevation={3} className={classes.view}>
							<Button sx={sxStyled.closeBtn} onClick={handleCloseRow}>
								<CloseIcon />
							</Button>
							{selected && getDataControl === 1 && (
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
							)}
						</Paper>
					</>
				)}
			</div>
		</>
	);
};

export default Administracion;
