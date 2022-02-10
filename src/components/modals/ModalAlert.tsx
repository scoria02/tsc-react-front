//modal

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineSharp';
import { Button } from '@mui/material';
import AnimationModal from './AnimationModal';
import './scss/modalAlert.scss';
import { useStylesModalAlert } from './styles';

export const ModalAlert: React.FC<any> = ({
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
			<div className='paperUser'>
				<div className='container-modal'>
					<div className='container-item'>
						<div className='container-top'>
							<ErrorOutlineIcon className='icons-alert' />
							<p className='container-text'>
								Indique claramente las razones por la cual el recaudo NO se validó, este mensaje sera enviado por
								correo al cliente.
							</p>
						</div>
						<textarea className='textarea-alert' name='msg' value={state.msg} onChange={handleChangeI} />
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
			</div>
		</AnimationModal>
	);
};
