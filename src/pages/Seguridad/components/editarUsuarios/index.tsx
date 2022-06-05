/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Avatar, Button, Grid, Paper, TextField } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import classnames from 'classnames';
import axios from 'config';
import { SocketContext } from 'context/SocketContext';
import { useLayoutEffect, useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { sxStyled, useStyles } from '../../styles';
import { handleError, handleNotAccess } from 'utils/handleSwal';
import { columnsGestionUsuario } from './columnsGrid';
import { useSelector } from 'react-redux';

interface Props {
	listDepartment: any[];
	listRoles: any[];
}

const GestionUsuarios: React.FC<Props> = ({ listDepartment, listRoles }) => {
	const { user } = useSelector((state: any) => state.auth);
	const { permiss }: any = user;
	const classes = useStyles();

	const { socket } = useContext(SocketContext);

	const [userBlocked, setUserBlocked] = useState<boolean>(false);
	const [openUserView, setUserView] = useState<boolean>();
	// const [loading, setLoading] = useState<boolean>(true);
	const [userRol, setUserRol] = useState<any>(null);
	const [userDep, setUserDep] = useState<any>(null);
	const [allUser, setUsers] = useState<any[]>([]);

	const [userID, setUserID] = useState<number>(0);
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

	const getData = async () => {
		try {
			await axios.get('worker/all').then((data: any) => {
				setUsers(data.data.info);
			});
		} catch (error) {}
	};

	useLayoutEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		socket.on('server:reloadWorkers', () => {
			getData();
			//setUsers([...allUser, newUser]);
		});
	}, [socket]);

	const handleCloseRow = (event: any) => {
		setUserView(false);
	};

	const handleRow = (event: any) => {
		if (!permiss['Ver Usuarios']) {
			handleNotAccess();
			return;
		}
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

	/*
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
		*/

	/*
	const updateCB = (array: any[], item: any, value: boolean) => {
		const index: number = array.findIndex((i: any) => i.name === item);
		if (index !== -1) {
			array[index].valid = value;
			return array;
		} else {
			return array;
		}
	};
		*/

	const getuserRol = async (id: number) => {
		try {
			const resp = await axios.get(`/worker/${id}`);
			const data = resp.data.info;
			setUserBlocked(data.block === 0 ? false : true);
			setLName(data.last_name);
			setEmail(data.email);
			setUserDep(data.id_department);
			setUserRol(data.id_rol);
			setUserID(data.id);
			setName(data.name);
		} catch (error) {
			console.log('error getuserRol', error);
		}
	};

	const handleSelect = (event: any, value: any, item: string) => {
		switch (item) {
			case 'department':
				setUserDep(value);
				break;
			case 'rol':
				setUserRol(value);
				break;
			default:
				break;
		}
	};

	/*
	const handleCheckbox = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const id = parseInt(event.target.id, 10);
		setpermiss((prev) => {
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
		*/

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
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await axios.put(`/worker/${userID}`, {
						//update
						id_rol: userRol.id,
						id_department: userDep.id,
						block: userBlocked ? 1 : 0,
					});
					Swal.fire('Cambios Guardados', '', 'success');
					getData();
				} catch (error) {
					handleError(error);
				}
			} else if (result.isDenied) {
				// Swal.fire('Changes are not saved', '', 'info');
			}
		});
	};
	return (
		<>
			<Grid container spacing={4}>
				<Grid item xs={5}>
					<div style={{ height: '80vh', width: '100%' }}>
						{
							// loading &&
							<DataGrid
								components={{
									Toolbar: customToolbar,
								}}
								rows={allUser}
								columns={columnsGestionUsuario}
								rowsPerPageOptions={[25, 100]}
								onCellClick={handleRow}
							/>
						}
					</div>
				</Grid>
				<Grid item xs={7}>
					{openUserView && (
						<Paper variant='outlined'>
							<div className={classes.card}>
								<Button sx={sxStyled.closeBtn} onClick={handleCloseRow}>
									<CloseIcon />
								</Button>
								<form className={classes.form}>
									<div className={classes.grid}>
										<div className={classes.img}>
											<Avatar sx={sxStyled.avatarLetter}>{`${name.slice(0, 1)}${lname.slice(0, 1)}`}</Avatar>
										</div>
										<div>
											<div className={classes.textFields}>
												<TextField
													disabled
													id='email'
													name='email'
													label='Correo'
													variant='outlined'
													type='email'
													value={email}
													// onChange={handleInputChanges}
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
												/>
												{userDep && userRol ? (
													<>
														<Autocomplete
															className={classes.inputText}
															onChange={(event, value) =>
																value ? handleSelect(event, value, 'department') : null
															}
															value={userDep}
															getOptionLabel={(option: any) => (option.name ? option.name : '')}
															isOptionEqualToValue={(option: any) => option.id === userDep.id}
															options={listDepartment}
															renderInput={(params: any) => (
																<TextField {...params} name='department' label='Departamento' variant='outlined' />
															)}
														/>
														<Autocomplete
															className={classes.inputText}
															onChange={(event, value) => (value ? handleSelect(event, value, 'rol') : null)}
															value={userRol}
															getOptionLabel={(option: any) => option.name}
															isOptionEqualToValue={(option, value) => option.id === value.id}
															options={listRoles}
															renderInput={(params: any) => (
																<TextField {...params} name='rol' label='Cargo' variant='outlined' />
															)}
														/>
													</>
												) : null}
												<Button
													onClick={() => setUserBlocked(!userBlocked)}
													sx={!userBlocked ? sxStyled.blockedButtonOff : sxStyled.blockedButtonOn}>
													{userBlocked ? `Desbloquear` : `Bloquear`}
												</Button>
											</div>
											<div className={classnames(classes.row, classes.column)}>
												<div className={classes.cardTitles}>Permisos</div>
											</div>
										</div>
										<div className=''></div>
										<Button sx={sxStyled.buttonSaveData} onClick={handleSaveData}>
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