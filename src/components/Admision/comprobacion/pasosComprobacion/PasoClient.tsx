import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Swal from 'sweetalert2';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import React, { useEffect } from 'react';
// @ts-expect-error
import ReactImageZoom from 'react-image-zoom';
import { useDispatch, useSelector } from 'react-redux';
//Url
import { PortFiles, URL } from '../../../../config';
import { Valid } from '../../../../store/actions/accept';
import { RootState } from '../../../../store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

export default function PasoClient() {
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const rc_ident_card: any = useSelector((state: RootState) => state.acceptance.validado.rc_ident_card);

	const dispatch = useDispatch();

	const classes = useStyles();
	const [state, setState] = React.useState(rc_ident_card);

	//const [text,setText] = React.useState('')
	useEffect(() => {
		dispatch(Valid({ rc_ident_card: state }));
	}, [state]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ 
			...state, 
			[event.target.name]: event.target.checked,
		});
	};

	const props = {
		zoomPosition: 'original',
		height: 350,
		width: 450,
		img: `${URL}:${PortFiles}/${fm.path_rc_ident_card}`,
	};

	return (
		<>
			<form className="container-step" noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<TextField
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Nombre'
						variant='outlined'
						value={fm.name_client}
					/>
					<TextField
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Apellido'
						variant='outlined'
						value={fm.last_name_client}
					/>
					<TextField
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Numero ID'
						variant='outlined'
						value={`${fm.ident_type_client} ${fm.ident_num_client}`}
					/>
				<FormControlLabel
					control={<Switch
						checked={state.status}
						onChange={handleChange}
						name='status'
						color='primary'
						/>}
					className={classes.checkText}
					label={state.status ? 'Correcto' : 'Incorrecto'}
				/>
				</div>
			</form>
			<div className='img_container'>
				<ReactImageZoom className={classes.img_zoom} {...props} />
			</div>
		</>
	);
}

