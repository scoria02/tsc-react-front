import React from 'react';
import { useStyles } from '../Admision';

export const SolicitudesEnProceso = () => {
	const classes = useStyles();
	return (
		<div className={classes.status} style={{ borderLeft: '1px solid rgba(0,0,0,0.4)' }}>
			<div className={classes.statusTitle}>En Proceso:</div>

			<div className={classes.statusDesc}>3</div>
		</div>
	);
};
