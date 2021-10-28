import React, { useState, useEffect }  from 'react';
import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Swal from 'sweetalert2';
// @ts-expect-error
import ReactImageZoom from 'react-image-zoom';
//Redux
import { useDispatch } from 'react-redux';
//Url
import './styles/index.scss';
import { updateStatusFMAdministration } from '../../store/actions/administration';

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
		padding: '2px 0',
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
	},
	uploadImg: {
		margin: '1rem',
		padding: '0',
		fontSize: '.7rem',
		textTransform: 'none',
		minWidth: 200,
		width: '100px',
		minHeight: 50,
		height: '500x',
		alignSelf: 'center',
	},
	iconUpload: {
		fontSize: '4rem',
	},
	nameImg: {
		fontSize: '1rem',
		marginBottom: '-3px',
	}
}));

export const Form: React.FC<any> = ({
	fm,
	setFm,
	handleChange,
	uploadImg,
	nameImg,
	setUploadImg,
	setNameImage,
}) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleChangeImages = (event: any) => {
		const path = URL.createObjectURL(event.target.files[0]);
		if (event.target.files[0]) {
			let file = event.target.files[0];
			let newFile = new File([file], `${event.target.name}.${file.type.split('/')[1]}`, { type: 'image/jpeg' });
			//Save img
			setUploadImg(newFile); 
			setNameImage(event.target.files[0].name);
			setFm({
				...fm,
				urlImgCompDep: path
			});
		}
	};

	console.log(fm.urlImgCompDep)

	const props = {
		zoomPosition: 'original',
		height: 350,
		width: 500,
		img: fm.urlImgCompDep 
	};

	const handleVerificated = () => {
		Swal.fire({
			title: 'Confirmar verificación',
			icon: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Verificado',
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			showCloseButton: true,
			customClass: { container: 'swal2-validated' },
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(updateStatusFMAdministration(fm.id, 3, null))
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
					{(fm.urlImgCompDep && !fm.pagadero) ?
						<div className={classes.containerImg}>
							<ReactImageZoom className={classes.img_zoom} {...props} />
						</div>
					:
					<>
					{uploadImg &&
						<div className={classes.containerImg}>
							<ReactImageZoom className={classes.img_zoom} {...props} />
						</div>
					}
					<Button
						className={classes.uploadImg}
						variant='contained'
						component='label'
						//style={{ 
							//		background: imagesForm.rc_ident_card ? '#5c62c5' : '#bbdefb' }}
						>

						{uploadImg !== null ? (
							<IconButton aria-label='upload picture' component='span'>
								<p className={classes.nameImg}>{nameImg.slice(0, 10)} ...</p>
							</IconButton>
						) : (
							<IconButton aria-label='upload picture' component='span'>
								<CloudUploadIcon className={classes.iconUpload}/>
							</IconButton>
						)}
						<input
							type='file'
							hidden
							name='rc_comp_dep'
							accept='image/png, image/jpeg, image/jpg'
							onChange={handleChangeImages}
						/>
					</Button>
				</>
					}
				<Button
					className={classes.buttonV}
					onClick={handleVerificated}
					variant='contained'
					color='primary'>	
					Verificar
				</Button>
			</div>
		</div>
		</>
	);
}
