import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
//Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import './styles/pasos.scss';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
				width: '25ch',
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
			<div className='btn_step btn_largo'>
				<TextField
					className='btn_type_id'
					id='outlined-basic'
					label='Tipo ID'
					variant='outlined'
					value={fm.ident_type_client}
				/>
				<TextField
					className='btn_num_id'
					id='outlined-basic'
					label='Numero ID'
					variant='outlined'
					value={fm.ident_num_client}
				/>
			</div>
			<TextField className='btn_step' id='outlined-basic' label='Telefono' variant='outlined' value={fm.phone1} />
			<TextField className='btn_step' id='outlined-basic' label='Telefono2' variant='outlined' value={fm.phone2} />
			<TextField
				className='btn_step btn_largo'
				id='outlined-basic'
				label='Correo'
				variant='outlined'
				value={fm.email_client}
			/>
		</form>
	);
}
