import { Activity } from '../../context/DataList/interface';
import { LocationInt } from '../../context/Location/interfaces';
import { fmClient, fmCommerce, fmError_Interface, fmPos } from '../../interfaces/fm';

export const validEmail = (value: string): boolean => {
	let validatedEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);
	if (!validatedEmail) {
		return true;
	} else {
		return false;
	}
};

export const validFullName = (value: string): boolean => {
	if (value.trim() !== '' && !/[^a-z0-9\x20]/i.test(value) && !/\d/.test(value)) {
		return false;
	}
	return true;
};

export const validNameCommere = (value: string): boolean => {
	if (3 < value.length && value.length < 255) {
		return false;
	}
	return true;
};

export const rangeTypeIdent = (value: string, min: number, max: number): boolean => {
	if (value.length >= min && value.length <= max) return true;
	else return false;
};

export const validIdentNum = (value: string, op: number): boolean => {
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
};

export const validPhone = (value: string): boolean => {
	if (
		value.trim() !== '' &&
		/^[0-9]+$/.test(value) && //only number
		!/[^a-z0-9\x20]/i.test(value) &&
		value.length >= 9
	) {
		if (/^((4(1|2)4|4(1|2)6|412))([0-9]{7})$|^(2)(([0-9]){9})$/.test(value)) return false;
		else return true;
	}
	return true;
};

export const validPhone2 = (value: string, value2: string): boolean => {
	if (!validPhone(value)) {
		if (value === value2) return true;
		else return false;
	}
	return true;
};

export const validIdentRef = (value: string, value2: string): boolean => {
	if (value.length >= 9) {
		if (value === value2) return true;
		else return false;
	} else {
		return true;
	}
};

export const validNum_post = (value: number): boolean => {
	if (value < 1)
		// || value  > numero de puntos disponibles en la BD
		return true;
	else return false;
};

export const validNumBank = (value: string): boolean => {
	if (value.length !== 20) return true;
	else return false;
};

const step1 = 10;
const step2 = 8;
const step3 = 5;
const step4 = 8;
const step5 = 10;

//Extras
export const sizeStep = (active: number): number => {
	switch (active) {
		case 0:
			return 0;
		case 1:
			return step1;
		case 2:
			return step1 + step2;
		//Commerce
		case 3:
			return step3;
		case 4:
			return step4;
		case 5:
			return step5;
		default:
			return 0;
	}
};

export const sizeStepError = (active: number): number => {
	switch (active) {
		case 0:
			return 0;
		case 1:
			return step1;
		case 2:
			return step1 + step2;
		//Commerce
		case 3:
			return step1 + step2 + step3;
		case 4:
			return step1 + step2 + step3 + step4;
		case 5:
			return step1 + step2 + step3 + step4 + step5;
		default:
			return 0;
	}
};

export const inputNotNull = (last: number, form: any): boolean => {
	let index: number = 0;
	for (const item of Object.entries(form)) {
		if (index === last) {
			return false;
		}
		console.log(item);
		index++;
		if (typeof item[1] === 'string' && item[1].trim() === '') {
			return true;
		} else if (typeof item[1] === 'number' && item[1] === 0) {
			return true;
		}
	}
	return false;
};

export const inputNotNullPos = (last: number, form: any): boolean => {
	let index: number = 0;
	for (const item of Object.entries(form)) {
		if (index === last) {
			return false;
		}
		index++;
		if (typeof item[1] === 'string' && item[1].trim() === '') {
			if (item[0] === 'reqSource_docnum') {
				if (form['type_pay']?.id === 2) {
					return true;
				}
			} else if (item[0] === 'nro_comp_dep') {
				if (!form['pagadero']) {
					return true;
				}
			} else {
				return true;
			}
		} else if (typeof item[1] === 'number' && item[1] === 0) {
			return true;
		}
	}
	return false;
};

const step1Imagen = 1;
const step2Imagen = 0;
const step3Imagen = 2; //2 images and 1 file
const step4Imagen = 0;
const step5Imagen = 2;

export const sizeImagesStep = (active: number): number => {
	switch (active) {
		case 0:
			return step1Imagen;
		case 1:
			return step1Imagen + step2Imagen;
		case 2:
			return step1Imagen + step2Imagen + step3Imagen;
		case 3:
			return step1Imagen + step2Imagen + step3Imagen + step4Imagen; //6 con rc_comp_dep
		case 4:
			return step1Imagen + step2Imagen + step3Imagen + step4Imagen + step5Imagen;
		default:
			return 0;
	}
};

export const allImgNotNUll = (
	form: any,
	last: number,
	images: any,
	special_contributor: boolean,
	mashClient: boolean,
	mashCommerce: boolean,
	isActa: number
): boolean => {
	let indice = 0;
	for (const item of Object.entries(images)) {
		if (indice === last) {
			return false;
		}
		indice++;
		if (item[0] === 'rc_special_contributor' && !special_contributor) {
			//Salto
		} else if (item[0] === 'rc_constitutive_act' && isActa !== 3) {
			//nada
		} else {
			if (mashClient && indice < 2) {
				//No hago nada
			} else if (mashCommerce && 1 < indice && indice < 5) {
				//No hago nada
			} else if ((form.pagadero || form.id_payment_method === 2) && item[0] === 'rc_comp_dep') {
				//No hago nada
			} else {
				if (item[1] === null) {
					return true;
				}
			}
		}
	}
	return false;
};

export const checkErrorAllInput = (last: number, errors: any): boolean => {
	let indice = 0;
	for (const item of Object.entries(errors)) {
		if (indice === last) {
			return false;
		}
		indice++;
		if (item[1]) {
			return true;
		}
	}
	return false;
};

export const inputNotNullLocation = (location: LocationInt): boolean => {
	for (const item of Object.entries(location)) {
		if (!item[1]) return true;
	}
	return false;
};

export const validEndPoint = (activeStep: number, fm: any): boolean => {
	if (fm.errorClient) {
		return true;
	} else if (activeStep > 1 && fm.errorCommerce) {
		return true;
	} else if (activeStep > 3 && fm.errorNumBank) {
		return true;
	} else {
		return false;
	}
};

export const notNullImagenActa = (activeStep: number, imagesActa: any, isActa: number, mashCommerce: boolean) => {
	if (activeStep >= 2 && isActa === 3 && imagesActa.length === 0 && !mashCommerce) return true;
	else return false;
};

export const daysToString = (value: any) => {
	let text: string = '';
	for (const item of Object.entries(value)) {
		if (item[1]) {
			text = text + (text.length ? '/' : '') + item[0].slice(0, 3);
		}
	}
	return text;
};

export const validMashes = (activeStep: number, mashClient: boolean, mashCommerce: boolean): boolean => {
	if (activeStep >= 1 && mashClient) {
		console.log('cliente no validado aun');
		return true;
	} else if (activeStep >= 3 && mashCommerce) {
		console.log('commercio no validado');
		return true;
	} else {
		console.log('cliente y comercio validado');
		return false;
	}
};

export const validReadyStep = (
	activeStep: number,
	errorsFm: fmError_Interface,
	client: fmClient,
	commerce: fmCommerce,
	pos: fmPos,
	activity: Activity | null,
	locationClient: LocationInt,
	locationCommerce: LocationInt,
	locationPos: LocationInt
): boolean => {
	switch (activeStep) {
		case 0:
			return true;
		case 1:
		case 2:
			if (
				!checkErrorAllInput(sizeStepError(activeStep), errorsFm) &&
				!inputNotNullLocation(locationClient) &&
				!inputNotNull(sizeStep(activeStep), client)
			)
				return true;
			return false;
		case 3:
			if (!inputNotNull(sizeStep(activeStep), commerce) && activity) return true;
			return false;
		case 4:
			if (
				!inputNotNull(13, commerce) &&
				!inputNotNull(3, pos) &&
				!inputNotNullLocation(locationCommerce) &&
				!inputNotNullLocation(locationPos)
			)
				return true;
			return false;
		case 5:
			if (!inputNotNullPos(3 + 12, pos)) return true;
			return false;
		default:
			return false;
	}
};
