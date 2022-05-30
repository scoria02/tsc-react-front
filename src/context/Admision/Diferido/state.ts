import { ImagesInt, PathImagesInt } from 'context/Admision/CreationFM/fmImages/interface';
import { fmErrorDif_ClientINT } from './interfaces/client_interface';
import { fmErrorDif_CommerceINT } from './interfaces/commerce_intercae';
import { fmErrorDif_PosINT } from './interfaces/pos_interface';
import { fmErrorDif_SolicINT } from './interfaces/solic_interface';

export const initialImagesFm: ImagesInt = {
	rc_ident_card: null,
	rc_rif: null,
	rc_special_contributor: null,
	rc_ref_bank: null,
	rc_comp_dep: null,
};

export const initialImagesPath: PathImagesInt = {
	rc_ident_card: {
		path: '',
		type: '',
	},
	rc_rif: {
		path: '',
		type: '',
	},
	rc_special_contributor: {
		path: '',
		type: '',
	},
	rc_ref_bank: {
		path: '',
		type: '',
	},
	rc_comp_dep: {
		path: '',
		type: '',
	},
};

export const fmErrorDifClient: fmErrorDif_ClientINT = {
	email: false,
	name: false,
	last_name: false,
	id_ident_type: false,
	ident_num: false,
	phone1: false,
	phone2: false,
	name_ref1: false,
	doc_ident_type_ref1: false,
	doc_ident_ref1: false,
	phone_ref1: false,
	name_ref2: false,
	doc_ident_type_ref2: false,
	doc_ident_ref2: false,
	phone_ref2: false,
	estado: false,
	municipio: false,
	ciudad: false,
	parroquia: false,
	sector: false,
	calle: false,
	local: false,
};

export const fmErrorDifCommerce: fmErrorDif_CommerceINT = {
	name: false,
	id_ident_type: false,
	ident_num: false,
	id_activity: false,
	estado: false,
	municipio: false,
	ciudad: false,
	parroquia: false,
	sector: false,
	calle: false,
	local: false,
};

export const fmErrorPos: fmErrorDif_PosINT = {};

export const fmErrorDifSolic: fmErrorDif_SolicINT = {
	bank_account_num: false,
	nro_comp_dep: false,
};
