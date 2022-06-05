import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((styles: Theme) => ({
	contanerSaveButton: {
		marginTop: '2rem',
		textAlign: 'center',
	},
	buttonImage: {
		padding: '0',
		fontSize: '.7rem',
		textTransform: 'none',
	},
	containerSolic: {
		marginTop: '10px',
	},
	btn_stepText: {
		width: 500,
	},
	btn_stepTextInterno: {
		fontSize: '1rem',
		color: styles.palette.secondary.main,
	},
	btn_stepM: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		margin: '8px 0',
	},
	link: {
		textDecoration: 'none',
		textTransform: 'none',
	},
	itemLink: {
		textDecoration: 'none',
		textTransform: 'none',
		paddingLeft: '.5rem',
	},
	container_ListActa: {
		margin: '0 auto',
		display: 'grid',
		gridColumnGap: '1%',
		gridTemplateColumns: '1fr 1fr',
	},
	containerStep: {
		width: '100%',
		flexDirection: 'column',
		display: 'flex',
	},
	validRecaudo: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	containerSteps: {
		display: 'flex',
		width: 'auto',
		justifyContent: 'left',
		alignItems: 'center',
		flexDirection: 'column',
		marginTop: '.5rem',
	},
	containerForm: {
		padding: 0,
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		display: 'flex',
	},
	containerFM: {
		position: 'relative',
		marginTop: '1rem',
		width: '95%',
		// height: '440px',
	},
	containerLocation: {
		display: 'grid',
		gridColumnGap: '10%',
		gridTemplateColumns: '1fr 1fr',
	},
	buttonNext: {
		textTransform: 'none',
		width: 115,
	},
	textButton: {
		paddingLeft: '10px',
		paddingRight: '10px',
		textTransform: 'none',
		fontSize: '15px',
	},
	buttonBack: {
		//marginRight: styles.spacing(40),
		textTransform: 'none',
	},
	input: {
		display: 'flex',
		width: '100%',
		margin: '8px 0',
		textAlign: 'center',
		alignItems: 'center',
		// justifyContent: 'center',
	},
	row: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
	},
	gridMain: {
		width: '100%',
		display: 'grid',
		gridColumnGap: '1%',
		gridTemplateColumns: '1.5fr 1fr',
	},
	grid: {
		width: '100%',
		display: 'grid',
		gridColumnGap: '1%',
		gridTemplateColumns: '1fr 1fr',
	},
	containerValid: {
		width: '50%',
		display: 'grid',
		gridColumnGap: '1%',
		gridTemplateColumns: '1fr',
	},
	checkText: {
		marginLeft: '1rem',
		width: '100px',
	},
	grid2: {
		width: '50%',
		display: 'grid',
		gridColumnGap: '1%',
		gridTemplateColumns: '1fr',
	},
	inputSelect: {
		display: 'flex',
		width: '25%',
		textAlign: 'center',
		alignSelf: 'center',
		//marginRight: '2%',
	},
	inputText: {
		width: '100%',
	},
	inputTextLeft: {
		width: '100%',
		marginRight: '2%',
	},
	noBorder: {
		border: 'none',
	},
	imgIdent: {
		padding: '0',
		fontSize: '.7rem',
		textTransform: 'none',
		width: '100%',
		maxWidth: 100,
		maxHeight: 56,
		height: '100%',
	},
	buttonFixed: {
		position: 'fixed',
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		bottom: '1rem',
		//background: 'red',
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
	containerCheckBox: {
		display: 'flex',
		justifyContent: 'center',
	},
	daysCB: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		margin: '10px 0',
		fontWeight: 'bold',
	},
	inputSelectSolict: {
		width: '300px',
		marginRight: '1rem',
		textAlign: 'center',
		alignSelf: 'center',
	},
	inputPropIdent: {
		width: '40px',
	},
}));

export const sxStyled = {
	inputLeft: {
		width: '100%',
		mr: '2%',
	},
	inputSelect: {
		mr: '2%',
	},
	btn_stepM: {
		m: '8px 0',
	},
	container_ListActa: {
		margin: '0 auto',
		display: 'grid',
		gridColumnGap: '1%',
		gridTemplateColumns: '1fr 1fr',
	},
	buttonSave: {
		position: 'absolute',
		marginLeft: 'auto',
		marginRight: 'auto',
		left: 0,
		right: 0,
		textAlign: 'center',
		bottom: '1.5rem',
	},
};
