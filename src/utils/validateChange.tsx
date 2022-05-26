export const handleChangeNameCommerce = (event: React.ChangeEvent<HTMLInputElement>, callBack: any) => {
	if (/^[a-z0-9 ]+$/i.test(event.target.value) || event.target.value === '') {
		callBack(event);
	}
};

export const handleIdentNum = (event: React.ChangeEvent<HTMLInputElement>, callBack: any) => {
	if (/^[0-9]+$/.test(event.target.value) || event.target.value === '') {
		callBack(event);
	}
};
