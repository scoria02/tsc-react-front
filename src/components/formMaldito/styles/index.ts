import { makeStyles } from '@material-ui/core/styles';

export const useStylesFM = makeStyles((styles) => ({
	containerFM: {
		position: 'relative',
		height: '420px',
		width: '80%'
	},
  buttonNext: {
    marginRight: styles.spacing(1),
    textTransform: 'none',
		position: 'absolute',
		bottom: 0,
		right: '20%',
  },
  buttonBack: {
    marginRight: styles.spacing(40),
    textTransform: 'none',
		position: 'absolute',
		bottom: 0,
		left: '20%',
  },
	input: {
    display: 'flex',
    width: '100%',
    textAlign: 'center',
		marginTop: styles.spacing(2),
		alignSelf: 'center',
		justifyContent: 'center',
	},
	inputLine3: {
    width: '100%',
    textAlign: 'center',
		alignSelf: 'center',
		display: 'grid',
		gridColumnGap: '1%',
		gridTemplateColumns: '1fr 1fr',
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
    width: '60%',
	},
	inputTextStep1: {
		fontSize: '1.2rem',
    width: '30%',
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
	},
	inputText: {
    textAlign: 'center',
		fontSize: '1rem',
    width: '48%',
		marginTop: styles.spacing(1),
		marginRight: styles.spacing(-1),
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
	},
	inputTextN: {
    textAlign: 'center',
		alignSelf: 'center',
		fontSize: '1rem',
    width: '50%',
	},
	interlInput: {
		padding: '15px 20px'
	},
	interlAutoComplet: {
		margin: '0.2rem',
		fontSize: '1rem'
	},
	imgIdent: {
		marginLeft: styles.spacing(1),
		marginBottom: styles.spacing(0.2),
		padding: '0',
    textTransform: 'none',
    width: '25%',
	},
	imgNroAccount: {
		marginLeft: styles.spacing(1),
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
		height: '100%',
	},
	imgStep1: {
    textTransform: 'none',
    width: '30%',
		marginLeft: styles.spacing(0),
		marginBottom: styles.spacing(0.5),
		padding: 0,
		height: '100%',
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
