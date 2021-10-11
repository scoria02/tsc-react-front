import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
//import 'animate.css';
import React from 'react';
import { useStylesModal } from './styles';

interface ModalProps {
	openModal: boolean;
	handleCloseModal: () => void;
}

const AnimatedModal: React.FC<ModalProps> = ({ openModal, handleCloseModal, children }) => {
	const classes = useStylesModal();

	return (
		<>
			<Modal
				className={classes.modal}
				open={openModal}
				onClose={handleCloseModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={openModal}>
					<div>
						{children}
					</div>
				</Fade>
			</Modal>
		</>
	);
};

export default AnimatedModal;
