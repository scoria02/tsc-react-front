import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles((styles: Theme) => ({
	terminales: {
		display: 'flex',
		flexDirection: 'column',
	},
	searchRow: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '1rem',
	},
}));
