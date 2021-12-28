import Button from '@material-ui/core/Button';
//Material
import { useContext } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Autocomplete from '@material-ui/lab/Autocomplete';
import classNames from 'classnames';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
//sytles
import {useStylesFM} from '../styles';
import { recaudo } from '../../utilis/recaudos';
import { FMContext } from '../../../context/FM/FMContext';

import { LocationsContext } from '../../../context/Location/LocationsContext';
import { DataListContext } from '../../../context/DataList/DataListContext';

export const Step1: React.FC<any> = ({
	namesImages,
	validEmailIdent,
	imagesForm,
	handleChangeNames,
	handleChangeImages,
	handleBlurEmailIdent,
}) => {
	const classes = useStylesFM();
	const fm: any = useSelector((state: RootState) => state.fm);

	const { 
		listLocationClient,
		setListMunicipioClient,
		setListCiudadClient,
		setListParroquiaClient,
	}:any = useContext(LocationsContext);

	const { 
		fmData,
		fmDataError,
		changeFmData,
		codePhone,
		locationClient,
		setEstadoClient,
		setMunicipioClient,
		setCiudadClient,
		setParroquiaClient,
	}:any = useContext(FMContext);

	const {
		listIdentType
	}: any = useContext(DataListContext);

	const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value !== '0') {
			if(/^[0-9]+$/.test(event.target.value) || event.target.value === ''){
				changeFmData(event);
			}
		}
	}

	const handleIdentNum = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(/^[0-9]+$/.test(event.target.value) || event.target.value === ''){
			changeFmData(event);
		}
	}

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
						autoComplete="off"
						name='email'
						onChange={changeFmData}
						onBlur={handleBlurEmailIdent}
						value={fmData.email}
						error={fmDataError.email || validEmailIdent}
					/>
				</div>
				<div className={classes.input}>
					<FormControl variant='outlined' className={classes.inputSelect}>
						<InputLabel>DI</InputLabel>
						<Select
							value={fmData.id_ident_type}
							onChange={changeFmData}
							onBlur={handleBlurEmailIdent}
							name='id_ident_type'
							error={validEmailIdent}
							label='Tipo'>
							{listIdentType.map((item: any) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						className={classes.inputTextLeft}
						variant='outlined'
						required
						label='C.I.'
						autoComplete="off"
						name='ident_num'
						onChange={handleIdentNum}
						onBlur={handleBlurEmailIdent}
						value={fmData.ident_num}
						error={fmDataError.ident_num || validEmailIdent}
						inputProps={{
							maxLength: fmData.id_ident_type === 5 ? 20 : 9 
						}}
					/>
					<Button
						className={classes.imgIdent}
						variant='contained'
						disabled={fm.imagesClient}
						style={{ 
							opacity: fm.imagesClient ? 0 : 1,
							background: imagesForm.rc_ident_card ? '#5c62c5' : '#f44336' 
						}}
						component='label'
					>
						{imagesForm.rc_ident_card !== null ? (
							<p className='nameImg'>{namesImages.rc_ident_card.slice(0, 7)} ...</p>
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
							name='rc_ident_card'
							accept={recaudo.acc}
							onChange={handleChangeImages}
						/>
					</Button>
				</div>
				<div className={classes.input}>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						variant='outlined'
						required
						label='Nombre'
						autoComplete="nombre"
						name='name'
						onChange={handleChangeNames}
						value={fmData.name}
						error={fmDataError.name}
						disabled={fm.mashClient}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						label='Apellido'
						autoComplete="last_name"
						name='last_name'
						onChange={handleChangeNames}
						value={fmData.last_name}
						error={fmDataError.last_name}
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
						autoComplete="telefono1"
						placeholder= "Ej: 4121234567"
						onChange={handleChangePhone}
						error={fmDataError.phone1}
						disabled={fm.mashClient}
						value={fmData.phone1}
						inputProps={{ maxLength: 10 }}
						InputProps={{
							startAdornment: (
								fm.mashClient ? 
									null
								:
								(
									<InputAdornment position="start">
										{codePhone}
									</InputAdornment>
								)
							)
						}}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						label='Telefono'
						name='phone2'
						onChange={handleChangePhone}
						autoComplete="telefono2"
						error={fmDataError.phone2}
						disabled={fm.mashClient}
						value={fmData.phone2}
						placeholder= "Ej: 4127654321"
						inputProps={{ maxLength: 10 }}
						InputProps={{
							startAdornment: (
								fm.mashClient ? 
									null
								:
								(
									<InputAdornment position="start">
										{codePhone}
									</InputAdornment>
								)
							)
						}}
					/>
				</div>
				<div className={classes.input}>
					<Autocomplete
						disabled={fm.mashClient}
						className={classNames(classes.inputText, classes.inputTextLeft)}
						onChange={(event, value) => {
							setEstadoClient(value);
							setListMunicipioClient(value);
						}}

						value={locationClient.estado || null}
						options={listLocationClient.estado}
						getOptionLabel={(option: any) => (option.estado ? option.estado : '')}
						getOptionSelected={(option: any, value: any) => option.id === value.id}
						renderInput={(params: any) => (
							<TextField {...params} name='estado' label='Estado' inputProps={{...params.inputProps, autoComplete: 'estado', }} variant='outlined' />
						)}
					/>
					<Autocomplete
						disabled={fm.mashClient}
						className={classes.inputText}
						onChange={(event, value) => {
							setMunicipioClient(value);
							setListCiudadClient(fmData.id_estado_client);
						}}
						value={locationClient.municipio || null}
						options={listLocationClient.municipio}
						getOptionLabel={(option: any) => (option.municipio ? option.municipio : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='municipio' label='Municipio' variant='outlined' inputProps={{...params.inputProps, autoComplete: 'municipio', }} />
						)}
					/>
				</div>
				<div className={classes.input}>
					<Autocomplete
						disabled={fm.mashClient}
						className={classNames(classes.inputText, classes.inputTextLeft)}
						onChange={(event, value) => {
							setCiudadClient(value);
							setListParroquiaClient(fmData.id_municipio_client);
						}}
						value={locationClient.ciudad || null}
						options={listLocationClient.ciudad}
						getOptionLabel={(option: any) => (option.ciudad ? option.ciudad : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='ciudad' label='Ciudad' variant='outlined' inputProps={{...params.inputProps, autoComplete: 'ciudad', }} />
						)}
					/>
					<Autocomplete
						disabled={fm.mashClient}
						className={classes.inputText}
						onChange={(event, value) => {
							setParroquiaClient(value);
						}}
						value={locationClient.parroquia || null}
						options={listLocationClient.parroquia}
						getOptionLabel={(option: any) => (option.parroquia ? option.parroquia : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='parroquia' label='Parroquia' variant='outlined' inputProps={{...params.inputProps, autoComplete: 'parroquia', }} />
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
						name='codigo_postal_client'
						value={fmData.codigo_postal_client}
					/>
					<TextField
						disabled={fm.mashClient}
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Sector'
						name='sector_client'
						onChange={changeFmData}
						value={fmData.sector_client}
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
						name='calle_client'
						onChange={changeFmData}
						value={fmData.calle_client}
					/>
					<TextField
						disabled={fm.mashClient}
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Casa/Quinta/Apart'
						name='local_client'
						onChange={changeFmData}
						value={fmData.local_client}
					/>
				</div>
			</div>
		</>
	);
};
