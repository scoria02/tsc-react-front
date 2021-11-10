import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((styles: Theme) => ({
	administracion: {
		flexGrow: 1,
		display: 'grid',
		gridColumnGap: '2rem',
		gridTemplateColumns: '1fr 1fr',
	},
	button: {
		width: 200,
		height: 70,
		background: styles.palette.primary.main,
		color: styles.palette.primary.contrastText,
	},
	dataGrid: {
		width: '100%',
		height: '75vh',
	},
	tableTitle: {
		fontSize: 32,
		fontWeight: 'bold',
		padding: '0 8px',
	},
	view: {
		width: '100%',
		padding: '1rem',
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
	},
	closeBtn: {
		width: 40,
		height: 40,
		position: 'absolute',
		top: 16,
		right: 16,
		padding: 0,
		minWidth: 'unset',
		borderRadius: 20,
	},
	red: {
		backgroundColor: styles.palette.error.main,
		color: styles.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${styles.palette.error.light} !important`,
		},
	},
	yellow: {
		backgroundColor: styles.palette.warning.main,
		color: styles.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${styles.palette.warning.light} !important`,
		},
	},
	green: {
		backgroundColor: styles.palette.success.main,
		color: styles.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${styles.palette.success.light} !important`,
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

	btn_stepM:{
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '1rem',
	},
	btn_step: {
		width: '49%',
	},
	btn_stepNum: {
		width: '50%',
	},
	btn_stepT: {
		marginLeft: styles.spacing(1),
		marginRight: styles.spacing(1),
	},
	check: {
		marginBottom: '2%',
		marginTop: '2%',
		marginLeft: '40%',
	},
	btn_stepNro: {
		marginRight: '5%',
	},
	checkText: {
		marginLeft: '1rem',
		width: '100px'
	},
	containerBtn: {
		display: 'flex',
		justifyContent: 'center',
	},
	btnSend: {
		margin: '1rem',
		textTransform: 'none',
	},

	//aparte
	uploadImg: {
		padding: '.5rem',
		marginTop: '1rem',
		fontSize: '.7rem',
		textTransform: 'none',
		width: 'auto',
		height: '50px',
		alignSelf: 'center',
	},
	iconUpload: {
		fontSize: '2.5rem',
	},
	nameImg: {
		fontSize: '.9rem',
	}
}));
