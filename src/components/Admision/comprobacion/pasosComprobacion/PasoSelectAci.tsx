import React, { useState, useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from '../../../../store/actions/accept';
//Url
import { PortFiles, URL } from '../../../../config';
import { RootState } from '../../../../store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';
import { ModalAlert } from '../../../modals/ModalAlert';

import Rec from '../../../utilis/images/Rec';

const PasoSelectAci: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const rc_special_contributor: any = useSelector((state: RootState) => state.acceptance.validado.rc_special_contributor);
	const [state, setState] = useState(rc_special_contributor);
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
		dispatch(Valid({rc_special_contributor:state}));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.status]);

	const handleIncorret = () => {
		dispatch(Valid({ rc_special_contributor: state }));
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

	return (
		<>
			<form className="container-step" noValidate autoComplete='off'>
					<div className='comprobar_container_2'>
						<div>
							<div className={classes.btn_stepM}>
								<TextField 
									className='btn_step btn_medio'
									id='outlined-basic'
									label='Ubicacion del POS'
									variant='outlined'
									disabled
								/>
							</div>
							<div className={classes.btn_stepM}>
								<TextField
									className={classes.btn_stepT}
									id='outlined-basic'
									label='Estado'
									value={fm.dir_pos[0].id_location.id_estado.estado}
									variant='outlined'
								/>
								<TextField
									className={classes.btn_stepT}
									id='outlined-basic'
									label='Ciudad'
									value={fm.dir_pos[0].id_location.id_ciudad.ciudad}
									variant='outlined'
								/>
							</div>
							<div className={classes.btn_stepM}>
								<TextField
									className={classes.btn_stepT}
									id='outlined-basic'
									label='Municipio'
									value={fm.dir_pos[0].id_location.id_municipio.municipio}
									variant='outlined'
								/>
								<TextField
									className={classes.btn_stepT}
									id='outlined-basic'
									label='Parroquia'
									value={fm.dir_pos[0].id_location.id_parroquia.parroquia}
									variant='outlined'
								/>
							</div>
							<div className={classes.btn_stepM}>
								<TextField
									className={classes.btn_stepT}
									id='outlined-basic'
									label='Cod. Postal'
									value={fm.dir_pos[0].id_location.id_ciudad.postal_code}
									variant='outlined'
								/>
								<TextField
									className={classes.btn_stepT}
									id='outlined-basic'
									label='Sector'
									value={fm.dir_pos[0].id_location.sector}
									variant='outlined'
								/>
							</div>
							<div className={classes.btn_stepM}>
								<TextField
									className={classes.btn_stepT}
									id='outlined-basic'
									label='Calle'
									value={fm.dir_pos[0].id_location.calle}
									variant='outlined'
								/>
								<TextField
									className={classes.btn_stepT}
									id='outlined-basic'
									label='Local'
									value={fm.id_commerce.id_location.local}
									variant='outlined'
								/>
							</div>
						</div>
						<div>
						<div className={classes.btn_stepM}>
							<TextField
								className='btn_step btn_medio'
								id='outlined-basic '
								label='Aci'
								variant='outlined'
								value='Aci'
								disabled
							/>
							<FormControlLabel
								className={classes.checkText}
								control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
								label='Correcto'
							/>
						</div>
					</div>
				</div>
			</form>
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

export default PasoSelectAci;
