import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((styles: Theme) => ({
	admision: {
		flexGrow: 1,
		display: 'grid',
		gridColumnGap: '2rem',
		gridTemplateColumns: '1fr 1fr',
	},
	dataGrid: {
		width: '100%',
		height: '75vh',
	},
	rightContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	counters: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	status: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	statusTitle: {
		fontSize: 28,
	},
	statusDesc: {
		fontSize: 38,
	},
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
	row2: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: 16,
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

	btn_stepM: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '1rem',
		// flexDirection: 'column',
		alignItems: 'center',
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
		width: '100px',
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
	uploadPdf: {
		padding: '2rem',
		marginTop: '1rem',
		textTransform: 'none',
		width: 'auto',
		height: '40px',
		alignSelf: 'center',
	},
	iconUpload: {
		fontSize: '2.5rem',
	},
	nameImg: {
		fontSize: '.9rem',
	},
	borderLeft: {
		borderLeft: '1px solid rgba(0,0,0,0.4)',
	},
	borderTop: {
		borderTop: '1px solid rgba(0,0,0,0.4)',
	},
	//Unir en un styles/////*** */
	container_ListActa: {
		marginTop: '1rem',
		width: '100%',
		display: 'grid',
		gridColumnGap: '1%',
		gridTemplateColumns: '1fr 1fr',
	},
	link: {
		textDecoration: 'none',
		textTransform: 'none',
	},
	itemLink: {
		paddingLeft: '.5rem',
	},
}));