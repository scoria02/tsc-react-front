import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
	InputAdornment,
	Button,
	IconButton,
	TextField,
	FormControl,
	Select,
	MenuItem,
	Autocomplete,
} from '@mui/material';
import classNames from 'classnames';
import React, { FC, useContext, useEffect, useState } from 'react';
import { recaudo } from 'utils/recaudos';
//sytles
import { sxStyled, useStyles } from './styles/styles';
import RecDifPdf from 'components/utilis/images/RecDifPdf';
import UpdateCommerceContext from 'context/UpdateData/Commerce/UpdateCommerceContext';
import DataListContext from 'context/DataList/DataListContext';
import { Activity } from 'context/DataList/interface';
import { Ciudad, Estado, Municipio, Parroquia, Sector } from 'context/Admision/CreationFM/Location/interfaces';
import LoaderLine from 'components/loaders/LoaderLine';
import { handleChangeNameCommerce, handleIdentNum } from 'utils/validateChange';
import { editCommerce } from 'services/edit/commerce';
import { handleLoading } from 'utils/handleSwal';

const StepUpdateCommerce: FC = () => {
	const classes = useStyles();

	const { listIdentType, listActivity } = useContext(DataListContext);

	const {
		disabled,
		ready,
		error,
		commerce,
		handleChangeCommerce,
		imagen,
		handleChangeImages,
		pathImages,
		handleChange,
		handleChangeLocation,
		handleChangeIdenType,
		//location
		location,
		setEstado,
		setMunicipio,
		setCiudad,
		setParroquia,
		setSector,
		//list Locations
		listLocations,
		handleListMunicipio,
		handleListCiudad,
		handleListParroquia,
		handleListSector,
	} = useContext(UpdateCommerceContext);

	const [load, setLoad] = useState(false);

	//console.log(commerce);

	const newImagen = imagen.rc_rif
		? pathImages.rc_rif?.path
		: commerce.rc_rif
		? `${process.env.REACT_APP_API_IMAGES}/${commerce.rc_rif.path}`
		: null;

	const typeImagen = imagen.rc_rif ? pathImages.rc_rif.type : null;

	const [readyEdit, setReadyEdit] = useState(false);

	useEffect(() => {
		if (
			(!listLocations.estado.length ||
				!listLocations.municipio.length ||
				!listLocations.ciudad.length ||
				!listLocations.parroquia.length ||
				!listLocations.sector.length) &&
			!readyEdit
		) {
			setReadyEdit(false);
		} else setReadyEdit(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listLocations]);

	const handleSaveCommerce = async () => {
		handleLoading();
		const res = await editCommerce.updateCommerce(commerce, imagen);
		if (res.ok) {
			console.log('error');
		} else console.log('error');
	};

	return (
		<>
			{!readyEdit ? (
				<LoaderLine />
			) : (
				<div>
					<div className={classes.grid}>
						<div>
							<div className={classes.grid}>
								<div className={classes.input}>
									<TextField
										disabled
										className={classes.inputText}
										sx={sxStyled.inputLeft}
										variant='outlined'
										required
										label='Rif'
										autoComplete='off'
										name='ident_num'
										error={error.ident_num}
										value={commerce?.ident_num}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											handleIdentNum(event, handleChangeCommerce)
										}
										inputProps={{
											maxLength: commerce.id_ident_type === 'P' ? 20 : 9,
										}}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<FormControl variant='standard'>
														<Select
															disabled
															//onBlur={handleBlurCommerce}
															//error={fm.errorCommerce}>
															onChange={(event: any) => {
																handleChangeIdenType(event.target.value);
															}}
															name='id_ident_type'
															value={commerce.id_ident_type.id}
															label='Tipo'>
															{listIdentType.map((item: any) => (
																<MenuItem key={item.id} value={item.id}>
																	{item.name}
																</MenuItem>
															))}
														</Select>
													</FormControl>
												</InputAdornment>
											),
										}}
									/>
								</div>
								<div className={classes.input}>
									<TextField
										disabled={disabled}
										required
										className={classes.inputText}
										type='text'
										sx={sxStyled.inputLeft}
										variant='outlined'
										label='Nombre del Comercio'
										autoComplete='off'
										name='name'
										error={error.name}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											handleChangeNameCommerce(event, handleChangeCommerce)
										}
										value={commerce?.name}
									/>
								</div>
							</div>
							<div className={classes.input}>
								<Autocomplete
									className={classes.input}
									onChange={(event, value: Activity | null) => (value ? handleChange('id_activity', value) : null)}
									options={listActivity}
									value={commerce.id_activity || null}
									getOptionLabel={(option: Activity) => (option.name ? option.name : '')}
									isOptionEqualToValue={(option, value) => option.id === value.id}
									renderInput={(params: any) => (
										<TextField {...params} name='activity' label='Actividad Comercial' variant='outlined' />
									)}
								/>
							</div>
							<div className={classes.input}>
								<Autocomplete
									noOptionsText={'Cargando...'}
									className={classNames(classes.inputText, classes.inputTextLeft)}
									sx={sxStyled.inputLeft}
									onChange={(event, value: Estado | null) => {
										setEstado(value);
										handleListMunicipio(value);
									}}
									options={listLocations.estado}
									getOptionLabel={(estado: any) => estado.estado}
									isOptionEqualToValue={(option: Estado | null, value: any) => option?.estado === value.estado}
									value={location.estado}
									renderInput={(params: any) => (
										<TextField
											{...params}
											error={error.estado}
											name='estado'
											label='Estado'
											inputProps={{ ...params.inputProps, autoComplete: 'estado' }}
											variant='outlined'
										/>
									)}
								/>
								<Autocomplete
									noOptionsText={'Cargando...'}
									className={classes.inputText}
									onChange={(event, value: Municipio | null) => {
										setMunicipio(value);
										handleListCiudad(location.estado, value);
									}}
									options={listLocations.municipio}
									getOptionLabel={(value: any) => value.municipio}
									isOptionEqualToValue={(option: Municipio | null, value: any) =>
										option?.municipio === value.municipio
									}
									value={location.municipio}
									renderInput={(params: any) => (
										<TextField
											{...params}
											name='municipio'
											error={error.municipio}
											label='Municipio'
											inputProps={{ ...params.inputProps, autoComplete: 'municipio' }}
											variant='outlined'
										/>
									)}
								/>
							</div>
							<div className={classes.input}>
								<Autocomplete
									noOptionsText={'Cargando...'}
									className={classNames(classes.inputText, classes.inputTextLeft)}
									sx={sxStyled.inputLeft}
									onChange={(event, value: Ciudad | null) => {
										setCiudad(value);
										handleListParroquia(location.estado, location.municipio, value);
									}}
									value={location.ciudad}
									options={listLocations.ciudad}
									getOptionLabel={(value: any) => value.ciudad}
									isOptionEqualToValue={(option: Ciudad | null, value: any) => option?.ciudad === value.ciudad}
									renderInput={(params: any) => (
										<TextField
											{...params}
											name='ciudad'
											error={error.ciudad}
											label='Ciudad'
											variant='outlined'
											inputProps={{ ...params.inputProps, autoComplete: 'ciudad' }}
										/>
									)}
								/>
								<Autocomplete
									noOptionsText={'Cargando...'}
									className={classes.inputText}
									onChange={(event, value: Parroquia | null) => {
										setParroquia(value);
										handleListSector(location.estado, location.municipio, location.ciudad, value);
									}}
									value={location.parroquia}
									options={listLocations.parroquia}
									getOptionLabel={(option: Parroquia) => option.parroquia}
									isOptionEqualToValue={(option: Parroquia | null, value: any) =>
										option?.parroquia === value.parroquia
									}
									renderInput={(params: any) => (
										<TextField
											{...params}
											name='parroquia'
											error={error.parroquia}
											label='Parroquia'
											variant='outlined'
											inputProps={{ ...params.inputProps, autoComplete: 'parroquia' }}
										/>
									)}
								/>
							</div>
							<div className={classes.input}>
								<Autocomplete
									noOptionsText={'Cargando...'}
									className={classNames(classes.inputText, classes.inputTextLeft)}
									sx={sxStyled.inputLeft}
									onChange={(event, value: Sector | null) => {
										setSector(value);
										handleChangeLocation('id_direccion', value ? value.id : 0);
									}}
									value={location.sector}
									options={listLocations.sector}
									getOptionLabel={(option: Sector) => option.sector}
									isOptionEqualToValue={(option: Sector | null, value: any) => option?.sector === value.sector}
									renderInput={(params: any) => (
										<TextField
											{...params}
											name='sector'
											error={error.sector}
											label='Sector'
											variant='outlined'
											inputProps={{ ...params.inputProps, autoComplete: 'sector' }}
										/>
									)}
								/>
								<TextField
									disabled
									className={classes.inputText}
									variant='outlined'
									required
									id='standard-required'
									label='Cod. Postal'
									name='codigoPostal'
									onChange={(event) => handleChangeLocation(event.target.name, event.target.value)}
									value={location.sector?.codigoPostal || ''}
								/>
							</div>
							<div className={classes.input}>
								<TextField
									className={classNames(classes.inputText, classes.inputTextLeft)}
									sx={sxStyled.inputLeft}
									variant='outlined'
									required
									id='standard-required'
									error={error.calle}
									label='Calle'
									name='calle'
									onChange={(event) => handleChangeLocation(event.target.name, event.target.value)}
									value={commerce.id_location.calle}
								/>
								<TextField
									className={classes.inputText}
									variant='outlined'
									required
									id='standard-required'
									error={error.local}
									label='Casa/Quinta/Apart'
									name='local'
									onChange={(event) => handleChangeLocation(event.target.name, event.target.value)}
									value={commerce.id_location.local}
								/>
							</div>
						</div>
						<div className={classes.validRecaudo}>
							{!commerce.rc_rif ? (
								<Button
									className={classes.buttonImage}
									variant='contained'
									disabled={disabled}
									style={{
										background: imagen.rc_rif && !disabled ? '#5c62c5' : '#D3D3D3',
									}}
									component='label'>
									<IconButton aria-label='upload picture' component='span'>
										<span style={{ textTransform: 'none' }}>Cargar Rif</span>
										<PhotoCamera />
									</IconButton>
									<input type='file' hidden name='rc_rif' accept={recaudo.acc} onChange={handleChangeImages} />
								</Button>
							) : (
								<Button
									className={classes.buttonImage}
									variant='contained'
									disabled={disabled}
									style={{
										background: imagen.rc_rif ? '#5c62c5' : '#D3D3D3',
									}}
									component='label'>
									<span style={{ textTransform: 'none' }}>Cambiar imagen del rif</span>
									<input type='file' hidden name='rc_rif' accept={recaudo.acc} onChange={handleChangeImages} />
								</Button>
							)}
							{newImagen && <RecDifPdf load={load} setLoad={setLoad} imagen={newImagen} type={typeImagen} />}
						</div>
					</div>
					<Button
						disabled={ready}
						sx={sxStyled.buttonSave}
						onClick={handleSaveCommerce}
						className={classes.buttonNext}
						variant='contained'
						component='label'>
						<span style={{ textTransform: 'none' }}>Guardar</span>
					</Button>
				</div>
			)}
		</>
	);
};

export default StepUpdateCommerce;
