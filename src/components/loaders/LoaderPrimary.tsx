/* eslint-disable @typescript-eslint/no-unused-vars */
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import './index.scss';

const useStyles = makeStyles((styles: Theme) => ({
	loader: {
		color: styles.palette.primary.light,
	},
}));

const LoaderPrimary: React.FC = () => {
	const classes = useStyles();
	return (
		<div className='containerLoader'>
			<div className={classNames(classes.loader, 'loader')}>Loading...</div>
		</div>
	);
};

export default LoaderPrimary;
