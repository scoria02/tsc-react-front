import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
	administracion: {
		flexGrow: 1,
		display: 'grid',
		gridColumnGap: '2rem',
		gridTemplateColumns: '1fr 1fr',
		height: '80vh',
	},
	button: {
		width: 200,
		height: 70,
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
	tableTitle: {
		fontSize: 32,
		fontWeight: 'bold',
		padding: '0 8px',
	},
	view: {
		padding: '1rem',
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
	},
	red: {
		backgroundColor: theme.palette.error.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.error.light} !important`,
		},
	},
	yellow: {
		backgroundColor: theme.palette.warning.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.warning.light} !important`,
		},
	},
	green: {
		backgroundColor: theme.palette.success.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.success.light} !important`,
		},
	},
	wrapper: {
		padding: '16px 0',
		height: '100%',
	},
	img_zoom: {
		position: 'fixed',
		display: 'flex',
		justifyContent: 'center',
	},
	content: {
		display: 'flex',
		height: '100%',
		flexDirection: 'column',
	},
	row: {
		display: 'flex',
		width: '100%',
		marginBottom: 8,
		justifyContent: 'space-around',
	},
	textfieldLeft: {
		marginRight: 8,
	},
	switchControl: {
		position: 'absolute',
		bottom: 0,
		left: '35%',
	},
}));

export const sxStyled = {
	closeBtn: {
		width: 40,
		height: 40,
		position: 'absolute',
		top: 8,
		right: 8,
		padding: 0,
		minWidth: 'unset',
		borderRadius: 20,
	},
};
