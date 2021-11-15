/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import LoaderPrimary from '../loaders/LoaderPrimary';

import './scss/fullmodal.scss';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement },
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			margin: '1.5rem',
			padding: '1rem',
		},
		button: {
			marginRight: theme.spacing(1),
			textTransform: 'none',
		},
		backButton: {
			marginRight: theme.spacing(1),
		},
		completed: {
			display: 'inline-block',
		},
		instructions: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
		},
		cancelIcon: {
			fontSize: '3rem',
			position: 'fixed',
			right: '2rem',
			top: '1rem',
			color: theme.palette.secondary.main,
			zIndex: 10,
			cursor: 'pointer',
			'&:hover': {
				color: theme.palette.secondary.light,
			},
		},
		containerStep: {
			marginTop: theme.spacing(2),
		},
		buttonS: {
			textTransform: 'none',
		},
	})
);

const FullModal: React.FC<any> = ({
	modalOpen,
	handleClose,
	valuesObj,
	children,
}) => {
	const classes = useStyles();

	return (
		<div>
			<Dialog fullScreen open={modalOpen} onClose={handleClose} TransitionComponent={Transition}>
				{Object.keys(valuesObj).length ? (
					<>
						<div className='button-close'>
							<div className='close-container' onClick={handleClose}>
								<div className='leftright'></div>
								<div className='rightleft'></div>
								<label className='closee'>Cerrar</label>
							</div>
						</div>
						<div className={classes.root}>
							{children}
						</div>
				</>
				):(
					<LoaderPrimary />
				)}
			</Dialog>
		</div>
	);
};

export default FullModal;
