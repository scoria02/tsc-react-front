import {withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

export const HtmlTooltip = withStyles(() => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		width: '100%',
		maxWidth: '100%',
		border: '1px solid #dadde9',
	},
}))(Tooltip);

export const useStylesModalUser = makeStyles((styles) => ({
	root: {
		// maxWidth: 345,
	},
	media: {
		height: 400,
		width: 400,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	inputN: {
		width: '48%',
	},
	input: {
		marginTop: styles.spacing(1.5),
		marginBottom: styles.spacing(1),
		width: '80%',
		alignSelf: 'center',
	},
	button: {
		margin: styles.spacing(1),
		textTransform: 'none',
		backgroundColor: styles.palette.primary.main,
		color: styles.palette.secondary.main,
		fontSize: '1.2rem',
		maxWidth: '80%',
		'&:hover': {
			backgroundColor: styles.palette.primary.light,
		},
	},
	buttonStep: {
		textTransform: 'none',
		letterSpacing: '1px',
		backgroundColor: styles.palette.primary.main,
		color: '#fff',
		'&:hover': {
			backgroundColor: styles.palette.primary.light,
		},
	},
	buttonSend: {
		textTransform: 'none',
		letterSpacing: '1px',
		backgroundColor: styles.palette.success.main,
		color: styles.palette.secondary.main,
		'&:hover': {
			backgroundColor: styles.palette.success.light,
		},
	},
	buttonRes: {
		textTransform: 'none',
		backgroundColor: styles.palette.success.main,
		color: styles.palette.secondary.main,
		'&:hover': {
			backgroundColor: styles.palette.success.light,
		},
	},
	buttonResMain: {
		margin: styles.spacing(1),
		marginLeft: styles.spacing(2),
		textTransform: 'none',
		backgroundColor: styles.palette.success.main,
		border: `1px solid ${styles.palette.success.main}`,
		color: styles.palette.secondary.main,
		paddingLeft: '2rem',
		paddingRight: '2rem',
		maxWidth: '80%',
		'&:hover': {
			backgroundColor: styles.palette.success.light,
			border: `1px solid ${styles.palette.success.light}`,
		},
	},
	buttonBack: {
		color: styles.palette.primary.main,
	},
	inputNro: {
		width: '70%',
		marginTop: styles.spacing(-0.3),
	},
	formControl: {
		marginTop: styles.spacing(-0.3),
		width: '26%',
	},
	text: {
		color: styles.palette.error.main,
		fontSize: '13px',
	},
	textM: {
		color: '#fff',
		fontSize: '15px',
	},
	alertPassword: {
		width: '100%',
		alignSelf: 'center',
	},
	ErrorLogin: {
		color: styles.palette.error.main,
	},
	step: {
		flexGrow: 1,
		backgroundColor: '#fff',
		width: '80%',
		alignSelf: 'center',
	},
	typography: {
    padding: styles.spacing(2),
  },
}));
