import Autocomplete from '@mui/lab/Autocomplete';
import { TextField } from '@mui/material';
import { FC } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAci } from 'store/actions/accept';
//Url
import { RootState } from 'store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

const PasoSelectAci: FC<any> = ({ aci, setAci, listAci }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);

	const handleSelectAci = (event: any, value: any) => {
		dispatch(selectAci(value ? true : false));
		setAci(value);
	};

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.wrapperGrid}>
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
