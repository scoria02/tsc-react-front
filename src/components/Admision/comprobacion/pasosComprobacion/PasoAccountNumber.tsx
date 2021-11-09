import React, { useState, useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
//import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from '../../../../store/actions/accept';
//Url
import { PortFiles, URL } from '../../../../config';
import { RootState } from '../../../../store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

import { ModalAlert }from '../ModalAlert';

import Rec from '../../../utilis/images/Rec';

export default function PasoAccountNumber() {
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);

	const rc_ref_bank: any = useSelector((state: RootState) => state.acceptance.validado.rc_ref_bank);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [state, setState] = useState(rc_ref_bank);
	const [openModal, setOpenModal] = useState<boolean>(false);
  const [load, setLoad] = useState(false)

	const handleOpenModal = () => {
		handleCancel()
		setOpenModal(true);
	};

	const handleCloseModal = (cancel: boolean) => {
		if(cancel){
			setState({ 
				...state, 
				status: !state.status,
			});
		}
		setOpenModal(false);
	};

	useEffect(() => {
		dispatch(Valid({rc_ref_bank:state}));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.status]);

	const handleIncorret = () => {
		dispatch(Valid({ rc_ref_bank: state }));
		handleCloseModal(false);
	};

	const handleCancel = () => {
		handleCloseModal(true);
	};

	const handleChangeI = (event:any) => {
		setState({ 
			...state, 
			[event.target.name]: event.target.value,
		});
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ 
			...state, 
			[event.target.name]: event.target.checked,
		});
		if(!event.target.checked)
			handleOpenModal();
	};

	const imagen = `${URL}:${PortFiles}/${fm.rc_ref_bank.path}`;

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
			<form className="container-step" noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<TextField
						className={classes.btn_stepNro}
						label='Numero de Cuenta'
						value={fm.bank_account_num}
						variant='outlined'
					/>
					<FormControlLabel
						control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
						className={classes.checkText}
						label={state.status ? 'Correcto' : 'Incorrecto'}
					/>
				</div>
			</form>
			<Rec 
				load={load}
				setLoad={setLoad}
				imagen={imagen}
			/>
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
}

