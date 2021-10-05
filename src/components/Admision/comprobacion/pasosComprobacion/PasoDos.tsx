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

export default function PasoDos() {
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const rc_ident_card: any = useSelector((state: RootState) => state.acceptance.validado.rc_ident_card);

	const dispatch = useDispatch();

	const classes = useStyles();
	const [state, setState] = React.useState(rc_ident_card);

	//const [text,setText] = React.useState('')
	useEffect(() => {
		dispatch(Valid({ rc_ident_card: state }));
		/*
		if(state.rc_ident_card === false) {
			Swal.fire({
				input: 'textarea',
				inputLabel: 'Este mesaje sera enviado el cliente por correo',
				inputPlaceholder: 'Escribe aqui',
				preConfirm: (value) => {
					console.log('entre', value)
				},
				customClass: { container: 'swal2-validated' },
				showCancelButton: true,
				cancelButtonText: 'Cerrar',
				confirmButtonText: 'Mensaje',
				showCloseButton: true,
			})
		}
		 */
		//eslint-disable-next-line react-hooks/exhaustive-deps
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
			<form className={classes.root} noValidate autoComplete='off'>
				<TextField
					className='btn_step btn_corto'
					id='outlined-basic'
					label='Tipo ID'
					variant='outlined'
					value={fm.ident_type_client}
				/>
				<TextField
					className='btn_step'
					id='outlined-basic'
					label='Numero ID'
					variant='outlined'
					value={fm.ident_num_client}
				/>
				<FormControlLabel
					control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
					label='Correcto'
				/>
			</form>
			<div className='img_container'>
				<ReactImageZoom {...props} />
			</div>
		</>
	);
}
