export interface CommerceDif {
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
	days: string;
}

export interface fmErrorDif_CommerceINT {
	name: boolean;
	id_ident_type: boolean;
	ident_num: boolean;
	id_activity: boolean;
	estado: boolean;
	municipio: boolean;
	ciudad: boolean;
	parroquia: boolean;
	sector: boolean;
	calle: boolean;
	local: boolean;
}
