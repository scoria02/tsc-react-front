import { FormControlLabel, Switch } from '@mui/material';
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
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

const StepContribuyenteSpecial: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	//const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);

	const [openModal, setOpenModal] = useState<boolean>(false);
	const [load, setLoad] = useState(false);

	const { commerce, handleChangeValid, listValidated } = useContext(FMValidDataContext);

	const { valid_special_contributor } = listValidated;
	const [state, setState] = useState(valid_special_contributor);

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
		handleChangeValid('valid_special_contributor', state);
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

	const imagen: string = `${process.env.REACT_APP_API_IMAGES}/${commerce.rc_special_contributor.path}`;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					{/* <TextField
						className={classes.btn_medio}
						id='outlined-basic '
						label='Contribuyente Especial'
						variant='outlined'
						value='Foto de Contribuyente Especial'
						disabled
					/> */}
					<FormControlLabel
						className={classes.checkText}
						control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
						label='Correcto'
					/>
				</div>
				<RecPdf load={load} setLoad={setLoad} imagen={imagen} />
			</form>
			<ModalAlert
				from='valid_special_contributor'
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				state={state}
				setState={setState}
			/>
		</>
	);
};

export default StepContribuyenteSpecial;
