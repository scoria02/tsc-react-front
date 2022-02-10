import MuiAlert, { AlertProps } from '@mui/lab/Alert';
import { makeStyles } from '@mui/styles';

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export const useStyles = makeStyles(() => ({
	alertPassword: {
		width: '100%',
		alignSelf: 'center',
	},
}));

const Alert1: React.FC = ({ children }) => {
	const classes = useStyles();

	return (
		<Alert className={classes.alertPassword} severity='error'>
			{children}
		</Alert>
	);
};

export default Alert1;
