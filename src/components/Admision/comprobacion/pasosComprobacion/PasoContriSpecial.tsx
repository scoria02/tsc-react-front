import React, { useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
// @ts-expect-error
import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { Valid } from '../../../../store/actions/accept';
//Url
import { PortFiles, URL } from '../../../../config';
import { RootState } from '../../../../store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

export default function PasoContriSpecial() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const rc_special_contributor: any = useSelector((state: RootState) => state.acceptance.validado.rc_special_contributor);
	const [state, setState] = React.useState(rc_special_contributor);

	useEffect(() => {
		dispatch(Valid({rc_special_contributor:state}));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const props = {
		zoomPosition: 'original',
		height: 350,
		width: 450,
		img: `${URL}:${PortFiles}/${fm.path_rc_special_contributor}`,
	};

	return (
		<>
			<form className="container-step" noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<TextField
						className='btn_step btn_medio'
						id='outlined-basic '
						label='Contribuyente Especial'
						variant='outlined'
						value='Foto de Contribuyente Especial'
						disabled
					/>
					<FormControlLabel
						className={classes.checkText}
						control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
						label='Correcto'
					/>
				</div>
			</form>
			<div className='img_container_2'>
				<ReactImageZoom {...props} />
			</div>
		</>
	);
}
