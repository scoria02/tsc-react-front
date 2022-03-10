import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Avatar, Button, FormControlLabel, List, ListItem, ListItemText, Switch } from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import React, { useEffect } from 'react';
//import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from 'store/actions/accept';
//Url
import { RootState } from 'store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

const PasoActaConst: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const rc_constitutive_act: any = useSelector(
		(state: RootState) => state.acceptance.validado.rc_constitutive_act
	);
	const [state, setState] = React.useState(rc_constitutive_act);
	const [openModal, setOpenModal] = React.useState<boolean>(false);

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
		dispatch(Valid({ rc_constitutive_act: state }));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.status]);

	const handleIncorret = () => {
		dispatch(Valid({ rc_constitutive_act: state }));
		handleCloseModal(false);
	};

	const handleCancel = () => {
		handleCloseModal(true);
	};

	const handleChangeI = (event: any) => {
		setState({
			...state,
			[event.target.name]: event.target.value,
		});
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
					{/* <TextField
						className={classes.btn_medio}
						id='outlined-basic '
						label='Acta Constitutiva'
						variant='outlined'
						value={`Archivo${imagenes.length ? 's' : ''} de Acta Constitutiva`}
						disabled
					/> */}
					<FormControlLabel
						control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
						className={classes.checkText}
						label={state.status ? 'Correcto' : 'Incorrecto'}
					/>
				</div>
				<List className={classes.container_ListActa}>
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

			{/*
			<Rec 
				load={load}
				setLoad={setLoad}
				imagen={imagen}
			/>
				*/}
			<ModalAlert
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				state={state}
				handleChangeI={handleChangeI}
				handleIncorret={handleIncorret}
				handleCancel={handleCancel}
			/>
		</>
	);
};

export default PasoActaConst;
