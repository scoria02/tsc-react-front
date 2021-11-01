import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const useStyles = makeStyles(() => ({
  alertPassword: {
    width: '100%',
    alignSelf: 'center',
  },
}));

const Alert1: React.FC = ({children}) => {
  const classes = useStyles();

  return (
    <Alert className={classes.alertPassword} severity='error'>
      {children}
    </Alert>
  )
}

export default Alert1;
