import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((styles) => ({
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
	img_zoom: {
		position: 'fixed',
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
	},
}));
