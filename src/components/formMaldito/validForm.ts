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

export const validNameCommere = (value: string): boolean => {
	if (3 < value.length && value.length < 255) {
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
		/^[0-9]+$/.test(value) &&  //only number
		!/[^a-z0-9\x20]/i.test(value) &&
		value.length >= 9) {
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

export const validNum_post= (value: number):boolean => {
	if(value < 1) // || value  > numero de puntos disponibles en la BD
		return true;
	else
		return false
}

export const validNumBank = (value: string):boolean => {
	if(value.length !== 20)	
		return true;
	else
		return false
}


//Extras
export const sizeStep = (active: number): number => {
	switch (active) {
		case 0:
			return 15;
		case 1:
			return 20; 
		case 2:
			return 36; 
		case 3:
			return 46; 
		default:
			return 0;
	}
}

export const sizeImagesStep = (active: number): number => {
	switch (active) {
		case 0:
			return 1;
		case 1:
			return 4; 
		case 2:
			return 4; 
		case 3:
			return 6; //6 con rc_comp_dep
		default:
			return 0;
	}
}

export const allInputNotNUll = (last: number, form: any, mashClient: boolean, mashCommerce: boolean): boolean => {
	let indice = 0;
	for (const item of Object.entries(form)) {
		if (indice === last) {
			return false;
		}
		indice++;
		//No Check when item[0] === 'IdentType'
		if (typeof item[1] === 'string') {
			if(mashClient && indice < 16) {
				//no hago nada
			}else if(mashCommerce && 15 < indice && indice < 21){
				//no hago nada
			}else if(
				item[0] === 'reqSource_docnum' && 
				form.id_request_origin !== 1 &&
				form.id_request_origin !== 2 
			){
				//no hago nada
			}else if(form.pagadero && item[0] === 'nro_comp_dep'){
				//no hago nada
			} else{
				if (item[1].trim() === '') {
					return true;
				}
			}
		}else if (typeof item[1] === 'number' && item[0] !== 'special_contributor') {
			if(mashClient && indice < 15) {
				//no hago nada
			}else{
				if(item[1] === 0){
					return true;
				}
			}	
		}	
	}
	return false;
};

export const allImgNotNUll = (form: any, last: number, images: any, special_contributor: boolean, mashClient: boolean, mashCommerce: boolean, isActa: number): boolean => {
	let indice = 0;
	for (const item of Object.entries(images)) {
		if (indice === last) {
			return false;
		}
		indice++;
		if(item[0] === 'rc_special_contributor' && !special_contributor) {
			//Salto
		}else if (
			item[0] === 'rc_constitutive_act' && isActa !== 3 ){
			//nada
		}else{
			if(mashClient && indice < 2) {
				//No hago nada
			}
			else if (mashCommerce && 1 < indice && indice < 5) {
				//No hago nada
			}
			else if (form.pagadero && item[0] === 'rc_comp_dep') {
				//No hago nada
			}
			else {
				if(item[1] === null){
					return true;
				}
			}
		}
	}	
	return false;
}

export const checkErrorAllInput = (last: number, errors: any): boolean => {
	let indice = 0;
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
