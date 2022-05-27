export interface ClientDif {
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
		id_direccion: number;
		calle: string;
		local: string;
	};
	rc_ident_card: any;
	ref_person_1: any;
	ref_person_2: any;
}

export interface fmErrorDif_ClientINT {
	email: boolean;
	name: boolean;
	last_name: boolean;
	id_ident_type: boolean;
	ident_num: boolean;
	phone1: boolean;
	phone2: boolean;
	name_ref1: boolean;
	doc_ident_type_ref1: boolean;
	doc_ident_ref1: boolean;
	phone_ref1: boolean;
	name_ref2: boolean;
	doc_ident_type_ref2: boolean;
	doc_ident_ref2: boolean;
	phone_ref2: boolean;
	estado: boolean;
	municipio: boolean;
	ciudad: boolean;
	parroquia: boolean;
	sector: boolean;
	calle: boolean;
	local: boolean;
}
