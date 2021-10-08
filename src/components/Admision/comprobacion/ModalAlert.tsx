//modal
import AnimationModal from '../../modals/AnimationModal';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutlineSharp';
import Button from '@material-ui/core/Button';
import './modal.scss';

import { useStyles } from './pasosComprobacion/styles/styles';

export const ModalAlert: React.FC<any> = ({openModal, handleCloseModal , state, handleChangeI, handleIncorret, handleCancel}) => {
	const classes = useStyles();
	return ( 
		<AnimationModal openModal={openModal} handleCloseModal={handleCloseModal}>
			<div className="paperUser">
				<div className='container-modal' style={{ width: '100%', height: '100%', gridColumnGap: '0' }}>
					<div className='container-item'>
						<div className="container-top">
							<ErrorOutlineIcon className="icons-alert" />
							<h2>Alerta:</h2>
							<p>Al finalizar la validacion del formulario, se enviara este mensaje al correo del cliente OJO.</p>
						</div>
						<textarea 
							className="textarea-alert"
							name='msg' 
							value={state.msg} 
							onChange={handleChangeI} 
						/>
					</div>
				</div>
				<div className={classes.containerBtn}>
					<Button 
						className={classes.btnSend}
						variant='contained'
						color='secondary'
						onClick={handleCancel}
					>
						Cancelar
					</Button>
					<Button 
						className={classes.btnSend} 
						variant='contained'
						color='primary'
						onClick={handleIncorret}
						disabled={state.msg.length > 10 ? false : true}
					>
						Guardar Mensaje
					</Button>
				</div>
			</div>
		</AnimationModal>
	)
}
