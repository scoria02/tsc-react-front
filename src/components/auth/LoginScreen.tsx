import React from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
// import { startLoginEmailPassword } from '../../store/actions/auth';

export const LoginScreen = () => {
	// const dispatch = useDispatch();
	// const { loading } = useSelector((state) => state.ui);

	const [formValues, handleInputChange] = useForm({
		email: 'amendoza@tranred.com',
		password: '123456',
	});

	const { email, password }: any = formValues;

	const handleLogin = (e: any): void => {
		e.preventDefault();
		console.log(email, password);
		// dispatch(startLoginEmailPassword(email, password));
	};

	return (
		<>
			<h3 className='auth__title'>Login</h3>

			<form onSubmit={handleLogin} className='animate__animated animate__fadeIn animate__faster'>
				<input
					type='text'
					placeholder='Email'
					name='email'
					className='auth__input'
					autoComplete='off'
					value={email}
					onChange={() => handleInputChange}
				/>

				<input
					type='password'
					placeholder='Password'
					name='password'
					className='auth__input'
					value={password}
					onChange={() => handleInputChange}
				/>

				<button type='submit' className='btn btn-primary btn-block'>
					Login
				</button>

				<div className='auth__social-networks'>
					<p>Login with social networks</p>
				</div>

				<Link to='/auth/register' className='link'>
					Create new account
				</Link>
			</form>
		</>
	);
};
