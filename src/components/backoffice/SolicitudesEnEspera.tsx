import React from 'react';
import { useStyles } from '../Admision';

export const SolicitudesEnEspera = () => {
	const classes = useStyles();
	return (
		<div className={classes.status}>
			<div className={classes.statusTitle}>En Espera:</div>

			<div className={classes.statusDesc}> 251 </div>
		</div>
	);
};
