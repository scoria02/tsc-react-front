import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

//Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import './styles/pasos.scss';

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

	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);

	return (
		<form className={classes.root} noValidate autoComplete='off'>
			<TextField
				className='btn_step btn_largo'
				id='outlined-basic' 
				label='Nombre Completo' 
				variant='outlined' 
				value={`${fm.name_client} ${fm.last_name_client}`}
			/>
			<TextField 
				className='btn_step'
				id='outlined-basic'
				label='Tipo ID' 
				variant='outlined' 
				value={fm.ident_type_client}/>
			<TextField 
				className='btn_step'
				id='outlined-basic' 
				label='Numero ID'
				variant='outlined'
				value={fm.ident_num_client}/>
			<TextField 
				className='btn_step'
				id='outlined-basic'
				label='Telefono'
				variant='outlined'
				value={fm.phone1}/>
			<TextField 
				className='btn_step'
				id='outlined-basic'
				label='Telefono2'
				variant='outlined'
				value={fm.phone2}/>
			<TextField 
				className='btn_step btn_largo'
				id='outlined-basic'
				label='correo'
				variant='outlined'
				value={fm.email_client}/>
		</form>
	);
}
