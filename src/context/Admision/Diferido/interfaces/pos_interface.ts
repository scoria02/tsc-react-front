import { base, Products } from 'context/DataList/interface';
import { Photo } from 'interfaces';

export interface ModelPos {}

export interface Valid_Request {
	id: number;
	id_typedif_client: number | null;
	id_typedif_commerce: number | null;
	id_typedif_comp_num: number | null;
	id_typedif_consitutive_acta: number | null;
	id_typedif_planilla: number | null;
	id_typedif_pos: number | null;
	id_typedif_ref_bank: number | null;
	id_typedif_special_contributor: number | null;
	valid_client: string;
	valid_commerce: string;
	valid_comp_dep: string;
	valid_constitutive_act: string;
	valid_planilla: string;
	valid_pos: string;
	valid_ref_bank: string;
	valid_special_contributor: string;
}

export interface Direccion {
	id: number;
	codigoPostal: number;
	estado: string;
	municipio: string;
	ciudad: string;
	parroquia: string;
	sector: string;
}

export interface Location {
	id: number;
	calle: string;
	id_direccion: Direccion;
	local: string;
}

export interface PosArr {
	id: number;
	aboTerminal: string;
	id_cartera: number | null;
	id_cartera_ter: number | null;
	serial: number | null;
	id_location: Location;
}

export interface PosDif {
	model_post: any;
	number_pos: number;
	bank_account_num: string;
	ci_referred: string;
	nro_comp_dep: string;
	discount: boolean;
	pagadero: boolean;
	id_quotas_calculata: number;
	id_payment_method: {
		id: number;
		name: string;
	};
	id_type_payment: {
		id: number;
		name: string;
	};
	id_product: Products;
	id_quotas_calculat: any;
	id_request_origin: base;
	id_type_request: base;
	id_valid_request: Valid_Request;
	pos: PosArr[];
	rc_comp_dep: Photo | null;
	rc_planilla: Photo[] | [];
	rc_ref_bank: Photo | null;
	id_location: number;
	id_direccion: number;
	calle: string;
	local: string;
}

export interface SolicDif {
	id: number;
	number_post: number;
	bank_account_num: string;
	ci_referred: string;
	nro_comp_dep: string;
	discount: boolean;
	pagadero: boolean;
	id_quotas_calculata: number;
	id_payment_method: base;
	id_type_payment: base;
	id_product: {
		id: 1;
		name: string;
		description: string;
		price: number;
		quota: number;
	};
	id_quotas_calculat: any;
	id_request_origin: base;
	id_type_request: base;
	id_valid_request: Valid_Request;
	pos: PosArr[];
	rc_comp_dep: Photo | null;
	rc_planilla: Photo[] | [];
	rc_ref_bank: Photo | null;
}

export interface fmErrorDif_PosINT {}
