import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// @ts-expect-error
import ReactImageZoom from 'react-image-zoom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

//Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
//Url
import { URL, PortFiles } from '../../config'

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

export default function PasoTresDos() {
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const classes = useStyles();
	const [state, setState] = React.useState({
		checkedA: false,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const props = { zoomPosition: 'original', height: 350, width: 450, img: `${URL}:${PortFiles}/${fm.path_rc_ref_bank}` };

	return (
		<>
			<form className={classes.root} noValidate autoComplete='off'>
				<TextField
					className='btn_step btn_medio'
					id='outlined-basic '
					label='Referencia Bancaria'
					value='Referencia Bancaria'
					variant='outlined'
					disabled
				/>
				<FormControlLabel
					control={<Switch checked={state.checkedA} onChange={handleChange} name='checkedA' color='primary' />}
					label='Correcto'
				/>
			</form>
			<div className='img_container'>
				<ReactImageZoom {...props} />
				{/* <img className='img_tamano' src={luffy} alt='Cedula' /> */}
			</div>
		</>
	);
}