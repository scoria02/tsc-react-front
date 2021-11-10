import React from 'react';
import { useStyles } from '../Admision';

export const SolicitudesDiferidos = () => {
	const classes = useStyles();
	return (
		<div className={classes.status} style={{ borderTop: '1px solid' }}>
			<div className={classes.statusTitle}>Diferidos:</div>

			<div className={classes.statusDesc}>1000</div>
		</div>
	);
};
