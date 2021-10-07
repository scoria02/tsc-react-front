import Button from '@material-ui/core/Button';
//Material
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
//sytles
import { useStylesFM } from '../styles';

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
	setLocation,
	handleUpdateLocation,
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

	const handleSelectClient = (event: any, value: any, item: string) => {
		if (value) {
			setCursedForm({
				...cursedForm,
				[`id_${item}_client`]: value.id,
			});
		} else {
			setCursedForm({
				...cursedForm,
				[`id_${item}_client`]: 0,
			});
		}
		handleUpdateLocation(item, value);
	};

	return (
		<>
			<div className={classes.inputLine3}>
				<div>
					<TextField
						required
						className={classes.input}
						type='email'
						variant='outlined'
						label='Correo'
						name='email'
						onChange={handleChange}
						onBlur={handleBlurEmailIdent}
						value={cursedForm.email}
						error={error.email || validEmailIdent}
					/>
				</div>
				<div className={classes.input}>
					<FormControl variant='outlined' className={classes.inputTipoId}>
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
						className={classes.inputDoc}
						variant='outlined'
						required
						label='C.I.'
						name='ident_num'
						onChange={handleChange}
						onBlur={handleBlurEmailIdent}
						value={cursedForm.ident_num}
						error={error.ident_num || validEmailIdent}
					/>
					<Button
						className={classes.imgIdent}
						variant='contained'
						//color="secondary"
						component='label'
						disabled={fm.mashClient}>
						{imagesForm.rc_ident_card !== null ? (
							<p className='nameImg'>{namesImages.rc_ident_card.slice(0, 7)} ...</p>
						) : (
							<>
								<b>Subir</b>
								<IconButton aria-label='upload picture' component='span'>
									<PhotoCamera />
								</IconButton>
							</>
						)}
						<input
							type='file'
							hidden
							name='rc_ident_card'
							accept='image/png, image/jpeg, image/jpg'
							onChange={handleChangeImages}
						/>
					</Button>
				</div>
				<div className={classes.input}>
					<TextField
						className={classes.inputM}
						variant='outlined'
						required
						label='Nombre'
						name='name'
						onChange={handleChange}
						value={cursedForm.name}
						error={error.name}
						disabled={fm.mashClient}
					/>
					<TextField
						className={classes.inputN}
						variant='outlined'
						required
						label='Apellido'
						name='last_name'
						onChange={handleChange}
						value={cursedForm.last_name}
						error={error.last_name}
						disabled={fm.mashClient}
					/>
				</div>
				<div className={classes.input}>
					<TextField
						className={classes.inputM}
						variant='outlined'
						required
						label='Telefono'
						name='phone1'
						onChange={handleChange}
						value={cursedForm.phone1}
						error={error.phone1}
						disabled={fm.mashClient}
					/>
					<TextField
						className={classes.inputN}
						variant='outlined'
						required
						label='Telefono'
						name='phone2'
						onChange={handleChange}
						value={cursedForm.phone2}
						error={error.phone2}
						disabled={fm.mashClient}
					/>
				</div>
				<div className={classes.input}>
					<Autocomplete
						className={classes.inputC}
						onChange={(event, value) => handleSelectClient(event, value, 'estado')}
						value={location.estado || null}
						options={listLocation.estado}
						getOptionLabel={(option: any) => (option.estado ? option.estado : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='estado' label='Estado' variant='outlined' />
						)}
					/>
					<Autocomplete
						className={classes.inputC}
						onChange={(event, value) => handleSelectClient(event, value, 'ciudad')}
						value={location.ciudad || null}
						options={listLocation.ciudad}
						getOptionLabel={(option: any) => (option.ciudad ? option.ciudad : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='ciudad' label='Ciudad' variant='outlined' />
						)}
					/>
				</div>
				<div className={classes.input}>
					<Autocomplete
						className={classes.inputC}
						onChange={(event, value) => handleSelectClient(event, value, 'municipio')}
						value={location.municipio || null}
						options={listLocation.municipio}
						getOptionLabel={(option: any) => (option.municipio ? option.municipio : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='municipio' label='Municipio' variant='outlined' />
						)}
					/>
					<Autocomplete
						className={classes.inputC}
						onChange={(event, value) => handleSelectClient(event, value, 'parroquia')}
						value={location.parroquia || null}
						options={listLocation.parroquia}
						getOptionLabel={(option: any) => (option.parroquia ? option.parroquia : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='parroquia' label='Parroquia' variant='outlined' />
						)}
					/>
				</div>
				<div className={classes.input}>
					<TextField
						className={classes.inputC}
						variant='outlined'
						required
						id='standard-required'
						label='Sector'
						name='sector_client'
						onChange={handleChange}
						value={cursedForm.sector_client}
					/>
					<TextField
						className={classes.inputC}
						variant='outlined'
						required
						id='standard-required'
						label='Calle'
						name='calle_client'
						onChange={handleChange}
						value={cursedForm.calle_client}
					/>
				</div>
				<div className={classes.input}>
					<TextField
						className={classes.inputC}
						variant='outlined'
						required
						id='standard-required'
						label='Casa/Quinta/Apart'
						name='local_client'
						onChange={handleChange}
						value={cursedForm.local_client}
					/>
					<TextField
						className={classes.inputC}
						variant='outlined'
						required
						id='standard-required'
						label='Cod.
					Postal'
						name='codigo_postal_client'
						onChange={handleChange}
						value={cursedForm.codigo_postal_client}
					/>
				</div>
			</div>
			{/*
			<div className={classes.input}>
				<b
					className={classes.inputTextStep1}
				>
					Referencia Personal
				</b>
				<Button
					className={classes.imgStep1}
					variant="contained"
					component="label"
					disabled={fm.mashClient}
				>
					{imagesForm.rc_ref_perso !== null ?
							<>
								<IconButton aria-label="upload picture" component="span">
									<PhotoCamera />
								</IconButton>
								<p className="nameImg" >{namesImages.rc_ref_perso.slice(0, 10)}...</p>
							</>
						: 
							<>
								<b>Subir</b>
								<IconButton aria-label="upload picture" component="span">
									<PhotoCamera />
								</IconButton>
							</>
						}
					<input
						type="file"
						hidden
						name="rc_ref_perso"
						accept="image/png, image/jpeg, image/jpg"
						onChange={handleChangeImages}
					/>
				</Button>
			</div>
			*/}
		</>
	);
};
