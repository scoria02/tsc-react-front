import { Aci, Activity, TypeWallet } from '../../context/DataList/interface';
import { ImagesInt } from '../../context/FM/fmImages/interface';
import { LocationInt } from '../../context/FM/Location/interfaces';
import {
	fmClient,
	fmCommerce,
	fmError_ClientINT,
	fmError_CommerceINT,
	fmError_Interface,
	fmPos,
} from '../../interfaces/fm';

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

export const inputNotNull = (last: number, form: fmClient | fmCommerce | fmPos): boolean => {
	let index: number = 0;
	for (const item of Object.entries(form)) {
		if (index === last) {
			return false;
		}
		index++;
		if (typeof item[1] === 'string' && item[1].trim() === '') {
			return true;
		} else if (typeof item[1] === 'number' && item[1] === 0) {
			return true;
		}
	}
	return false;
};
export const inputFileNotNull = (last: number, form: ImagesInt): boolean => {
	let index: number = 0;
	for (const item of Object.entries(form)) {
		if (index === last) {
			return false;
		}
		index++;
		if (!item[1]) {
			return true;
		}
	}
	return false;
};

export const inputNotNullPos = (
	last: number,
	form: any,
	aci: Aci | null,
	typeWallet: TypeWallet | null
): boolean => {
	let index: number = 0;
	for (const item of Object.entries(form)) {
		if (index === last) {
			return false;
		}
		index++;
		//console.log(item[0], typeof item[1]);
		if (typeof item[1] === 'string') {
			if (item[0] === 'reqSource_docnum') {
				//console.log('llegue');
				if (form['request_origin']?.id === 1) {
					if (item[1] === '') return true;
				} else if (form['request_origin']?.id === 2) {
					//console.log('aci');
					if (!aci) return true;
				} else if (form['request_origin']?.id === 6) {
					if (!typeWallet) return true;
				}
			} else if (item[1].trim() === '') {
				if (item[0] === 'nro_comp_dep') {
					if (!form['pagadero'] && form['payment_method'].id !== 2) {
						return true;
					}
				} else {
					return true;
				}
			}
		} else if (typeof item[1] === 'number' && item[1] === 0) {
			return true;
		} else if (typeof item[1] === 'object' && !item[1]) {
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

const imagesCommerceForTS = (
	typeS: number,
	imagesForm: ImagesInt,
	imagesActa: FileList | [],
	commerce: fmCommerce
): boolean => {
	switch (typeS) {
		case 1:
			return imagesForm.rc_rif ? false : true;
		case 2:
			if (commerce.special_contributor) {
				if (imagesForm.rc_special_contributor) return false;
				else return true;
			}
			return imagesForm.rc_rif && imagesActa.length ? false : true;
		case 3:
			if (imagesForm.rc_rif) {
				if (commerce.id_ident_type === 3) {
					if (imagesActa.length) return false;
					return true;
				} else return false;
			} else {
				return true;
			}
		default:
			return false;
	}
};

const imagesForPos = (imagesForm: ImagesInt, pos: fmPos) => {
	if (!imagesForm.rc_ref_bank) {
		return true;
	} else if (!pos.pagadero && pos.payment_method?.id !== 2 && !imagesForm.rc_comp_dep) return true;
	else return false;
};

const checkInputForExtraPos = (client: fmClient, commerce: fmCommerce) => {
	if (!client.id_ident_type || client.ident_num === '' || !commerce.id_ident_type || commerce.ident_num === '')
		return true;
	return false;
};

const checkInputForExtraPosDataPos = (
	form: fmPos,
	min: number,
	last: number,
	aci: Aci | null,
	typeWallet: TypeWallet | null
) => {
	//console.log(form);
	let index: number = 0;
	for (const item of Object.entries(form)) {
		if (index === last) {
			//console.log('index', index);
			return false;
		} else if (index >= min) {
			if (typeof item[1] === 'string') {
				if (item[0] === 'reqSource_docnum') {
					//console.log('llegue');
					if (form['request_origin']?.id === 1) {
						if (item[1] === '') return true;
					} else if (form['request_origin']?.id === 2) {
						//console.log('aci');
						if (!aci) return true;
					} else if (form['request_origin']?.id === 6) {
						if (!typeWallet) return true;
					}
				} else if (item[1].trim() === '') {
					if (item[0] === 'nro_comp_dep') {
						if (!form['pagadero'] && form['payment_method']?.id !== 2) {
							return true;
						}
					} else {
						return true;
					}
				}
			} else if (typeof item[1] === 'number' && item[1] === 0) {
				return true;
			} else if (typeof item[1] === 'object' && !item[1]) {
				return true;
			}
		}
		index++;
	}
	return false;
};

const checkErrorExtraPosInput = (errorsClient: fmError_ClientINT, errorsCommerce: fmError_CommerceINT) => {
	if (
		errorsClient.id_ident_type ||
		errorsClient.ident_num ||
		errorsCommerce.id_ident_type ||
		errorsCommerce.ident_num
	)
		return true;
	return false;
};

export const validReadyStep = (
	typeSolict: number,
	activeStep: number,
	errorsFm: fmError_Interface,
	errorsClient: fmError_ClientINT,
	errorsCommerce: fmError_CommerceINT,
	client: fmClient,
	commerce: fmCommerce,
	pos: fmPos,
	aci: Aci | null,
	typeWallet: TypeWallet | null,
	activity: Activity | null,
	locationClient: LocationInt,
	locationCommerce: LocationInt,
	locationPos: LocationInt,
	imagesForm: ImagesInt,
	imagesActa: FileList | [],
	errorClient: boolean,
	errorCommerce: boolean,
	errorNumBank: boolean
): boolean => {
	switch (activeStep) {
		case 0: //Tipo de Solicitud
			return true;
		case 1: //Cliente
		case 2:
			//console.log(errorClient);
			if (errorClient) return false;
			if (typeSolict === 4) {
				if (activeStep === 1) {
					if (!checkInputForExtraPos(client, commerce) && !checkErrorExtraPosInput(errorsClient, errorsCommerce))
						return true;
					else return false;
				} else if (activeStep === 2) {
					if (!checkInputForExtraPosDataPos(pos, 3, 3 + 12, aci, typeWallet) && !imagesForPos(imagesForm, pos))
						return true;
					else return false;
				}
			} else if (
				!checkErrorAllInput(sizeStepError(activeStep), errorsClient) &&
				!inputNotNullLocation(locationClient) &&
				!inputNotNull(sizeStep(activeStep), client) &&
				!inputFileNotNull(1, imagesForm)
			) {
				return true;
			}
			return false;
		case 3: //Comercio
			if (errorCommerce) return false;
			if (
				!inputNotNull(sizeStep(activeStep), commerce) &&
				!imagesCommerceForTS(typeSolict, imagesForm, imagesActa, commerce) &&
				activity
			)
				return true;
			return false;
		case 4: //Locations Comercio y Pos
			if (
				!inputNotNull(13, commerce) &&
				!inputNotNull(3, pos) &&
				!inputNotNullLocation(locationCommerce) &&
				!inputNotNullLocation(locationPos)
			)
				return true;
			return false;
		case 5: //FM Pos
			if (errorNumBank) return false;
			if (
				!inputNotNullPos(3 + 9, pos, aci, typeWallet) &&
				!imagesForPos(imagesForm, pos) &&
				!checkErrorAllInput(sizeStepError(activeStep), errorsFm)
			)
				return true;
			return false;
		default:
			return false;
	}
};
