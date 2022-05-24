import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Avatar, Button, FormControlLabel, List, ListItem, ListItemText, Switch } from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import FMValidDataContext from 'context/Admision/Validation/FMValidDataContext';
import React, { useContext, useEffect, useState } from 'react';
import './styles/pasos.scss';
import { sxStyled, useStyles } from './styles/styles';

const StepActaConst: React.FC = () => {
	const classes = useStyles();
	const [openModal, setOpenModal] = React.useState<boolean>(false);

	const { commerce, handleChangeValid, listValidated } = useContext(FMValidDataContext);

	const { valid_constitutive_act } = listValidated;
	const [state, setState] = useState(valid_constitutive_act);

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
		//console.log(state);
		handleChangeValid('valid_constitutive_act', state);
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

	const imagenes: any = commerce.rc_constitutive_act;
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
				<List sx={sxStyled.container_ListActa}>
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
				from='valid_constitutive_act'
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				state={state}
				setState={setState}
			/>
		</>
	);
};

export default StepActaConst;
