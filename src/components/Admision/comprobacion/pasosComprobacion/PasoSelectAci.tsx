import Autocomplete from '@mui/lab/Autocomplete';
import { TextField } from '@mui/material';
import { FC } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAci } from '../../../../store/actions/accept';
//Url
import { RootState } from '../../../../store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

const PasoSelectAci: FC<any> = ({ aci, setAci, listAci }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);

	const handleSelectAci = (event: any, value: any) => {
		dispatch(selectAci(value ? true : false));
		setAci(value);
	};

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className='comprobar_container_2'>
					<div>
						<div className={classes.btn_stepM}>
							<h2
								style={{
									marginTop: '10px',
									fontSize: '20px',
								}}>
								Ubicación del POS
							</h2>
						</div>
						<div className={classes.btn_stepM}>
							<TextField
								className={classes.btn_stepT}
								id='outlined-basic'
								label='Estado'
								value={fm.dir_pos[0].id_location.id_estado.estado}
								variant='outlined'
							/>
							<TextField
								className={classes.btn_stepT}
								id='outlined-basic'
								label='Ciudad'
								value={fm.dir_pos[0].id_location.id_ciudad.ciudad}
								variant='outlined'
							/>
						</div>
						<div className={classes.btn_stepM}>
							<TextField
								className={classes.btn_stepT}
								id='outlined-basic'
								label='Municipio'
								value={fm.dir_pos[0].id_location.id_municipio.municipio}
								variant='outlined'
							/>
							<TextField
								className={classes.btn_stepT}
								id='outlined-basic'
								label='Parroquia'
								value={fm.dir_pos[0].id_location.id_parroquia.parroquia}
								variant='outlined'
							/>
						</div>
						<div className={classes.btn_stepM}>
							<TextField
								className={classes.btn_stepT}
								id='outlined-basic'
								label='Cod. Postal'
								value={fm.dir_pos[0].id_location.id_ciudad.postal_code}
								variant='outlined'
							/>
							<TextField
								className={classes.btn_stepT}
								id='outlined-basic'
								label='Sector'
								value={fm.dir_pos[0].id_location.sector}
								variant='outlined'
							/>
						</div>
						<div className={classes.btn_stepM}>
							<TextField
								className={classes.btn_stepT}
								id='outlined-basic'
								label='Calle'
								value={fm.dir_pos[0].id_location.calle}
								variant='outlined'
							/>
							<TextField
								className={classes.btn_stepT}
								id='outlined-basic'
								label='Local'
								value={fm.dir_pos[0].id_location.local}
								variant='outlined'
							/>
						</div>
					</div>
					<div>
						<div className={classes.btn_stepM}>
							<h2
								style={{
									marginTop: '10px',
									fontSize: '20px',
								}}>
								Asignacion del ACI
							</h2>
						</div>
						<div className={classes.btn_stepM}>
							<Autocomplete
								className={classes.btn_medio}
								//disabled={} //si el comercio tiene aci traelo
								onChange={(event, value) => {
									handleSelectAci(event, value);
								}}
								options={listAci}
								value={aci || null}
								getOptionLabel={(option: any) =>
									option.aliNombres || option.aliIdentificacion
										? option.aliTipoIdentificacion + option.aliIdentificacion + ' | ' + option.aliNombres
										: ''
								}
								renderInput={(params: any) => (
									<TextField {...params} name='aci' label={`Buscar Aci`} variant='outlined' />
								)}
							/>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default PasoSelectAci;
