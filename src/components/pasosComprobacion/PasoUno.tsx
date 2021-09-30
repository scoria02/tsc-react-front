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

export default function PasoUno() {

	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const classes = useStyles();

	return (
		<form className={classes.root} noValidate autoComplete='off'>
			<TextField 
				id='outlined-basic' 
				label='Nombre Completo'
				variant='outlined'
				value={fm.name_commerce}
			/>
			<TextField 
				className='btn_step'
				id='outlined-basic' 
				label='Tipo ID' 
				variant='outlined' 
				value={fm.ident_type_commerce}
			/>
			<TextField 
				className='btn_step' 
				id='outlined-basic'
				label='Numero ID'
				value={fm.ident_num_commerce}
				variant='outlined' />
			<TextField 
				className='btn_step' 
				id='outlined-basic'
				label='Contribuyente' 
				value={fm.special_contributor === 1 ? 'Si' : 'No'}
				variant='outlined' />
			<TextField 
				className='btn_step' 
				id='outlined-basic'
				label='Actividad Comercial' 
				value={'Actividad'}
				variant='outlined' />
			<TextField
				className='btn_step'
				id='outlined-basic'
				label='Numero de Cuenta'
				value={fm.bank_account_num}
				variant='outlined'
			/>
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='MetodoPago'
				value={fm.paymet}
				variant='outlined' 
			/>
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='Estado'
				value={fm.estado_commerce}
				variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='Ciudad'
				value={fm.ciudad_commerce}
				variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='Municipio'
				value={fm.municipio_commerce}
				variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='Parroquia'
				value={fm.parroquia_commerce}
				variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='Sector'
				value={fm.sector_commerce}
				variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='Calle'
				value={fm.calle_commerce}
				variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='Local'
				value={fm.local_commerce}
				variant='outlined' />
			<TextField className='btn_step' 
				id='outlined-basic' 
				label='Cod. Postal'
				value={'codigo postal'}
				variant='outlined' />
		</form>
	);
}
