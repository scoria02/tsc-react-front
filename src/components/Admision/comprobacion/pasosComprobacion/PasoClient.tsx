import { FormControlLabel, Switch, TextField } from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import RecPdf from 'components/utilis/images/RecPdf';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Url
import { Valid } from 'store/actions/accept';
import { RootState } from 'store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

export default function PasoClient() {
	const valid_cliente: any = useSelector((state: RootState) => state.acceptance.validado.valid_cliente);
	const dispatch = useDispatch();
	const classes = useStyles();
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const [state, setState] = React.useState(valid_cliente);
	const [openModal, setOpenModal] = React.useState<boolean>(false);

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

	useEffect(() => {
		dispatch(Valid({ valid_cliente: state }));
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

	const imagen = `${process.env.REACT_APP_API_IMAGES}/${fm.id_client.rc_ident_card.path}`;

	/*
	const props = {
		zoomPosition: recaudo.position,
		height: recaudo.h,
		width: recaudo.w,
		img: `${URL}:${PortFiles}/${fm.valid_cliente.path}`,
	};
	 */

	return (
		<form className={classes.containerStep} noValidate autoComplete='off'>
			<div className={classes.btn_stepM}>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Nombre'
					variant='outlined'
					value={fm.id_client.name}
				/>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Apellido'
					variant='outlined'
					value={fm.id_client.last_name}
				/>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Numero ID'
					variant='outlined'
					value={`${fm.id_client.id_ident_type.name} ${fm.id_client.ident_num}`}
				/>
				<FormControlLabel
					control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
					className={classes.checkText}
					label={state.status ? 'Correcto' : 'Incorrecto'}
				/>
			</div>
			<RecPdf load={load} setLoad={setLoad} imagen={imagen} />
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
