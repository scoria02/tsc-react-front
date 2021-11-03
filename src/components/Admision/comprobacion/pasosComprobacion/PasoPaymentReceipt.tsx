import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
// @ts-expect-error
import ReactImageZoom from 'react-image-zoom';
import { useDispatch, useSelector } from 'react-redux';
//Url
import { PortFiles, URL } from '../../../../config';
import { Valid } from '../../../../store/actions/accept';
import { RootState } from '../../../../store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

import { ModalAlert }from '../ModalAlert';

export default function PasoPaymentReceipt() {
	//falta
	const rc_comp_dep: any = useSelector((state: RootState) => state.acceptance.validado.rc_comp_dep);

	const dispatch = useDispatch();
	const classes = useStyles();
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const [state, setState] = useState(rc_comp_dep);//falta
	const [openModal, setOpenModal] = useState<boolean>(false);

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
		dispatch(Valid({ rc_comp_dep: state }));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.status]);

	const handleIncorret = () => {
		dispatch(Valid({ rc_comp_dep: state }));
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

	const props = {
		zoomPosition: 'original',
		height: 350,
		width: 500,
		img: `${URL}:${PortFiles}/${fm.rc_comp_dep.path}`,
	};

	return (
		<>
			<form className="container-step" noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<TextField
						className='btn_step btn_medio'
						id='outlined-basic '
						label='Comprobantede pago'
						variant='outlined'
						value={fm.nro_comp_dep}
						disabled
					/>
					<FormControlLabel
						className={classes.checkText}
						control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
						label='Correcto'
					/>
				</div>
			</form>
			<div className='img_container'>
				<ReactImageZoom className={classes.img_zoom} {...props} />
			</div>
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

