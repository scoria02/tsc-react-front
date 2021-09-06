import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './pasos.scss';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
				width: '25ch',
				// height: '10px',
			},
		},
	})
);

export default function PasoUnoUser() {
	const classes = useStyles();

	return (
		<form className={classes.root} noValidate autoComplete='off'>
			<TextField className='btn_step btn_largo' id='outlined-basic' label='Nombre Completo' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic ' label='Tipo ID' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic' label='Numero ID' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic' label='Telefono' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic' label='Telefono2' variant='outlined' />
			<TextField className='btn_step btn_largo' id='outlined-basic' label='correo' variant='outlined' />
		</form>
	);
}
