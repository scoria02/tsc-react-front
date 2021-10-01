import FormControlLabel from '@material-ui/core/FormControlLabel';
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
	const dispatch = useDispatch();

	const classes = useStyles();
	const [state, setState] = React.useState({
		cedula: false,
	});

	useEffect(() => {
		dispatch(Valid(state));
	}, [setState, dispatch, state]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });
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
					control={<Switch checked={state.cedula} onChange={handleChange} name='cedula' color='primary' />}
					label='Correcto'
				/>
			</form>
			<div className='img_container'>
				<ReactImageZoom {...props} />
			</div>
		</>
	);
}
