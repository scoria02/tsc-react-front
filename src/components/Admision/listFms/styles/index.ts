import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((styles: Theme) =>
	createStyles({
		root: {
			width: '100%',
			height: '5rem',
			padding: '1rem 5rem 10rem',
			background: styles.palette.primary.main,
		},
		containerStep: {
			marginTop: styles.spacing(2),
		},
		instructions: {
			marginTop: styles.spacing(1),
			marginBottom: styles.spacing(1),
		},
	})
);
