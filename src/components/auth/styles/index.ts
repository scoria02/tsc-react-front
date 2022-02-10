import { Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles, withStyles } from '@mui/styles';

export const HtmlTooltip = withStyles(() => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		width: '100%',
		maxWidth: '100%',
		border: '1px solid #dadde9',
	},
}))(Tooltip);

export const useStylesModalUser = makeStyles((styles: Theme) => ({
	root: {
		maxWidth: '80vw',
		borderRadius: '2rem',
	},
	containerRight: {
		margin: 0,
		//position: 'relative',
	},
	media: {
		height: 450,
		width: 450,
		padding: 0,
		marginBottom: '-2rem',
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
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '70%',
		textAlign: 'center',
		alignSelf: 'center',
	},
	inputNro: {
		width: '70%',
	},
	containerAuthModal: {
		position: 'relative',
		overflow: 'hidden',
		maxWidth: '100%',
		minHeight: '360px',
		maxHeight: '360px',
		width: '660px',
		textAlign: 'center',
		flexWrap: 'wrap',
		justifyContent: 'center',
		zIndex: 1,
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
	buttonText: {
		textTransform: 'none',
		fontSize: '1rem',
	},
	button: {
		//margin: styles.spacing(1),
		textTransform: 'none',
		//backgroundColor: styles.palette.primary.main,
		//color: styles.palette.secondary.main,
		fontSize: '1.2rem',
		maxWidth: '80%',
		'&:hover': {
			//backgroundColor: styles.palette.primary.light,
		},
	},
	buttonStep: {
		textTransform: 'none',
		letterSpacing: '1px',
		//backgroundColor: styles.palette.primary.main,
		color: '#fff',
		'&:hover': {
			//backgroundColor: styles.palette.primary.light,
		},
	},
	buttonSend: {
		textTransform: 'none',
		letterSpacing: '1px',
		//backgroundColor: styles.palette.success.main,
		//color: styles.palette.secondary.contrastText,
		'&:hover': {
			//backgroundColor: styles.palette.success.light,
		},
	},
	buttonLeft: {
		position: 'absolute',
		bottom: '.5rem',
		left: '1rem',
	},
	inputButton: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		margin: '1.7rem 0 2rem',
		width: '100%',
	},
	buttonLogin: {
		textTransform: 'none',
		fontSize: '1rem',
		color: '#ffffff',
		padding: '.6rem 4rem',
		borderRadius: '0.25rem',
		//backgroundColor: styles.palette.success.main,
		'&:hover': {
			//backgroundColor: styles.palette.success.light,
		},
	},
	buttonRes: {
		textTransform: 'none',
		//backgroundColor: styles.palette.success.main,
		//color: styles.palette.secondary.main,
		'&:hover': {
			//backgroundColor: styles.palette.success.light,
		},
	},
	buttonResMain: {
		//margin: styles.spacing(1),
		//marginLeft: styles.spacing(2),
		textTransform: 'none',
		//backgroundColor: styles.palette.success.main,
		//border: `1px solid ${styles.palette.success.main}`,
		//color: styles.palette.secondary.main,
		paddingLeft: '2rem',
		paddingRight: '2rem',
		maxWidth: '80%',
		'&:hover': {
			//backgroundColor: styles.palette.success.light,
			//border: `1px solid ${styles.palette.success.light}`,
		},
	},
	buttonBack: {
		//color: styles.palette.primary.main,
	},
	text: {
		//color: styles.palette.error.main,
		fontSize: '13px',
	},
	textM: {
		color: '#fff',
		fontSize: '15px',
	},
	ErrorLogin: {
		//color: styles.palette.error.main,
	},
	step: {
		flexGrow: 1,
		backgroundColor: '#ffffff',
		width: '100%',
		alignSelf: 'center',
	},
	typography: {
		//padding: styles.spacing(2),
	},
	containerLeft: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
}));

export const styledMui = {
	inputStyle: {
		mt: 1,
		mb: 1,
		mr: 'auto',
		ml: 'auto',
	},
};
