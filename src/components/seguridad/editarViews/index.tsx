/* eslint-disable react-hooks/exhaustive-deps */
import { useStyles } from './styles/styles';
import { Autocomplete, Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useState } from 'react';
import { editPermisos } from 'services/seguridad/permisos';
import SearchIcon from '@mui/icons-material/Search';
import { handleInfoText, handleLoadingSave } from 'utils/handleSwal';
import LoaderLine from 'components/loaders/LoaderLine';

interface Props {
	listDepartment: any[];
}

const EditarViews: React.FC<Props> = ({ listDepartment }) => {
	const classes = useStyles();

	const [department, setDepartment] = useState<any>(null);

	const [listViews, setListViews] = useState<any[]>([]);

	const [loading, setLoading] = useState(false);

	//console.log('per', listViews);

	const handleSaveViews = async () => {
		handleLoadingSave();
		if (department && listViews.length) {
			//console.log('buscar', department?.id);
			const res: any = await editPermisos.saveViews(department.id, listViews);
			if (res.ok) {
				handleInfoText('Guardado', `Se guardo el cambio de ${department?.name}`);
				setListViews([]);
			}
		}
	};

	const handleChange = (index: number) => {
		let aux: any[] = listViews;
		aux[index] = {
			...aux[index],
			status: !aux[index].status,
		};
		//console.log(index, aux);
		setListViews([...listViews]);
	};

	const handleSearchViews = async () => {
		//handleLoadingSearch();
		setLoading(true);
		setListViews([]);
		if (department) {
			//console.log('buscar', department?.id);
			const res: any = await editPermisos.getAllListViews(department.id);
			if (res.ok) {
				if (res.permiss.length) {
					setListViews(res.permiss);
				} else handleInfoText('Permisos', 'No existen permisos');
			}
			setLoading(false);
		}
	};

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
									setListViews([]);
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
							<Button
								onClick={handleSearchViews}
								disabled={department && !loading ? false : true}
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
					{!listViews.length ? (
						loading ? (
							<LoaderLine />
						) : null
					) : (
						<>
							<FormGroup>
								<div className={classes.containerListItem}>
									{listViews.map((item: any, index) => (
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
									onClick={handleSaveViews}
									disabled={department ? false : true}
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

export default EditarViews;
