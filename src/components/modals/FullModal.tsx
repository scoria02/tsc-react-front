/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, Slide, Theme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { createStyles, makeStyles } from '@mui/styles';
import { FC, forwardRef, ReactElement, Ref } from 'react';
import './scss/fullmodal.scss';

const Transition = forwardRef(function Transition(
	props: TransitionProps & { children: ReactElement },
	ref: Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modalFull: {
			width: '100%',
			margin: '1.5rem',
			padding: '1rem',
			display: 'flex',
			flexDirection: 'column',
		},
	})
);

const FullModal: FC<any> = ({ modalOpen, handleClose, children }) => {
	const classes = useStyles();

	return (
		<Dialog fullScreen open={modalOpen} onClose={handleClose} TransitionComponent={Transition}>
			<div className='button-close'>
				<div className='close-container' onClick={handleClose}>
					<div className='leftright'></div>
					<div className='rightleft'></div>
					<label className='closee'>Cerrar</label>
				</div>
			</div>
			<div className={classes.modalFull}>{children}</div>
		</Dialog>
	);
};

export default FullModal;
