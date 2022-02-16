import { Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
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
			marginTop: '1rem',
			marginBottom: '1rem',
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
			//display: 'flex',
			//flexDirection: 'column',
		},
		buttonS: {
			textTransform: 'none',
		},
	})
);

export const sxStyled = {
	button: {
		mr: 1,
	},
};
