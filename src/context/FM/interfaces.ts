import { Activity } from '../DataList/interface';

export interface fm_Interface {
	//step1 Cliente
	email: string;
	name: string;
	last_name: string;
	id_ident_type: number;
	ident_num: string;
	phone1: string;
	phone2: string;
	id_estado_client: number;
	id_ciudad_client: number;
	id_municipio_client: number;
	id_parroquia_client: number;
	codigo_postal_client: string;
	sector_client: string;
	calle_client: string;
	local_client: string;
	//Step2 Referencias Personales
	name_ref1: string;
	doc_ident_type_ref1: string;
	doc_ident_ref1: string;
	phone_ref1: string;
	name_ref2: string;
	doc_ident_type_ref2: string;
	doc_ident_ref2: string;
	phone_ref2: string;
	//step3 Comercio
	id_ident_type_commerce: number;
	ident_num_commerce: string;
	name_commerce: string;
	id_activity: number;
	special_contributor: boolean;
	//Step4 Location
	//Commerce
	id_estado: number;
	id_ciudad: number;
	id_municipio: number;
	id_parroquia: number;
	codigo_postal: string;
	sector: string;
	calle: string;
	local: string;
	//Pos
	id_estado_pos: number;
	id_ciudad_pos: number;
	id_municipio_pos: number;
	id_parroquia_pos: number;
	codigo_postal_pos: string;
	sector_pos: string;
	calle_pos: string;
	local_pos: string;
	//Step5 Post
	number_post: number;
	id_model_post: number;
	text_account_number: string;
	id_payment_method: number;
	id_type_pay: number;
	id_request_origin: number;
	reqSource_docnum: string;
	initial: number;
	cuotas: number; //Si es inical coutas cambia
	nro_comp_dep: string;
	discount: number;
	pagadero: number;
}

export interface fmError_Interface {
	//step1 Cliente
	email: boolean;
	name: boolean;
	last_name: boolean;
	id_ident_type: boolean;
	ident_num: boolean;
	phone1: boolean;
	phone2: boolean;
	id_estado_client: boolean;
	id_ciudad_client: boolean;
	id_municipio_client: boolean;
	id_parroquia_client: boolean;
	codigo_postal_client: boolean;
	sector_client: boolean;
	calle_client: boolean;
	local_client: boolean;
	//Step2 Referencias Personales
	name_ref1: boolean;
	doc_ident_type_ref1: boolean;
	doc_ident_ref1: boolean;
	phone_ref1: boolean;
	name_ref2: boolean;
	doc_ident_type_ref2: boolean;
	doc_ident_ref2: boolean;
	phone_ref2: boolean;
	//step3 Comercio
	id_ident_type_commerce: boolean;
	ident_num_commerce: boolean;
	name_commerce: boolean;
	id_activity: boolean;
	special_contributor: boolean;
	//Step4 Location
	//Commerce
	id_estado: boolean;
	id_ciudad: boolean;
	id_municipio: boolean;
	id_parroquia: boolean;
	codigo_postal: boolean;
	sector: boolean;
	calle: boolean;
	local: boolean;
	//Pos
	id_estado_pos: boolean;
	id_ciudad_pos: boolean;
	id_municipio_pos: boolean;
	id_parroquia_pos: boolean;
	codigo_postal_pos: boolean;
	sector_pos: boolean;
	calle_pos: boolean;
	local_pos: boolean;
	//Step5 Post
	number_post: boolean;
	id_model_post: boolean;
	text_account_number: boolean;
	id_payment_method: boolean;
	id_type_pay: boolean;
	id_request_origin: boolean;
	reqSource_docnum: boolean;
	initial: boolean;
	cuotas: boolean; //Si es inical coutas cambia
	nro_comp_dep: boolean;
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

export interface fmState_Interface {
	typeSolict: number;
	fmData: fm_Interface;
	days: Days;
	codePhone: string;
	activity: Activity | null;
	fmDataError: fmError_Interface;
}

export interface FMCint {
	fmData: fmState_Interface;
	days: any;
	codePhone: any;
	setFmError: any;
	changeFmData: any;
	locationCommerce: any;
	locationPos: any;
	setLocationClient: any;
	setLocationCommerce: any;
	setFmData: any;
	setDays: any;
	setActivity: any;
	copyLocationCToCC: any;
	copyLocationCCToP: any;
}
