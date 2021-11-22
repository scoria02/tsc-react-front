//Materail
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import classnames from 'classnames';
import React from 'react';
import { useStylesFM } from '../styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export const Step4: React.FC<any> = ({
	setAutoCompleteCommerce,
	setAutoCompletePos,
	listLocation,
	location,
	listLocationPos,
	locationPos,
	cursedForm,
	setCursedForm,
	handleChange,
	handleUpdateLocationCommerce,
	handleUpdateLocationPos,
}) => {
	const classes = useStylesFM();

	const fm: any = useSelector((state: RootState) => state.fm);

	const handleSelectPos = (event: any, value: any, item: string) => {
		if (value) {
			setCursedForm({
				...cursedForm,
				[`id_${item}_pos`]: value.id,
			});
		} else {
			setCursedForm({
				...cursedForm,
				[`id_${item}_pos`]: 0,
			});
		}
		handleUpdateLocationPos(item, value);
	};

	const handleSelect = (event: any, value: any, item: string) => {
		if (value) {
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: value.id,
			});
		} else {
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: 0,
			});
		}
		handleUpdateLocationCommerce(item, value);
	};

	const handleChangeCommerce = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAutoCompleteCommerce(false);
		handleChange(event);
	};

	const handleChangePos = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAutoCompletePos(false);
		handleChange(event);
	};

	return (
		<div className='container-location'>
			<div>
				<h2>Dirección Fiscal</h2>
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						className={classes.inputTextLeft}
						onChange={(event, value) => {
							handleSelect(event, value, 'estado');
						}}
						value={location.estado || null}
						disabled={fm.mashCommerce}
						options={listLocation.estado}
						getOptionLabel={(option: any) => (option.estado ? option.estado : '')}
						getOptionSelected={(option: any, value: any) => option.id === value.id}
						renderInput={(params: any) => (
							<TextField {...params} name='estado' label='Estado' inputProps={{ ...params.inputProps, autoComplete: 'estado', }} variant='outlined' />
						)}
					/>
					<Autocomplete
						className={classes.inputText}
						onChange={(event, value) => handleSelect(event, value, 'ciudad')}
						value={location.ciudad || null}
						disabled={fm.mashCommerce}
						options={listLocation.ciudad}
						getOptionLabel={(option: any) => (option.ciudad ? option.ciudad : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='ciudad' label='Ciudad' variant='outlined' inputProps={{ ...params.inputProps, autoComplete: 'ciudad', }}/>
						)}
					/>
				</div>
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						className={classes.inputTextLeft}
						onChange={(event, value) => handleSelect(event, value, 'municipio')}
						value={location.municipio || null}
						disabled={fm.mashCommerce}
						options={listLocation.municipio}
						getOptionLabel={(option: any) => (option.municipio ? option.municipio : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='municipio' label='Municipio' variant='outlined' inputProps={{ ...params.inputProps, autoComplete: 'municipio', }}/>
						)}
					/>
					<Autocomplete
						className={classes.inputText}
						onChange={(event, value) => handleSelect(event, value, 'parroquia')}
						value={location.parroquia || null}
						disabled={fm.mashCommerce}
						options={listLocation.parroquia}
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
						disabled={fm.mashCommerce}
						name='codigo_postal'
						onChange={handleChangeCommerce}
						value={cursedForm.codigo_postal}
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
						value={cursedForm.sector}
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
						value={cursedForm.calle}
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
						value={cursedForm.local}
					/>
				</div>
			</div>
			<div>
				<h2>Dirección POS</h2>
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						className={classes.inputTextLeft}
						onChange={(event, value) => {
							handleSelectPos(event, value, 'estado');
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
						onChange={(event, value) => handleSelectPos(event, value, 'ciudad')}
						options={listLocationPos.ciudad}
						value={locationPos.ciudad || null}
						getOptionLabel={(option: any) => (option.ciudad ? option.ciudad : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='ciudad' label='Ciudad' variant='outlined' inputProps={{ ...params.inputProps, autoComplete: 'ciudad', }}/>
						)}
					/>
				</div>
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						className={classes.inputTextLeft}
						onChange={(event, value) => handleSelectPos(event, value, 'municipio')}
						value={locationPos.municipio || null}
						options={listLocationPos.municipio}
						getOptionLabel={(option: any) => (option.municipio ? option.municipio : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='municipio' label='Municipio' variant='outlined' inputProps={{ ...params.inputProps, autoComplete: 'municipio', }}/>
						)}
					/>
					<Autocomplete
						className={classes.inputText}
						onChange={(event, value) => handleSelectPos(event, value, 'parroquia')}
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
						onChange={handleChangePos}
						value={cursedForm.codigo_postal_pos}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Sector'
						name='sector_pos'
						onChange={handleChangePos}
						value={cursedForm.sector_pos}
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
						value={cursedForm.calle_pos}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Local'
						name='local_pos'
						onChange={handleChangePos}
						value={cursedForm.local_pos}
					/>
				</div>
			</div>
		</div>
	);
};
