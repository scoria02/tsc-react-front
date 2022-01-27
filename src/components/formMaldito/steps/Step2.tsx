//Material
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import React, { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
//sytles
import { useStylesFM } from '../styles';
import { FMContext } from '../../../context/FM/FMContext';
import { validInputString } from '../../../utils/fm';

export const Step2: FC = () => {
	const classes = useStylesFM();
	const fm: any = useSelector((state: RootState) => state.fm);

	const { fmClient, handleChangeClient, handleChangeNameClient, fmDataError, codePhone }: any =
		useContext(FMContext);

	const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value !== '0') {
			if (/^[0-9]+$/.test(event.target.value) || event.target.value === '') handleChangeClient(event);
		}
	};

	const handleIdentNum = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (/^[0-9]+$/.test(event.target.value) || event.target.value === '') {
			handleChangeClient(event);
		}
	};

	return (
		<>
			<div className={classes.input}>
				<TextField
					disabled={fm.mashClient}
					className={classNames(classes.inputText, classes.inputTextLeft)}
					variant='outlined'
					required
					id='standard-required'
					label='Nombre Completo'
					name='name_ref1'
					onChange={handleChangeNameClient}
					value={fmClient.name_ref1}
				/>
				<TextField
					disabled={fm.mashClient}
					className={classNames(classes.inputText, classes.inputTextLeft)}
					variant='outlined'
					required
					id='standard-required'
					label='Doc. de Identidad'
					placeholder='Ej: 12345678'
					name='doc_ident_ref1'
					onChange={handleIdentNum}
					value={fmClient.doc_ident_ref1}
					error={fmDataError.doc_ident_ref1}
					inputProps={{
						maxLength: fmClient.doc_ident_type_ref1 === 'P' ? 20 : 9,
					}}
					InputProps={{
						startAdornment: fm.mashClient ? null : (
							<InputAdornment position='start'>
								<Select
									onChange={handleChangeClient}
									name='doc_ident_type_ref1'
									value={fmClient.doc_ident_type_ref1}
									label='Tipo'>
									<MenuItem value='V'>V</MenuItem>
									<MenuItem value='J'>J</MenuItem>
									<MenuItem value='P'>P</MenuItem>
								</Select>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					className={classNames(classes.inputText, classes.inputTextLeft)}
					variant='outlined'
					required
					label='Telefono'
					name='phone_ref1'
					autoComplete='telefono'
					placeholder='Ej: 4121234567'
					onChange={handleChangePhone}
					error={fmDataError.phone_ref1}
					disabled={fm.mashClient}
					value={fmClient.phone_ref1}
					inputProps={{ maxLength: 10 }}
					InputProps={{
						startAdornment: fm.mashClient ? null : <InputAdornment position='start'>{codePhone}</InputAdornment>,
					}}
				/>
			</div>
			<div className={classes.input}>
				<TextField
					disabled={fm.mashClient}
					className={classNames(classes.inputText, classes.inputTextLeft)}
					variant='outlined'
					required
					id='standard-required'
					label='Nombre Completo'
					name='name_ref2'
					onChange={handleChangeNameClient}
					value={fmClient.name_ref2}
				/>
				<TextField
					disabled={fm.mashClient}
					className={classNames(classes.inputText, classes.inputTextLeft)}
					variant='outlined'
					required
					id='standard-required'
					label='Doc. de Identidad'
					placeholder='Ej: 87654321'
					name='doc_ident_ref2'
					onChange={handleIdentNum}
					value={fmClient.doc_ident_ref2}
					error={fmDataError.doc_ident_ref2}
					inputProps={{
						maxLength: fmClient.doc_ident_type_ref2 === 'P' ? 20 : 9,
					}}
					InputProps={{
						startAdornment: fm.mashClient ? null : (
							<InputAdornment position='start'>
								<Select
									onChange={handleChangeClient}
									name='doc_ident_type_ref2'
									value={fmClient.doc_ident_type_ref2}
									label='Tipo'>
									<MenuItem value='V'>V</MenuItem>
									<MenuItem value='J'>J</MenuItem>
									<MenuItem value='P'>P</MenuItem>
								</Select>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					className={classNames(classes.inputText, classes.inputTextLeft)}
					variant='outlined'
					required
					label='Telefono'
					name='phone_ref2'
					autoComplete='telefono'
					placeholder='Ej: 4121234567'
					onChange={handleChangePhone}
					error={fmDataError.phone_ref2}
					disabled={fm.mashClient}
					value={fmClient.phone_ref2}
					inputProps={{ maxLength: 10 }}
					InputProps={{
						startAdornment: fm.mashClient ? null : <InputAdornment position='start'>{codePhone}</InputAdornment>,
					}}
				/>
			</div>
		</>
	);
};
