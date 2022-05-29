import { TextField, Stack, Alert, Autocomplete, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { Ciudad, Estado, Municipio, Parroquia, Sector } from 'context/Admision/CreationFM/Location/interfaces';
import classNames from 'classnames';
import { FC, useContext } from 'react';
//sytles
import { sxStyled, useStylesFM } from '../styles';
//context
import LocationsContext from 'context/Admision/CreationFM/Location/LocationsContext';
import { setCiudad, setEstado, setMunicipio, setParroquia, setSector } from 'context/utilitis/setLocation';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import DataListContext from 'context/DataList/DataListContext';
import { base, Products } from 'context/DataList/interface';
import AlertDiferido from 'components/alert/AlertDiferido';

const DifStepPos: FC = () => {
	const classes = useStylesFM();

	const {
		listPayment,
		listModelPos,
		listTypePay,
		/*
		listRequestSource,
		listAci,
		listWalletType,
		listTeleMarket,
		listDistributor,
		*/
	} = useContext(DataListContext);

	const {
		solic,
		pos,
		errorPos,
		disabled,
		handleChangePos,
		listValidated,
		handleParamsPos,
		//location
		locationPos,
		setLocationPos,
		setIdLocationClient,
	} = useContext(FMDiferidoContext);
	//
	console.log(solic);

	const {
		listLocationPos,
		setListLocationPos,
		handleListMunicipio,
		handleListCiudad,
		handleListParroquia,
		handleListSector,
	} = useContext(LocationsContext);

	const handleSelect = (event: any, value: any, name: string) => {
		if (value) handleParamsPos(name, value);
	};

	console.log('step posss', solic, pos);

	return (
		<>
			<div>
				<div className={classes.btn_stepM}>
					<AlertDiferido
						disabled={disabled}
						msg={listValidated.id_typedif_pos === 2 ? listValidated.valid_pos : 'Error Interno'}
					/>
				</div>
				<div className={classes.grid}>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							disabled={disabled}
							required
							type='number'
							variant='outlined'
							label='Numero de Pos'
							name='number_post'
							value={solic?.number_post || 1}
							onChange={handleChangePos}
						/>
						<TextField
							disabled
							className={classes.inputText}
							variant='outlined'
							label='Origen de la Solicitud'
							name='request_origin'
							value={solic?.id_request_origin.name}
						/>
					</div>
					<div className={classes.input}>
						<Autocomplete
							disabled={disabled}
							className={classes.inputText}
							options={listModelPos}
							onChange={(event, value: Products | null) => handleSelect(event, value, 'id_product')}
							getOptionLabel={(option: any) => option.name}
							isOptionEqualToValue={(option, value: Products | null) => option?.id === value?.id}
							value={pos?.id_product || null}
							renderInput={(params: any) => (
								<TextField {...params} name='model_post' label='Modelo de los POS' variant='outlined' />
							)}
						/>
					</div>
					{console.log('entrego', solic?.discount)}
					<div className={classes.input}>
						<FormControl sx={sxStyled.inputLeft}>
							<InputLabel>Entrego Punto</InputLabel>
							<Select
								disabled={disabled}
								name='discount'
								onChange={(event) => {
									console.log('data', event.target.value);
									handleParamsPos('discount', event.target.value === 'Si' ? true : false);
								}}
								value={pos?.discount ? 'Si' : 'No'}
								label='Entrego Punto'>
								<MenuItem key={1} value={'Si'}>
									Si
								</MenuItem>
								<MenuItem key={2} value={'No'}>
									No
								</MenuItem>
							</Select>
						</FormControl>
						<TextField
							disabled
							className={classNames(classes.inputText, classes.inputTextLeft)}
							variant='outlined'
							label='Pagadero Destino'
							name='pagadero'
							value={solic?.pagadero ? 'Si' : 'No'}
						/>
					</div>
					<div className={classes.input}>
						<Autocomplete
							disabled={disabled}
							sx={sxStyled.inputLeft}
							className={classes.inputText}
							onChange={(event, value) => handleSelect(event, value, 'id_payment_method')}
							options={listTypePay}
							value={solic?.id_payment_method || null}
							getOptionLabel={(option: any) => (option.name ? option.name : '')}
							isOptionEqualToValue={(option, value: base | null) => option?.id === value?.id}
							renderInput={(params: any) => (
								<TextField {...params} name='id_payment_method' label='Modalidad de Pago' variant='outlined' />
							)}
						/>
						<Autocomplete
							disabled={disabled}
							className={classes.inputText}
							onChange={(event, value) => handleSelect(event, value, 'id_type_payment')}
							options={listPayment}
							value={solic?.id_type_payment || null}
							getOptionLabel={(option: any) => (option.name ? option.name : '')}
							isOptionEqualToValue={(option, value: base | null) => option?.id === value?.id}
							renderInput={(params: any) => (
								<TextField {...params} name='id_type_payment' label='Tipo de Pago' variant='outlined' />
							)}
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
									setEstado(value, setLocationPos);
									handleListMunicipio(value, setListLocationPos);
								}
							}}
							options={listLocationPos.estado}
							getOptionLabel={(estado: any) => estado.estado}
							isOptionEqualToValue={(option: Estado | null, value: any) => option?.estado === value.estado}
							value={locationPos.estado}
							renderInput={(params: any) => (
								<TextField
									{...params}
									error={errorPos.estado}
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
								setMunicipio(value, setLocationPos);
								handleListCiudad(locationPos.estado, value, setListLocationPos);
							}}
							options={listLocationPos.municipio}
							getOptionLabel={(value: any) => value.municipio}
							isOptionEqualToValue={(option: Municipio | null, value: any) =>
								option?.municipio === value.municipio
							}
							value={locationPos.municipio}
							renderInput={(params: any) => (
								<TextField
									{...params}
									name='municipio'
									error={errorPos.municipio}
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
								setCiudad(value, setLocationPos);
								handleListParroquia(locationPos.estado, locationPos.municipio, value, setListLocationPos);
							}}
							value={locationPos.ciudad}
							options={listLocationPos.ciudad}
							getOptionLabel={(value: any) => value.ciudad}
							isOptionEqualToValue={(option: Ciudad | null, value: any) => option?.ciudad === value.ciudad}
							renderInput={(params: any) => (
								<TextField
									{...params}
									name='ciudad'
									error={errorPos.ciudad}
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
								setParroquia(value, setLocationPos);
								handleListSector(
									locationPos.estado,
									locationPos.municipio,
									locationPos.ciudad,
									value,
									setListLocationPos
								);
							}}
							value={locationPos.parroquia}
							options={listLocationPos.parroquia}
							getOptionLabel={(option: Parroquia) => option.parroquia}
							isOptionEqualToValue={(option: Parroquia | null, value: any) =>
								option?.parroquia === value.parroquia
							}
							renderInput={(params: any) => (
								<TextField
									{...params}
									name='parroquia'
									error={errorPos.parroquia}
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
								setSector(value, setLocationPos);
								setIdLocationClient(value ? value.id : 0);
							}}
							value={locationPos.sector}
							options={listLocationPos.sector}
							getOptionLabel={(option: Sector) => option.sector}
							isOptionEqualToValue={(option: Sector | null, value: any) => option?.sector === value.sector}
							renderInput={(params: any) => (
								<TextField
									{...params}
									name='sector'
									error={errorPos.sector}
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
							value={locationPos.sector?.codigoPostal || ''}
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
							error={errorPos.calle}
							label='Calle'
							name='calle'
							onChange={handleChangePos}
							value={locationPos.calle}
						/>
						<TextField
							disabled={disabled}
							className={classes.inputText}
							variant='outlined'
							required
							id='standard-required'
							error={errorPos.local}
							label='Casa/Quinta/Apart'
							name='local'
							onChange={handleChangePos}
							value={locationPos.local}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default DifStepPos;
