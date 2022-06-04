import { StateFMInt } from '../store/reducers/admision/fmReducer';

export const stepError = (key: number, fm: StateFMInt) => {
	if (key === 1 && fm.errorClient) {
		//Cliente
		return true;
	} else if (key === 3 && fm.errorCommerce) {
		//comercio
		return true;
	} else if (key === 5 && fm.errorNumBank) {
		//comercio
		return true;
	}
	return false;
};

export const validInputString = (event: React.ChangeEvent<HTMLInputElement>): boolean => {
	if ((event.target.value.trim() !== '' && /^[a-zA-Z ]+$/.test(event.target.value)) || event.target.value === '') {
		return true;
	}
	return false;
};
