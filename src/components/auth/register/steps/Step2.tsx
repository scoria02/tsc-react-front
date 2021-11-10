import React from "react"
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {useDispatch, useSelector} from 'react-redux';

//Material
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

//Styles
import {useStylesModalUser} from '../../styles';

import {checkErrorInput} from '../validationForm';

//Redux
import {RootState} from '../../../../store/store';
import {validationIdentDoc} from '../../../../store/actions/auth';

//Interfaces
import {
	Interface_RegisterUser,
	Interface_RegisterUserError,
} from '../../interfaceAuth';

interface Props {
	userForm: Interface_RegisterUser; //json
	userFormError: Interface_RegisterUserError; //json
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSelect: (event: any) => void;
	codePhone: string;
	company: any;
	listIdentType: any[];
}


export const Step2: React.FC<Props> = ({
	userForm,
	userFormError,
	handleChange,
	handleSelect,
	codePhone,
	company,
	listIdentType,
}) => {
	const dispatch = useDispatch();
	const classes = useStylesModalUser();

	const validationIdent = (doc: {id_ident_type: number; ident_num: string}) => {
		dispatch(validationIdentDoc(doc));
	};

	//selector
	const auth: any = useSelector((state: RootState) => state.auth);


	//Handle
	const handleBlurIdent = () => {
		if (userForm.ident_num.trim() !== '') {
			validationIdent({
				id_ident_type: userForm.id_ident_type,
				ident_num: userForm.ident_num,
			});
		}
	};

	const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value !== '0') {
			handleChange(event);
		}
	}

	return (
		<>
			<div className={classes.input}>
				<TextField
					required
					className={classes.inputN}
					type='text'
					value={userForm.name}
					name='name'
					onChange={handleChange}
					style={{marginRight: '1%'}}
					id='name'
					label='Nombre'
					variant='outlined'
					error={userFormError.name}
				/>
				<TextField
					required
					type='text'
					className={classes.inputN}
					value={userForm.last_name}
					name='last_name'
					onChange={handleChange}
					style={{marginLeft: '1%'}}
					id='last_name'
					label='Apellido'
					variant='outlined'
					error={userFormError.last_name}
				/>
			</div>
			<div className={classes.input}>
				<FormControl style={{marginRight: '2%'}} variant='outlined' className={classes.formControl}>
					<InputLabel id='demo-simple-select-outlined-label'>Tipo</InputLabel>
					<Select
						value={userForm.id_ident_type}
						onChange={handleSelect}
						onBlur={handleBlurIdent}
						name='id_ident_type'
						label='Tipo'
						placeholder=''>
						{listIdentType.map((item: any) => (
							<MenuItem key={item.id} value={item.id}>
								{item.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					required
					type='text'
					onBlur={handleBlurIdent}
					name='ident_num'
					className={classes.inputNro}
					value={userForm.ident_num}
					onChange={handleChange}
					label='Documento de identidad'
					variant='outlined'
					inputProps={{
						maxLength: userForm.id_ident_type === 5 ? 20 : 9 
					}}
					error={userFormError.ident_num || checkErrorInput('ident', auth.error)}
				/>
			</div>
			<div className={classes.input}>
				<TextField
					required
					className={classes.inputPhone}
					variant='outlined'
					value={userForm.phone}
					label='Telefono'
					id='phone'
					type='text'
					name='phone'
					placeholder='Ej: 412*******'
					autoComplete="telefono1"
					onChange={handleChangePhone}
					error={userFormError.phone}
					inputProps={{ maxLength: 10 }}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								{codePhone}
							</InputAdornment>
						)
					}}
				/>
				<FormControl
					style={{marginLeft: '2%'}}
					className={classes.formControlCompany}
					variant='outlined'
				>
					<InputLabel id='demo-simple-select-outlined-label'>Compañía</InputLabel>
					<Select
						value={userForm.id_company}
						onChange={handleSelect}
						name='id_company'
						label='Company'>
						{company.map((item: any) => (
							<MenuItem key={item.id} value={item.id}>
								{item.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
		</>
	)
}

