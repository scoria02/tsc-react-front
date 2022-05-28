import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
	Button,
	IconButton,
	InputAdornment,
	TextField,
	Stack,
	Alert,
	Autocomplete,
	FormControl,
	Select,
	MenuItem,
} from '@mui/material';
import classNames from 'classnames';
import { FC, useContext, useState } from 'react';
import { recaudo } from 'utils/recaudos';
//sytles
import { sxStyled, useStylesFM } from '../styles';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import RecDifPdf from 'components/utilis/images/RecDifPdf';
import { Ciudad, Estado, Municipio, Parroquia, Sector } from 'context/Admision/CreationFM/Location/interfaces';
import { setCiudad, setEstado, setMunicipio, setParroquia, setSector } from 'context/utilitis/setLocation';
import LocationsContext from 'context/Admision/CreationFM/Location/LocationsContext';
import DataListContext from 'context/DataList/DataListContext';
import { handleFullName, handleIdentNum } from 'utils/validateChange';
import AlertDiferido from 'components/alert/AlertDiferido';

const DifStepClient: FC = () => {
	const classes = useStylesFM();

	const { listIdentType } = useContext(DataListContext);

	const {
		client,
		phones,
		disabled,
		handleChangeClientPhone,
		handleChangeClient,
		handleChangeImages,
		handleChangeIdenType,
		imagesForm,
		pathImages,
		listValidated,
		//
		errorClient,
		//location
		locationClient,
		setLocationClient,
		setIdLocationClient,
	} = useContext(FMDiferidoContext);

	const {
		listLocationClient,
		setListLocationClient,
		handleListMunicipio,
		handleListCiudad,
		handleListParroquia,
		handleListSector,
	} = useContext(LocationsContext);

	const [load, setLoad] = useState(false);

	const imagen = imagesForm.rc_ident_card
		? pathImages.rc_ident_card.path
		: `${process.env.REACT_APP_API_IMAGES}/${client?.rc_ident_card.path}`;

	const typeImagen = imagesForm.rc_ident_card ? pathImages.rc_ident_card.type : null;

	return (
		<>
			<div className={classes.grid}>
				<div>
					<div className={classes.btn_stepM}>
						<AlertDiferido
							disabled={disabled}
							msg={listValidated.id_typedif_client === 2 ? listValidated.valid_client : 'Error Interno'}
						/>
					</div>
					<div className={classes.grid}>
						<div className={classes.input}>
							<TextField
								disabled={disabled}
								required
								className={classes.inputText}
								type='email'
								label='Correo'
								error={errorClient.email}
								autoComplete='off'
								variant='outlined'
								name='email'
								value={client?.email}
								onChange={handleChangeClient}
							/>
						</div>
						<div className={classes.input}>
							<TextField
								disabled={disabled}
								className={classes.inputText}
								variant='outlined'
								required
								label='Rif'
								autoComplete='off'
								name='ident_num'
								error={errorClient.ident_num}
								value={client.ident_num}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									handleIdentNum(event, handleChangeClient)
								}
								inputProps={{
									maxLength: client.id_ident_type === 'P' ? 20 : 9,
								}}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<FormControl variant='standard'>
												<Select
													//onBlur={handleBlurCommerce}
													//error={fm.errorCommerce}>
													disabled={disabled}
													name='client_type'
													onChange={handleChangeIdenType}
													value={client.id_ident_type.id}
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
								className={classNames(classes.inputText, classes.inputTextLeft)}
								sx={sxStyled.inputLeft}
								variant='outlined'
								required
								label='Nombre'
								autoComplete='nombre'
								name='name'
								error={errorClient.name}
								value={client?.name}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									handleFullName(event, handleChangeClient)
								}
							/>
							<TextField
								disabled={disabled}
								className={classes.inputText}
								variant='outlined'
								required
								label='Apellido'
								autoComplete='last_name'
								error={errorClient.last_name}
								name='last_name'
								value={client?.last_name}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									handleFullName(event, handleChangeClient)
								}
							/>
						</div>
						<div className={classes.input}>
							<TextField
								disabled={disabled}
								className={classes.inputText}
								sx={sxStyled.inputLeft}
								variant='outlined'
								required
								label='Telefono'
								name='phone1'
								error={errorClient.phone1}
								autoComplete='telefono1'
								onChange={handleChangeClientPhone}
								inputProps={{ maxLength: 10 }}
								value={phones.phone1}
							/>
							<TextField
								disabled={disabled}
								className={classes.inputText}
								variant='outlined'
								required
								label='Telefono'
								name='phone2'
								error={errorClient.phone2}
								autoComplete='telefono2'
								onChange={handleChangeClientPhone}
								inputProps={{ maxLength: 10 }}
								value={phones.phone2}
							/>
						</div>
					</div>
					<div className={classes.grid}>
						<div className={classes.input}>
							<Autocomplete
								disabled={disabled}
								noOptionsText={'Cargando...'}
								className={classNames(classes.inputText, classes.inputTextLeft)}
								sx={sxStyled.inputLeft}
								onChange={(event, value: Estado | null) => {
									if (value) {
										setEstado(value, setLocationClient);
										handleListMunicipio(value, setListLocationClient);
									}
								}}
								options={listLocationClient.estado}
								getOptionLabel={(estado: any) => estado.estado}
								isOptionEqualToValue={(option: Estado | null, value: any) => option?.estado === value.estado}
								value={locationClient.estado}
								renderInput={(params: any) => (
									<TextField
										{...params}
										error={errorClient.estado}
										name='estado'
										label='Estado'
										inputProps={{ ...params.inputProps, autoComplete: 'estado' }}
										variant='outlined'
									/>
								)}
							/>
							<Autocomplete
								disabled={disabled}
								noOptionsText={'Cargando...'}
								className={classes.inputText}
								onChange={(event, value: Municipio | null) => {
									setMunicipio(value, setLocationClient);
									handleListCiudad(locationClient.estado, value, setListLocationClient);
								}}
								options={listLocationClient.municipio}
								getOptionLabel={(value: any) => value.municipio}
								isOptionEqualToValue={(option: Municipio | null, value: any) =>
									option?.municipio === value.municipio
								}
								value={locationClient.municipio}
								renderInput={(params: any) => (
									<TextField
										{...params}
										name='municipio'
										error={errorClient.municipio}
										label='Municipio'
										inputProps={{ ...params.inputProps, autoComplete: 'municipio' }}
										variant='outlined'
									/>
								)}
							/>
						</div>
						<div className={classes.input}>
							<Autocomplete
								disabled={disabled}
								noOptionsText={'Cargando...'}
								className={classNames(classes.inputText, classes.inputTextLeft)}
								sx={sxStyled.inputLeft}
								onChange={(event, value: Ciudad | null) => {
									setCiudad(value, setLocationClient);
									handleListParroquia(
										locationClient.estado,
										locationClient.municipio,
										value,
										setListLocationClient
									);
								}}
								value={locationClient.ciudad}
								options={listLocationClient.ciudad}
								getOptionLabel={(value: any) => value.ciudad}
								isOptionEqualToValue={(option: Ciudad | null, value: any) => option?.ciudad === value.ciudad}
								renderInput={(params: any) => (
									<TextField
										{...params}
										name='ciudad'
										error={errorClient.ciudad}
										label='Ciudad'
										variant='outlined'
										inputProps={{ ...params.inputProps, autoComplete: 'ciudad' }}
									/>
								)}
							/>
							<Autocomplete
								disabled={disabled}
								noOptionsText={'Cargando...'}
								className={classes.inputText}
								onChange={(event, value: Parroquia | null) => {
									setParroquia(value, setLocationClient);
									handleListSector(
										locationClient.estado,
										locationClient.municipio,
										locationClient.ciudad,
										value,
										setListLocationClient
									);
								}}
								value={locationClient.parroquia}
								options={listLocationClient.parroquia}
								getOptionLabel={(option: Parroquia) => option.parroquia}
								isOptionEqualToValue={(option: Parroquia | null, value: any) =>
									option?.parroquia === value.parroquia
								}
								renderInput={(params: any) => (
									<TextField
										{...params}
										name='parroquia'
										error={errorClient.parroquia}
										label='Parroquia'
										variant='outlined'
										inputProps={{ ...params.inputProps, autoComplete: 'parroquia' }}
									/>
								)}
							/>
						</div>
						<div className={classes.input}>
							<Autocomplete
								disabled={disabled}
								noOptionsText={'Cargando...'}
								className={classNames(classes.inputText, classes.inputTextLeft)}
								sx={sxStyled.inputLeft}
								onChange={(event, value: Sector | null) => {
									setSector(value, setLocationClient);
									setIdLocationClient(value ? value.id : 0);
								}}
								value={locationClient.sector}
								options={listLocationClient.sector}
								getOptionLabel={(option: Sector) => option.sector}
								isOptionEqualToValue={(option: Sector | null, value: any) => option?.sector === value.sector}
								renderInput={(params: any) => (
									<TextField
										{...params}
										name='sector'
										error={errorClient.sector}
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
								value={locationClient.sector?.codigoPostal || ''}
							/>
						</div>
						<div className={classes.input}>
							<TextField
								disabled={disabled}
								className={classNames(classes.inputText, classes.inputTextLeft)}
								sx={sxStyled.inputLeft}
								variant='outlined'
								required
								id='standard-required'
								error={errorClient.calle}
								label='Calle'
								name='calle'
								onChange={handleChangeClient}
								value={client.calle}
							/>
							<TextField
								disabled={disabled}
								className={classes.inputText}
								variant='outlined'
								required
								id='standard-required'
								error={errorClient.local}
								label='Casa/Quinta/Apart'
								name='local'
								onChange={handleChangeClient}
								value={client.local}
							/>
						</div>
					</div>
				</div>
				<div className={classes.validRecaudo}>
					{!disabled && (
						<Button
							className={classes.imgIdent}
							variant='contained'
							disabled={disabled}
							style={{
								background: imagesForm.rc_ident_card && !disabled ? '#5c62c5' : '#D3D3D3',
							}}
							component='label'>
							<IconButton aria-label='upload picture' component='span'>
								<PhotoCamera />
							</IconButton>
							<input type='file' hidden name='rc_ident_card' accept={recaudo.acc} onChange={handleChangeImages} />
						</Button>
					)}
					<RecDifPdf load={load} setLoad={setLoad} imagen={imagen} type={typeImagen} />
				</div>
			</div>
		</>
	);
};

export default DifStepClient;
