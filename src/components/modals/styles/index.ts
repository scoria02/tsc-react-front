import { makeStyles } from '@material-ui/core/styles';

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
