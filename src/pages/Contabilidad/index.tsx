import { makeStyles, Theme } from '@material-ui/core/styles';
import { FC } from 'react';

const useStyles = makeStyles((styles: Theme) => ({
	wrapper: {
		flexGrow: 1,
	},
}));

const Contabilidad: FC = () => {
	const classes = useStyles();

	return <div className={classes.wrapper}>Hola</div>;
};

export default Contabilidad;
