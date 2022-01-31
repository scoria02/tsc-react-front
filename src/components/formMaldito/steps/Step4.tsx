//Materail
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import classnames from 'classnames';
import React, { FC, useContext } from 'react';
import { useStylesFM } from '../styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import { FMContext } from '../../../context/FM/FMContext';
import { LocationsContext } from '../../../context/Location/LocationsContext';

import { Ciudad, Estado, Municipio, Parroquia } from '../../../context/Location/interfaces';

export const Step4: FC = () => {
	const classes = useStylesFM();

	const {
		listLocationCommerce,
		//setListEstadoCommerce,
		setListMunicipioCommerce,
		setListCiudadCommerce,
		setListParroquiaCommerce,
		listLocationPos,
		//setListEstadoPos,
		setListMunicipioPos,
		setListCiudadPos,
		setListParroquiaPos,
	}: any = useContext(LocationsContext);

	const fm: any = useSelector((state: RootState) => state.fm);

	const {
		fmCommerce,
		fmPos,
		locationCommerce,
		locationPos,
		setEstadoCommerce,
		setMunicipioCommerce,
		setCiudadCommerce,
		setParroquiaCommerce,
		setEstadoPos,
		setMunicipioPos,
		setCiudadPos,
		setParroquiaPos,
		handleChangeCommerce,
		handleChangePos,

		//s
		fmData,
		changeFmData,
	}: any = useContext(FMContext);

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
		<div className='container-location'>
			<div>
				<h2>Dirección Fiscal</h2>
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						className={classes.inputTextLeft}
						onChange={(event, value: Estado | null) => {
							setEstadoCommerce(value);
							setListMunicipioCommerce(value);
						}}
						value={locationCommerce.estado || null}
						disabled={fm.mashCommerce}
						options={listLocationCommerce.estado}
						getOptionLabel={(option: Estado) => (option.estado ? option.estado : '')}
						getOptionSelected={(option: Estado, value: Estado) => option.id === value.id}
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
							setMunicipioCommerce(value);
							setListCiudadCommerce(fmCommerce.id_estado);
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
							setCiudadCommerce(value);
							setListParroquiaCommerce(fmCommerce.id_municipio);
						}}
						className={classes.inputTextLeft}
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
							setParroquiaCommerce(value);
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
						variant='outlined'
						required
						id='standard-required'
						label='Codigo Postal'
						name='codigo_postal'
						value={fmCommerce.codigo_postal}
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
						value={fmCommerce.sector}
					/>
				</div>
				<div className={classnames(classes.row, classes.input)}>
					<TextField
						className={classes.inputTextLeft}
						variant='outlined'
						required
						id='standard-required'
						disabled={fm.mashCommerce}
						label='Calle'
						name='calle'
						onChange={handleLocationCommerce}
						value={fmCommerce.calle}
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
						value={fmCommerce.local}
					/>
				</div>
			</div>
			<div>
				<h2>Dirección POS</h2>
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						className={classes.inputTextLeft}
						onChange={(event, value: Estado | null) => {
							setEstadoPos(value);
							setListMunicipioPos(value);
						}}
						options={listLocationPos.estado}
						value={locationPos.estado || null}
						getOptionLabel={(option: Estado) => (option.estado ? option.estado : '')}
						getOptionSelected={(option: Estado, value: Estado) => option.id === value.id}
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
							setMunicipioPos(value);
							setListCiudadPos(fmPos.id_estado);
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
						onChange={(event, value: Ciudad | null) => {
							setCiudadPos(value);
							setListParroquiaPos(fmPos.id_municipio);
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
							setParroquiaPos(value);
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
						variant='outlined'
						required
						id='standard-required'
						label='Codigo Postal'
						name='codigo_postal_pos'
						value={fmPos.codigo_postal}
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
						value={fmPos.sector}
					/>
				</div>
				<div className={classnames(classes.row, classes.input)}>
					<TextField
						className={classes.inputTextLeft}
						variant='outlined'
						required
						id='standard-required'
						label='Calle'
						name='calle'
						onChange={handleLocationPos}
						value={fmPos.calle}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Local'
						name='local'
						onChange={handleLocationPos}
						value={fmPos.local}
					/>
				</div>
			</div>
		</div>
	);
};
