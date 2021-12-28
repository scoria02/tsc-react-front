import { makeStyles, withStyles } from '@material-ui/core/styles';
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
		maxWidth: '80vw',
		borderRadius: '2rem',
	},
	containerRight: {
		margin: 0,
		position: 'relative',
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
		width: '49%',
	},
	input: {
		marginTop: styles.spacing(1),
		marginBottom: styles.spacing(1),
		width: '100%',
		alignSelf: 'center',
	},
	inputNro: {
		width: '70%',
	},
	inputPhone: {
		width: '52%',
	},
	formControl: {
		width: '28%',
	},
	formControlCompany: {
		width: '46%',
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
		color: styles.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: styles.palette.success.light,
		},
	},
	buttonLeft: {
		marginTop: '-2.5rem',
		textTransform: 'none',
		padding: '.5rem 1rem',
	},
	inputButton: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '2.2rem',
		marginBottom: '2.5rem',
		width: '100%',
	},
	buttonLogin: {
		textTransform: 'none',
		fontSize: '1rem',
		color: '#ffffff',
		padding: '.6rem 4rem',
		borderRadius: '0.25rem',
		backgroundColor: styles.palette.success.main,
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
	text: {
		color: styles.palette.error.main,
		fontSize: '13px',
	},
	textM: {
		color: '#fff',
		fontSize: '15px',
	},
	ErrorLogin: {
		color: styles.palette.error.main,
	},
	step: {
		flexGrow: 1,
		backgroundColor: '#ffffff',
		width: '100%',
		alignSelf: 'center',
	},
	typography: {
		padding: styles.spacing(2),
	},
	containerLeft: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
}));
