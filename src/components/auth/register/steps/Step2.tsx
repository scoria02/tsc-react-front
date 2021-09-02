import React from "react"
import TextField from '@material-ui/core/TextField';

export const Step2: React.FC<any> = () => {
	return (
		<>
			<TextField
				id='name'
				name='name'
				label='Name'
				variant='outlined'
				type='text'
				// value={'leomerida15@gmail.com'}
				//onChange={handleUsernameChange}
			/>
			<TextField
				id='lastName'
				name='lastName'
				label='Apellido'
				variant='outlined'
				type='text'
				// value={'Test123.'}
				//onChange={handlePasswordChange}
			/>
			<TextField
				id='password'
				name='password'
				label='Password'
				variant='outlined'
				type='password'
				// value={'Test123.'}
				//onChange={handlePasswordChange}
				/>
		</>
	)
}

