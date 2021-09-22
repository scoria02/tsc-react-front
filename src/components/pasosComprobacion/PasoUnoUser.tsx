import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

//Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

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

	const client: any = useSelector((state: RootState) => state.fmAdmision.fm.id_client);

	return (
		<form className={classes.root} noValidate autoComplete='off'>
			<TextField className='btn_step btn_largo' id='outlined-basic' label='Nombre Completo' variant='outlined' disabled={true} 
				value={`${client.name} ${client.last_name}`}
			/>
			<TextField className='btn_step' id='outlined-basic ' label='Tipo ID' variant='outlined' disabled={true} value={'hola'}/>
			<TextField className='btn_step' id='outlined-basic' label='Numero ID' variant='outlined' disabled={true} value={client.ident}/>
			<TextField className='btn_step' id='outlined-basic' label='Telefono' variant='outlined' disabled={true} value={client.ident}/>
			<TextField className='btn_step' id='outlined-basic' label='Telefono2' variant='outlined' disabled={true} value={client.ident}/>
			<TextField className='btn_step btn_largo' id='outlined-basic' label='correo' variant='outlined' disabled={true} value={client.email}/>
		</form>
	);
}
