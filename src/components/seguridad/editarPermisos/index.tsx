/* eslint-disable react-hooks/exhaustive-deps */
import { useStyles } from './styles/styles';
import { Autocomplete, Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { editPermisos } from 'services/seguridad/permisos';
import SearchIcon from '@mui/icons-material/Search';
import { handleInfoText, handleLoadingSave } from 'utils/handleSwal';
import LoaderLine from 'components/loaders/LoaderLine';

const EditarPermisos: React.FC = () => {
	const classes = useStyles();
	// const { user } = useSelector((state: any) => state.auth);
	// const { permiss }: any = user;

	const [listDepartment, setListDepartment] = useState([]);
	const [listRoles, setListRoles] = useState([]);

	const [department, setDepartment] = useState<any>(null);
	const [role, setRole] = useState<any>(null);

	const [listPermisos, setListPermisos] = useState<any[]>([]);

	const [loading, setLoading] = useState(false);

	//const [role, setRole] = useState(null);

	console.log('per', listPermisos);

	const handleSavePermiss = async () => {
		handleLoadingSave();
		if (department && role && listPermisos.length) {
			console.log('buscar', department?.id, role?.id);
			const res: any = await editPermisos.getSavePermiss(department.id, role.id, listPermisos);
			if (res.ok) {
				handleInfoText('Guardado', `Se guardo el cambio de ${department?.name} / ${role?.name}`);
				setListPermisos([]);
			}
		}
	};

	const handleChange = (index: number) => {
		let aux: any[] = listPermisos;
		aux[index] = {
			...aux[index],
			status: !aux[index].status,
		};
		console.log(index, aux);
		setListPermisos([...listPermisos]);
	};

	const getList = async () => {
		const res: any = await editPermisos.getAllListSeguridad();
		console.log(res);
		if (res.departments.length) {
			setListDepartment(res.departments);
		}
		if (res.roles.length) {
			setListRoles(res.roles);
		}
	};

	const handleSearchPermisos = async () => {
		//handleLoadingSearch();
		setLoading(true);
		setListPermisos([]);
		if (department && role) {
			console.log('buscar', department?.id, role?.id);
			const res: any = await editPermisos.getAllListPermiss(department.id, role.id);
			if (res.ok) {
				if (res.permiss.length) {
					setListPermisos(res.permiss);
					setLoading(false);
				} else handleInfoText('Permisos', 'No existen permisos');
			}
		}
	};

	useLayoutEffect(() => {
		if (!listDepartment.length || !listRoles) getList();
	}, []);

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
									<TextField {...params} name='roles' label={`Roles`} variant='outlined' />
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
				<div style={{ marginTop: '1rem' }}>
					{!listPermisos.length ? (
						loading ? (
							<LoaderLine />
						) : null
					) : (
						<>
							<FormGroup>
								<div className={classes.containerListItem}>
									{listPermisos.map((item: any, index) => (
										<FormControlLabel
											key={item.id}
											control={<Checkbox checked={item.status} onChange={() => handleChange(index)} />}
											label={item.name}
										/>
									))}
								</div>
							</FormGroup>
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
