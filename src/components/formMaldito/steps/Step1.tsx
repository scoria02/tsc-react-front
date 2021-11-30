import Button from '@material-ui/core/Button';
//Material
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

export const Step1: React.FC<any> = ({
	namesImages,
	listIdentType,
	cursedForm,
	error,
	validEmailIdent,
	imagesForm,
	setCursedForm,
	handleChange,
	handleChangeImages,
	handleBlurEmailIdent,
	validateForm,
	listLocation,
	location,
	handleUpdateLocation,
	codePhone,
}) => {
	const classes = useStylesFM();
	const fm: any = useSelector((state: RootState) => state.fm);

	const handleSelect = (event: any) => {
		setCursedForm({
			...cursedForm,
			[event.target.name]: event.target.value,
		});
		validateForm(event.target.name, event.target.value);
	};

	const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value !== '0') {
			if(/^[0-9]+$/.test(event.target.value) || event.target.value === '')
				handleChange(event);
		}
	}

	const handleIdentNum = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(/^[0-9]+$/.test(event.target.value) || event.target.value === ''){
			handleChange(event);
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
						onChange={handleChange}
						onBlur={handleBlurEmailIdent}
						value={cursedForm.email}
						error={error.email || validEmailIdent}
					/>
				</div>
				<div className={classes.input}>
					<FormControl variant='outlined' className={classes.inputSelect}>
						<InputLabel>DI</InputLabel>
						<Select
							value={cursedForm.id_ident_type}
							onChange={handleSelect}
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
						value={cursedForm.ident_num}
						error={error.ident_num || validEmailIdent}
						inputProps={{
							maxLength: cursedForm.id_ident_type === 5 ? 20 : 9 
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
						onChange={handleChange}
						value={cursedForm.name}
						error={error.name}
						disabled={fm.mashClient}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						label='Apellido'
						autoComplete="last_name"
						name='last_name'
						onChange={handleChange}
						value={cursedForm.last_name}
						error={error.last_name}
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
						error={error.phone1}
						disabled={fm.mashClient}
						value={cursedForm.phone1}
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
						error={error.phone2}
						disabled={fm.mashClient}
						value={cursedForm.phone2}
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
						onChange={(event, value) => handleUpdateLocation('estado', value)}
						value={location.estado || null}
						options={listLocation.estado}
						getOptionLabel={(option: any) => (option.estado ? option.estado : '')}
						getOptionSelected={(option: any, value: any) => option.id === value.id}
						renderInput={(params: any) => (
							<TextField {...params} name='estado' label='Estado' inputProps={{...params.inputProps, autoComplete: 'estado', }} variant='outlined' />
						)}
					/>
					<Autocomplete
						disabled={fm.mashClient}
						className={classes.inputText}
						onChange={(event, value) => handleUpdateLocation('municipio', value)}
						value={location.municipio || null}
						options={listLocation.municipio}
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
						onChange={(event, value) => handleUpdateLocation('ciudad', value)}
						value={location.ciudad || null}
						options={listLocation.ciudad}
						getOptionLabel={(option: any) => (option.ciudad ? option.ciudad : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='ciudad' label='Ciudad' variant='outlined' inputProps={{...params.inputProps, autoComplete: 'ciudad', }} />
						)}
					/>
					<Autocomplete
						disabled={fm.mashClient}
						className={classes.inputText}
						onChange={(event, value) => handleUpdateLocation('parroquia', value)}
						value={location.parroquia || null}
						options={listLocation.parroquia}
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
						value={cursedForm.codigo_postal_client}
					/>
					<TextField
						disabled={fm.mashClient}
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Sector'
						name='sector_client'
						onChange={handleChange}
						value={cursedForm.sector_client}
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
						onChange={handleChange}
						value={cursedForm.calle_client}
					/>
					<TextField
						disabled={fm.mashClient}
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Casa/Quinta/Apart'
						name='local_client'
						onChange={handleChange}
						value={cursedForm.local_client}
					/>
				</div>
			</div>
		</>
	);
};
