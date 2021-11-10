import React from 'react';
import { useStyles } from '../Admision';

export const SolicitudesTerminadas = () => {
	const classes = useStyles();
	return (
		<div className={classes.status}>
			<div className={classes.statusTitle}>Terminadas</div>

			<div className={classes.statusDesc}>999998</div>
		</div>
	);
};
