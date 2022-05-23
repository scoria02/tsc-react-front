import { PhotoCamera } from '@mui/icons-material';
import { Button, FormControlLabel, IconButton, Switch, Stack, Alert } from '@mui/material';
import RecDifPdf from 'components/utilis/images/RecDifPdf';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import React, { useContext, useEffect, useState } from 'react';
//import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from 'store/actions/accept';
//Url
import { RootState } from 'store/store';
import { recaudo } from 'utils/recaudos';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

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
					<Stack sx={{ width: '50%' }} spacing={2}>
						<Alert severity={disabled ? 'success' : 'error'}>
							{listValidated.id_typedif_special_contributor === 2
								? listValidated.valid_special_contributor
								: 'Error Interno'}
						</Alert>
					</Stack>
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
