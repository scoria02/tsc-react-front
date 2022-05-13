/* eslint-disable react-hooks/exhaustive-deps */
import { FormControlLabel, Switch, TextField } from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import RecPdf from 'components/utilis/images/RecPdf';
import React, { useEffect, useState } from 'react';
//import ReactImageZoom from 'react-image-zoom';
import { useDispatch, useSelector } from 'react-redux';
//Url
import { Valid } from 'store/actions/accept';
import { RootState } from 'store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

export default function PasoPaymentReceipt() {
	//falta
	const valid_comp_dep: any = useSelector((state: RootState) => state.acceptance.validado.valid_comp_dep);

	const dispatch = useDispatch();
	const classes = useStyles();
	const fm: any = useSelector((state: RootState) => state.fmAdmision.diferido);
	const [state, setState] = useState(valid_comp_dep); //falta
	const [openModal, setOpenModal] = useState<boolean>(false);
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
		dispatch(Valid({ valid_comp_dep: state }));
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

	const imagen: string = `${process.env.REACT_APP_API_IMAGES}/${fm.rc_comp_dep.path}`;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<TextField
						className={classes.btn_stepNro}
						id='outlined-basic '
						label='Nro comprobante'
						value={fm.nro_comp_dep}
						variant='outlined'
					/>
					<FormControlLabel
						className={classes.checkText}
						control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
						label='Correcto'
					/>
				</div>
			</form>
			<RecPdf load={load} setLoad={setLoad} imagen={imagen} />
			<ModalAlert
				from='valid_comp_dep'
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				state={state}
				setState={setState}
			/>
		</>
	);
}
