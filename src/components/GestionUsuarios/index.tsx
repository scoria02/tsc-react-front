import { Button, Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton } from '@material-ui/data-grid';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import luffy from '../../img/luffy.png';

interface GestionUsuariosProps {}

const useStyles = makeStyles((styles) => ({
	layout: {
		padding: '0 1rem',
	},
	card: {
		display: 'flex',
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
		'& img': {
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			objectFit: 'cover',
		},
	},
	form: {
		padding: '0 1rem',
	},
	row: {
		display: 'flex',
		justifyContent: 'space-between',
	},
}));

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 60,
		disableColumnMenu: true,
		sortable: false,
	},
	{
		field: 'correo',
		headerName: 'Correo',
		width: 180,
		sortable: false,
		disableColumnMenu: true,
	},
	{
		field: 'name',
		width: 180,
		headerName: 'Nombre',
		sortable: false,
		disableColumnMenu: true,
	},
	// {
	// 	field: 'fullName',
	// 	headerName: 'Full name',
	// 	description: 'This column has a value getter and is not sortable.',
	// 	sortable: false,
	// 	width: 160,
	// 	valueGetter: (params: GridValueGetterParams) =>
	// 		`${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''}`,
	// },
];

const rows = [
	{ id: 1, correo: 'Snow', name: 'Jon' },
	{ id: 2, correo: 'Lannister', name: 'Cersei' },
	{ id: 3, correo: 'Lannister', name: 'Jaime' },
	{ id: 4, correo: 'Stark', name: 'Arya' },
	{ id: 5, correo: 'Targaryen', name: 'Daenerys' },
	{ id: 6, correo: 'Melisandre', name: null },
	{ id: 7, correo: 'Clifford', name: 'Ferrara' },
	{ id: 8, correo: 'Frances', name: 'Rossini' },
	{ id: 9, correo: 'Roxie', name: 'Harvey' },
	{ id: 10, correo: 'Snow', name: 'Jon' },
	{ id: 11, correo: 'Lannister', name: 'Cersei' },
	{ id: 12, correo: 'Lannister', name: 'Jaime' },
	{ id: 13, correo: 'Lannister', name: 'Jaime' },
	{ id: 14, correo: 'Stark', name: 'Arya' },
	{ id: 15, correo: 'Targaryen', name: 'Daenerys' },
	{ id: 16, correo: 'Melisandre', name: null },
	{ id: 17, correo: 'Clifford', name: 'Ferrara' },
	{ id: 18, correo: 'Frances', name: 'Rossini' },
	{ id: 19, correo: 'Roxie', name: 'Harvey' },
	{ id: 20, correo: 'Roxie', name: 'Harvey' },
	{ id: 21, correo: 'Roxie', name: 'Harvey' },
	{ id: 22, correo: 'Roxie', name: 'Harvey' },
	{ id: 23, correo: 'Roxie', name: 'Harvey' },
	{ id: 24, correo: 'Roxie', name: 'Harvey' },
	{ id: 25, correo: 'Roxie', name: 'Harvey' },
	{ id: 26, correo: 'Roxie', name: 'Harvey' },
];

const GestionUsuarios: React.FC<GestionUsuariosProps> = () => {
	const classes = useStyles();
	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className='m-main-justify m-px-2'>
				<div className={classes.tableTitle}>Usuarios</div>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	const [openUserView, setUserView] = React.useState<boolean>();
	const [email, setEmail] = React.useState<string>('leomerida15@gmail.com');
	const [name, setName] = React.useState<string>('Armando');
	const handleRow = (event: any) => {
		setUserView(true);
		console.log(event.row);
	};

	const handleCloseRow = (event: any) => {
		setUserView(false);
		// console.log(event.row);
	};

	const handleInputChanges: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		console.log('id', e.target.id);
		switch (e.target.id) {
			case 'email':
				setEmail(e.target.value);
				break;
			case 'name':
				setName(e.target.value);
				break;
			default:
				break;
		}
		// setEmail(e.target.value);
		//console.log(e.target.value);
	};

	return (
		<>
			<Grid container spacing={4} className={classes.layout}>
				<Grid item xs={5}>
					<div style={{ height: '75vh', width: '100%' }}>
						<DataGrid
							components={{
								Toolbar: customToolbar,
							}}
							rows={rows}
							columns={columns}
							// pageSize={}
							rowsPerPageOptions={[25]}
							onCellClick={handleRow}
						/>
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
									<img src={luffy} alt='imagen' />
								</div>
								<form className={classes.form}>
									<div className={classes.row}>
										<TextField
											id='email'
											name='email'
											label='Correo'
											variant='outlined'
											type='email'
											value={email}
											onChange={handleInputChanges}
											style={{ marginRight: 8 }}
										/>
										<TextField
											id='name'
											name='name'
											label='Nombre'
											variant='outlined'
											type='text'
											value={name}
											onChange={handleInputChanges}
										/>
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