import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((styles: Theme) => ({
	container_imgpdf: {
		marginTop: '1rem',
	},
	container_pdf: {
		paddingTop: '1rem',
		display: 'flex',
		justifyContent: 'center',
	},
	pdfModal: {
		width: '100%',
		background: styles.palette.primary.main,
		padding: 0,
	},
}));

export const sxStyled = {
	imgcenter: {
		marginTop: '1rem',
		justifyContent: 'center',
	},
};
