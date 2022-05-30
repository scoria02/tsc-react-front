import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import RecDifPdf from 'components/utilis/images/RecDifPdf';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import React, { useContext, useState } from 'react';
import { recaudo } from 'utils/recaudos';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';
import AlertDiferido from 'components/alert/AlertDiferido';

const DifStepSpecialContributor: React.FC = () => {
	const classes = useStyles();
	const [load, setLoad] = useState(false);

	const { listValidated, commerce, disabled, imagesForm, handleChangeImages, pathImages } =
		useContext(FMDiferidoContext);

	const imagen = imagesForm.rc_special_contributor
		? pathImages.rc_special_contributor.path
		: `${process.env.REACT_APP_API_IMAGES}/${commerce.rc_special_contributor.path}`;

	const typeImagen = imagesForm.rc_special_contributor ? pathImages.rc_special_contributor.type : null;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<AlertDiferido
						disabled={disabled}
						msg={
							listValidated.id_typedif_special_contributor === 2
								? listValidated.valid_speid_typedif_special_contributor
								: 'Error Interno'
						}
					/>
				</div>
				<div className={classes.btn_stepM}>
					<Button
						className={classes.imgIdent}
						variant='contained'
						disabled={disabled}
						style={{
							background: imagesForm.rc_special_contributor && !disabled ? '#5c62c5' : '#D3D3D3',
						}}
						component='label'>
						<IconButton aria-label='upload picture' component='span'>
							<PhotoCamera />
						</IconButton>
						<input
							type='file'
							hidden
							name='rc_special_contributor'
							accept={recaudo.acc}
							onChange={handleChangeImages}
						/>
					</Button>
				</div>
				<RecDifPdf load={load} setLoad={setLoad} imagen={imagen} type={typeImagen} />
			</form>
		</>
	);
};

export default DifStepSpecialContributor;
