import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import React, { useEffect, useState } from 'react';
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
	const rc_ident_card: any = useSelector((state: RootState) => state.acceptance.validado.rc_ident_card);

	const dispatch = useDispatch();
	const classes = useStyles();
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const [state, setState] = React.useState(rc_ident_card);//falta
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
		width: 450,
		//falta
		img: `${URL}:${PortFiles}/${fm.rc_ident_card.path}`,
	};

	return (
		<>
			<form className="container-step" noValidate autoComplete='off'>
			</form>
				<div className={classes.btn_stepM}>
					<FormControlLabel
						control={<Switch
							checked={state.status}
							onChange={handleChange}
							name='status'
							color='primary'
							/>}
						className={classes.checkText}
						label={state.status ? 'Correcto' : 'Incorrecto'}
					/>
				</div>
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

