import ImageIcon from '@mui/icons-material/Image';
import FMValidDataContext from 'context/Admision/Validation/FmContext';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { TextField, Avatar, Button, FormControlLabel, List, ListItem, ListItemText, Switch } from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import React, { useContext, useEffect, useState } from 'react';
//import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from 'store/actions/accept';
import classNames from 'classnames';
//Url
import { RootState } from 'store/store';
import { sxStyled, useStylesFM } from '../styles';

const StepPlanilla: React.FC = () => {
	const classes = useStylesFM();

	const { solic, handleChangeValid, listValidated } = useContext(FMValidDataContext);

	const { valid_planilla } = listValidated;
	const [state, setState] = useState(valid_planilla);
	const [openModal, setOpenModal] = useState<boolean>(false);

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
		handleChangeValid('valid_planilla', state);
	}, [state]);

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

	const imagenes: any = solic.rc_planilla;
	const url: string = process.env.REACT_APP_API_IMAGES + '/';

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<TextField
						sx={sxStyled.inputSelect}
						variant='outlined'
						required
						label='Tipo de Solicitud'
						name='typeSolict'
						value={solic?.id_type_request.name}
					/>
					<FormControlLabel
						control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
						className={classes.checkText}
						label={state.status ? 'Correcto' : 'Incorrecto'}
					/>
				</div>
				<List sx={sxStyled.container_ListActa} className={classes.container_ListActa}>
					{imagenes.map((item: any, index: number) => (
						<ListItem key={item.id} value={item.id}>
							<Button
								className={classes.link}
								href={url + item.id_photo.path}
								target='_blank'
								rel='noreferrer'
								key={item.id}>
								<Avatar>
									{item.id_photo.name.split('.')[item.id_photo.name.split('.').length - 1] === 'pdf' ? (
										<PictureAsPdfIcon />
									) : (
										<ImageIcon />
									)}
								</Avatar>
								<ListItemText
									className={classes.itemLink}
									primary={item.id_photo.name.split('@')[item.id_photo.name.split('.').length - 1]}
									secondary={index + 1}
								/>
							</Button>
						</ListItem>
					))}
				</List>
			</form>
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

export default StepPlanilla;
