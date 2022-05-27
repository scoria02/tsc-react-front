/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, TextField } from '@mui/material';
import useAxios from 'config/index';
import React, { FC, useState } from 'react';
import AuthModal from '../AuthModal';
import { styledMui, useStylesModalUser } from '../styles';

const NewPassword: FC = () => {
	const classes = useStylesModalUser();
	const [email, setEmail] = useState<string>('');
	const [message, setMessage] = useState<string>();

	const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
	};
	const handleNewPass = async (e: any) => {
		e.preventDefault();

		await useAxios
			.post(`/auth/newpass/`, {
				email,
			})
			.then((resp) => setMessage(resp.data.info));
		// setMessage(resp)

		// history.push(baseUrl);
	};

	return (
		<AuthModal register={false} name='Olvide Contraseña'>
			<form onSubmit={handleNewPass} autoComplete='off'>
				<div className={classes.containerNewPass}>
					<TextField
						sx={styledMui.inputStyle}
						className={classes.input}
						id='email'
						name='email'
						label='Ingrese el correo de su cuenta'
						variant='outlined'
						type='email'
						onChange={handleUsernameChange}
					/>
					<b style={{ marginTop: '4px' }}>{message}</b>
					<div className={classes.inputButton}>
						<Button
							className={classes.buttonLogin}
							onClick={handleNewPass}
							// type='submit'
							variant='contained'>
							Restablecer
						</Button>
					</div>
				</div>
			</form>
		</AuthModal>
	);
};

export default NewPassword;
