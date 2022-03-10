import { fmCommerce, fmError_CommerceINT } from 'interfaces/fm';
import { daysWork } from './states';

/*
export const initFmCommerce: fmCommerce = {
	//step3 Comercio
	id_ident_type: 1,
	ident_num: '222222222',
	name: '',
	special_contributor: false,
	days: daysWork,
	//Step4 Location
	//Commerce
	sector: '',
	calle: '',
	local: '',
};
*/

export const initFmCommerce: fmCommerce = {
	//step3 Comercio
	id_ident_type: 1,
	ident_num: '',
	name: '',
	special_contributor: false,
	days: daysWork,
	//Step4 Location
	//Commerce
	sector: '',
	calle: '',
	local: '',
};

export const fmErrorCommerce: fmError_CommerceINT = {
	//step3 Comercio
	id_ident_type: false,
	ident_num: false,
	name: false,
	id_activity: false,
	special_contributor: false,
	//Step4 Location
	//Commerce
	sector: false,
	calle: false,
	local: false,
};
