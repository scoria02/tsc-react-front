import { Aci } from 'context/DataList/interface';
import { Dispatch, SetStateAction } from 'react';

export interface ContextFMValidation {
	typeSolict: number;
	client: ClientValid | null;
	commerce: any;
	pos: any;
	locationClient: any;
	locationCommerce: any;
	locationPos: any;
	aci: Aci | null;
	setAci: Dispatch<SetStateAction<Aci | null>>;
	resetFmValidation(): void;
	handleChangeValid: any;
	listValidated: ValidatedFace;
	codeFM: string;
	stepsFM: any;
}

export interface ClientValid {
	id: number;
	id_roles: number;
	ident_num: string;
	last_name: string;
	name: string;
	email: string;
	id_ident_type: {
		id: number;
		name: string;
	};
	id_location: {
		id: number;
		sector: string;
		calle: string;
		local: string;
		id_estado: any;
		id_ciudad: any;
		id_municipio: any;
		id_parroquia: any;
	};
	rc_ident_card: any;
	ref_person_1: any;
	ref_person_2: any;
	phones: any[];
}

export interface ValidatedFace {
	valid_cliente: {
		status: boolean;
		id_typedif: number;
		msg: string;
	};
	valid_commerce: {
		status: boolean;
		id_typedif: number;
		msg: string;
	};
	valid_ref_bank: {
		status: boolean;
		id_typedif: number;
		msg: string;
	};
	valid_planilla: {
		status: boolean;
		id_typedif: number;
		msg: string;
	};
	valid_constitutive_act: {
		status: boolean;
		id_typedif: number;
		msg: string;
	};
	valid_special_contributor: {
		status: boolean;
		id_typedif: number;
		msg: string;
	};
	valid_comp_dep: {
		status: boolean;
		id_typedif: number;
		msg: string;
	};
}
