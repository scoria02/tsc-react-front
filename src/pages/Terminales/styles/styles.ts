import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((styles: Theme) => ({
	tab: {
		textTransform: 'none',
		fontSize: '.5rem',
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
	selected: {
		backgroundColor: `${styles.palette.info.main} !important`,
		color: styles.palette.info.contrastText,
		'&:hover': {
			backgroundColor: `${styles.palette.info.light} !important`,
		},
	},
	wrapper: {
		marginTop: '-1rem',
		flexGrow: 1,
	},
	tabPanel: {
		padding: '16px 16px 0',
	},
	tabLabel: {
		fontWeight: 'bold',
		textTransform: 'none',
		fontSize: '0.85rem',
	},
	containerFlex: {},
	grid: {
		display: 'grid',
		gridTemplateColumns: '1fr 4fr',
		gridColumnGap: '1rem',
	},
	tableTitle: {
		fontSize: 32,
		fontWeight: 'bold',
		padding: '0 8px',
	},
	text: {
		fontSize: 28,
		padding: '0 8px',
	},
	img: {
		width: 170,
		height: 170,
		alignSelf: 'center',
		'& div': {
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			objectFit: 'cover',
		},
	},
	form: {
		padding: 0,
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 0,
	},
	row: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '16px 0',
	},
	column: {
		flexDirection: 'column',
	},
	cardTitles: {
		fontSize: 16,
		fontWeight: 'bold',
		position: 'relative',
	},
	card: {
		alignItems: 'center',
		padding: '2rem',
		position: 'relative',
	},
	inputText: {
		width: '100%',
	},
	textFields: {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gridRowGap: 8,
		gridColumnGap: 8,
	},
	blockedButton: {
		fontWeight: 'bold',
	},
	blockedButtonOn: {
		backgroundColor: styles.palette.success.main,
		color: styles.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${styles.palette.success.light} !important`,
		},
	},
	blockedButtonOff: {
		backgroundColor: styles.palette.error.main,
		color: styles.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${styles.palette.error.light} !important`,
		},
	},
}));

export const sxStyled = {
	tabName: {
		textTransform: 'none',
		fontSize: '1rem',
	},
	closeBtn: {
		width: 40,
		height: 40,
		position: 'absolute',
		top: 0,
		right: 0,
		padding: 0,
		minWidth: 'unset',
		borderRadius: '50%',
	},
	blockedButtonOn: (styles: Theme) => ({
		fontWeight: 'bold',
		backgroundColor: styles.palette.success.light,
		color: styles.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${styles.palette.success.main} !important`,
		},
	}),
	blockedButtonOff: (styles: Theme) => ({
		fontWeight: 'bold',
		backgroundColor: styles.palette.error.light,
		color: styles.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${styles.palette.error.main} !important`,
		},
	}),
	avatarLetter: (styles: Theme) => ({
		textTransform: 'uppercase',
		backgroundColor: styles.palette.primary.light,
		fontSize: 56,
	}),
	buttonSaveData: (styles: Theme) => ({
		backgroundColor: styles.palette.primary.light,
		color: styles.palette.primary.contrastText,
		'&:hover': {
			backgroundColor: styles.palette.primary.main,
		},
	}),
};
