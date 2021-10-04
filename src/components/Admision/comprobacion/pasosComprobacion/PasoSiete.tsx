import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// @ts-expect-error
import ReactImageZoom from 'react-image-zoom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { RootState } from '../../../../store/store';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from '../../../../store/actions/accept';

import luffy from '../../img/itachi2.png';
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

export default function PasoSiete() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const rc_rif: any = useSelector((state: RootState) => state.acceptance.validado.rc_rif);

	const [state, setState] = React.useState({
		checkedA: false,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const props = { zoomPosition: 'original', height: 350, width: 450, img: luffy };

	return (
		<>
			<form className={classes.root} noValidate autoComplete='off'>
				<TextField
					className='btn_step btn_medio'
					id='outlined-basic '
					label='Frente Local'
					variant='outlined'
					value='Foto de Frente Local'
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
