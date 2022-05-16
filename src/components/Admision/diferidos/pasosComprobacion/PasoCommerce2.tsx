/* eslint-disable react-hooks/exhaustive-deps */
import { PhotoCamera } from '@mui/icons-material';
import { Button, FormControlLabel, IconButton, Switch } from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import RecDifPdf from 'components/utilis/images/RecDifPdf';
import RecPdf from 'components/utilis/images/RecPdf';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import React, { useEffect, useState, useContext } from 'react';
//import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from 'store/actions/accept';
//Url
import { RootState } from 'store/store';
import { recaudo } from 'utils/recaudos';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

export default function PasoCommerce2() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const valid_commerce: any = useSelector((state: RootState) => state.acceptance.validado.valid_commerce);
	const [state, setState] = useState(valid_commerce);
	const [openModal, setOpenModal] = useState<boolean>(false);

	const { fm, disabled, handleChangeClient, imagesForm, handleChangeImages, deleteImg, pathImages } =
		useContext(FMDiferidoContext);

	const [load, setLoad] = useState(false);

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

	const handleCancel = () => {
		handleCloseModal(true);
	};

	useEffect(() => {
		dispatch(Valid({ valid_commerce: state }));
	}, [state]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			[event.target.name]: event.target.checked,
		});
		if (!event.target.checked) handleOpenModal();
	};

	const imagen = imagesForm.rc_rif
		? pathImages.rc_rif.path
		: `${process.env.REACT_APP_API_IMAGES}/${fm.id_commerce.rc_rif.path}`;

	const typeImagen = imagesForm.rc_rif ? pathImages.rc_rif.type : null;

	return (
		<>
			<div className={classes.check}>
				<Button
					className={classes.imgIdent}
					variant='contained'
					disabled={disabled}
					style={{
						background: imagesForm.rc_rif && !disabled ? '#5c62c5' : '#D3D3D3',
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
							<IconButton aria-label='upload picture' component='span'>
								<PhotoCamera />
							</IconButton>
						</>
					)}
					<input type='file' hidden name='rc_rif' accept={recaudo.acc} onChange={handleChangeImages} />
				</Button>
			</div>
			<RecDifPdf load={load} setLoad={setLoad} imagen={imagen} type={typeImagen} />
			<ModalAlert
				from='valid_commerce'
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				state={state}
				setState={setState}
			/>
		</>
	);
}
