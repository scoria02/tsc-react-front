import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton, TextareaAutosize } from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import RecDifPdf from 'components/utilis/images/RecDifPdf';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from 'store/actions/accept';
import { RootState } from 'store/store';
import { recaudo } from 'utils/recaudos';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

const PasoContriSpecial: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const valid_special_contributor: any = useSelector(
		(state: RootState) => state.acceptance.validado.valid_special_contributor
	);
	const [state, setState] = useState(valid_special_contributor);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [load, setLoad] = useState(false);

	const { fm, disabled, imagesForm, handleChangeImages, pathImages } = useContext(FMDiferidoContext);

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
		dispatch(Valid({ valid_special_contributor: state }));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.status]);

	const imagen = imagesForm.rc_special_contributor
		? pathImages.rc_special_contributor.path
		: `${process.env.REACT_APP_API_IMAGES}/${fm.id_commerce.rc_special_contributor.path}`;

	const typeImagen = imagesForm.rc_special_contributor ? pathImages.rc_special_contributor.type : null;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					{fm.id_valid_request.id_typedif_special_contributor === 2 ? (
						<TextareaAutosize
							className={classes.btn_stepText}
							maxRows={4}
							disabled
							defaultValue={fm.id_valid_request.valid_special_contributor}
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
			<ModalAlert
				from='valid_special_contributor'
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				state={state}
				setState={setState}
			/>
		</>
	);
};

export default PasoContriSpecial;
