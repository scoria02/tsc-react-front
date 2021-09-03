import React from "react"
import TextField from '@material-ui/core/TextField';

//Material
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

//Styles
import { useStylesModalUser } from '../../styles';

//Interfaces
import {
	Interface_RegisterUser,
	Interface_RegisterUserError,
} from '../../interfaceAuth';

interface Props {
	userForm: Interface_RegisterUser; //json
	userFormError: Interface_RegisterUserError; //json
	handleChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
}


export const Step2: React.FC<Props> = ({ userForm, userFormError, handleChange}) => {
	const classes = useStylesModalUser();

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
						//value={identType} 
						//onChange={handleSelect} 
						//onBlur={handleBlurIdent}
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
					name='ident_num'
					//onBlur={handleBlurIdent}
					className={classes.inputNro}
					value={userForm.ident_num}
					onChange={handleChange}
					label='Documento de identidad'
					variant='outlined'
					//error={userFormError.ident_num || checkErrorInput('ident', errorRegister)}
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
					<InputLabel id='demo-simple-select-outlined-label'>Compañía </InputLabel>
					<Select 
						//value={identType} 
						//onChange={handleSelect} 
						//onBlur={handleBlurIdent}
						name='company' 
						label='compania' 
						placeholder=''>
						<MenuItem value='1000Pagos'>1000Pagos</MenuItem>
						<MenuItem value='Trandred'>Trandred</MenuItem>
						<MenuItem value='Digo'>Digo</MenuItem>
					</Select>
				</FormControl>
			</div>
		</>
	)
}

