import { Checkbox, FormControlLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useStylesFM } from '../styles';

//Pedido
export const Step4: React.FC<any> = ({
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
	cursedForm,
	setCursedForm,
	handleChange,
	handleChangeImages,
	handleBlurNumBank,
	listRequestSource,
	requestSource,
	setRequestSource,
	initial,
	setInitial,
}) => {
	const classes = useStylesFM();
	const [fraccion, setFraccion] = useState(false);
	const [referido, setReferido] = useState(false);
	// const cuotasText = ['5 cuotas de 50$', '4 cuotas de 50$', '3 cuotas de 50$'];
	const [cuotasTexto, setCuotasTexto] = useState('');

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
			[e.target.name]: !cursedForm.discount ? 1 : 0,
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
		if (initial) {
			let valor = 350 - initial;
			let cuotas = valor / 50;
			if (cuotas % 1 === 0 && cuotas > 0 && cuotas < 8) {
				setCuotasTexto(`${cuotas} cuotas de 50$`);
			} else {
				if (cuotas > 7) {
					setCuotasTexto('La inicial es mas que el valor');
				} else {
					setCuotasTexto('Ingrese multiplo de 50');
				}
			}
		}
	}, [initial, requestSource, typePay]);

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
					error={error.text_account_number}
				/>
				<div className={classes.row}>
					<b className={classes.labels}>Referencia Bancaria</b>
					<Button
						className={classes.imgIdent}
						variant='contained'
						//color="secondary"
						component='label'>
						{imagesForm.rc_ref_bank !== null ? (
							<>
								<IconButton aria-label='upload picture' component='span'>
									<PhotoCamera />
								</IconButton>
								<p className='nameImg'>{namesImages.rc_ref_bank.slice(0, 10)}...</p>
							</>
						) : (
							<>
								<b>Subir</b>
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
					onChange={(event, value) => handleSelectOrigin(event, value, 'requestSource')}
					value={requestSource || null}
					options={listRequestSource}
					getOptionLabel={(option: any) => (option.name ? option.name : '')}
					renderInput={(params: any) => (
						<TextField {...params} name='origenSol' label='Origen de Solicitud' variant='outlined' />
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
							variant='outlined'
							value={initial}
							onChange={(e) => {
								setInitial(e.target.value);
							}}
						/>
						<TextField
							disabled
							id='initial'
							label='Cantidad de cuotas'
							className={classes.inputText}
							type='text'
							variant='outlined'
							value={cuotasTexto}
							onChange={(e) => {
								setInitial(e.target.value);
							}}
						/>
					</>
				)}
			</div>
			<div className={classes.inputText}>
				<FormControlLabel
					style={{ marginTop: 17.6 }}
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
			</div>
		</div>
	);
};
