export const validEmail = (value: string): boolean => {
	let validatedEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);
	if (!validatedEmail) {
		return true;
	} else {
		return false;
	}
}

export const validSamePass = (password: string, password2: string): boolean => {
	if (password === password2) {
		return true;
	}
	return false;
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


//Error for EndPoint
export const checkErrorInput = (name:string, array: any):boolean =>{
	const names: string[] = array.map((e:any)=>e.name);
	if(names.includes(name))return true;
	else return false;
}

export const checkErrorAllInput = (active: number, errors: any): boolean => {
	let indice = 0;
	let last = active === 0 ? 2 : 9;
	for (const item of Object.entries(errors)) {
		if (indice > last) {
			return false;
		}
		indice++;
		if (item[1]) {
			return true;
		}
	}
	return false;
}

export const checkErrorInputEndPoint = (errorEndPoint: any): boolean => {
	if(errorEndPoint.length > 0){
		return true;
	}
	return false;
}

export const phoneNotNull = (value: string): boolean => {
	if(value.length > 0){
		return false
	}else
		return true;
};

export const allInputNotNUll = (active: number, user: any): boolean => {
	let indice = 0;
	let last = active === 0 ? 2 : 8;
	for (const item of Object.entries(user)) {
		if (indice > last) {
			return false;
		}
		indice++;
		//No Check when item[0] === 'IdentType'
		if (typeof item[1] === 'string') {
			if((item[0] === 'phone')){
				if(phoneNotNull(item[1])){
					return true;
				}
			}else{
				if (item[1].trim() === '') {
					return true;
				}
			}
		}
	}
	return false;
};

