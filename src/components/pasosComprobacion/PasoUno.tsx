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

export default function PasoUno() {

	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const classes = useStyles();

	return (
		<form className={classes.root} noValidate autoComplete='off'>
			<TextField 
				className='btn_step' 
				id='outlined-basic' 
				label='Nombre Completo'
				variant='outlined'
				name='nameClient'
				value={fm.id_commerce.name}
				disabled={true}
			/>
			<TextField 
				className='btn_step'
				id='outlined-basic' 
				label='Tipo ID' 
				variant='outlined' 
				name='id_ident_type'
				value={fm.id_commerce.id_ident_type}
				disabled={true}
			/>
			<TextField 
				className='btn_step' 
				id='outlined-basic'
				label='Numero ID'
				name='ident_num'
				value={fm.id_commerce.ident_num}
				disabled={true}
				variant='outlined' />
			<TextField 
				className='btn_step' 
				id='outlined-basic'
				label='Actividad Comercial' 
				name='ident_num'
				value={fm.id_commerce.activity}
				disabled={true}
				variant='outlined' />
			<TextField 
				className='btn_step' 
				id='outlined-basic'
				label='Contribuyente' 
				name='special_contributor'
				value={fm.id_commerce.special_contributor === 1 ? 'Si' : 'No'}
				disabled={true}
				variant='outlined' />
			<TextField
				className='btn_step'
				id='outlined-basic'
				label='Numero de Cuenta'
				name='number_account'
				value={fm.bank_account_num}
				disabled={true}
				variant='outlined'
			/>
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='MetodoPago'
				variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='Ciudad'
				name="ciudad"
				//value={fm.id_commerce.ciudad}
				variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='Estado'
				variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='Municipio'
				variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='Parroquia'
				variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='Sector'
				variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='Calle'
				variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
		label='Local'
		variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='CodigoPostal'
				variant='outlined' />
		</form>
	);
}
