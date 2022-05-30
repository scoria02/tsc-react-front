import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import ListImages from 'components/utilis/images/ListImages';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import React, { useContext } from 'react';
import { recaudo } from 'utils/recaudos';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';
import AlertDiferido from 'components/alert/AlertDiferido';

const DifStepActaConst: React.FC = () => {
	const classes = useStyles();
	const { commerce, listValidated, disabled, imagesActa, handleChangeImagesActa, deleteItemActa } =
		useContext(FMDiferidoContext);

	const imagenes: any = commerce.rc_constitutive_act;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<AlertDiferido
						disabled={disabled}
						msg={
							listValidated.id_typedif_consitutive_acta === 2
								? listValidated.valid_constitutive_act
								: 'Error Interno'
						}
					/>
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
