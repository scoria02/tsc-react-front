import { PhotoCamera } from '@mui/icons-material';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {
	Avatar,
	Button,
	FormControlLabel,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Switch,
	TextareaAutosize,
} from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import ListImages from 'components/utilis/images/ListImages';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import React, { useContext, useEffect } from 'react';
//import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from 'store/actions/accept';
//Url
import { RootState } from 'store/store';
import { recaudo } from 'utils/recaudos';
import './styles/pasos.scss';
import { sxStyled, useStyles } from './styles/styles';

const PasoActaConst: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const valid_constitutive_act: any = useSelector(
		(state: RootState) => state.acceptance.validado.valid_constitutive_act
	);
	const [state, setState] = React.useState(valid_constitutive_act);
	const [openModal, setOpenModal] = React.useState<boolean>(false);

	const {
		fm,
		imagesActa,
		disabled,
		handleChangeImagesActa,
		imagePlanilla,
		handleChangePlanilla,
		removePlanilla,
		deleteItemActa,
	} = useContext(FMDiferidoContext);

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
		dispatch(Valid({ valid_constitutive_act: state }));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.status]);

	const handleCancel = () => {
		handleCloseModal(true);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			[event.target.name]: event.target.checked,
		});
		if (!event.target.checked) handleOpenModal();
	};

	const imagenes: any = fm.id_commerce.rc_constitutive_act;
	const url: string = process.env.REACT_APP_API_IMAGES + '/';

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					{fm.id_valid_request.id_typedif_consitutive_acta === 2 ? (
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
					<Button
						className={classes.imgIdent}
						variant='contained'
						style={{
							background: imagesActa.length && !disabled ? '#5c62c5' : '#D3D3D3',
						}}
						component='label'>
						<IconButton aria-label='upload picture' component='span'>
							<PhotoCamera />
						</IconButton>
						<input
							type='file'
							multiple
							hidden
							name='rc_constitutive_act'
							accept={recaudo.acc}
							onChange={handleChangeImagesActa}
						/>
					</Button>
				</div>
			</form>
			<ListImages listImagen={imagesActa} imagenes={imagenes} deleteItemImagenes={deleteItemActa} />
			<ModalAlert
				from='valid_constitutive_act'
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				state={state}
				setState={setState}
			/>
		</>
	);
};

export default PasoActaConst;
