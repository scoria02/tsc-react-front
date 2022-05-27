import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
	InputAdornment,
	Alert,
	Button,
	IconButton,
	Stack,
	TextField,
	FormControl,
	Select,
	MenuItem,
	Autocomplete,
} from '@mui/material';
import classNames from 'classnames';
import React, { FC, useContext, useState } from 'react';
import { recaudo } from 'utils/recaudos';
import { sxStyled, useStylesFM } from '../styles';
import RecDifPdf from 'components/utilis/images/RecDifPdf';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import DataListContext from 'context/DataList/DataListContext';
import LocationsContext from 'context/Admision/CreationFM/Location/LocationsContext';
import { handleChangeNameCommerce, handleIdentNum } from 'utils/validateChange';
import { Ciudad, Estado, Municipio, Parroquia, Sector } from 'context/Admision/CreationFM/Location/interfaces';
import { setCiudad, setEstado, setMunicipio, setParroquia, setSector } from 'context/utilitis/setLocation';
import { Activity } from 'context/DataList/interface';

const DifStepCommerce: FC = () => {
	const classes = useStylesFM();

	const { listIdentType, listActivity } = useContext(DataListContext);
	const {
		disabled,
		commerce,
		handleChangeImages,
		handleChangeCommerce,
		handleChangeIdenType,
		handleChangeActivity,
		imagesForm,
		pathImages,
		listValidated,
		//
		errorCommerce,
		//location
		locationCommerce,
		setLocationCommerce,
		setIdLocationCommerce,
	} = useContext(FMDiferidoContext);

	const {
		listLocationCommerce,
		setListLocationCommerce,
		handleListMunicipio,
		handleListCiudad,
		handleListParroquia,
		handleListSector,
	} = useContext(LocationsContext);

	const [load, setLoad] = useState(false);

	const imagen = imagesForm.rc_rif
		? pathImages.rc_rif.path
		: `${process.env.REACT_APP_API_IMAGES}/${commerce.rc_rif.path}`;

	const typeImagen = imagesForm.rc_rif ? pathImages.rc_rif.type : null;

	return (
		<div className={classes.grid}>
			<div>
				<div className={classes.btn_stepM}>
					<Stack sx={{ width: '50%' }} spacing={2}>
						<Alert severity={disabled ? 'success' : 'error'}>
							{listValidated.id_typedif_commerce === 2 ? listValidated.valid_commerce : 'Error Interno'}
						</Alert>
					</Stack>
				</div>
				<div className={classes.grid}>
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
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								handleChangeNameCommerce(event, handleChangeCommerce)
							}
							value={commerce.name}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classes.inputText}
							sx={sxStyled.inputLeft}
							variant='outlined'
							required
							label='Rif'
							autoComplete='off'
							name='ident_num'
							error={errorCommerce.ident_num}
							value={commerce.ident_num}
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
												//onBlur={handleBlurCommerce}
												//error={fm.errorCommerce}>
												name='commerce_type'
												onChange={handleChangeIdenType}
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
				</div>
				<div className={classes.input}>
					<Autocomplete
						className={classes.input}
						onChange={(event, value: Activity | null) =>
							value ? handleChangeActivity('id_activity', value) : null
						}
						options={listActivity}
						value={commerce.id_activity}
						getOptionLabel={(option: Activity) => (option.name ? option.name : '')}
						isOptionEqualToValue={(option, value) => option.id === value.id}
						renderInput={(params: any) => (
							<TextField {...params} name='activity' label='Actividad Comercial' variant='outlined' />
						)}
					/>
				</div>
				<div className={classes.grid}>
					<div className={classes.input}>
						<Autocomplete
							noOptionsText={'Cargando...'}
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							onChange={(event, value: Estado | null) => {
								if (value) {
									setEstado(value, setLocationCommerce);
									handleListMunicipio(value, setListLocationCommerce);
								}
							}}
							options={listLocationCommerce.estado}
							getOptionLabel={(estado: any) => estado.estado}
							isOptionEqualToValue={(option: Estado | null, value: any) => option?.estado === value.estado}
							value={locationCommerce.estado}
							renderInput={(params: any) => (
								<TextField
									{...params}
									error={errorCommerce.estado}
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
								setMunicipio(value, setLocationCommerce);
								handleListCiudad(locationCommerce.estado, value, setListLocationCommerce);
							}}
							options={listLocationCommerce.municipio}
							getOptionLabel={(value: any) => value.municipio}
							isOptionEqualToValue={(option: Municipio | null, value: any) =>
								option?.municipio === value.municipio
							}
							value={locationCommerce.municipio}
							renderInput={(params: any) => (
								<TextField
									{...params}
									name='municipio'
									error={errorCommerce.municipio}
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
								setCiudad(value, setLocationCommerce);
								handleListParroquia(
									locationCommerce.estado,
									locationCommerce.municipio,
									value,
									setListLocationCommerce
								);
							}}
							value={locationCommerce.ciudad}
							options={listLocationCommerce.ciudad}
							getOptionLabel={(value: any) => value.ciudad}
							isOptionEqualToValue={(option: Ciudad | null, value: any) => option?.ciudad === value.ciudad}
							renderInput={(params: any) => (
								<TextField
									{...params}
									name='ciudad'
									error={errorCommerce.ciudad}
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
								setParroquia(value, setLocationCommerce);
								handleListSector(
									locationCommerce.estado,
									locationCommerce.municipio,
									locationCommerce.ciudad,
									value,
									setListLocationCommerce
								);
							}}
							value={locationCommerce.parroquia}
							options={listLocationCommerce.parroquia}
							getOptionLabel={(option: Parroquia) => option.parroquia}
							isOptionEqualToValue={(option: Parroquia | null, value: any) =>
								option?.parroquia === value.parroquia
							}
							renderInput={(params: any) => (
								<TextField
									{...params}
									name='parroquia'
									error={errorCommerce.parroquia}
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
								setSector(value, setLocationCommerce);
								setIdLocationCommerce(value ? value.id : 0);
							}}
							value={locationCommerce.sector}
							options={listLocationCommerce.sector}
							getOptionLabel={(option: Sector) => option.sector}
							isOptionEqualToValue={(option: Sector | null, value: any) => option?.sector === value.sector}
							renderInput={(params: any) => (
								<TextField
									{...params}
									name='sector'
									error={errorCommerce.sector}
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
							value={locationCommerce.sector?.codigoPostal || ''}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							required
							id='standard-required'
							error={errorCommerce.calle}
							label='Calle'
							name='calle'
							onChange={handleChangeCommerce}
							value={commerce.calle}
						/>
						<TextField
							className={classes.inputText}
							variant='outlined'
							required
							id='standard-required'
							error={errorCommerce.local}
							label='Casa/Quinta/Apart'
							name='local'
							onChange={handleChangeCommerce}
							value={commerce.local}
						/>
					</div>
				</div>
			</div>
			<div className={classes.validRecaudo}>
				<Button
					className={classes.imgIdent}
					variant='contained'
					disabled={disabled}
					style={{
						background: imagesForm.rc_rif && !disabled ? '#5c62c5' : '#D3D3D3',
					}}
					component='label'>
					<IconButton aria-label='upload picture' component='span'>
						<PhotoCamera />
					</IconButton>
					<input type='file' hidden name='rc_rif' accept={recaudo.acc} onChange={handleChangeImages} />
				</Button>
				<RecDifPdf load={load} setLoad={setLoad} imagen={imagen} type={typeImagen} />
			</div>
		</div>
	);
};

export default DifStepCommerce;
