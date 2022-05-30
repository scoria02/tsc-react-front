import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import RecDifPdf from 'components/utilis/images/RecDifPdf';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { useStyles } from './styles/styles';
import { useStylesFM } from '../styles';
import { recaudo } from 'utils/recaudos';
import AlertDiferido from 'components/alert/AlertDiferido';

const DifStepRefBank: React.FC = () => {
	const classes = useStyles();
	const classes2 = useStylesFM();
	const [load, setLoad] = useState(false);

	const { solic, errorSolic, listValidated, disabled, handleChange, imagesForm, handleChangeImages, pathImages } =
		useContext(FMDiferidoContext);

	const [imagen, setImagen] = useState('');

	useLayoutEffect(() => {
		if (solic) {
			setImagen(
				imagesForm.rc_ref_bank
					? pathImages.rc_ref_bank.path
					: `${process.env.REACT_APP_API_IMAGES}/${solic?.rc_ref_bank?.path}`
			);
		}
	}, [solic?.rc_ref_bank, pathImages.rc_ref_bank, solic, imagesForm.rc_ref_bank]);

	const typeImagen = imagesForm.rc_ref_bank ? pathImages.rc_ref_bank.type : null;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes2.grid}>
					<AlertDiferido
						disabled={disabled}
						msg={listValidated.id_typedif_ref_bank === 2 ? listValidated.valid_ref_bank : 'Error Interno'}
					/>
					<div className={classes2.input}>
						<TextField
							disabled={disabled}
							className={classes.btn_stepNro}
							label='Numero de Cuenta'
							variant='outlined'
							name='bank_account_num'
							onChange={handleChange}
							error={errorSolic.bank_account_num}
							value={solic?.bank_account_num}
							inputProps={{ maxLength: 20 }}
						/>
						{disabled ? null : (
							<Button
								className={classes.imgIdent}
								variant='contained'
								disabled={disabled}
								style={{
									background: imagesForm.rc_ref_bank && !disabled ? '#5c62c5' : '#D3D3D3',
								}}
								component='label'>
								<IconButton aria-label='upload picture' component='span'>
									<PhotoCamera />
								</IconButton>
								<input type='file' hidden name='rc_ref_bank' accept={recaudo.acc} onChange={handleChangeImages} />
							</Button>
						)}
					</div>
				</div>
				<div style={{ marginRight: '0px' }} className={classes.btn_stepNro}></div>
				<RecDifPdf load={load} setLoad={setLoad} imagen={imagen} type={typeImagen} />
			</form>
		</>
	);
};

export default DifStepRefBank;
