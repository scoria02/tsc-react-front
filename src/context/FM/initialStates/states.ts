import { Days, fmError_Interface } from '../../../interfaces/fm';
import { LocationInt } from '../Location/interfaces';

export const fmErrorFormat: fmError_Interface = {
	//step1 Cliente
	email: false,
	name: false,
	last_name: false,
	id_ident_type: false,
	ident_num: false,
	phone1: false,
	phone2: false,
	sector_client: false,
	calle_client: false,
	local_client: false,
	//Step2 Referencias Personales
	name_ref1: false,
	doc_ident_type_ref1: false,
	doc_ident_ref1: false,
	phone_ref1: false,
	name_ref2: false,
	doc_ident_type_ref2: false,
	doc_ident_ref2: false,
	phone_ref2: false,
	//step3 Comercio
	id_ident_type_commerce: false,
	ident_num_commerce: false,
	name_commerce: false,
	id_activity: false,
	special_contributor: false,
	//Step4 Location
	//Commerce
	sector: false,
	calle: false,
	local: false,
	//Pos
	sector_pos: false,
	calle_pos: false,
	local_pos: false,
	//Step5 Post
	number_post: false,
	id_model_post: false,
	text_account_number: false,
	id_payment_method: false,
	id_type_pay: false,
	id_request_origin: false,
	reqSource_docnum: false,
	initial: false,
	cuotas: false, //Si es inical coutas cambia
	nro_comp_dep: false,
	discount: false,
	pagadero: false,
};

export const daysWork: Days = {
	Lunes: true,
	Martes: true,
	Miercoles: true,
	Jueves: true,
	Viernes: true,
	Sabado: true,
	Domingo: true,
};

export const location: LocationInt = {
	estado: null,
	ciudad: null,
	municipio: null,
	parroquia: null,
};

export const initLocation: LocationInt = {
	estado: null,
	ciudad: null,
	municipio: null,
	parroquia: null,
};
