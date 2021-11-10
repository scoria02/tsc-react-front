import React from 'react';
import { useStyles } from '../Admision';

export const SolicitudesTerminadas = () => {
	const classes = useStyles();
	return (
		<div className={classes.status} style={{ borderTop: '1px solid', borderLeft: '1px solid' }}>
			<div className={classes.statusTitle}>Terminadas:</div>

			<div className={classes.statusDesc}>999998</div>
		</div>
	);
};
