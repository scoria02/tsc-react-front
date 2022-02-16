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
	paperUser: {
		position: 'relative',
		background: '#fcfcfc',
		borderRadius: '20px',
		width: '50vw',
		padding: '1rem',
		zIndex: '9999',
	},
	containerModal: {
		display: 'grid',
		margin: 0,
		borderRadius: '20px',
		transition: 'all 200ms ease',
		width: '100%',
		height: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerTop: {
		width: '500px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	iconsAlert: {
		fontSize: '5rem !important',
		color: '#ff0000',
		width: '7rem !important',
		height: '7rem !important',
	},
	textareaAlert: {
		width: '100%',
		boxSizing: 'border-box',
		borderRadius: '3px',
		resize: 'none',
		fontSize: '14px',
		lineHeight: '24px',
		overflow: 'auto',
		height: 'auto',
		padding: '8px',
		border: 'solid 0.5px rgba(0, 0, 0, 0.5)',
		boxShadow: '0px 4px 10px -8px #000000',
		margin: '1rem 0',
	},
	containerText: {
		maxWidth: '500px',
		fontSize: '18px',
		textAlign: 'justify',
		margin: '1rem 0',
	},
}));
