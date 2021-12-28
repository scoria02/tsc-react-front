import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Url
import { PortFiles, URL } from '../../../../config';
import { Valid } from '../../../../store/actions/accept';
import { RootState } from '../../../../store/store';
import { useStyles } from './styles/styles';
import './styles/pasos.scss';

import { ModalAlert } from '../../../modals/ModalAlert';

import Rec from '../../../utilis/images/Rec';

export default function PasoClient() {
	const rc_ident_card: any = useSelector((state: RootState) => state.acceptance.validado.rc_ident_card);
	const dispatch = useDispatch();
	const classes = useStyles();
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const [state, setState] = React.useState(rc_ident_card);
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
		dispatch(Valid({ rc_ident_card: state }));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.status]);

	const handleIncorret = () => {
		dispatch(Valid({ rc_ident_card: state }));
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

	const imagen = `${URL}:${PortFiles}/${fm.id_client.rc_ident_card.path}`;

	/*
	const props = {
		zoomPosition: recaudo.position,
		height: recaudo.h,
		width: recaudo.w,
		img: `${URL}:${PortFiles}/${fm.rc_ident_card.path}`,
	};
	 */

	return (
		<form className='container-step' noValidate autoComplete='off'>
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
			<Rec load={load} setLoad={setLoad} imagen={imagen} />
			<ModalAlert
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				state={state}
				handleChangeI={handleChangeI}
				handleIncorret={handleIncorret}
				handleCancel={handleCancel}
			/>
		</form>
	);
}
