import React, { useEffect } from 'react';
import { Button, FormControlLabel, makeStyles, Paper, Switch, TextField, Theme } from '@material-ui/core';
// @ts-expect-error
import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Url
import { PortFiles, URL } from '../../config';
import { RootState } from '../../store/store';

const useStyles = makeStyles((theme: Theme) => ({
	administracion: {
		flexGrow: 1,
		display: 'grid',
		gridColumnGap: '2rem',
		gridTemplateColumns: '1fr 1fr',
	},
	button: {
		width: 200,
		height: 70,
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
	dataGrid: {
		width: '100%',
		height: '75vh',
	},
	tableTitle: {
		fontSize: 32,
		fontWeight: 'bold',
		padding: '0 8px',
	},
	view: {
		width: '100%',
		padding: '1rem',
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
	},
	closeBtn: {
		width: 40,
		height: 40,
		position: 'absolute',
		top: 16,
		right: 16,
		padding: 0,
		minWidth: 'unset',
		borderRadius: 20,
	},
	red: {
		backgroundColor: theme.palette.error.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.error.light} !important`,
		},
	},
	yellow: {
		backgroundColor: theme.palette.warning.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.warning.light} !important`,
		},
	},
	green: {
		backgroundColor: theme.palette.success.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.success.light} !important`,
		},
	},
	wrapper: {
		padding: '16px 0',
		height: '100%',
	},
	img_zoom: {
		position: 'fixed',
		display: 'flex',
		justifyContent: 'center',
	},
	content: {
		display: 'flex',
		height: '100%',
		flexDirection: 'column',
	},
	row: {
		display: 'flex',
		width: '100%',
		marginBottom: 8,
		justifyContent: 'space-around',
	},
	textfieldLeft: {
		marginRight: 8,
	},
	switchControl: {
		position: 'absolute',
		bottom: 0,
		left: '35%',
	},
}));

export const Form: React.FC<any> = ({fm, handleChange}) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const props = {
		zoomPosition: 'original',
		height: 300,
		width: 400,
		img: fm.urlImgCompDep ? `${URL}:${PortFiles}/${fm.urlImgCompDep.path}` : '',
	};

	return (
		<>
			<div className={classes.tableTitle}>Formularios</div>
			<div className={classes.wrapper}>
					<div className={classes.content}>
						<div className={classes.row}>
							<TextField
								className={classes.textfieldLeft}
								id='outlined-basic'
								label='Metodo de Pago'
								variant='outlined'
								value={fm.paymentmethod.name}
							/>
							<TextField
								// className={classes.btn_stepT}
								id='outlined-basic'
								label='Tipo de Pago'
								variant='outlined'
								value={fm.type_payment.name}
							/>
						</div>
					{fm.urlImgCompDep &&
						<>
						{console.log(fm.urlImgCompDep.path)}
						<ReactImageZoom className={classes.img_zoom} {...props} />
						</>
					}
						<FormControlLabel
							control={<Switch checked={false} onChange={handleChange} name='pagoRecibido' color='primary' />}
							className={classes.switchControl}
							label={'¿Pago confirmado?'}
						/>
					</div>
		</div>
		</>
	);
}
