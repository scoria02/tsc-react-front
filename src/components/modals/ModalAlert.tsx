/* eslint-disable react-hooks/exhaustive-deps */
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineSharp';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import DataListAdmisionContext from 'context/DataList/DatalistAdmisionContext';
import { useContext, useState } from 'react';
import AnimationModal from './AnimationModal';
import './scss/modalAlert.scss';
import { useStylesModalAlert } from './styles';

interface Props {
	from: string;
	openModal: any;
	handleCloseModal: any;
	state: any;
	setState: React.Dispatch<any>;
}

export const ModalAlert: React.FC<Props> = ({ from, openModal, handleCloseModal, state, setState }) => {
	const classes = useStylesModalAlert();
	const [razon, setRazon] = useState(state.id_typedif);
	const { listRazon } = useContext(DataListAdmisionContext);

	const handleChange = (event: any) => {
		setRazon(event.target.value as number);
		//console.log(event.target.name, event.target.value);
		setState({
			...state,
			[event.target.name]: event.target.value,
		});
	};

	const handleChangeI = (event: any) => {
		setState({
			...state,
			[event.target.name]: event.target.value,
		});
	};

	const handleCancel = () => {
		handleCloseModal(true);
	};

	const handleIncorret = () => {
		/*
		dispatch(
			Valid({
				[`${from}`]: {
					...state,
					id_typedif: razon,
				},
			})
		);
		*/
		handleCloseModal(false);
	};

	return (
		<AnimationModal openModal={openModal} handleCloseModal={handleCloseModal}>
			<form className={classes.paperUser}>
				<div className={classes.containerModal}>
					<FormControl
						sx={{
							width: '200px',
						}}>
						<InputLabel>Razon</InputLabel>
						<Select value={razon} label='Razon' name='id_typedif' onChange={handleChange}>
							{listRazon.map((item: any) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<div className={classes.containerMsg}>
						{razon === 1 && (
							<div className={classes.containerTop}>
								<WarningAmberOutlinedIcon className={classes.iconsAlertWarning} />
								<p className={classes.containerText}>
									Este recaudo fue ingresado al sistema de manera erronea, al <strong>guardar</strong> sera
									habilitado para su edición en la tabla de diferidos.
								</p>
							</div>
						)}
						{razon === 2 && (
							<>
								<div className={classes.containerTop}>
									<ErrorOutlineIcon className={classes.iconsAlert} />
									<p className={classes.containerText}>
										Indique claramente las razones por la cual el recaudo NO se validó, este mensaje sera enviado
										por correo al cliente.
									</p>
									{/* <FormControlLabel control={<Checkbox defaultChecked />} label='Enviar al cliente' /> */}
								</div>
								<textarea
									className={classes.textareaAlert}
									name='msg'
									value={state.msg}
									onChange={handleChangeI}
									placeholder='Ej: la imagen...'
								/>
							</>
						)}
					</div>
				</div>
				<div className={classes.containerBtn}>
					<Button className={classes.btnSend} variant='contained' color='secondary' onClick={handleCancel}>
						Cancelar
					</Button>
					<Button
						className={classes.btnSend}
						variant='contained'
						color='primary'
						onClick={handleIncorret}
						disabled={razon === 1 ? false : state.msg.length > 10 ? false : true}>
						Guardar {razon === 2 && 'Mensaje'}
					</Button>
				</div>
			</form>
		</AnimationModal>
	);
};
