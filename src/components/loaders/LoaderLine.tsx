/* eslint-disable @typescript-eslint/no-unused-vars */
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import './index.scss';

import Box from '@mui/material/Box';

import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles((styles: Theme) => ({
	loader: {
		color: styles.palette.primary.light,
	},
}));

const LoaderLine: React.FC = () => {
	const classes = useStyles();
	console.log('show in loader');
	return (
		<Box sx={{ width: '100%' }}>
			<LinearProgress />
		</Box>
	);
};

export default LoaderLine;
