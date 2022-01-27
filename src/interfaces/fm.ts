export interface fmClient {
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
