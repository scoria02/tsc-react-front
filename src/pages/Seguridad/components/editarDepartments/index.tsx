/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useState } from 'react';
import { editPermisos } from 'pages/Seguridad/services/permisos';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { handleInfoText, handleLoadingSave } from 'utils/handleSwal';
import LoaderLine from 'components/loaders/LoaderLine';
import { DataGrid, GridCellParams, GridColDef, GridSortModel, GridValueGetterParams } from '@mui/x-data-grid';
import { useStyles } from '../editarViews/styles/styles';
import Swal from 'sweetalert2';

interface Department {
	id: number;
	name: string;
	active: boolean;
}

interface Props {
	listDepartment: Department[];
	setListDepartment: any;
}

const EditarDepartments: React.FC<Props> = ({ listDepartment, setListDepartment }) => {
	const classes = useStyles();
	// const { user } = useSelector((state: any) => state.auth);
	// const { permiss }: any = user;

	const [update, setUpdate] = useState(true);

	const [create, setCreate] = useState(true);

	const [department, setDepartment] = useState<any>(null);

	const [loading, setLoading] = useState(false);

	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: `view['id']`,
			sort: 'asc',
		},
	]);

	const handleChange = (index: number) => {
		setUpdate(false);
		let flag = false;
		listDepartment.forEach((item, i) => {
			if (item.id === index) {
				listDepartment[i].active = !listDepartment[i].active;
			}
		});
	};

	console.log(listDepartment);

	const columns: GridColDef[] = [
		{
			field: 'active',
			headerName: 'Activo',
			width: 100,
			renderCell: (params) => (
				<Checkbox
					checked={params.row.active ? true : false}
					onChange={() => {
						if (params.row.name === 'Seguridad' || params.row.name === 'Ninguno') {
							Swal.fire('Error', `No se puede inactivar: ${params.row.name}`, 'error');
							return;
						}
						handleChange(params.row.id);
					}}
				/>
			),
		},
		{
			field: 'name',
			headerName: 'Nombre',
			type: 'string',
			width: 200,
		},
	];

	const handlesUpdateDepartment = async () => {
		handleLoadingSave();
		if (listDepartment.length) {
			const res: any = await editPermisos.updateDepartments(listDepartment);
			if (res.ok) {
				handleInfoText('Guardado', `Cambios guardados`);
				setUpdate(true);
			}
		}
	};

	const handleButtonDepartment = async () => {
		Swal.fire({
			title: 'Confirmar cambios',
			icon: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Guardar',
			showCancelButton: true,
			cancelButtonText: 'Atras',
			showCloseButton: true,
			customClass: { container: 'swal2-validated' },
		}).then((result) => {
			if (result.isConfirmed) {
				handlesUpdateDepartment();
			}
		});
	};

	const handleCreateDepartment = async () => {
		setCreate(false);
		handleLoadingSave();
		if (department && listDepartment.length) {
			const res: any = await editPermisos.createDepartment(department);
			if (res.ok) {
				handleInfoText('Departamento Creado', department);
				setListDepartment([...listDepartment, res.newDepartment]);
			}
		}
		setCreate(true);
	};

	console.log(create);

	const handleButtonCreateDep = () => {
		Swal.fire({
			icon: 'warning',
			html: `<p>Crear Departamento <b>${department}</b></p>`,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Guardar',
			showCancelButton: true,
			cancelButtonText: 'Atras',
			showCloseButton: true,
			customClass: { container: 'swal2-validated' },
		}).then((result) => {
			if (result.isConfirmed) {
				handleCreateDepartment();
			}
		});
	};

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.wrapperGrid}>
					<div>
						<div className={classes.btn_stepM}>
							<TextField
								sx={{
									mr: 1,
								}}
								className={classes.btn_medio}
								name='nameDepartment'
								label='Nuevo departamento'
								onChange={(e) => {
									setDepartment(e.target.value);
								}}
								type='text'
								variant='outlined'
								value={department}
							/>
							<Button
								onClick={handleButtonCreateDep}
								disabled={department && department.length > 4 && !loading ? false : true}
								sx={{
									textTransform: 'none',
									fontSize: '1rem',
								}}
								variant='contained'
								color='primary'>
								<AddCircleIcon />
							</Button>
						</div>
					</div>
				</div>
				<div style={{ marginTop: '.2rem' }}>
					{!listDepartment.length ? (
						loading ? (
							<LoaderLine />
						) : null
					) : (
						<>
							<div style={{ height: 350, width: 400 }}>
								{create ? (
									<>
										<DataGrid
											headerHeight={35}
											rowHeight={25}
											columns={columns}
											hideFooter
											sortModel={sortModel}
											onSortModelChange={(model) => setSortModel(model)}
											rows={listDepartment}
											//rowsPerPageOptions={[25, 50, 100]}
										/>
										<Button
											onClick={handleButtonDepartment}
											disabled={update}
											sx={{
												mt: '1rem',
												textTransform: 'none',
												fontSize: '1rem',
												width: '100%',
											}}
											variant='contained'
											color='primary'>
											Guardar
										</Button>
									</>
								) : null}
							</div>
						</>
					)}
				</div>
			</form>
		</>
	);
};

export default EditarDepartments;
