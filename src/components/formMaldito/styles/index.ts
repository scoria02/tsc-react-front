import { makeStyles } from '@material-ui/core/styles';

export const useStylesFM = makeStyles((styles) => ({
	containerFM: {
		position: 'relative',
		// height: '440px',
		width: '80%',
	},
	buttonNext: {
		marginRight: styles.spacing(1),
		textTransform: 'none',
		width: 115,
	},
	buttonBack: {
		marginRight: styles.spacing(40),
		textTransform: 'none',
	},
	input: {
		display: 'flex',
		width: '100%',
		margin: '8px 0',
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
	row: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
	},
	grid: {
		width: '100%',
		display: 'grid',
		gridColumnGap: '1%',
		gridTemplateColumns: '1fr 1fr',
	},
	inputSelect: {
		display: 'flex',
		width: '25%',
		textAlign: 'center',
		alignSelf: 'center',
		marginRight: '2%',
	},
	inputText: {
		width: '100%',
	},
	inputTextLeft: {
		width: '100%',
		marginRight: '2%',
	},
	imgIdent: {
		padding: '0',
		textTransform: 'none',
		width: '100%',
		maxWidth: 100,
		minHeight: 56,
		height: '100%',
	},
	buttonFixed: {
		position: 'fixed',
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		bottom: '2rem',
	},
	labels: {
		maxWidth: 120,
		display: 'flex',
		alignItems: 'center',
	},
	containerBtn: {
		display: 'flex',
		justifyContent: 'center',
	},
}));
