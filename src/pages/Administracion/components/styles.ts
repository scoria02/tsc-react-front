import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

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
		padding: '1rem 0',
		height: '100%',
	},
	img_zoom: {
		position: 'fixed',
		display: 'flex',
		justifyContent: 'center',
	},
	containerImg: {
		alignSelf: 'center',
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
	iconUpload: {
		fontSize: '4rem',
	},
	nameImg: {
		fontSize: '1rem',
		marginBottom: '-3px',
	},
}));

export const sxStyled = {
	textAutoCompleteLeft: {
		marginRight: 1,
		width: '100%',
	},
	buttonPdf: {
		borderRadius: '2rem',
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
	buttonV: (theme: Theme) => ({
		textTransform: 'none',
		marginRight: theme.spacing(1),
		width: '115px',
		alignSelf: 'center',
	}),
	textfieldLeft: {
		marginRight: '8px',
	},
};
