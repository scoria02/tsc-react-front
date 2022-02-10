import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
	img_zoom: {
		width: 'auto',
		height: '350px',
	},
	container_zoom: {
		border: 'solid 1.5px rgba(0, 0, 0, 0.3)',
		padding: '.5rem',
		boxSizing: 'border-box',
		boxShadow: '0px 4px 10px -8px #000000',
		borderRadius: '20px',
	},
	container_img: {
		marginTop: '1rem',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
}));
