import React, { useEffect } from 'react';
import { Button, FormControlLabel, makeStyles, Paper, Switch, TextField, Theme } from '@material-ui/core';
import Swal from 'sweetalert2';
// @ts-expect-error
import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Url
import { PortFiles, URL } from '../../config';
import { RootState } from '../../store/store';
import './styles/index.scss';

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
		fontSize: 20,
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
	buttonV: {
		textTransform: 'none',
		marginRight: theme.spacing(1),
		width: 115,
		alignSelf: 'center',
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
		justifyContent: 'center',
		padding: '16px 0',
		height: '100%',
	},
	img_zoom: {
		position: 'fixed',
		display: 'flex',
		justifyContent: 'center',
	},
	containerImg: {
		alignSelf: 'center',
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
	codeFm: {
		color: theme.palette.primary.main,
	}
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

	const handleVerificated = () => {
		console.log('entreeeee')
		Swal.fire({
			title: 'Confirmar verificación',
			icon: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Verificado',
			showCancelButton: true,
			cancelButtonText: 'Atras',
			showCloseButton: true,
			customClass: { container: 'swal2-validated' },
		}).then((result) => {
			if (result.isConfirmed) {
				console.log('confirmar')
			}
		});
	}

	return (
		<>
			<h2 className={classes.tableTitle}>Formulario: <span className={classes.codeFm}>{fm.code}</span></h2>
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
								className={classes.textfieldLeft}
								id='outlined-basic'
								label='Tipo de Pago'
								variant='outlined'
								value={fm.type_payment.name}
							/>
							{(fm.urlImgCompDep && !fm.pagadero) &&
								<TextField
									id='outlined-basic'
									label='Referencia'
									variant='outlined'
									value={fm.nro_comp_dep}
								/>
							}
						</div>
					{(fm.urlImgCompDep && !fm.pagadero) &&
						<div className={classes.containerImg}>
							{console.log(fm.urlImgCompDep.path)}
							<ReactImageZoom className={classes.img_zoom} {...props} />
						</div>
					}
							<Button
								className={classes.buttonV}
								onClick={handleVerificated}
								variant='contained'
								color='primary'>	
								Verificar
							</Button>
	{/*
							<FormControlLabel
								control={<Switch checked={false} onChange={handleChange} name='pagoRecibido' color='primary' />}
								className={classes.switchControl}
								label={'¿Pago confirmado?'}
							/>
						*/}
					</div>
		</div>
		</>
	);
}
