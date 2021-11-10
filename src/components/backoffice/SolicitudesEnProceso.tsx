import React from 'react';
import { useStyles } from '../Admision';

export const SolicitudesEnProceso = () => {
	const classes = useStyles();
	return (
		<div className={classes.status}>
			<div className={classes.statusTitle}>En Proceso</div>

			<div className={classes.statusDesc}>6555</div>
		</div>
	);
};
