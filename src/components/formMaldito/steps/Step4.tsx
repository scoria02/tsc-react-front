/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, FormControlLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Autocomplete from '@material-ui/lab/Autocomplete';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useStylesFM } from '../styles';

//Pedido
export const Step4: React.FC<any> = ({
	cursedForm,
	listTypePay,
	setTypePay,
	typePay,
	imagesForm,
	namesImages,
	listModelPos,
	setModelPost,
	modelPos,
	listPayment,
	setPayment,
	payment,
	error,
	setCursedForm,
	handleChange,
	handleChangeImages,
	handleBlurNumBank,
	listRequestSource,
	requestSource,
	setRequestSource,
	deleteImgContributor,
}) => {
	const classes = useStylesFM();
	const [fraccion, setFraccion] = useState<boolean>(false);
	const [referido, setReferido] = useState<boolean>(false);
	const [deleted, setDeleted] = useState<boolean>(false);
	// const cuotasText = ['5 cuotas de 50$', '4 cuotas de 50$', '3 cuotas de 50$'];
	const [cuotasTexto, setCuotasTexto] = useState('');

	const fm: any = useSelector((state: RootState) => state.fm);

	const handleSelectPayment = (event: any, value: any, item: string) => {
		if (value) {
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: value.id,
			});
			setPayment(value);
		} else {
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: 0,
			});
			setPayment(null);
		}
	};

	const handleSelectTypePay = (event: any, value: any, item: string) => {
		if (value) {
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: value.id,
			});
			setTypePay(value);
		} else {
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: 0,
			});
			setTypePay(null);
		}
	};

	const handleSelectPos = (event: any, value: any, item: string) => {
		if (value) {
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: value.id,
			});
			setModelPost(value);
		} else {
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: 0,
			});
			setModelPost(null);
		}
	};

	const handleChecked = (e: any) => {
		setCursedForm({
			...cursedForm,
			[e.target.name]: !cursedForm[`${e.target.name}`] ? 1 : 0,
		});
	};

	const handleCheckedPagadero = (e: any) => {
		if (!cursedForm[`${e.target.name}`]) {
			deleteImgContributor('comp_dep');
		}
		setCursedForm({
			...cursedForm,
			[e.target.name]: !cursedForm[`${e.target.name}`] ? 1 : 0,
			nro_comp_dep: '',
		});
	};

	const handleSelectOrigin = (event: any, value: any, item: string) => {
		if (value) {
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: value.id,
			});
			setRequestSource(value);
		} else {
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: 0,
			});
			setRequestSource(null);
		}
	};

	useEffect(() => {
		if (typePay) {
			if (typePay.id === 2) {
				setFraccion(true);
			} else {
				setFraccion(false);
			}
		} else {
			setFraccion(false);
		}
		if (requestSource) {
			switch (requestSource.id) {
				case 1:
					setReferido(true);
					break;
				case 2:
					setReferido(true);
					break;
				default:
					setReferido(false);
			}
		} else {
			setReferido(false);
		}
		if (cursedForm.initial && modelPos) {
			// cable pelado para el monto del precio del modelo seleccionado para calcular las cuotas
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
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [cursedForm.number_post, cursedForm.initial, requestSource, typePay, modelPos]);

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
					onChange={handleChange}
					error={error.number_post}
					value={cursedForm.number_post}
				/>
				<Autocomplete
					className={classes.inputText}
					onChange={(event, value) => handleSelectPos(event, value, 'model_post')}
					value={modelPos || null}
					options={listModelPos}
					getOptionLabel={(option: any) => (option.name ? option.name : '')}
					renderInput={(params: any) => (
						<TextField {...params} name='model_post' label='Modelo de los POS' variant='outlined' />
					)}
				/>
			</div>
			<div className={classes.input}>
				<TextField
					className={classes.inputText}
					variant='outlined'
					required
					id='standard-required'
					label='Numero de Cuenta'
					name='text_account_number'
					onChange={handleChange}
					onBlur={handleBlurNumBank}
					value={cursedForm.text_account_number}
					error={error.text_account_number || fm.errorNumBank}
					inputProps={{ maxLength: 20 }}
				/>
				<div className={classes.row}>
					<b className={classes.labels}>Referencia Bancaria</b>
					<Button
						className={classes.imgIdent}
						variant='contained'
						style={{ background: imagesForm.rc_ref_bank ? '#5c62c5' : '#bbdefb' }}
						component='label'>
						{imagesForm.rc_ref_bank !== null ? (
							<>
								<p className='nameImg'>{namesImages.rc_ref_bank.slice(0, 7)}...</p>
							</>
						) : (
							<>
								{/*<b>Subir</b>*/}
								<IconButton aria-label='upload picture' component='span'>
									<PhotoCamera />
								</IconButton>
							</>
						)}
						<input
							type='file'
							hidden
							name='rc_ref_bank'
							accept='image/png, image/jpeg, image/jpg'
							onChange={handleChangeImages}
						/>
					</Button>
				</div>
			</div>
			<div className={classes.input}>
				<Autocomplete
					className={classes.inputTextLeft}
					onChange={(event, value) => handleSelectPayment(event, value, 'payment_method')}
					options={listPayment}
					value={payment || null}
					getOptionLabel={(option: any) => (option.name ? option.name : '')}
					renderInput={(params: any) => (
						<TextField {...params} name='payment_method' label='Modalidad de Pago' variant='outlined' />
					)}
				/>
				<Autocomplete
					className={classes.inputText}
					onChange={(event, value) => handleSelectTypePay(event, value, 'type_pay')}
					options={listTypePay}
					value={typePay || null}
					getOptionLabel={(option: any) => (option.name ? option.name : '')}
					renderInput={(params: any) => (
						<TextField {...params} name='type_pay' label='Tipo de Pago' variant='outlined' />
					)}
				/>
			</div>
			<div className={classes.input}>
				<Autocomplete
					className={classes.inputTextLeft}
					onChange={(event, value) => handleSelectOrigin(event, value, 'request_origin')}
					value={requestSource || null}
					options={listRequestSource}
					getOptionLabel={(option: any) => (option.name ? option.name : '')}
					renderInput={(params: any) => (
						<TextField {...params} name='request_origin' label='Origen de Solicitud' variant='outlined' />
					)}
				/>
				<TextField
					className={classes.inputText}
					style={{ opacity: `${referido ? 1 : 0}` }}
					variant='outlined'
					required
					id='standard-required'
					label='Numero de Cédula'
					name='reqSource_docnum'
					onChange={handleChange}
					// onBlur={handleBlurNumBank}
					value={cursedForm.reqSource_docnum}
					//error={erorr.reqSource_docnum}
				/>
			</div>
			<div className={classes.input}>
				{fraccion && (
					<>
						{/* <Autocomplete
							className={classes.inputTextLeft}
							onChange={(event, value) => handleSelectPayment(event, value, 'inicial')}
							options={listPayment}
							value={payment || null}
							getOptionLabel={(option: any) => (option.name ? option.name : '')}
							renderInput={(params: any) => (
								<TextField {...params} type='number' name='payment_method' label='Inicial' variant='outlined' />
							)}
						/> */}
						<TextField
							id='initial'
							label='Inicial'
							className={classes.inputTextLeft}
							type='number'
							name='initial'
							variant='outlined'
							value={cursedForm.initial}
							onKeyDown={(e) => {
								e.preventDefault();
							}}
							inputProps={{
								maxLength: 5,
								step: '50',
								min: '100',
							}}
							onChange={handleChange}
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
								name='discount'
								checked={cursedForm.discount === 1 ? true : false}
								onChange={handleChecked}
								color='primary'
								inputProps={{ 'aria-label': 'secondary checkbox' }}
							/>
							<b
								style={{
									fontSize: '1rem',
								}}>
								Entrego Punto
							</b>
						</>
					}
				/>
				<FormControlLabel
					className={classNames(classes.inputText, classes.containerCheckBox)}
					label=''
					control={
						<>
							<Checkbox
								name='pagadero'
								checked={cursedForm.pagadero === 1 ? true : false}
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
			{cursedForm.pagadero || cursedForm.id_payment_method === 2 ? null : (
				<div className={classes.input}>
					<div className={classNames(classes.row, classes.inputTextLeft)}>
						<b className={classes.labels}>Comprobante de pago</b>
						<Button
							className={classes.imgIdent}
							variant='contained'
							style={{ background: imagesForm.rc_comp_dep ? '#5c62c5' : '#bbdefb' }}
							onClick={() => {
								deleted && deleteImgContributor('comp_dep');
							}}
							component='label'>
							{imagesForm.rc_comp_dep !== null ? (
								<>
									<p className='nameImg'>{namesImages.rc_comp_dep.slice(0, 7)}...</p>
								</>
							) : (
								<>
									{/*<b>Subir</b>*/}
									<IconButton aria-label='upload picture' component='span'>
										<PhotoCamera />
									</IconButton>
								</>
							)}
							<input
								type='file'
								hidden
								name='rc_comp_dep'
								accept='image/png, image/jpeg, image/jpg'
								disabled={deleted}
								onChange={handleChangeImages}
							/>
						</Button>
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
							onChange={handleChange}
							value={cursedForm.nro_comp_dep}
							//error={erorr.reqSource_docnum}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
