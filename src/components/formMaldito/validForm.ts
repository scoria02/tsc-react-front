export const validEmail = (value: string): boolean => {
	let validatedEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);
	if (!validatedEmail) {
		return true;
	} else {
		return false;
	}
}

export const validFullName = (value: string): boolean => {
	if (value.trim() !== '' && !/[^a-z0-9\x20]/i.test(value) && !/\d/.test(value)) {
		return false;
	}
	return true;
}

export  const rangeTypeIdent = (value: string, min: number, max: number): boolean => {
	if (value.length >= min && value.length <= max) return true;
	else return false;
};

export const validIdentNum = (value: string, op: number):boolean => {
	if (value.trim() !== '' && /^[0-9]+$/.test(value) && !/[^a-z0-9\x20]/i.test(value)) {
		switch (op) {
			case 1: //V*
				return !rangeTypeIdent(value, 7, 9);
			case 2: //E*
				return !rangeTypeIdent(value, 7, 11);
			case 3: //J*
				return !rangeTypeIdent(value, 8, 11);
			case 4: //R*
				return !rangeTypeIdent(value, 7, 11);
			case 5: //P*
				return !rangeTypeIdent(value, 7, 11);
			default:
				return true;
		}
	}
	return true;
}


export const validPhone = (value: string):boolean => {
	if (value.trim() !== '' && 
		/^[0-9]+$/.test(value) && 
		!/[^a-z0-9\x20]/i.test(value) &&
		value.length >= 10) {
			if(/^((4(1|2)4|4(1|2)6|412))([0-9]{7})$|^(2)(([0-9]){9})$/.test(value))
				return false;
			else
				return true;
		}
		return true;
}

export const validPhone2 = (value: string, value2: string):boolean => {
	if(!validPhone(value)){
		if(value === value2)
			return true;
		else
			return false
	}
	return true;
}

export const lastItem = (active:number):number=> {
	switch (active) {
		case 0:
			return 3
		default:
			return 0;
	}
}

export const allInputNotNUll = (last: number, form: any): boolean => {
	let indice = 0;
	for (const item of Object.entries(form)) {
		if (indice > last) {
			return false;
		}
		indice++;
		//No Check when item[0] === 'IdentType'
		if (typeof item[1] === 'string') {
			if (item[1].trim() === '') {
				return true;
			}
		}
	}
	return false;
};

export const checkErrorAllInput = (last: number, errors: any): boolean => {
	let indice = 0;
	for (const item of Object.entries(errors)) {
		if (indice > last) {
			return false;
		}
		indice++;
		if (item[1]) {
			console.log(item[1])
			return true;
		}
	}
	return false;
}



export const phoneNotNull = (value: string): boolean => {
	if(value.slice(0,3) === '+58' && value.slice(3).length > 0){
		return false
	}else
		return true;
};
export const sizeStep = (active: number): number => {
	switch (active) {
		case 0:
			return 7;
		case 1:
			return 11;
		default:
			return 0;
	}
}
