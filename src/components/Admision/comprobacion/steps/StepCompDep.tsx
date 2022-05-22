import { FormControlLabel, Switch, TextField } from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import RecPdf from 'components/utilis/images/RecPdf';
import FMValidDataContext from 'context/Admision/Validation/FmContext';
import React, { useContext, useEffect, useState } from 'react';
//import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from 'store/actions/accept';
//Url
import { RootState } from 'store/store';
import { useStyles } from './styles/styles';

const StepCompDep: React.FC = () => {
	//const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const classes = useStyles();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [load, setLoad] = useState(false);

	const { solic, handleChangeValid, listValidated } = useContext(FMValidDataContext);
	console.log(solic);

	const { valid_comp_dep } = listValidated;
	const [state, setState] = useState(valid_comp_dep);

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
		handleChangeValid('valid_comp_dep', state);
	}, [state]);

	const handleCancel = () => {
		handleCloseModal(true);
	};

	// const handleChangeI = (event: any) => {
	// 	setState({
	// 		...state,
	// 		[event.target.name]: event.target.value,
	// 	});
	// };

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			[event.target.name]: event.target.checked,
		});
		if (!event.target.checked) handleOpenModal();
	};

	const imagen = `${process.env.REACT_APP_API_IMAGES}/${solic.rc_ref_bank.path}`;

	/*
	const props = {
		zoomPosition: recaudo.position,
		height: recaudo.h,
		width: recaudo.w,
		img: ,
	};
	 */

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<TextField
						className={classes.btn_stepNro}
						label='Numero de Cuenta'
						value={solic.comp_dep}
						variant='outlined'
					/>
					<FormControlLabel
						control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
						className={classes.checkText}
						label={state.status ? 'Correcto' : 'Incorrecto'}
					/>
				</div>
				<RecPdf load={load} setLoad={setLoad} imagen={imagen} />
			</form>
			<ModalAlert
				from='valid_comp_dep'
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				state={state}
				setState={setState}
			/>
		</>
	);
};

export default StepCompDep;
