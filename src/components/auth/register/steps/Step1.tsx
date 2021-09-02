import React from "react"
import TextField from '@material-ui/core/TextField';

export const Step1: React.FC<any> = () => {
	return (
		<>
			<TextField
				id='email'
				name='email'
				label='Email'
				variant='outlined'
				type='email'
				// value={'leomerida15@gmail.com'}
				//onChange={handleUsernameChange}
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

