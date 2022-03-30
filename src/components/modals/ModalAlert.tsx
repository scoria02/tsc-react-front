//modal

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineSharp';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import AnimationModal from './AnimationModal';
import './scss/modalAlert.scss';
import { useStylesModalAlert } from './styles';

interface Props {
	openModal: any;
	handleCloseModal: any;
	state: any;
	setState?: React.Dispatch<any>;
	handleChangeI(event: any): void;
	handleIncorret(event: any): void;
	handleCancel(event: any): void;
}

export const ModalAlert: React.FC<Props> = ({
	openModal,
	handleCloseModal,
	state,
	setState,
	handleChangeI,
	handleIncorret,
	handleCancel,
}) => {
	const classes = useStylesModalAlert();
	const [razon, setRazon] = useState(0);

	const handleChange = (event: any) => {
		setRazon(event.target.value as number);
	};

	useLayoutEffect(() => {
		// Agregar endpoint de razones de diferido
	}, []);

	return (
		<AnimationModal openModal={openModal} handleCloseModal={handleCloseModal}>
			<form className={classes.paperUser}>
				<div className={classes.containerModal}>
					<FormControl
						sx={{
							width: '200px',
						}}>
						<InputLabel>Razon</InputLabel>
						<Select value={razon} label='Razon' onChange={handleChange}>
							<MenuItem value={0}>Interno</MenuItem>
							<MenuItem value={1}>Recaudo</MenuItem>
						</Select>
					</FormControl>
					{razon === 0 && (
						<div>
							<div className={classes.containerTop}>
								<WarningAmberOutlinedIcon className={classes.iconsAlertWarning} />
								<p className={classes.containerText}>
									Este recaudo fue ingresado al sistema de manera erronea, al marcarlo como diferido se habilitaran
									los campos de la planilla para su corrección.
								</p>
							</div>
						</div>
					)}
					{razon === 1 && (
						<div>
							<div className={classes.containerTop}>
								<ErrorOutlineIcon className={classes.iconsAlert} />
								<p className={classes.containerText}>
									Indique claramente las razones por la cual el recaudo NO se validó, este mensaje sera enviado por
									correo al cliente.
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
						</div>
					)}
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
						disabled={razon === 0 ? false : state.msg.length > 10 ? false : true}>
						Guardar Mensaje
					</Button>
				</div>
			</form>
		</AnimationModal>
	);
};
