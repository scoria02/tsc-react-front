import React from 'react';
import { useStyles } from '../Admision';

export const SolicitudesTerminadas = () => {
	const classes = useStyles();
	return (
		<div
			className={classes.status}
			style={{ borderTop: '1px solid rgba(0,0,0,0.4)', borderLeft: '1px solid rgba(0,0,0,0.4)' }}>
			<div className={classes.statusTitle}>Terminadas:</div>

			<div className={classes.statusDesc}>32</div>
		</div>
	);
};
