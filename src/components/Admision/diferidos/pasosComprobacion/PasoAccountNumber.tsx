import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton, Switch, TextareaAutosize, TextField } from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import React, { useContext, useEffect, useState } from 'react';
//import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from 'store/actions/accept';
//Url
import { RootState } from 'store/store';
import { useStyles } from './styles/styles';
import { recaudo } from 'utils/recaudos';
import RecDifPdf from 'components/utilis/images/RecDifPdf';

export default function PasoAccountNumber() {
	//const fm: any = useSelector((state: RootState) => state.fmAdmision.diferido);
	const valid_ref_bank: any = useSelector((state: RootState) => state.acceptance.validado.valid_ref_bank);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [state, setState] = useState(valid_ref_bank);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [load, setLoad] = useState(false);

	const { fm, handleChange, imagesForm, handleChangeImages, deleteImg, pathImages } =
		useContext(FMDiferidoContext);

	const handleOpenModal = () => {
		handleCancel();
		setOpenModal(true);
	};

	const handleCloseModal = (cancel: boolean) => {
		if (cancel) {
			setState({
				...state,
				status: !state.status,
			});
		}
		setOpenModal(false);
	};

	useEffect(() => {
		dispatch(Valid({ valid_ref_bank: state }));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.status]);

	const handleCancel = () => {
		handleCloseModal(true);
	};

	const handleChangeBank = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (/^[0-9]+$/.test(event.target.value) || event.target.value === '') {
			handleChange(event);
		}
	};

	console.log('lll ', pathImages.rc_ref_bank.path);

	const imagen = imagesForm.rc_ref_bank
		? pathImages.rc_ref_bank.path
		: `${process.env.REACT_APP_API_IMAGES}/${fm.rc_ref_bank.path}`;

	const typeImagen = imagesForm.rc_ref_bank ? pathImages.rc_ref_bank.type : null;

	/*
	const props = {
		zoomPosition: recaudo.position,
		height: recaudo.h,
		width: recaudo.w,
		img: ,
	};
	 */

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					{fm.id_valid_request.id_typedif_ref_bank === 2 ? (
						<TextareaAutosize
							className={classes.btn_stepText}
							maxRows={4}
							disabled
							defaultValue={fm.id_valid_request.valid_ref_bank}
							placeholder=''
						/>
					) : (
						<h2 className={classes.btn_stepTextInterno}> Error Interno </h2>
					)}
				</div>
				<div className={classes.btn_stepM}>
					<TextField
						className={classes.btn_stepNro}
						label='Numero de Cuenta'
						name='bank_account_num'
						onChange={handleChangeBank}
						value={fm.bank_account_num}
						inputProps={{ maxLength: 20 }}
						variant='outlined'
					/>
					<Button
						className={classes.imgIdent}
						variant='contained'
						style={{
							background: imagesForm.rc_ref_bank ? '#5c62c5' : '#f44336',
						}}
						component='label'>
						{imagesForm.rc_ref_bank !== null ? (
							<>
								<IconButton aria-label='upload picture' component='span'>
									<PhotoCamera />
								</IconButton>
							</>
						) : (
							<>
								{/*<b>Subir</b>*/}
								<IconButton aria-label='upload picture' component='span'>
									<PhotoCamera />
								</IconButton>
							</>
						)}
						<input type='file' hidden name='rc_ref_bank' accept={recaudo.acc} onChange={handleChangeImages} />
					</Button>
				</div>
				<RecDifPdf load={load} setLoad={setLoad} imagen={imagen} type={typeImagen} />
			</form>
			<ModalAlert
				from='valid_ref_bank'
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				state={state}
				setState={setState}
			/>
		</>
	);
}
