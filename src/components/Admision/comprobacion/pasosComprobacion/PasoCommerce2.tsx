/* eslint-disable react-hooks/exhaustive-deps */
import { FormControlLabel, Switch } from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import RecPdf from 'components/utilis/images/RecPdf';
import React, { useEffect, useState } from 'react';
//import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from 'store/actions/accept';
//Url
import { RootState } from 'store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

export default function PasoCommerce2() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const valid_commerce: any = useSelector((state: RootState) => state.acceptance.validado.valid_commerce);
	const [state, setState] = useState(valid_commerce);
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

	const imagen: string = `${process.env.REACT_APP_API_IMAGES}/${fm.id_commerce.rc_rif.path}`;

	return (
		<>
			<div className={classes.check}>
				<FormControlLabel
					control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
					className={classes.checkText}
					label={state.status ? 'Correcto' : 'Incorrecto'}
				/>
			</div>
			<RecPdf load={load} setLoad={setLoad} imagen={imagen} />
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
