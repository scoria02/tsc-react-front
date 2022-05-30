import { Button, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import ListImages from 'components/utilis/images/ListImages';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import React, { useContext, useState } from 'react';
import { useStyles } from './styles/styles';
import { recaudo } from 'utils/recaudos';
import AlertDiferido from 'components/alert/AlertDiferido';

const DifStepPlanilla: React.FC = () => {
	const classes = useStyles();

	const { solic, listValidated, disabled, imagePlanilla, handleChangePlanilla, deleteItemPlanilla } =
		useContext(FMDiferidoContext);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [imagenes, setImagenes] = useState(solic?.rc_planilla);

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<AlertDiferido
						disabled={disabled}
						msg={listValidated.id_typedif_planilla === 2 ? listValidated.valid_planilla : 'Error Interno'}
					/>
					{disabled ? null : (
						<Button
							disabled={disabled}
							className={classes.imgIdent}
							variant='contained'
							style={{
								background: imagePlanilla.length && !disabled ? '#5c62c5' : '#D3D3D3',
							}}
							component='label'>
							<IconButton aria-label='upload picture' component='span'>
								<PhotoCamera />
							</IconButton>
							<input
								type='file'
								multiple
								hidden
								name='rc_planilla'
								accept={recaudo.acc}
								onChange={handleChangePlanilla}
							/>
						</Button>
					)}
				</div>
				{imagenes && (
					<ListImages
						listImagen={imagePlanilla}
						imagenes={imagenes}
						deleteItemImagenes={deleteItemPlanilla}
						disabled={disabled}
					/>
				)}
			</form>
		</>
	);
};

export default DifStepPlanilla;
