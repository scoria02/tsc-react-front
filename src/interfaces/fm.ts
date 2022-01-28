export interface fmClient {
	email: string;
	name: string;
	last_name: string;
	id_ident_type: number;
	ident_num: string;
	phone1: string;
	phone2: string;
	id_estado: number;
	id_ciudad: number;
	id_municipio: number;
	id_parroquia: number;
	codigo_postal: string;
	sector: string;
	calle: string;
	local: string;
	name_ref1: string;
	doc_ident_type_ref1: string;
	doc_ident_ref1: string;
	phone_ref1: string;
	name_ref2: string;
	doc_ident_type_ref2: string;
	doc_ident_ref2: string;
	phone_ref2: string;
}

export interface fmCommerce {
	id_ident_type: number;
	ident_num: string;
	name: string;
	id_activity: number;
	special_contributor: boolean;
	id_estado: number;
	id_ciudad: number;
	id_municipio: number;
	id_parroquia: number;
	codigo_postal: string;
	sector: string;
	calle: string;
	local: string;
}

export interface fmPos {
	id_estado: number;
	id_ciudad: number;
	id_municipio: number;
	id_parroquia: number;
	codigo_postal: string;
	sector: string;
	calle: string;
	local: string;
	number_post: number;
	id_model_post: number;
	text_account_number: string;
	id_payment_method: number;
	id_type_pay: number;
	id_request_origin: number;
	reqSource_docnum: string;
	initial: number;
	cuotas: number;
	nro_comp_dep: string;
	discount: boolean;
	pagadero: boolean;
}

export interface Days {
	Lunes: boolean;
	Martes: boolean;
	Miercoles: boolean;
	Jueves: boolean;
	Viernes: boolean;
	Sabado: boolean;
	Domingo: boolean;
}

export interface FMContextProp {
	days: Days;
	setDays: (data: Days) => void;
}
