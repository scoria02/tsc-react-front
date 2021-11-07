/* eslint-disable react-hooks/exhaustive-deps */
import {
	Avatar,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Grid,
	makeStyles,
	Paper,
	TextField,
} from '@material-ui/core';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton } from '@material-ui/data-grid';
import CloseIcon from '@material-ui/icons/Close';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from '../../config';
import './scss/index.scss';

interface GestionUsuariosProps {}

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 60,
		disableColumnMenu: true,
		sortable: false,
	},
	{
		field: 'email',
		headerName: 'Correo',
		width: 180,
		sortable: false,
		disableColumnMenu: true,
	},
	{
		field: 'name',
		width: 120,
		headerName: 'Nombre',
		sortable: false,
		disableColumnMenu: true,
	},
	{
		field: 'last_name',
		width: 120,
		headerName: 'Apellido',
		sortable: false,
		disableColumnMenu: true,
	},
	// {
	// 	field: 'fullName',
	// 	headerName: 'Nombre',
	// 	description: 'This column has a value getter and is not sortable.',
	// 	sortable: false,
	// 	width: 160,
	// 	valueGetter: (params: GridValueGetterParams) => {
	// 		console.log('name de params', params);

	// 		return `${params.getValue(params.id, 'name') || ''} ${params.getValue(params.id, 'last_name') || ''}`;
	// 	},
	// },
];

const useStyles = makeStyles((styles) => ({
	layout: {
		padding: '0 1rem',
	},
	card: {
		display: 'grid',
		gridTemplateColumns: '1fr 4fr',
		alignItems: 'center',
		padding: '1rem',
		position: 'relative',
	},
	tableTitle: {
		fontSize: 32,
		fontWeight: 'bold',
		padding: '0 8px',
	},
	text: {
		fontSize: 28,
		padding: '0 8px',
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
	img: {
		width: 170,
		height: 170,
		'& div': {
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			objectFit: 'cover',
		},
	},
	buttonSave: {
		background: styles.palette.primary.main,
		color: styles.palette.primary.contrastText,
		position: 'absolute',
		bottom: 8,
		right: 16,
		'&:hover': {
			background: styles.palette.primary.light,
		},
	},
	form: {
		padding: '1rem',
	},
	row: {
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: 16,
	},
	column: {
		flexDirection: 'column',
	},
	cardTitles: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	avatarLetter: {
		textTransform: 'uppercase',
		backgroundColor: styles.palette.primary.light,
		fontSize: 56,
	},
}));

const GestionUsuarios: React.FC<GestionUsuariosProps> = () => {
	const classes = useStyles();

	const [allUserRoles, setAllUserRoles] = useState<any[]>([]);
	const [openUserView, setUserView] = useState<boolean>();
	const [checkbox, setCheckbox] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(true);
	const [userRol, setUserRol] = useState<any[]>([]);
	const [allUser, setUsers] = useState<any[]>([]);
	const [email, setEmail] = useState<string>('');
	const [lname, setLName] = useState<string>('');
	const [name, setName] = useState<string>('');

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className='m-main-justify m-px-2'>
				<div className={classes.tableTitle}>Usuarios</div>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	useEffect(() => {
		try {
			setLoading(false);
			axios.get('/roles/all').then(async (data: any) => {
				await setAllUserRoles(data.data.info);
			});
			axios.get('worker/all').then(async (data: any) => {
				await setUsers(data.data.info);
			});
			setLoading(true);
		} catch (error) {
			setLoading(true);
			console.log('error', error);
		}
	}, []);

	const handleCloseRow = (event: any) => {
		setUserView(false);
	};

	const handleRow = (event: any) => {
		getuserRol(event.row.id);
		setUserView(true);
	};

	// const handleInputChanges: React.ChangeEventHandler<HTMLInputElement> = (e) => {
	// 	e.preventDefault();
	// 	switch (e.target.id) {
	// 		case 'email':
	// 			setEmail(e.target.value);
	// 			break;
	// 		case 'name':
	// 			setName(e.target.value);
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// };

	const isInUserRol = (id: number) => {
		let ret = false;
		userRol.map((val) => {
			if (val.id === id) {
				ret = true;
			}
			return val;
		});
		return ret;
	};

	const updateCB = (array: any[], item: any, value: boolean) => {
		const index: number = array.findIndex((i: any) => i.name === item);
		if (index !== -1) {
			array[index].valid = value;
			setCheckbox(true);
			return array;
		} else {
			return array;
		}
	};

	const getuserRol = async (id: number) => {
		try {
			const resp = await axios.get(`/worker/${id}`);
			const data = resp.data.info;
			setLName(data.last_name);
			setUserRol(data.roles);
			setEmail(data.email);
			setName(data.name);
		} catch (error) {
			console.log('error getuserRol', error);
		}
	};

	const handleCheckbox = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setCheckbox(false);
		const id = parseInt(event.target.id, 10);
		setAllUserRoles((prev) => {
			return updateCB(prev, event.target.name, event.target.checked);
		});
		switch (event.target.checked) {
			case true:
				setUserRol((prev) => {
					const index: number = prev.findIndex((i: any) => i.id === id);
					if (index === -1) {
						return [...prev, { id: id, name: event.target.name }];
					}
					return prev;
				});
				break;
			default:
				setUserRol((prev) => {
					return prev.filter((rol) => id !== rol.id);
				});
				break;
		}
	};

	const handleSaveData = () => {
		Swal.fire({
			title: '¿Estas seguro de realizar estos cambios?',
			showDenyButton: true,
			confirmButtonText: 'Si',
			denyButtonText: 'No',
			customClass: {
				actions: 'my-actions',
				confirmButton: 'order-2',
				denyButton: 'order-3',
			},
		}).then((result) => {
			if (result.isConfirmed) {
				try {
					// Aca envio los datos al endpoint de dimas
					Swal.fire('Cambios Guardados', '', 'success');
				} catch (error) {
					Swal.fire('Hubo un error guardando sus cambios', '', 'info');
				}
			} else if (result.isDenied) {
				// Swal.fire('Changes are not saved', '', 'info');
			}
		});
	};
	return (
		<>
			<Grid container spacing={4} className={classes.layout}>
				<Grid item xs={5}>
					<div style={{ height: '75vh', width: '100%' }}>
						{loading && (
							<DataGrid
								components={{
									Toolbar: customToolbar,
								}}
								rows={allUser}
								columns={columns}
								rowsPerPageOptions={[25, 100]}
								onCellClick={handleRow}
							/>
						)}
					</div>
				</Grid>
				<Grid item xs={7}>
					{openUserView && (
						<Paper variant='outlined' elevation={3}>
							<div className={classes.card}>
								<Button className={classes.closeBtn} onClick={handleCloseRow}>
									<CloseIcon />
								</Button>
								<div className={classes.img}>
									<Avatar className={classes.avatarLetter}>{`${name.slice(0, 1)}${lname.slice(0, 1)}`}</Avatar>
								</div>
								<form className={classes.form}>
									<div className={classes.row}>
										<TextField
											disabled
											id='email'
											name='email'
											label='Correo'
											variant='outlined'
											type='email'
											value={email}
											// onChange={handleInputChanges}
											style={{ marginRight: 8 }}
											key={0}
										/>
										<TextField
											disabled
											key={1}
											id='name'
											name='name'
											label='Nombre Completo'
											variant='outlined'
											type='text'
											value={name + ' ' + lname}
											// onChange={handleInputChanges}
										/>
									</div>
									<div className={classnames(classes.row, classes.column)}>
										<div className={classes.cardTitles}>Permisos</div>
										<FormGroup>
											<Grid container>
												{checkbox &&
													allUserRoles.map((rol, i) => {
														return (
															<Grid item xs={3} key={i}>
																<FormControlLabel
																	label={rol.name}
																	control={
																		<Checkbox
																			id={rol.id}
																			checked={isInUserRol(rol.id)}
																			onChange={handleCheckbox}
																			name={rol.name}
																			color={'primary'}
																			inputProps={{ 'aria-label': 'primary checkbox' }}
																		/>
																	}
																/>
															</Grid>
														);
													})}
											</Grid>
										</FormGroup>
									</div>
									<div>
										<Button className={classes.buttonSave} onClick={handleSaveData}>
											Guardar
										</Button>
									</div>
								</form>
							</div>
						</Paper>
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default GestionUsuarios;
