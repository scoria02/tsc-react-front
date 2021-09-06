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

export default function PasoUno() {
	const classes = useStyles();

	return (
		<form className={classes.root} noValidate autoComplete='off'>
			<TextField className='btn_step' id='outlined-basic' label='Nombre Completo' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic ' label='Tipo ID' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic' label='Numero ID' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic' label='Actividad Comercial' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic' label='Contribuyente' variant='outlined' />
			<TextField
				className='btn_step'
				id='outlined-basic'
				label='Numero de Cuenta'
				value='01051232353643563456'
				variant='outlined'
			/>
			<TextField className='btn_step' id='outlined-basic' label='MetodoPago' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic' label='Ciudad' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic' label='Estado' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic' label='Municipio' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic' label='Parroquia' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic' label='Sector' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic' label='Calle' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic' label='Local' variant='outlined' />
			<TextField className='btn_step' id='outlined-basic' label='CodigoPostal' variant='outlined' />
		</form>
	);
}
