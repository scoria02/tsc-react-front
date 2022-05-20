//Materail
import Autocomplete from '@mui/lab/Autocomplete';
import { TextField } from '@mui/material';
import classnames from 'classnames';
import FMDataContext from 'context/FM/fmAdmision/FmContext';
import { Ciudad, Estado, Municipio, Parroquia } from 'context/FM/Location/interfaces';
import LocationsContext from 'context/FM/Location/LocationsContext';
import React, { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { sxStyled, useStylesFM } from '../styles';

const StepLocationCCandPos: FC = () => {
	const classes = useStylesFM();

	const {
		listLocationCommerce,
		listLocationPos,
		setListLocationCommerce,
		setListLocationPos,
		handleListMunicipio,
		handleListCiudad,
		handleListParroquia,
	} = useContext(LocationsContext);

	const fm: any = useSelector((state: RootState) => state.fm);

	const {
		commerce,
		pos,
		locationCommerce,
		locationPos,
		setLocationCommerce,
		setLocationPos,
		setEstado,
		setMunicipio,
		setCiudad,
		setParroquia,
		handleChangeCommerce,
		handleChangePos,
	} = useContext(FMDataContext);

	const handleLocationCommerce = (event: React.ChangeEvent<HTMLInputElement>) => {
		//setAutoCompleteCommerce(false);
		handleChangeCommerce(event);
	};

	const handleLocationPos = (event: React.ChangeEvent<HTMLInputElement>) => {
		//setAutoCompletePos(false);
		handleChangePos(event);
	};

	/*
	//Copyrighter Commerce to pos
	useEffect(() => {
		if (activeStep === 3 && autoCompletePos) {
			copyListLocationCCToP();
			copyLocationCCToP();
		}
	}, [
		activeStep,
		locationCommerce,
		fmData.sector,
		fmData.calle,
		fmData.local,
		fmData.codigo_postal,
		fm.commerceMash,
	]);
	*/

	return (
		<div className={classes.containerLocation}>
			<div>
				<h2>Dirección Fiscal</h2>
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						className={classes.inputTextLeft}
						sx={sxStyled.inputSelect}
						onChange={(event, value: Estado | null) => {
							setEstado(value, setLocationCommerce);
							handleListMunicipio(value ? value.id : 0, setListLocationCommerce);
						}}
						value={locationCommerce.estado || null}
						disabled={fm.mashCommerce}
						options={listLocationCommerce.estado}
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
						className={classes.inputText}
						onChange={(event, value: Municipio | null) => {
							setMunicipio(value, setLocationCommerce);
							handleListCiudad(locationCommerce.estado!.id, setListLocationCommerce);
						}}
						value={locationCommerce.municipio || null}
						disabled={fm.mashCommerce}
						options={listLocationCommerce.municipio}
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
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						onChange={(event, value: Ciudad | null) => {
							setCiudad(value, setLocationCommerce);
							handleListParroquia(locationCommerce.municipio!.id, setListLocationCommerce);
						}}
						className={classes.inputTextLeft}
						sx={sxStyled.inputSelect}
						value={locationCommerce.ciudad || null}
						disabled={fm.mashCommerce}
						options={listLocationCommerce.ciudad}
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
						className={classes.inputText}
						onChange={(event, value: Parroquia | null) => {
							setParroquia(value, setLocationCommerce);
						}}
						value={locationCommerce.parroquia || null}
						disabled={fm.mashCommerce}
						options={listLocationCommerce.parroquia}
						getOptionLabel={(option: Parroquia) => (option.parroquia ? option.parroquia : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='parroquia' label='Parroquia' variant='outlined' />
						)}
					/>
				</div>
				<div className={classnames(classes.row, classes.input)}>
					<TextField
						className={classes.inputTextLeft}
						sx={sxStyled.inputSelect}
						variant='outlined'
						required
						id='standard-required'
						label='Codigo Postal'
						name='codigo_postal'
						value={locationCommerce.ciudad?.postal_code || ''}
						disabled
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						disabled={fm.mashCommerce}
						label='Sector'
						name='sector'
						onChange={handleLocationCommerce}
						value={commerce.sector}
					/>
				</div>
				<div className={classnames(classes.row, classes.input)}>
					<TextField
						className={classes.inputTextLeft}
						sx={sxStyled.inputSelect}
						variant='outlined'
						required
						id='standard-required'
						disabled={fm.mashCommerce}
						label='Calle'
						name='calle'
						onChange={handleLocationCommerce}
						value={commerce.calle}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Local'
						disabled={fm.mashCommerce}
						name='local'
						onChange={handleLocationCommerce}
						value={commerce.local}
					/>
				</div>
			</div>
			<div>
				<h2>Dirección POS</h2>
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						className={classes.inputTextLeft}
						sx={sxStyled.inputSelect}
						onChange={(event, value: Estado | null) => {
							setEstado(value, setLocationPos);
							handleListMunicipio(value ? value.id : 0, setListLocationPos);
						}}
						options={listLocationPos.estado}
						value={locationPos.estado || null}
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
						className={classes.inputText}
						onChange={(event, value: Municipio | null) => {
							setMunicipio(value, setLocationPos);
							handleListCiudad(locationPos.estado!.id, setListLocationPos);
						}}
						value={locationPos.municipio || null}
						options={listLocationPos.municipio}
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
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						className={classes.inputTextLeft}
						sx={sxStyled.inputSelect}
						onChange={(event, value: Ciudad | null) => {
							setCiudad(value, setLocationPos);
							handleListParroquia(locationPos.municipio!.id, setListLocationPos);
						}}
						options={listLocationPos.ciudad}
						value={locationPos.ciudad || null}
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
						className={classes.inputText}
						onChange={(event, value: Parroquia | null) => {
							setParroquia(value, setLocationPos);
						}}
						options={listLocationPos.parroquia}
						value={locationPos.parroquia || null}
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
				<div className={classnames(classes.row, classes.input)}>
					<TextField
						className={classes.inputTextLeft}
						sx={sxStyled.inputSelect}
						variant='outlined'
						required
						id='standard-required'
						label='Codigo Postal'
						name='codigo_postal_pos'
						value={locationPos.ciudad?.postal_code || ''}
						disabled
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Sector'
						name='sector'
						onChange={handleLocationPos}
						value={pos.sector}
					/>
				</div>
				<div className={classnames(classes.row, classes.input)}>
					<TextField
						className={classes.inputTextLeft}
						sx={sxStyled.inputSelect}
						variant='outlined'
						required
						id='standard-required'
						label='Calle'
						name='calle'
						onChange={handleLocationPos}
						value={pos.calle}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Local'
						name='local'
						onChange={handleLocationPos}
						value={pos.local}
					/>
				</div>
			</div>
		</div>
	);
};

export default StepLocationCCandPos;
