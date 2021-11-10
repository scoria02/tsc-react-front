import React from 'react';
import { useStyles } from '../Admision';

export const SolicitudesEnProceso = () => {
	const classes = useStyles();
	return (
		<div className={classes.status} style={{ borderLeft: '1px solid' }}>
			<div className={classes.statusTitle}>En Proceso:</div>

			<div className={classes.statusDesc}>6555</div>
		</div>
	);
};
