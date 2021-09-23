/* eslint-disable @typescript-eslint/no-unused-vars */
import './index.scss';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((styles) => ({
	loader: {
		color: styles.palette.primary.light,
	}
}));

const LoaderPrimary: React.FC = () => {
	const classes = useStyles();
	return (
		<div className="containerLoader">
			<div className={classNames(classes.loader, 'loader')}>Loading...</div>
		</div>
	);
}

export default LoaderPrimary;
