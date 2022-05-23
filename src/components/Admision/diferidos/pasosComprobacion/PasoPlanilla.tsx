import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton, TextareaAutosize } from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import React, { useContext, useEffect, useState } from 'react';
//import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from 'store/actions/accept';
//Url
import { RootState } from 'store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import { recaudo } from 'utils/recaudos';
import ListImages from 'components/utilis/images/ListImages';

const PasoPlanilla: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const valid_planilla: any = useSelector((state: RootState) => state.acceptance.validado.valid_planilla);
	const [state, setState] = useState(valid_planilla);
	const [openModal, setOpenModal] = useState<boolean>(false);

	const { fm, disabled, imagePlanilla, handleChangePlanilla, deleteItemPlanilla } = useContext(FMDiferidoContext);

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
		dispatch(Valid({ valid_planilla: state }));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.status]);

	const imagenes: any[] = fm.rc_planilla;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					{fm.id_valid_request.id_typedif_planilla === 2 ? (
						<TextareaAutosize
							className={classes.btn_stepText}
							maxRows={4}
							disabled
							defaultValue={fm.id_valid_request.valid_planilla}
							placeholder=''
						/>
					) : (
						<h2 className={classes.btn_stepTextInterno}> Error Interno </h2>
					)}
				</div>
				<div className={classes.btn_stepM}>
					<Button
						className={classes.imgIdent}
						variant='contained'
						disabled={disabled}
						style={{
							background: imagePlanilla.length && !disabled ? '#5c62c5' : '#D3D3D3',
						}}
						component='label'>
						{!imagePlanilla.length ? (
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
						<input
							type='file'
							multiple
							hidden
							name='rc_planilla'
							accept={recaudo.acc}
							onChange={handleChangePlanilla}
						/>
					</Button>
				</div>
			</form>
			<ListImages listImagen={imagePlanilla} imagenes={imagenes} deleteItemImagenes={deleteItemPlanilla} />
			<ModalAlert
				from='valid_planilla'
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				state={state}
				setState={setState}
			/>
		</>
	);
};

export default PasoPlanilla;
