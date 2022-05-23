import { PhotoCamera } from '@mui/icons-material';
import { Alert, Button, IconButton, Stack } from '@mui/material';
import ListImages from 'components/utilis/images/ListImages';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import React, { useContext } from 'react';
import { recaudo } from 'utils/recaudos';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

const DifStepActaConst: React.FC = () => {
	const classes = useStyles();
	const { commerce, listValidated, disabled, imagesActa, handleChangeImagesActa, deleteItemActa } =
		useContext(FMDiferidoContext);

	const imagenes: any = commerce.rc_constitutive_act;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<Stack sx={{ width: '50%' }} spacing={2}>
						<Alert severity={disabled ? 'success' : 'error'}>
							{listValidated.id_typedif_consitutive_acta === 2
								? listValidated.valid_constitutive_act
								: 'Error Interno'}
						</Alert>
					</Stack>
				</div>
				<div className={classes.btn_stepM}>
					<Button
						disabled={disabled}
						className={classes.imgIdent}
						variant='contained'
						style={{
							background: imagesActa.length && !disabled ? '#5c62c5' : '#D3D3D3',
						}}
						component='label'>
						<IconButton aria-label='upload picture' component='span'>
							<PhotoCamera />
						</IconButton>
						<input
							type='file'
							multiple
							hidden
							name='rc_constitutive_act'
							accept={recaudo.acc}
							onChange={handleChangeImagesActa}
						/>
					</Button>
				</div>
				<ListImages
					listImagen={imagesActa}
					imagenes={imagenes}
					deleteItemImagenes={deleteItemActa}
					disabled={disabled}
				/>
			</form>
		</>
	);
};

export default DifStepActaConst;
