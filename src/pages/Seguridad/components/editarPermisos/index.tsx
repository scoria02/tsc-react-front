/* eslint-disable react-hooks/exhaustive-deps */
import { useStyles } from './styles/styles';
import { Autocomplete, Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useState } from 'react';
import { editPermisos } from 'pages/Seguridad/services/permisos';
import SearchIcon from '@mui/icons-material/Search';
import { handleInfoText, handleLoadingSave } from 'utils/handleSwal';
import LoaderLine from 'components/loaders/LoaderLine';
import { DataGrid, GridColDef, GridSortModel, GridValueGetterParams } from '@mui/x-data-grid';

interface View {
	view: {
		active: number;
		id: number;
		name: string;
		root: string;
	};
}

interface Permisos {
	id: number;
	name: string;
	status: boolean;
	view: View;
}

interface Props {
	listDepartment: any[];
	listRoles: any[];
}

const EditarPermisos: React.FC<Props> = ({ listDepartment, listRoles }) => {
	const classes = useStyles();
	// const { user } = useSelector((state: any) => state.auth);
	// const { permiss }: any = user;

	const [department, setDepartment] = useState<any>(null);
	const [role, setRole] = useState<any>(null);

	const [listPermisos, setListPermisos] = useState<Permisos[] | []>([]);

	const [loading, setLoading] = useState(false);

	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: `view['id']`,
			sort: 'asc',
		},
	]);

	const handleChange = (index: number) => {
		listPermisos.forEach((item, i) => {
			if (item.id === index) {
				listPermisos[i].status = !listPermisos[i].status;
			}
		});
	};

	const columns: GridColDef[] = [
		{
			field: 'status',
			headerName: 'Estatus',
			width: 200,
			renderCell: (params) => (
				<Checkbox checked={params.row.status} onChange={() => handleChange(params.row.id)} />
			),
		},
		{ field: 'name', headerName: 'Accion', type: 'string', width: 240, editable: false },
		{
			field: 'view',
			headerName: 'Vista',
			type: 'string',
			width: 240,
			valueGetter: (params: GridValueGetterParams) => {
				return params.row.view.name;
			},
		},
		{
			field: `view['id']`,
			hide: true,
			headerName: 'idV',
			type: 'string',
			align: 'right',
			valueGetter: (params: GridValueGetterParams) => {
				return params.row.view.id;
			},
		},
	];

	//const [role, setRole] = useState(null);

	//console.log('per', listPermisos);

	const handleSavePermiss = async () => {
		handleLoadingSave();
		if (department && role && listPermisos.length) {
			//console.log('buscar', department?.id, role?.id);
			const res: any = await editPermisos.savePermiss(department.id, role.id, listPermisos);
			if (res.ok) {
				handleInfoText('Guardado', `Se guardo el cambio de ${department?.name} / ${role?.name}`);
				setListPermisos([]);
			}
		}
	};

	const handleSearchPermisos = async () => {
		//handleLoadingSearch();
		setLoading(true);
		setListPermisos([]);
		if (department && role) {
			//console.log('buscar', department?.id, role?.id);
			const res: any = await editPermisos.getAllListPermiss(department.id, role.id);
			if (res.ok) {
				if (res.permiss.length) {
					setListPermisos(res.permiss);
				} else handleInfoText('Permisos', 'El departamento no tiene vistas asignadas');
			}
			setLoading(false);
		}
	};
	console.log(listPermisos);

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.wrapperGrid}>
					<div>
						<div className={classes.btn_stepM}>
							<Autocomplete
								sx={{
									mr: 1,
								}}
								className={classes.btn_medio}
								onChange={(event, value) => {
									setListPermisos([]);
									setDepartment(value ? value : null);
									//handleSelectAci(event, value);
								}}
								options={listDepartment}
								getOptionLabel={(value: any) => value.name}
								isOptionEqualToValue={(option: any | null, value: any) => option?.id === value.id}
								value={department || null}
								renderInput={(params: any) => (
									<TextField {...params} name='department' label={`Departamentos`} variant='outlined' />
								)}
							/>
							<Autocomplete
								sx={{
									mr: 1,
								}}
								className={classes.btn_medio}
								onChange={(event, value) => {
									setListPermisos([]);
									setRole(value ? value : null);
								}}
								options={listRoles}
								getOptionLabel={(value: any) => value.name}
								isOptionEqualToValue={(option: any | null, value: any) => option?.id === value.id}
								value={role || null}
								renderInput={(params: any) => (
									<TextField {...params} name='roles' label={`Cargo`} variant='outlined' />
								)}
							/>
							<Button
								onClick={handleSearchPermisos}
								disabled={department && role && !loading ? false : true}
								sx={{
									textTransform: 'none',
									fontSize: '1rem',
								}}
								variant='contained'
								color='primary'>
								<SearchIcon />
							</Button>
						</div>
					</div>
				</div>
				<div style={{ marginTop: '.2rem' }}>
					{!listPermisos.length ? (
						loading ? (
							<LoaderLine />
						) : null
					) : (
						<>
							<div style={{ height: 400 }}>
								<DataGrid
									headerHeight={30}
									rowHeight={25}
									columns={columns}
									sortModel={sortModel}
									onSortModelChange={(model) => setSortModel(model)}
									rows={listPermisos}
									rowsPerPageOptions={[25, 50, 100]}
								/>
							</div>
							<div className={classes.btn_stepM}>
								<Button
									onClick={handleSavePermiss}
									disabled={department && role ? false : true}
									sx={{
										mt: '1rem',
										textTransform: 'none',
										fontSize: '1rem',
									}}
									variant='contained'
									color='primary'>
									Guardar
								</Button>
							</div>
						</>
					)}
				</div>
			</form>
		</>
	);
};

export default EditarPermisos;
