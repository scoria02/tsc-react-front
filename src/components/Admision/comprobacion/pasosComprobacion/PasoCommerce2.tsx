import React, { useEffect, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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

export default function PasoCommerce2() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const rc_rif: any = useSelector((state: RootState) => state.acceptance.validado.rc_rif);
	const [state, setState] = useState(rc_rif);
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
	const handleIncorret = () => {
		dispatch(Valid({ rc_rif: state }));
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

	useEffect(() => {
		dispatch(Valid({ rc_rif:state }));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ 
			...state, 
			[event.target.name]: event.target.checked,
		});
		if(!event.target.checked)
			handleOpenModal();
	};

	const imagen:string = `${URL}:${PortFiles}/${fm.rc_rif.path}`;

	return (
		<>
			<div className={classes.check}>
				<FormControlLabel
					control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
					className={classes.checkText}
					label={state.status ? 'Correcto' : 'Incorrecto'}
				/>
			</div>
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
