import Select from '@material-ui/core/Select';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Autocomplete from '@mui/lab/Autocomplete';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, TextField } from '@mui/material';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataListContext from '../../../context/DataList/DataListContext';
import FMDataContext from '../../../context/FM/fmAdmision/FmContext';
import ImagesFmContext from '../../../context/FM/fmImages/ImagesFmContext';
import { Ciudad, Estado, Municipio, Parroquia } from '../../../context/FM/Location/interfaces';
import LocationsContext from '../../../context/FM/Location/LocationsContext';
import { validationClient } from '../../../store/actions/fm';
import { RootState } from '../../../store/store';
import { validInputString } from '../../../utils/fm';
import { recaudo } from '../../utilis/recaudos';
//sytles
import { useStylesFM } from '../styles';

export const Step1: React.FC<any> = () => {
	const classes = useStylesFM();
	const fm: any = useSelector((state: RootState) => state.fm);
	const dispatch = useDispatch();

	//Context
	const {
		errorsClient,
		typeSolict,
		client,
		locationClient,
		setLocationClient,
		setEstado,
		setMunicipio,
		setCiudad,
		setParroquia,
		handleChangeClient,
		handleSelectIdentClient,
	} = useContext(FMDataContext);

	const { listIdentType } = useContext(DataListContext);

	const { listLocationClient, setListLocationClient, handleListMunicipio, handleListCiudad, handleListParroquia } =
		useContext(LocationsContext);

	const { namesImages, imagesForm, handleChangeImages } = useContext(ImagesFmContext);

	const codePhone = '+58';

	const handleBlurEmailIdent = (): void => {
		if (client.email !== '' && client.id_ident_type !== 0 && client.ident_num !== '') {
			dispatch(
				validationClient({
					email: client.email,
					id_ident_type: client.id_ident_type,
					ident_num: client.ident_num,
				})
			);
		}
	};

	const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value !== '0') {
			if (/^[0-9]+$/.test(event.target.value) || event.target.value === '') {
				handleChangeClient(event);
				//changeFmData(event);
			}
		}
	};

	const handleIdentNum = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (/^[0-9]+$/.test(event.target.value) || event.target.value === '') {
			handleChangeClient(event);
		}
	};

	const handleChangeNameClient = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (validInputString(event)) {
			handleChangeClient(event);
		}
	};

	/*
	useEffect(() => {
		if (activeStep === 3 && autoCompleteCommerce && !fm.mashCommerce) {
			copyListLocationCToCC();
			copyLocationCToCC();
		}
	}, [activeStep, fm.commerceMash]);
	*/

	return (
		<>
			<div className={classes.grid}>
				<div className={classes.input}>
					<TextField
						required
						className={classes.inputText}
						type='email'
						variant='outlined'
						label='Correo'
						autoComplete='off'
						name='email'
						onChange={handleChangeClient}
						onBlur={handleBlurEmailIdent}
						value={client.email}
						error={errorsClient.email || fm.errorClient}
					/>
				</div>
				<div className={classes.input}>
					<FormControl variant='outlined' className={classes.inputSelect}>
						<InputLabel>DI</InputLabel>
						<Select
							value={client.id_ident_type}
							onChange={handleSelectIdentClient}
							onBlur={handleBlurEmailIdent}
							name='id_ident_type'
							//error={validEmailIdent}
							label='Tipo'>
							{listIdentType.map((item: any) => {
								if (item.name === 'J' && typeSolict === 0) return;
								return (
									<MenuItem key={item.id} value={item.id}>
										{item.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<TextField
						className={classes.inputTextLeft}
						variant='outlined'
						required
						label='C.I.'
						autoComplete='off'
						name='ident_num'
						onChange={handleIdentNum}
						onBlur={handleBlurEmailIdent}
						value={client.ident_num}
						error={errorsClient.ident_num || fm.errorClient}
						inputProps={{
							maxLength: client.id_ident_type === 5 ? 20 : 9,
						}}
					/>
					<Button
						className={classes.imgIdent}
						variant='contained'
						disabled={fm.imagesClient}
						style={{
							opacity: fm.imagesClient ? 0 : 1,
							background: imagesForm.rc_ident_card ? '#5c62c5' : '#f44336',
						}}
						component='label'>
						{imagesForm.rc_ident_card !== null ? (
							<p className='nameImg'>{namesImages.rc_ident_card.slice(0, 7)} ...</p>
						) : (
							<>
								<IconButton aria-label='upload picture' component='span'>
									<PhotoCamera />
								</IconButton>
							</>
						)}
						<input type='file' hidden name='rc_ident_card' accept={recaudo.acc} onChange={handleChangeImages} />
					</Button>
				</div>
				<div className={classes.input}>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						variant='outlined'
						required
						label='Nombre'
						autoComplete='nombre'
						name='name'
						onChange={handleChangeNameClient}
						value={client.name}
						error={errorsClient.name}
						disabled={fm.mashClient}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						label='Apellido'
						autoComplete='last_name'
						name='last_name'
						onChange={handleChangeNameClient}
						value={client.last_name}
						error={errorsClient.last_name}
						disabled={fm.mashClient}
					/>
				</div>
				<div className={classes.input}>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						variant='outlined'
						required
						label='Telefono'
						name='phone1'
						autoComplete='telefono1'
						placeholder='Ej: 4121234567'
						onChange={handleChangePhone}
						error={errorsClient.phone1}
						disabled={fm.mashClient}
						value={client.phone1}
						inputProps={{ maxLength: 10 }}
						InputProps={{
							startAdornment: fm.mashClient ? null : <InputAdornment position='start'>{codePhone}</InputAdornment>,
						}}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						label='Telefono'
						name='phone2'
						onChange={handleChangePhone}
						autoComplete='telefono2'
						error={errorsClient.phone2}
						disabled={fm.mashClient}
						value={client.phone2}
						placeholder='Ej: 4127654321'
						inputProps={{ maxLength: 10 }}
						InputProps={{
							startAdornment: fm.mashClient ? null : <InputAdornment position='start'>{codePhone}</InputAdornment>,
						}}
					/>
				</div>
			</div>
			<h2
				style={{
					marginTop: '10px',
					fontSize: '20px',
				}}>
				Dirección de Habitación
			</h2>
			<div className={classes.grid}>
				<div className={classes.input}>
					<Autocomplete
						disabled={fm.mashClient}
						className={classNames(classes.inputText, classes.inputTextLeft)}
						onChange={(event, value: Estado | null) => {
							setEstado(value, setLocationClient);
							handleListMunicipio(value ? value.id : 0, setListLocationClient);
						}}
						value={locationClient.estado || null}
						options={listLocationClient.estado}
						getOptionLabel={(option: Estado) => (option.estado ? option.estado : '')}
						// getOptionSelected={(option: Estado, value: Estado) => option.id === value.id}
						renderInput={(params: any) => (
							<TextField
								{...params}
								name='estado'
								label='Estado'
								inputProps={{ ...params.inputProps, autoComplete: 'estado' }}
								variant='outlined'
							/>
						)}
					/>
					<Autocomplete
						disabled={fm.mashClient}
						className={classes.inputText}
						onChange={(event, value: Municipio | null) => {
							setMunicipio(value, setLocationClient);
							handleListCiudad(locationClient.estado!.id, setListLocationClient);
						}}
						value={locationClient.municipio || null}
						options={listLocationClient.municipio}
						getOptionLabel={(option: Municipio) => (option.municipio ? option.municipio : '')}
						renderInput={(params: any) => (
							<TextField
								{...params}
								name='municipio'
								label='Municipio'
								variant='outlined'
								inputProps={{ ...params.inputProps, autoComplete: 'municipio' }}
							/>
						)}
					/>
				</div>
				<div className={classes.input}>
					<Autocomplete
						disabled={fm.mashClient}
						className={classNames(classes.inputText, classes.inputTextLeft)}
						onChange={(event, value: Ciudad | null) => {
							setCiudad(value, setLocationClient);
							handleListParroquia(locationClient.municipio!.id, setListLocationClient);
						}}
						value={locationClient.ciudad || null}
						options={listLocationClient.ciudad}
						getOptionLabel={(option: Ciudad) => (option.ciudad ? option.ciudad : '')}
						renderInput={(params: any) => (
							<TextField
								{...params}
								name='ciudad'
								label='Ciudad'
								variant='outlined'
								inputProps={{ ...params.inputProps, autoComplete: 'ciudad' }}
							/>
						)}
					/>
					<Autocomplete
						disabled={fm.mashClient}
						className={classes.inputText}
						onChange={(event, value: Parroquia | null) => {
							setParroquia(value, setLocationClient);
						}}
						value={locationClient.parroquia || null}
						options={listLocationClient.parroquia}
						getOptionLabel={(option: Parroquia) => (option.parroquia ? option.parroquia : '')}
						renderInput={(params: any) => (
							<TextField
								{...params}
								name='parroquia'
								label='Parroquia'
								variant='outlined'
								inputProps={{ ...params.inputProps, autoComplete: 'parroquia' }}
							/>
						)}
					/>
				</div>
				<div className={classes.input}>
					<TextField
						disabled
						className={classNames(classes.inputText, classes.inputTextLeft)}
						variant='outlined'
						required
						id='standard-required'
						label='Cod. Postal'
						name='codigo_postal'
						value={locationClient.ciudad?.postal_code || ''}
					/>
					<TextField
						disabled={fm.mashClient}
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Sector'
						name='sector'
						onChange={handleChangeClient}
						value={client.sector}
					/>
				</div>
				<div className={classes.input}>
					<TextField
						disabled={fm.mashClient}
						className={classNames(classes.inputText, classes.inputTextLeft)}
						variant='outlined'
						required
						id='standard-required'
						label='Calle'
						name='calle'
						onChange={handleChangeClient}
						value={client.calle}
					/>
					<TextField
						disabled={fm.mashClient}
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Casa/Quinta/Apart'
						name='local'
						onChange={handleChangeClient}
						value={client.local}
					/>
				</div>
			</div>
		</>
	);
};
