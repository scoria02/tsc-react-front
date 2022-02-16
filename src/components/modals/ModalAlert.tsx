//modal

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineSharp';
import { Button, TextareaAutosize, TextField } from '@mui/material';
import AnimationModal from './AnimationModal';
import './scss/modalAlert.scss';
import { useStylesModalAlert } from './styles';

interface Props {
	openModal: any;
	handleCloseModal: any;
	state: any;
	handleChangeI(event: any): void;
	handleIncorret(event: any): void;
	handleCancel(event: any): void;
}

export const ModalAlert: React.FC<Props> = ({
	openModal,
	handleCloseModal,
	state,
	handleChangeI,
	handleIncorret,
	handleCancel,
}) => {
	const classes = useStylesModalAlert();

	return (
		<AnimationModal openModal={openModal} handleCloseModal={handleCloseModal}>
			<form className={classes.paperUser}>
				<div className={classes.containerModal}>
					<div>
						<div className={classes.containerTop}>
							<ErrorOutlineIcon className={classes.iconsAlert} />
							<p className={classes.containerText}>
								Indique claramente las razones por la cual el recaudo NO se validó, este mensaje sera enviado por
								correo al cliente.
							</p>
						</div>
						<textarea className={classes.textareaAlert} name='msg' value={state.msg} onChange={handleChangeI} />
						<TextareaAutosize
							className={classes.textareaAlert}
							value={state.msg}
							onChange={handleChangeI}
							aria-label='minimum height'
							placeholder='Ej: la imagen...'
						/>
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
						disabled={state.msg.length > 10 ? false : true}>
						Guardar Mensaje
					</Button>
				</div>
			</form>
		</AnimationModal>
	);
};
