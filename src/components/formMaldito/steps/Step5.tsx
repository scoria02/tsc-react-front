/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, FormControlLabel, InputAdornment } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Autocomplete from '@material-ui/lab/Autocomplete';
import classNames from 'classnames';
import React, { FC, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validationNumBank } from '../../../store/actions/fm';
import { RootState } from '../../../store/store';
import { recaudo } from '../../utilis/recaudos';
import { getAci } from '../getData';
import { useStylesFM } from '../styles';
import FMDataContext from '../../../context/FM/fmAdmision/FmContext';
import DataListContext from '../../../context/DataList/DataListContext';
import { Aci } from '../../../context/DataList/interface';
import ImagesFmContext from '../../../context/FM/fmImages/ImagesFmContext';

//Pedido
export const Step5: FC = () => {
	const classes = useStylesFM();
	const [isACI, setIsACI] = useState<boolean>(false);
	const [deleted, setDeleted] = useState<boolean>(false);
	const [fraccion, setFraccion] = useState<boolean>(false);
	const [referido, setReferido] = useState<boolean>(false);
	const [cuotasTexto, setCuotasTexto] = useState('');
	const dispatch = useDispatch();
	// const cuotasText = ['5 cuotas de 50$', '4 cuotas de 50$', '3 cuotas de 50$'];

	const fm: any = useSelector((state: RootState) => state.fm);

	const { client, pos, errorsFm, handleParamsPos, handleChangePos, handleCheckedPos, handleSourceAci } =
		useContext(FMDataContext);
	const { listPayment, listModelPos, listTypePay, listRequestSource, listAci } = useContext(DataListContext);
	const { namesImages, imagesForm, handleChangeImages, deleteImgContributor } = useContext(ImagesFmContext);

	const [aci, setACI] = useState<Aci | null>(
		typeof pos.reqSource_docnum === 'object' ? pos.reqSource_docnum : null
	);

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
			if (event.target.value.length === 20 && client.email !== '') {
				dispatch(
					validationNumBank({
						email: client.email,
						bank_account_num: event.target.value,
					})
				);
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
		if (pos.request_origin) {
			switch (pos.request_origin.id) {
				case 1:
					setReferido(true);
					setIsACI(false);
					break;
				case 2:
					// is ACI
					setIsACI(true);
					setReferido(false);
					break;
				default:
					setIsACI(false);
					setReferido(false);
			}
		} else {
			setIsACI(false);
			setReferido(false);
		}
		if (pos.initial && pos.model_post) {
			// cable pelado para el monto del precio del modelo seleccionado para calcular las cuotas
			let valor = pos.number_post * (pos.model_post.price - pos.initial);
			let cuotas = valor / (pos.number_post * 50);

			/*
			setPos({
				...pos,
				cuotas: valor / (pos.number_post * 50),
			});
			*/

			if (valor < 0) {
				/*
				setPos({
					...pos,
					initial: 100,
				});
				*/
			}
			if (cuotas % 1 === 0 && cuotas > 0 && cuotas) {
				setCuotasTexto(`${cuotas} cuota/s de 50$`);
			} else {
				/*
				setPos({
					...pos,
					initial: 100,
				});
				*/
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
					className={classes.inputTextLeft}
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
				</div>
			</div>
			<div className={classes.input}>
				<Autocomplete
					className={classes.inputTextLeft}
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
					className={classes.inputTextLeft}
					style={{ width: '50%' }}
					onChange={(event, value) => handleSelect(event, value, 'request_origin')}
					options={listRequestSource}
					value={pos.request_origin || null}
					getOptionLabel={(option: any) => (option.name ? option.name : '')}
					renderInput={(params: any) => (
						<TextField {...params} name='request_origin' label='Origen de Solicitud' variant='outlined' />
					)}
				/>
				{referido && (
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
				{isACI && (
					<Autocomplete
						// className='btn_step btn_medio'
						style={{ width: '50%' }}
						//disabled={} //si el comercio tiene aci traelo
						onChange={(event, value) => {
							handleSourceAci(event, value, 'reqSource_docnum');
							setACI(value);
						}}
						options={listAci}
						value={aci || null}
						getOptionLabel={(option: Aci | null) =>
							option ? option.aliTipoIdentificacion + option.aliIdentificacion + ' | ' + option.aliNombres : ''
						}
						getOptionSelected={(option: Aci | null, value: Aci | null) => option?.id === value?.id}
						renderInput={(params: any) => (
							<TextField {...params} name='aci' label={`Buscar Aci`} variant='outlined' />
						)}
					/>
				)}
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
							value={pos.initial}
							onKeyDown={(e) => {
								e.preventDefault();
							}}
							inputProps={{
								maxLength: 5,
								step: '50',
								min: '100',
							}}
							onChange={handleChangePos}
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
				className={classNames(classes.inputTextLeft, classes.containerCheckBox)}
				label=''
				control={
					<>
						<Checkbox
							name='discount'
							checked={pos.discount}
							onChange={handleCheckedPos}
							color='primary'
							inputProps={{ 'aria-label': 'secondary checkbox' }}
						/>
						<b
							style={{
								fontSize: '1rem',
							}}>
							Entrega de punto como forma de pago
						</b>
					</>
				}
			/>
			<div
				className={classes.input}
				style={{
					opacity: pos.pagadero || pos.payment_method?.id === 2 ? 0 : 1,
				}}>
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
