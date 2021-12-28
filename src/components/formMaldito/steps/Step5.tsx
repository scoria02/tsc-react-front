/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, FormControlLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Autocomplete from '@material-ui/lab/Autocomplete';
import classNames from 'classnames';
import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useStylesFM } from '../styles';
import { recaudo } from '../../utilis/recaudos';
import { FMContext } from '../../../context/FM/FMContext';

//Pedido
export const Step5: React.FC<any> = ({
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
	handleChangeImages,
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

	const { 
		fmData,
		fmDataError,
		setFmData,
		changeFmParms,
		changeFmData,
	}:any = useContext(FMContext);

	const handleSelectPayment = (event: any, value: any, item: string) => {
		if (value) {
			changeFmParms(`id_${item}`, value.id);
			setPayment(value);
		} else {
			changeFmParms(`id_${item}`, 0);
			setPayment(null);
		}
	};

	const handleSelectTypePay = (event: any, value: any, item: string) => {
		if (value) {
			changeFmParms(`id_${item}`, value.id);
			setTypePay(value);
		} else {
			changeFmParms(`id_${item}`, 0);
			setTypePay(null);
		}
	};

	const handleSelectPos = (event: any, value: any, item: string) => {
		if (value) {
			changeFmParms(`id_${item}`, value.id);
			setModelPost(value);
		} else {
			changeFmParms(`id_${item}`, 0);
			setModelPost(null);
		}
	};

	const handleChecked = (e: any) => {
		changeFmParms(e.target.name, !fmData[`${e.target.name}`] ? 1 : 0);
	};

	const handleCheckedPagadero = (e: any) => {
		if (!fmData[`${e.target.name}`]) {
			deleteImgContributor('comp_dep');
		}
		setFmData({
			...fmData,
			[e.target.name]: !fmData[`${e.target.name}`] ? 1 : 0,
			nro_comp_dep: '',
		});
	};

	const handleSelectOrigin = (event: any, value: any, item: string) => {
		if (value) {
			setFmData({
				...fmData,
				[`id_${item}`]: value.id,
			});
			setRequestSource(value);
		} else {
			setFmData({
				...fmData,
				[`id_${item}`]: 0,
			});
			setRequestSource(null);
		}
	};

	const handleChangeBank = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(/^[0-9]+$/.test(event.target.value) || event.target.value === ''){
			changeFmData(event);
		}	
	}

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
		if (fmData.initial && modelPos) {
			// cable pelado para el monto del precio del modelo seleccionado para calcular las cuotas
			let valor = fmData.number_post * (modelPos.price - fmData.initial);
			let cuotas = valor / (fmData.number_post * 50);

			setFmData({
				...fmData,
				cuotas: valor / (fmData.number_post * 50),
			});

			if (valor < 0) {
				setFmData({
					...fmData,
					initial: 100,
				});
			}
			if (cuotas % 1 === 0 && cuotas > 0 && cuotas) {
				setCuotasTexto(`${cuotas} cuota/s de 50$`);
			} else {
				setFmData({
					...fmData,
					initial: 100,
				});
			}
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [fmData.number_post, fmData.initial, requestSource, typePay, modelPos]);

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
					onChange={changeFmData}
					error={fmDataError.number_post}
					value={fmData.number_post}
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
					label={fm.nameBank === '' ? 'Numero de Cuenta' : fm.nameBank}
					name='text_account_number'
					onChange={handleChangeBank}
					value={fmData.text_account_number}
					error={fmDataError.text_account_number || fm.errorNumBank}
					inputProps={{ maxLength: 20 }}
				/>
				<div className={classes.row}>
					<b className={classes.labels}>Referencia Bancaria</b>
					<Button
						className={classes.imgIdent}
						variant='contained'
						style={{ 
							background: imagesForm.rc_ref_bank ? '#5c62c5' : '#f44336' 
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
						<input
							type='file'
							hidden
							name='rc_ref_bank'
							accept={recaudo.acc}
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
						<TextField {...params}
							name='type_pay'
							label='Tipo de Pago'
							variant='outlined'
						/>
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
					onChange={changeFmData}
					inputProps={{
						maxLength: 9 
					}}
					value={fmData.reqSource_docnum}
				/>
			</div>
			<div className={classes.input}>
				{fraccion && (
					<>
						<TextField
							id='initial'
							label='Inicial'
							className={classes.inputTextLeft}
							type='number'
							name='initial'
							variant='outlined'
							value={fmData.initial}
							onKeyDown={(e) => {
								e.preventDefault();
							}}
							inputProps={{
								maxLength: 5,
								step: '50',
								min: '100',
							}}
							onChange={changeFmData}
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
								checked={fmData.discount === 1 ? true : false}
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
								checked={fmData.pagadero === 1 ? true : false}
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
			{fmData.pagadero || fmData.id_payment_method === 2 ? null : (
				<div className={classes.input}>
					<div className={classNames(classes.row, classes.inputTextLeft)}>
						<b className={classes.labels}>Comprobante de pago</b>
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
							onChange={changeFmData}
							value={fmData.nro_comp_dep}
							//error={erorr.reqSource_docnum}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
