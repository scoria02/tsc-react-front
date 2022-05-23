import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton, TextareaAutosize, TextField } from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
//Url
import { Valid } from 'store/actions/accept';
import { RootState } from 'store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';
import { recaudo } from 'utils/recaudos';
import RecDifPdf from 'components/utilis/images/RecDifPdf';

export default function PasoClient() {
	const valid_cliente: any = useSelector((state: RootState) => state.acceptance.validado.valid_cliente);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [state, setState] = React.useState(valid_cliente);
	const [openModal, setOpenModal] = React.useState<boolean>(false);

	const { fm, disabled, handleChangeClient, imagesForm, handleChangeImages, pathImages } =
		useContext(FMDiferidoContext);

	const [load, setLoad] = useState(false);

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
		dispatch(Valid({ valid_cliente: state }));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.status]);

	console.log(imagesForm);
	console.log(pathImages);

	const imagen = imagesForm.rc_ident_card
		? pathImages.rc_ident_card.path
		: `${process.env.REACT_APP_API_IMAGES}/${fm.id_client.rc_ident_card.path}`;

	const typeImagen = imagesForm.rc_ident_card ? pathImages.rc_ident_card.type : null;

	return (
		<form className={classes.containerStep} noValidate autoComplete='off'>
			<div className={classes.btn_stepM}>
				{fm.id_valid_request.id_typedif_client === 2 ? (
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
					disabled={disabled}
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Nombre'
					variant='outlined'
					name='email'
					value={fm.id_client.email}
					onChange={handleChangeClient}
				/>
				<TextField
					disabled={disabled}
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Nombre'
					variant='outlined'
					name='name'
					value={fm.id_client.name}
					onChange={handleChangeClient}
				/>
				<TextField
					disabled={disabled}
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Apellido'
					variant='outlined'
					name='last_name'
					value={fm.id_client.last_name}
					onChange={handleChangeClient}
				/>
				<TextField
					disabled={disabled}
					className={classes.btn_stepT}
					id='outlined-basic'
					variant='outlined'
					label='Numero ID'
					name='ident_num'
					onChange={(e: any) => {
						e.target.value = e.target.value.slice(2, e.target.value.length);
						handleChangeClient(e);
					}}
					value={`${fm.id_client.id_ident_type.name} ${fm.id_client.ident_num}`}
				/>
				<Button
					className={classes.imgIdent}
					variant='contained'
					disabled={disabled}
					style={{
						background: imagesForm.rc_ident_card && !disabled ? '#5c62c5' : '#D3D3D3',
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
					<input type='file' hidden name='rc_ident_card' accept={recaudo.acc} onChange={handleChangeImages} />
				</Button>
			</div>
			<RecDifPdf load={load} setLoad={setLoad} imagen={imagen} type={typeImagen} />
			<ModalAlert
				from='valid_cliente'
				openModal={openModal}
				state={state}
				setState={setState}
				handleCloseModal={handleCloseModal}
			/>
		</form>
	);
}
