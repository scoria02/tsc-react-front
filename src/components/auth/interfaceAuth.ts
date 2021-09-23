export interface Interface_RegisterUser {
	email: string;
	password: string;
	confirmPassword: string;
	name: string;
	last_name: string;
	id_ident_type: number;
	ident_num: string;
	phone: string;
	company: string,
	id_department: number,
}

export interface Interface_RegisterUserError {
	email: boolean;
	password: boolean;
	confirmPassword: boolean;
	name: boolean;
	last_name: boolean;
	id_ident_type: boolean;
	ident_num: boolean;
	phone: boolean;
}

export interface Interface_ErrorPass {
	rango: boolean;
	mayus: boolean;
	minus: boolean,
	sig: boolean;
}
