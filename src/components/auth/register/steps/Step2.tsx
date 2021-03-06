import React from "react"
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';

//Material
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

//Styles
import { useStylesModalUser } from '../../styles';

import { checkErrorInput } from '../validationForm';

//Redux
import { RootState }  from '../../../../store/store';
import { validationIdentDoc } from '../../../../store/actions/auth';


//Interfaces
import {
	Interface_RegisterUser,
	Interface_RegisterUserError,
} from '../../interfaceAuth';

interface Props {
	userForm: Interface_RegisterUser; //json
	userFormError: Interface_RegisterUserError; //json
	handleChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
	handleSelect: (event: any) => void;
}


export const Step2: React.FC<Props> = ({ userForm, userFormError, handleChange, handleSelect}) => {
	const dispatch = useDispatch();
	const classes = useStylesModalUser();

	const validationIdent = (doc: { id_ident_type: number; ident_num: string }) => {
		dispatch(validationIdentDoc(doc));
	};

	//selector
	const auth : any = useSelector((state: RootState) => state.auth);

	//Handle
	const handleBlurIdent = () => {
		if (userForm.ident_num.trim() !== '') {
			validationIdent({
				id_ident_type: userForm.id_ident_type,
				ident_num: userForm.ident_num,
			});
		}
	};

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
					style={{ marginRight: '1%' }}
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
					style={{ marginLeft: '1%' }}
					id='last_name'
					label='Apellido'
					variant='outlined'
					error={userFormError.last_name}
				/>
			</div>
			<div className={classes.input}>
				<FormControl style={{ marginRight: '2%' }} variant='outlined' className={classes.formControl}>
					<InputLabel id='demo-simple-select-outlined-label'>Tipo</InputLabel>
					<Select 
						value={userForm.id_ident_type} 
						onChange={handleSelect} 
						onBlur={handleBlurIdent}
						name='id_ident_type' 
						label='Tipo' 
						placeholder=''>
						<MenuItem value='1'>V</MenuItem>
						<MenuItem value='2'>E</MenuItem>
						<MenuItem value='3'>J</MenuItem>
						<MenuItem value='4'>R</MenuItem>
						<MenuItem value='5'>P</MenuItem>
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
					error={userFormError.ident_num || checkErrorInput('ident', auth.error)}
				/>
			</div>
			<div className={classes.input}>
				<TextField
					name='phone'
					type='text'
					className={classes.inputPhone}
					value={userForm.phone}
					onChange={handleChange}
					id='phone'
					placeholder='Ej: 4121234567'
					label='Telefono'
					variant='outlined'
					error={userFormError.phone}
					required
				/>
				<FormControl 
					style={{ marginLeft: '2%' }} 
					className={classes.formControlCompany}
					variant='outlined' 
				>
					<InputLabel id='demo-simple-select-outlined-label'>Compa????a</InputLabel>
					<Select 
						value={userForm.company}
						onChange={handleSelect} 
						name='company' 
						label='Company'>
						<MenuItem value='1000Pagos'>1000Pagos</MenuItem>
						<MenuItem value='Trandred'>Trandred</MenuItem>
						<MenuItem value='Digo'>Digo</MenuItem>
					</Select>
				</FormControl>
			</div>
		</>
	)
}

