/* eslint-disable react-hooks/exhaustive-deps */
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
	Autocomplete,
	Button,
	Checkbox,
	FormControlLabel,
	IconButton,
	InputAdornment,
	TextField,
	Tooltip,
} from '@mui/material';
import classNames from 'classnames';
import DataListContext from 'context/DataList/DataListContext';
import { Aci, Distributor, TeleMarket, TypeWallet } from 'context/DataList/interface';
import FMDataContext from 'context/Admision/CreationFM/fmAdmision/FmContext';
import ImagesFmContext from 'context/Admision/CreationFM/fmImages/ImagesFmContext';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validationNumBank } from 'store/actions/admision/fm';
import { RootState } from 'store/store';
import { recaudo } from 'utils/recaudos';
import { sxStyled, useStylesFM } from '../styles';
import Swal from 'sweetalert2';

//Pedido
const StepPos: FC = () => {
	const classes = useStylesFM();
	//const [isACI, setIsACI] = useState<boolean>(false);
	const [deleted, setDeleted] = useState<boolean>(false);
	const [fraccion, setFraccion] = useState<boolean>(false);
	const [cuotasTexto, setCuotasTexto] = useState('');
	const dispatch = useDispatch();
	// const cuotasText = ['5 cuotas de 50$', '4 cuotas de 50$', '3 cuotas de 50$'];

	const fm: any = useSelector((state: RootState) => state.fm);

	const handleInitalError = () => {
		Swal.fire({
			icon: 'error',
			title: 'Error',
			text: 'El monto es mayor o igual al precio del producto',
			customClass: { container: 'swal2-validated' },
			showConfirmButton: true,
			//timer: 2500,
		});
	};

	const {
		client,
		pos,
		aci,
		telemarket,
		typeWallet,
		errorsFm,
		handleParamsPos,
		handleChangePos,
		handleCheckedPos,
		handleSourceAci,
		handleSourceTelemarket,
		handleTypeWallet,
	} = useContext(FMDataContext);
	const {
		listPayment,
		listModelPos,
		listTypePay,
		listRequestSource,
		listAci,
		listWalletType,
		listTeleMarket,
		listDistributor,
	} = useContext(DataListContext);
	const { namesImages, imagesForm, handleChangeImages, deleteImgContributor } = useContext(ImagesFmContext);

	const handleChangeInitial = (event: React.ChangeEvent<HTMLInputElement>): void => {
		if (pos.model_post) {
			if (/^[0-9]+$/.test(event.target.value) || event.target.value === '') {
				if (Number(event.target.value) < pos.model_post?.price) {
					//console.log(event.target.value);
					handleParamsPos(event.target.name, Number(event.target.value));
				}
			}
		}
	};

	const handleBlurInitial = (): void => {
		if (Number(pos.initial) < 50) {
			//console.log('es menor');
			handleParamsPos('initial', 50);
		}
	};

	const handleChangeReferido = (event: React.ChangeEvent<HTMLInputElement>): void => {
		if (/^[V0-9]+$/.test(event.target.value) || event.target.value === '') {
			handleChangePos(event);
		}
	};

	const handleSelect = (event: any, value: any, name: string) => {
		if (value) handleParamsPos(name, value);
		else handleParamsPos(name, null);
	};

	const handleCheckedPagadero = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.checked && imagesForm.rc_comp_dep) {
			deleteImgContributor('comp_dep');
		}
		handleParamsPos('nro_comp_dep', '');
		handleCheckedPos(event);
	};

	const handleChangeBank = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (/^[0-9]+$/.test(event.target.value) || event.target.value === '') {
			if (event.target.value.length === 20) {
				if (fm.clientMash && fm.clientMash.email) {
					dispatch(
						validationNumBank({
							email: fm.clientMash.email,
							bank_account_num: event.target.value,
						})
					);
				} else if (client.email !== '') {
					dispatch(
						validationNumBank({
							email: client.email,
							bank_account_num: event.target.value,
						})
					);
				}
			}
			handleChangePos(event);
		}
	};

	useEffect(() => {
		if (pos.type_pay) {
			if (pos.type_pay.id === 2) {
				setFraccion(true);
			} else {
				setFraccion(false);
			}
		} else {
			setFraccion(false);
		}
		if (pos.initial && pos.model_post) {
			// cable pelado para el monto del precio del modelo seleccionado para calcular las cuotas
			let valor = pos.number_post * (pos.model_post.price - pos.initial);
			let cuotas = valor / (pos.number_post * 50);
			handleParamsPos('coutas', valor / (pos.number_post * 50));
			if (valor < 0) {
				handleParamsPos('initial', 100);
			}
			if (cuotas > 0 && cuotas) {
				setCuotasTexto(`${Math.ceil(cuotas)} cuota/s`);
			}
			if (pos.initial >= pos.model_post?.price) {
				handleParamsPos('initial', 100);
			}
		}
	}, [pos.number_post, pos.initial, pos.request_origin, pos.type_pay, pos.model_post]);

	useEffect(() => {
		if (imagesForm.rc_comp_dep) {
			setDeleted(true);
		} else {
			setDeleted(false);
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [imagesForm.rc_comp_dep]);

	return (
		<div className={classes.grid}>
			<div className={classes.input}>
				<TextField
					className={classes.inputSelect}
					style={{ marginRight: '2%' }}
					variant='outlined'
					required
					id='standard-required'
					label='Numero de Puntos'
					type='number'
					name='number_post'
					onChange={handleChangePos}
					error={errorsFm.number_post}
					value={pos.number_post}
					InputProps={{
						inputProps: {
							max: 100,
							min: 1,
						},
					}}
				/>
				<Autocomplete
					className={classes.inputText}
					onChange={(event, value) => handleSelect(event, value, 'model_post')}
					value={pos.model_post || null}
					options={listModelPos}
					getOptionLabel={(option: any) => (option.name ? option.name : '')}
					renderInput={(params: any) => (
						<TextField {...params} name='model_post' label='Modelo de los POS' variant='outlined' />
					)}
				/>
			</div>
			<div className={classes.input}>
				<TextField
					sx={sxStyled.inputLeft}
					// className={classes.inputTextLeft}
					variant='outlined'
					required
					id='standard-required'
					label={fm.nameBank === '' ? 'Numero de Cuenta' : fm.nameBank}
					name='text_account_number'
					onChange={handleChangeBank}
					value={pos.text_account_number}
					error={errorsFm.text_account_number || fm.errorNumBank}
					inputProps={{ maxLength: 20 }}
				/>
				<div className={classes.row}>
					<b className={classes.labels}>Referencia Bancaria</b>
					<Tooltip title='Cargar imagen de la Referencia Bancaria (Numero de cuenta)'>
						<Button
							className={classes.imgIdent}
							variant='contained'
							style={{
								background: imagesForm.rc_ref_bank ? '#5c62c5' : '#f44336',
							}}
							component='label'>
							{imagesForm.rc_ref_bank !== null ? (
								<>
									<IconButton aria-label='upload picture' component='span'>
										<PhotoCamera />
									</IconButton>
									<p className='nameImg'>{namesImages.rc_ref_bank.slice(0, 5)}...</p>
								</>
							) : (
								<>
									{/*<b>Subir</b>*/}
									<IconButton aria-label='upload picture' component='span'>
										<PhotoCamera />
									</IconButton>
								</>
							)}
							<input type='file' hidden name='rc_ref_bank' accept={recaudo.acc} onChange={handleChangeImages} />
						</Button>
					</Tooltip>
				</div>
			</div>
			<div className={classes.input}>
				<Autocomplete
					// className={classes.inputTextLeft}
					sx={sxStyled.inputLeft}
					onChange={(event, value) => handleSelect(event, value, 'payment_method')}
					options={listPayment}
					value={pos.payment_method || null}
					getOptionLabel={(option: any) => (option.name ? option.name : '')}
					renderInput={(params: any) => (
						<TextField {...params} name='payment_method' label='Modalidad de Pago' variant='outlined' />
					)}
				/>
				<Autocomplete
					className={classes.inputText}
					onChange={(event, value) => handleSelect(event, value, 'type_pay')}
					options={listTypePay}
					value={pos.type_pay || null}
					getOptionLabel={(option: any) => (option.name ? option.name : '')}
					renderInput={(params: any) => (
						<TextField {...params} name='type_pay' label='Tipo de Pago' variant='outlined' />
					)}
				/>
			</div>
			<div className={classes.input}>
				<Autocomplete
					// className={classes.inputTextLeft}
					sx={sxStyled.inputLeft}
					style={{ width: '50%' }}
					onChange={(event, value) => handleSelect(event, value, 'request_origin')}
					options={listRequestSource}
					value={pos.request_origin || null}
					getOptionLabel={(option: any) => (option.name ? option.name : '')}
					renderInput={(params: any) => (
						<TextField {...params} name='request_origin' label='Origen de Solicitud' variant='outlined' />
					)}
				/>
				{pos.request_origin?.id === 1 && (
					<TextField
						className={classes.inputText}
						style={{ width: '50%' }}
						variant='outlined'
						required
						id='standard-required'
						label='Numero de Cédula'
						name='reqSource_docnum'
						onChange={handleChangeReferido}
						inputProps={{
							maxLength: 9,
						}}
						value={pos.reqSource_docnum}
						InputProps={{
							startAdornment: <InputAdornment position='start'>V</InputAdornment>,
						}}
						error={errorsFm.reqSource_docnum}
					/>
				)}
				{pos.request_origin?.id === 2 ? (
					<Autocomplete
						// className='btn_step btn_medio'
						style={{ width: '50%' }}
						//disabled={} //si el comercio tiene aci traelo
						onChange={(event, value) => {
							handleSourceAci(event, value, 'reqSource_docnum');
						}}
						options={listAci}
						value={aci || null}
						getOptionLabel={(option: Aci | null) =>
							option ? option.aliTipoIdentificacion + option.aliIdentificacion + ' | ' + option.aliNombres : ''
						}
						// getOptionSelected={(option: Aci | null, value: Aci | null) => option?.id === value?.id}
						renderInput={(params: any) => (
							<TextField {...params} name='aci' label={`Buscar Aci`} variant='outlined' />
						)}
					/>
				) : pos.request_origin?.id === 3 ? (
					<Autocomplete
						// className='btn_step btn_medio'
						style={{ width: '50%' }}
						//disabled={} //si el comercio tiene aci traelo
						onChange={(event, value) => {
							// setTelemark(value ? value : null);
							handleSourceTelemarket(event, value ? value : null);
						}}
						options={listTeleMarket}
						value={telemarket || null}
						getOptionLabel={(option: TeleMarket | null) => (option ? option.name : '')}
						// getOptionSelected={(option: Aci | null, value: Aci | null) => option?.id === value?.id}
						renderInput={(params: any) => (
							<TextField {...params} name='typeWallet' label={`TeleMercadeo`} variant='outlined' />
						)}
					/>
				) : pos.request_origin?.id === 5 ? (
					<Autocomplete
						// className='btn_step btn_medio'
						style={{ width: '50%' }}
						//disabled={} //si el comercio tiene aci traelo
						onChange={(event, value) => {
							handleTypeWallet(event, value, 'typeWallet');
						}}
						options={listWalletType}
						value={typeWallet || null}
						getOptionLabel={(option: TypeWallet | null) => (option ? option.name : '')}
						// getOptionSelected={(option: Aci | null, value: Aci | null) => option?.id === value?.id}
						renderInput={(params: any) => (
							<TextField {...params} name='typeWallet' label={`Tipos de Cartera`} variant='outlined' />
						)}
					/>
				) : (
					pos.request_origin?.id === 8 && (
						<Autocomplete
							// className='btn_step btn_medio'
							style={{ width: '50%' }}
							//disabled={} //si el comercio tiene aci traelo
							onChange={(event, value) => {
								handleSourceAci(event, value, 'reqSource_docnum');
							}}
							options={listDistributor}
							value={aci || null}
							getOptionLabel={(option: Distributor | null) =>
								option ? option.aliTipoIdentificacion + option.aliIdentificacion + ' | ' + option.aliNombres : ''
							}
							// getOptionSelected={(option: Aci | null, value: Aci | null) => option?.id === value?.id}
							renderInput={(params: any) => (
								<TextField {...params} name='distributor' label={`Buscar distribuidor`} variant='outlined' />
							)}
						/>
					)
				)}
				{pos.request_origin?.id === 6 && (
					<TextField
						className={classes.inputText}
						style={{ width: '50%' }}
						variant='outlined'
						required
						id='standard-required'
						label='Numero de Cédula'
						name='reqSource_docnum'
						onChange={handleChangeReferido}
						inputProps={{
							maxLength: 9,
						}}
						value={pos.reqSource_docnum}
						InputProps={{
							startAdornment: <InputAdornment position='start'>V</InputAdornment>,
						}}
						error={errorsFm.reqSource_docnum}
					/>
				)}
			</div>
			<div className={classes.input}>
				{fraccion && (
					<>
						<TextField
							sx={sxStyled.inputLeft}
							id='initial'
							label='Inicial'
							type='text'
							name='initial'
							variant='outlined'
							value={pos.initial}
							InputProps={{
								inputProps: {
									max: pos.number_post * (pos?.model_post?.price || 100),
									min: 50,
								},
							}}
							onBlur={handleBlurInitial}
							onChange={handleChangeInitial}
						/>
						<TextField
							disabled
							id='initial'
							label='Cantidad de cuotas'
							className={classes.inputText}
							type='text'
							variant='outlined'
							value={cuotasTexto}
						/>
					</>
				)}
			</div>
			<div className={classes.input}>
				<FormControlLabel
					className={classNames(classes.inputText, classes.containerCheckBox)}
					label=''
					control={
						<>
							<Checkbox
								name='pagadero'
								checked={pos.pagadero}
								onChange={handleCheckedPagadero}
								color='primary'
								inputProps={{ 'aria-label': 'secondary checkbox' }}
							/>
							<b
								style={{
									fontSize: '1rem',
								}}>
								Pagadero en Destino
							</b>
						</>
					}
				/>
			</div>
			<FormControlLabel
				sx={sxStyled.inputLeft}
				className={classes.containerCheckBox}
				label=''
				control={
					<>
						<Checkbox
							name='discount'
							checked={pos.discount}
							onChange={(event) => {
								if (pos?.model_post?.price) {
									if (event.target.checked) {
										if (pos.initial + 50 < pos.model_post.price) handleCheckedPos(event);
										else handleInitalError();
									} else {
										if (pos.initial >= 50) {
											handleCheckedPos(event);
										} else
											Swal.fire({
												icon: 'error',
												title: 'Error',
												text: 'El monto no esta en el rango',
												customClass: { container: 'swal2-validated' },
												showConfirmButton: true,
											});
									}
								}
							}}
							color='primary'
							inputProps={{ 'aria-label': 'secondary checkbox' }}
						/>
						<b
							style={{
								fontSize: '1rem',
							}}>
							Entrega de punto como parte de pago
						</b>
					</>
				}
			/>
			<div
				className={classes.input}
				style={{
					visibility: pos.pagadero || pos.payment_method?.id === 2 ? 'hidden' : 'visible',
				}}>
				<div className={classNames(classes.row, classes.inputTextLeft)}>
					<b className={classes.labels}>Comprobante de pago</b>
					<Tooltip title='Cargar imagen del Comprobante de Pago (Numero de Referencia)'>
						<Button
							className={classes.imgIdent}
							variant='contained'
							style={{ background: imagesForm.rc_comp_dep ? '#5c62c5' : '#f44336' }}
							onClick={() => {
								deleted && deleteImgContributor('comp_dep');
							}}
							component='label'>
							{imagesForm.rc_comp_dep !== null ? (
								<>
									<IconButton aria-label='upload picture' component='span'>
										<PhotoCamera />
									</IconButton>
									<p className='nameImg'>{namesImages.rc_comp_dep.slice(0, 5)}...</p>
								</>
							) : (
								<>
									<IconButton aria-label='upload picture' component='span'>
										<PhotoCamera />
									</IconButton>
								</>
							)}
							<input
								type='file'
								hidden
								name='rc_comp_dep'
								accept={recaudo.acc}
								disabled={deleted}
								onChange={handleChangeImages}
							/>
						</Button>
					</Tooltip>
				</div>
				<div className={classes.inputText}>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Referencia'
						placeholder='Numero de comprobante'
						name='nro_comp_dep'
						onChange={handleChangePos}
						value={pos.nro_comp_dep}
						inputProps={{ maxLength: 20 }}
						//error={erorr.reqSource_docnum}
					/>
				</div>
			</div>
		</div>
	);
};

export default StepPos;
