import Autocomplete from '@mui/lab/Autocomplete';
import { TextField } from '@mui/material';
import { FC, useContext } from 'react';
//Redux
import './styles/pasos.scss';
import { useStyles } from './styles/styles';
import DataListAdmisionContext from 'context/DataList/DatalistAdmisionContext';
import FMValidDataContext from 'context/Admision/Validation/FMValidDataContext';

const StepSelectAci: FC = () => {
	const classes = useStyles();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars

	const { listAci } = useContext(DataListAdmisionContext);
	const { setAci, aci } = useContext(FMValidDataContext);

	const handleSelectAci = (event: any, value: any) => {
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
								Asignacion de Fuerza de Venta
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
									<TextField {...params} name='aci' label={`Buscar Fuerza de Venta`} variant='outlined' />
								)}
							/>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default StepSelectAci;
