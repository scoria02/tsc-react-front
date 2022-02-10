import { makeStyles } from '@mui/styles';

export const useStylesModal = makeStyles(() => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

export const useStylesModalAlert = makeStyles(() => ({
	containerBtn: {
		display: 'flex',
		justifyContent: 'center',
	},
	btnSend: {
		margin: '1rem',
		textTransform: 'none',
	},
}));
