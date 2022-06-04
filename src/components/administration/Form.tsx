/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react';
//
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Autocomplete, Button, IconButton, TextField } from '@mui/material';
import RecPdf from 'components/utilis/images/RecPdf';
//
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateStatusFMAdministration } from 'store/actions/administration/administration';
import Swal from 'sweetalert2';
import { handleNotAccess } from 'utils/handleSwal';
import { recaudo } from 'utils/recaudos';
//Url
import './styles/index.scss';
import { sxStyled, useStyles } from './styles/styles';

export const Form: FC<any> = ({
	fm,
	setFm,
	uploadImg,
	nameImg,
	setUploadImg,
	setNameImage,
	payment,
	setPayment,
	listPayment,
	typePay,
	setTypePay,
	listTypePay,
	path,
	setPath,
}) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { user } = useSelector((state: any) => state.auth);
	const { permiss }: any = user;

	const [load, setLoad] = useState<boolean>(false);
	const [cuotasTexto, setCuotasTexto] = useState('');
	const [fraccion, setFraccion] = useState<any>({
		state: false,
		coutas: 0,
		initial: 100,
	});

	useEffect(() => {
		if (typePay) {
			//console.log('type', typePay.id)
			if (typePay.id === 2) {
				setFraccion({
					...fraccion,
					state: true,
				});
			} else {
				setFraccion({
					...fraccion,
					state: false,
				});
			}
		} else {
			setFraccion({
				...fraccion,
				state: false,
			});
		}
		/*
		if (initial && modelPos) {
			let valor = cursedForm.number_post * (modelPos.price - cursedForm.initial);
			let cuotas = valor / (cursedForm.number_post * 50);

			setCursedForm({
				...cursedForm,
				cuotas: valor / (cursedForm.number_post * 50),
			});

			if (valor < 0) {
				setCursedForm({
					...cursedForm,
					initial: 100,
				});
			}
			if (cuotas % 1 === 0 && cuotas > 0 && cuotas) {
				setCuotasTexto(`${cuotas} cuota/s de 50$`);
			} else {
				setCursedForm({
					...cursedForm,
					initial: 100,
				});
			}
		}
	*/
	}, [fraccion.initial, typePay]);

	const handleChangeImages = (event: any) => {
		if (event.target.files[0]) {
			let file = event.target.files[0];
			let newFile = new File([file], `${event.target.name}.${file.type.split('/')[1]}`, { type: 'image/jpeg' });
			const path = URL.createObjectURL(file);
			//Save img
			setUploadImg(newFile);
			setNameImage(event.target.files[0].name);
			setPath(path);
		}
	};

	const handleLoading = () => {
		Swal.fire({
			icon: 'info',
			title: 'Verificando...',
			showConfirmButton: false,
			customClass: { container: 'swal2-validated' },
			allowOutsideClick: false,
			allowEscapeKey: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});
	};

	const handleVerificated = () => {
		if (!permiss['Validar Pago']) {
			handleNotAccess();
			return;
		}
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
				handleLoading();
				const data: any = !fm.pagadero
					? {}
					: {
							id_payment_method: payment.id,
							id_type_payment: typePay.id,
					  };
				//console.log(data);
				//dispatch() //images
				dispatch(updateStatusFMAdministration(fm.id, 3, null));
			}
		});
	};

	const handleSelectPayment = (event: any, value: any) => {
		if (value) {
			setPayment(value);
		} else {
			setPayment(null);
		}
	};

	const handleSelectTypePay = (event: any, value: any) => {
		if (value) {
			setTypePay(value);
		} else {
			setTypePay(null);
		}
	};

	const disButton = () => {
		if (path || (payment && payment.id === 2)) {
			return false;
		} else {
			return true;
		}
	};

	const handleChangeInitial = (event: React.ChangeEvent<HTMLInputElement>): void => {
		// Cambiar a que reconozca cuanto es el maximo de inicial que puede ingresar segun el maximo del FM
		setFraccion({
			...fraccion,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {
		if (payment && payment.id === 2) {
			setUploadImg(null);
			setNameImage('');
			setFm({
				...fm,
				urlImgCompDep: '',
			});
		}
	}, [payment]);

	useEffect(() => {
		//console.log('form admin', fm);
	}, []);

	const imagen: any = path
		? path
		: fm.rc_comp_dep
		? `${process.env.REACT_APP_API_IMAGES}/${fm.rc_comp_dep?.path}`
		: '';

	//console.log(imagen);

	return (
		<>
			<h2 className={classes.tableTitle}>
				Formulario: <span className={classes.codeFm}>{fm.code}</span>
			</h2>
			<div className={classes.wrapper}>
				<div className={classes.content}>
					<div className={classes.row}>
						{fm.pagadero ? (
							<Autocomplete
								// className={classes.textAutoCompleteLeft}
								sx={sxStyled.textAutoCompleteLeft}
								onChange={(event, value) => handleSelectPayment(event, value)}
								options={listPayment}
								value={payment}
								getOptionLabel={(option: any) => (option.name ? option.name : '')}
								// getOptionSelected={(option: any, value: any) => option.id === value.id}
								renderInput={(params: any) => (
									<TextField
										{...params}
										name='payment_method'
										label='Modalidad de Pago'
										variant='outlined'
										className={classes.textfieldLeft}
									/>
								)}
							/>
						) : (
							<TextField
								sx={sxStyled.textfieldLeft}
								// className={classes.textfieldLeft}
								id='outlined-basic'
								label='Metodo de Pago'
								variant='outlined'
								value={fm?.id_payment_method.name}
							/>
						)}
						{fm?.pagadero ? (
							<Autocomplete
								sx={sxStyled.textAutoCompleteLeft}
								onChange={(event, value) => handleSelectTypePay(event, value)} //arreglar (es nesario usar event y value??)
								options={listTypePay}
								value={typePay || null}
								getOptionLabel={(option: any) => (option.name ? option.name : '')}
								// getOptionSelected={(option: any, value: any) => option.id === value.id}
								renderInput={(params: any) => (
									<TextField
										{...params}
										name='typePay'
										label='Tipo de Pago'
										variant='outlined'
										className={classes.textfieldLeft}
									/>
								)}
							/>
						) : (
							<TextField
								sx={sxStyled.textfieldLeft}
								id='outlined-basic'
								label='Tipo de Pago'
								variant='outlined'
								value={fm?.id_type_payment.name}
							/>
						)}
						{fm?.ci_referred && !fm.pagadero && (
							<TextField id='outlined-basic' label='Referencia' variant='outlined' value={fm?.ci_referred} />
						)}
					</div>
					<div className={classes.row}>
						{fraccion.state && (
							<>
								<TextField
									id='initial'
									label='Inicial'
									sx={sxStyled.textAutoCompleteLeft}
									type='number'
									name='initial'
									variant='outlined'
									value={fraccion.initial}
									onKeyDown={(e) => {
										e.preventDefault();
									}}
									inputProps={{
										maxLength: 5,
										step: '1',
										min: '100',
									}}
									onChange={handleChangeInitial}
								/>
								<TextField
									disabled
									id='initial'
									label='Cantidad de cuotas'
									// sx={sxStyled.textAutoCompleteLeft}
									type='text'
									variant='outlined'
									value={cuotasTexto}
								/>
							</>
						)}
					</div>
					{!fm.pagadero ? (
						<div className={classes.containerImg}>
							{console.log(fm)}
							<Button
								sx={sxStyled.buttonV}
								onClick={handleVerificated}
								variant='contained'
								disabled={disButton()}
								color='primary'>
								Verificar
							</Button>
							{fm.id_payment_method.id !== 2 && fm.id_payment_method.id !== 6 && fm.rc_comp_dep !== null ? (
								<RecPdf load={load} setLoad={setLoad} imagen={imagen} />
							) : null}
						</div>
					) : (
						<>
							<Button
								sx={sxStyled.buttonV}
								onClick={handleVerificated}
								variant='contained'
								disabled={disButton()}
								color='primary'>
								Verificar
							</Button>
							{uploadImg && (
								<div
									className={classes.containerImg}
									style={{
										marginTop: '1rem',
									}}>
									{uploadImg && uploadImg.name.split('.')[uploadImg.name.split('.').length - 1] === 'pdf' ? (
										<div>
											<a target='_blank' rel='noreferrer' href={path}>
												<Button sx={sxStyled.buttonPdf} variant='contained' component='label'>
													<IconButton aria-label='upload picture' component='span'>
														<PictureAsPdfIcon />
													</IconButton>
												</Button>
											</a>
										</div>
									) : (
										<RecPdf load={load} setLoad={setLoad} imagen={imagen} />
									)}
								</div>
							)}
							{payment && payment.id !== 2 && (
								<Button sx={sxStyled.uploadImg} variant='contained' component='label'>
									<IconButton aria-label='upload picture' component='span'>
										<CloudUploadIcon className={classes.iconUpload} />
									</IconButton>
									<input
										type='file'
										hidden
										name='rc_comp_dep'
										accept={recaudo.acc}
										onChange={handleChangeImages}
									/>
								</Button>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
};
