//Materail
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import classnames from 'classnames';
import React, { useContext } from 'react';
import { useStylesFM } from '../styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import { FMContext } from '../../../context/FM/FMContext';
import { LocationsContext } from '../../../context/Location/LocationsContext';

export const Step4: React.FC<any> = ({
	setAutoCompleteCommerce,
	setAutoCompletePos,
}) => {
	const classes = useStylesFM();

	const { 
		listLocationCommerce,
		setListEstadoCommerce,
		setListMunicipioCommerce,
		setListCiudadCommerce,
		setListParroquiaCommerce,
		listLocationPos,
		setListEstadoPos,
		setListMunicipioPos,
		setListCiudadPos,
		setListParroquiaPos,
	}:any = useContext(LocationsContext);

	const fm: any = useSelector((state: RootState) => state.fm);

	const { 
		fmData,
		changeFmData,
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
	}:any = useContext(FMContext);

	const handleChangeCommerce = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAutoCompleteCommerce(false);
		changeFmData(event);
	};

	const handleChangePos = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAutoCompletePos(false);
		changeFmData(event);
	};

	return (
		<div className='container-location'>
			<div>
				<h2>Dirección Fiscal</h2>
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						className={classes.inputTextLeft}
						onChange={(event, value) => {
							setEstadoCommerce(value);
							setListMunicipioCommerce(value);
						}}
						value={locationCommerce.estado || null}
						disabled={fm.mashCommerce}
						options={listLocationCommerce.estado}
						getOptionLabel={(option: any) => (option.estado ? option.estado : '')}
						getOptionSelected={(option: any, value: any) => option.id === value.id}
						renderInput={(params: any) => (
							<TextField {...params} name='estado' label='Estado' inputProps={{ ...params.inputProps, autoComplete: 'estado', }} variant='outlined' />
						)}
					/>
					<Autocomplete
						className={classes.inputText}
						onChange={(event, value) => {
							setMunicipioCommerce(value);
							setListCiudadCommerce(fmData.id_estado);
						}}
						value={locationCommerce.municipio || null}
						disabled={fm.mashCommerce}
						options={listLocationCommerce.municipio}
						getOptionLabel={(option: any) => (option.municipio ? option.municipio : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='municipio' label='Municipio' variant='outlined' inputProps={{ ...params.inputProps, autoComplete: 'municipio', }}/>
						)}
					/>
				</div>
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						onChange={(event, value) => {
							setCiudadCommerce(value);
							setListParroquiaCommerce(fmData.id_municipio);
						}}
						className={classes.inputTextLeft}
						value={locationCommerce.ciudad || null}
						disabled={fm.mashCommerce}
						options={listLocationCommerce.ciudad}
						getOptionLabel={(option: any) => (option.ciudad ? option.ciudad : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='ciudad' label='Ciudad' variant='outlined' inputProps={{ ...params.inputProps, autoComplete: 'ciudad', }}/>
						)}
					/>
					<Autocomplete
						className={classes.inputText}
						onChange={(event, value) => {
							setParroquiaCommerce(value);
						}}
						value={locationCommerce.parroquia || null}
						disabled={fm.mashCommerce}
						options={listLocationCommerce.parroquia}
						getOptionLabel={(option: any) => (option.parroquia ? option.parroquia : '')}
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
						value={fmData.codigo_postal}
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
						onChange={handleChangeCommerce}
						value={fmData.sector}
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
						onChange={handleChangeCommerce}
						value={fmData.calle}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Local'
						disabled={fm.mashCommerce}
						name='local'
						onChange={handleChangeCommerce}
						value={fmData.local}
					/>
				</div>
			</div>
			<div>
				<h2>Dirección POS</h2>
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						className={classes.inputTextLeft}
						onChange={(event, value) => {
							setEstadoPos(value);
							setListMunicipioPos(value);
						}}
						options={listLocationPos.estado}
						value={locationPos.estado || null}
						getOptionLabel={(option: any) => (option.estado ? option.estado : '')}
						getOptionSelected={(option: any, value: any) => option.id === value.id}
						renderInput={(params: any) => (
							<TextField {...params} name='estado' label='Estado' inputProps={{ ...params.inputProps, autoComplete: 'estado', }} variant='outlined' />
						)}
					/>
					<Autocomplete
						className={classes.inputText}
						onChange={(event, value) => {
							setMunicipioPos(value);
							setListCiudadPos(fmData.id_estado_pos);
						}}
						value={locationPos.municipio || null}
						options={listLocationPos.municipio}
						getOptionLabel={(option: any) => (option.municipio ? option.municipio : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='municipio' label='Municipio' variant='outlined' inputProps={{ ...params.inputProps, autoComplete: 'municipio', }}/>
						)}
					/>
				</div>
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						className={classes.inputTextLeft}
						onChange={(event, value) => {
							setCiudadPos(value);
							setListParroquiaPos(fmData.id_municipio_pos);
						}}
						options={listLocationPos.ciudad}
						value={locationPos.ciudad || null}
						getOptionLabel={(option: any) => (option.ciudad ? option.ciudad : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='ciudad' label='Ciudad' variant='outlined' inputProps={{ ...params.inputProps, autoComplete: 'ciudad', }}/>
						)}
					/>
					<Autocomplete
						className={classes.inputText}
						onChange={(event, value) => {
							setParroquiaPos(value);
						}}
						options={listLocationPos.parroquia}
						value={locationPos.parroquia || null}
						getOptionLabel={(option: any) => (option.parroquia ? option.parroquia : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='parroquia' label='Parroquia' variant='outlined' inputProps={{ ...params.inputProps, autoComplete: 'parroquia', }}/>
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
						value={fmData.codigo_postal_pos}
						disabled
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Sector'
						name='sector_pos'
						onChange={handleChangePos}
						value={fmData.sector_pos}
					/>
				</div>
				<div className={classnames(classes.row, classes.input)}>
					<TextField
						className={classes.inputTextLeft}
						variant='outlined'
						required
						id='standard-required'
						label='Calle'
						name='calle_pos'
						onChange={handleChangePos}
						value={fmData.calle_pos}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Local'
						name='local_pos'
						onChange={handleChangePos}
						value={fmData.local_pos}
					/>
				</div>
			</div>
		</div>
	);
};
