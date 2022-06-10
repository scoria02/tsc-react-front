export interface ContextFMData {
	typeSolict: number;
	client: ClientValid | null;
	commerce: any;
	pos: any;
	locationClient: any;
	locationCommerce: any;
	locationPos: any;
	resetFmValidation(): void;
	codeFM: string;
	stepsFM: any;
	solic: any;
}

export interface ClientValid {
	id: number;
	validate: number;
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
