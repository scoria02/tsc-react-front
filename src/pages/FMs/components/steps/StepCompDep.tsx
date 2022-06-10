import { FormControlLabel, Switch, TextField } from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import RecPdf from 'components/images/RecPdf';
import FMValidDataContext from 'context/Admision/Validation/FMValidDataContext';
import React, { useContext, useEffect, useState } from 'react';
//Redux
import { useStyles } from './styles/styles';

const StepCompDep: React.FC = () => {
	//const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const classes = useStyles();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [load, setLoad] = useState(false);

	const { solic, handleChangeValid, listValidated } = useContext(FMValidDataContext);
	//console.log(solic);

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
		handleChangeValid('valid_comp_dep', state);
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

	const imagen = `${process.env.REACT_APP_API_IMAGES}/${solic.rc_comp_dep.path}`;

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
					<TextField className={classes.btn_stepNro} label='Numero de comprobante' value={solic?.nro_comp_dep} />
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
