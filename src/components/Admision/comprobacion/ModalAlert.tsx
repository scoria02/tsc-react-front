//modal
import Button from '@material-ui/core/Button';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutlineSharp';
import AnimationModal from '../../modals/AnimationModal';
import './modal.scss';
import { useStyles } from './pasosComprobacion/styles/styles';

export const ModalAlert: React.FC<any> = ({
	openModal,
	handleCloseModal,
	state,
	handleChangeI,
	handleIncorret,
	handleCancel,
}) => {
	const classes = useStyles();
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
