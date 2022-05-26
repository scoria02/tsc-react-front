import { ImagesInt, PathImagesInt } from 'context/Admision/CreationFM/fmImages/interface';

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

export const ErrorCommerceData = {
	name: false,
	ident_num: false,
	estado: false,
	municipio: false,
	ciudad: false,
	parroquia: false,
	sector: false,
	calle: false,
	local: false,
};
