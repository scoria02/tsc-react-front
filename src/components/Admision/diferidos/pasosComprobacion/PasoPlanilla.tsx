import ImageIcon from '@mui/icons-material/Image';
import { PhotoCamera } from '@mui/icons-material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {
	Avatar,
	Button,
	IconButton,
	FormControlLabel,
	List,
	ListItem,
	ListItemText,
	Switch,
	TextareaAutosize,
	TextField,
} from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import React, { useContext, useEffect, useState } from 'react';
//import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from 'store/actions/accept';
//Url
import { RootState } from 'store/store';
import './styles/pasos.scss';
import { sxStyled, useStyles } from './styles/styles';

import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import { recaudo } from 'utils/recaudos';
import ListImages from 'components/utilis/images/ListImages';

const PasoPlanilla: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const valid_planilla: any = useSelector((state: RootState) => state.acceptance.validado.valid_planilla);
	const [state, setState] = useState(valid_planilla);
	const [openModal, setOpenModal] = useState<boolean>(false);

	const { fm, handleChange, imagePlanilla, handleChangePlanilla, removePlanilla } = useContext(FMDiferidoContext);

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
		dispatch(Valid({ valid_planilla: state }));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.status]);

	const handleCancel = () => {
		handleCloseModal(true);
	};

	const imagenes: any = fm.rc_planilla;
	const url: string = process.env.REACT_APP_API_IMAGES + '/';

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<TextareaAutosize
						className={classes.btn_stepText}
						maxRows={4}
						disabled
						defaultValue={fm.id_valid_request.valid_planilla}
						placeholder=''
					/>
				</div>
				<div className={classes.btn_stepM}>
					<Button
						className={classes.imgIdent}
						variant='contained'
						style={{
							background: imagePlanilla.length ? '#5c62c5' : '#f44336',
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
							name='rc_ref_bank'
							accept={recaudo.acc}
							onChange={handleChangePlanilla}
						/>
					</Button>
				</div>
			</form>
			<ListImages listImagen={imagePlanilla} imagenes={imagenes} />
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
