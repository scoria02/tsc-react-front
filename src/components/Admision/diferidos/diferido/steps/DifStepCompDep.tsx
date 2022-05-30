import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import RecDifPdf from 'components/utilis/images/RecDifPdf';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { useStyles } from './styles/styles';
import { recaudo } from 'utils/recaudos';
import AlertDiferido from 'components/alert/AlertDiferido';

const DifStepCompDep: React.FC = () => {
	const classes = useStyles();
	const [load, setLoad] = useState(false);

	const { solic, errorSolic, listValidated, disabled, handleChange, imagesForm, handleChangeImages, pathImages } =
		useContext(FMDiferidoContext);

	const [imagen, setImagen] = useState('');

	useLayoutEffect(() => {
		if (solic) {
			setImagen(
				imagesForm.rc_comp_dep
					? pathImages.rc_comp_dep.path
					: `${process.env.REACT_APP_API_IMAGES}/${solic?.rc_comp_dep?.path}`
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [solic?.rc_comp_dep, pathImages.rc_comp_dep]);

	const typeImagen = imagesForm.rc_comp_dep ? pathImages.rc_comp_dep.type : null;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<AlertDiferido
						disabled={disabled}
						msg={listValidated.id_typedif_comp_num === 2 ? listValidated.valid_comp_dep : 'Error Interno'}
					/>
					<TextField
						disabled={disabled}
						className={classes.btn_stepNro}
						label='Numero de Comprobate'
						variant='outlined'
						name='nro_comp_dep'
						inputProps={{ maxLength: 15 }}
						onChange={handleChange}
						error={errorSolic.nro_comp_dep}
						value={solic?.nro_comp_dep || 'No tiene numero'}
					/>
					<Button
						className={classes.imgIdent}
						variant='contained'
						disabled={disabled}
						style={{
							background: imagesForm.rc_comp_dep && !disabled ? '#5c62c5' : '#D3D3D3',
						}}
						component='label'>
						<IconButton aria-label='upload picture' component='span'>
							<PhotoCamera />
						</IconButton>
						<input type='file' hidden name='rc_comp_dep' accept={recaudo.acc} onChange={handleChangeImages} />
					</Button>
				</div>
				<RecDifPdf load={load} setLoad={setLoad} imagen={imagen} type={typeImagen} />
			</form>
		</>
	);
};

export default DifStepCompDep;
