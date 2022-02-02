import { fmCommerce } from '../../../interfaces/fm';
import { daysWork } from './states';

export const initFmCommerce: fmCommerce = {
	//step3 Comercio
	id_ident_type: 3,
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
