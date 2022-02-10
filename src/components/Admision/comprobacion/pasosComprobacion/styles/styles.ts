import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((styles: Theme) => ({
	btn_stepM: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		margin: '8px 0',
	},
	btn_step: {
		width: '49%',
	},
	btn_stepNum: {
		width: '50%',
	},
	btn_stepT: {
		marginLeft: `${styles.spacing(1)} !important`,
		marginRight: `${styles.spacing(1)} !important`,
	},
	img_zoom: {
		width: '40vw',
	},
	container_zoom: {
		border: 'solid 1.5px rgba(0, 0, 0, 0.3)',
		padding: '.5rem',
		boxSizing: 'border-box',
		boxShadow: '0px 4px 10px -8px #000000',
		borderRadius: '20px',
	},
	container_img: {
		marginTop: '-1rem',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
	check: {
		marginBottom: '2%',
		marginTop: '2%',
		marginLeft: '40%',
	},
	btn_stepNro: {
		marginRight: '5% !important',
	},
	checkText: {
		marginLeft: '1rem',
		width: '100px',
	},
	container_ListActa: {
		marginTop: '1rem',
		width: '100%',
		display: 'grid',
		gridColumnGap: '1%',
		gridTemplateColumns: '1fr 1fr',
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
	containerStep: {
		width: '100%',
		flexDirection: 'column',
		display: 'flex',
	},
	btn_medio: {
		width: '70%',
	},
}));
