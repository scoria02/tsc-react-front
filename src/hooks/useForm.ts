import { ChangeEvent, useState } from 'react';

export const useForm = (initialState = {}) => {
	const [values, setValues] = useState(initialState);

	const reset = (newFormState = initialState) => {
		setValues(newFormState);
	};

	const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		console.log(target);
		setValues({
			...values,
			[target.name]: target.value,
		});
	};

	return [values, handleInputChange, reset];
};
