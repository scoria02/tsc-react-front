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
	//Commerce
	listLocation,
	setListCommerce,
	location,
	setLocation,
	//Pos
	listLocationPos,
	setListPos,
	locationPos,
	setLocationPos,

	cursedForm,
	handleChange,
	handleUpdateLocation,
}) => {
	const classes = useStylesFM();

	const fm: any = useSelector((state: RootState) => state.fm);

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
						onChange={(event, value) => 
							handleUpdateLocation(
								'estado',
								'',
								value, 
								listLocation,
								setListCommerce,
								location,
								setLocation,
							)
						}
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
						onChange={(event, value) => 
							handleUpdateLocation(
								'municipio',
								'',
								value, 
								listLocation,
								setListCommerce,
								location,
								setLocation,
							)
						}
						value={location.municipio || null}
						disabled={fm.mashCommerce}
						options={listLocation.municipio}
						getOptionLabel={(option: any) => (option.municipio ? option.municipio : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='municipio' label='Municipio' variant='outlined' inputProps={{ ...params.inputProps, autoComplete: 'municipio', }}/>
						)}
					/>
				</div>
				<div className={classnames(classes.row, classes.input)}>
					<Autocomplete
						onChange={(event, value) => 
							handleUpdateLocation(
								'ciudad',
								'',
								value, 
								listLocation,
								setListCommerce,
								location,
								setLocation,
							)
						}
						className={classes.inputTextLeft}
						value={location.ciudad || null}
						disabled={fm.mashCommerce}
						options={listLocation.ciudad}
						getOptionLabel={(option: any) => (option.ciudad ? option.ciudad : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='ciudad' label='Ciudad' variant='outlined' inputProps={{ ...params.inputProps, autoComplete: 'ciudad', }}/>
						)}
					/>
					<Autocomplete
						className={classes.inputText}
						onChange={(event, value) => 
							handleUpdateLocation(
								'parroquia',
								'',
								value, 
								listLocation,
								setListCommerce,
								location,
								setLocation,
							)
						}
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
						name='codigo_postal'
						value={cursedForm.codigo_postal}
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
						onChange={(event, value) => 
							handleUpdateLocation(
								'estado',
								'_pos',
								value, 
								listLocationPos,
								setListPos,
								locationPos,
								setLocationPos,
							)
						}
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
						onChange={(event, value) => 
							handleUpdateLocation(
								'municipio',
								'_pos',
								value, 
								listLocationPos,
								setListPos,
								locationPos,
								setLocationPos,
							)
						}
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
						onChange={(event, value) => 
							handleUpdateLocation(
								'ciudad',
								'_pos',
								value, 
								listLocationPos,
								setListPos,
								locationPos,
								setLocationPos,
							)
						}
						options={listLocationPos.ciudad}
						value={locationPos.ciudad || null}
						getOptionLabel={(option: any) => (option.ciudad ? option.ciudad : '')}
						renderInput={(params: any) => (
							<TextField {...params} name='ciudad' label='Ciudad' variant='outlined' inputProps={{ ...params.inputProps, autoComplete: 'ciudad', }}/>
						)}
					/>
					<Autocomplete
						className={classes.inputText}
						onChange={(event, value) => 
							handleUpdateLocation(
								'parroquia',
								'_pos',
								value, 
								listLocationPos,
								setListPos,
								locationPos,
								setLocationPos,
							)
						}
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
						value={cursedForm.codigo_postal_pos}
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
