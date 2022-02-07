import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
	tableTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		padding: '0 8px',
	},
	red: {
		backgroundColor: theme.palette.error.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.error.light} !important`,
		},
	},
	buttonV: {
		textTransform: 'none',
		marginRight: theme.spacing(1),
		width: 115,
		alignSelf: 'center',
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
		justifyContent: 'center',
		padding: '2px 0',
		height: '100%',
	},
	img_zoom: {
		position: 'fixed',
		display: 'flex',
		justifyContent: 'center',
	},
	containerImg: {
		alignSelf: 'center',
		marginTop: '1rem',
		marginBottom: '.5rem',
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
	textAutoCompleteLeft: {
		marginRight: 8,
		width: '100%',
	},
	codeFm: {
		color: theme.palette.primary.main,
	},
	uploadImg: {
		margin: '1rem',
		padding: '0',
		fontSize: '.7rem',
		textTransform: 'none',
		minWidth: 200,
		width: '100px',
		minHeight: 50,
		height: '500x',
		alignSelf: 'center',
	},
	iconUpload: {
		fontSize: '4rem',
	},
	nameImg: {
		fontSize: '1rem',
		marginBottom: '-3px',
	},
	buttonPdf: {
		borderRadius: '2rem',
	},
}));
