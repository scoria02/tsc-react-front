import { makeStyles } from '@material-ui/core/styles';

export const useStylesFM = makeStyles((styles) => ({
  buttonNext: {
		bottom: '0',
    marginRight: styles.spacing(1),
    textTransform: 'none',
  },
  buttonBack: {
		bottom: '0',
    marginRight: styles.spacing(40),
    textTransform: 'none',
  },
	input: {
    display: 'flex',
    width: '100%',
    textAlign: 'center',
		marginTop: styles.spacing(1),
		alignSelf: 'center',
	},
	inputM: {
    display: 'flex',
    width: '50%',
    textAlign: 'center',
		alignSelf: 'center',
		marginRight: styles.spacing(0.5),
	},
	inputN: {
    display: 'flex',
    width: '50%',
    textAlign: 'center',
		alignSelf: 'center',
		marginLeft: styles.spacing(0.5),
	},
	inputMP: {
    display: 'flex',
    width: '30%',
    textAlign: 'center',
		alignSelf: 'center',
		marginRight: styles.spacing(0.5),
	},
	inputNP: {
    display: 'flex',
    width: '70%',
    textAlign: 'center',
		alignSelf: 'center',
		marginLeft: styles.spacing(0.5),
	},
	inputA: {
    display: 'flex',
    width: '100%',
    textAlign: 'center',
		alignSelf: 'center',
	},
	inputTipoId: {
    width: '15%',
		margin: 0,
		marginRight: styles.spacing(1.5),
	},
	inputDoc: {
    width: '85%',
	},
	inputText: {
    textAlign: 'center',
		alignSelf: 'center',
		fontSize: '1.2rem',
    width: '100%',
		padding: '15px',
		marginTop: styles.spacing(1),
	},
	inputTextN: {
    textAlign: 'center',
		alignSelf: 'center',
		fontSize: '1rem',
    width: '50%',
	},
	imgIdent: {
		marginLeft: styles.spacing(1),
		marginTop: styles.spacing(0.2),
		marginBottom: styles.spacing(0.2),
		padding: 0,
    textTransform: 'none',
    width: '25%',
	},
	imgNroAccount: {
		marginLeft: styles.spacing(1),
		marginTop: styles.spacing(0.5),
		marginBottom: styles.spacing(0.2),
		padding: 0,
    textTransform: 'none',
    width: '25%',
	},
	imgContributor: {
    textTransform: 'none',
    width: '50%',
		marginTop: styles.spacing(1),
		marginBottom: styles.spacing(1),
		marginLeft: styles.spacing(1),
	},
	imgStep1: {
		marginTop: styles.spacing(0.5),
		marginBottom: styles.spacing(0.5),
    textTransform: 'none',
    width: '50%',
		marginLeft: styles.spacing(0),
	},
	imgStep3: {
		marginTop: styles.spacing(1),
		marginBottom: styles.spacing(1),
		marginLeft: styles.spacing(1),
    textTransform: 'none',
    width: '40%',
	},
	imgStep4: {
		marginTop: styles.spacing(1),
		marginBottom: styles.spacing(0.2),
    textTransform: 'none',
    width: '25%',
		marginLeft: styles.spacing(1),
	},
}));
