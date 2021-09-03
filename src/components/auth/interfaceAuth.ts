export interface Interface_RegisterUser {
	email: string;
	password: string;
	confirmPassword: string;
	name: string;
	last_name: string;
	id_ident_type: number;
	ident_num: string;
	phone1: string;
	phone2: string;
}

export interface Interface_RegisterUserError {
	email: boolean;
	password: boolean;
	confirmPassword: boolean;
	name: boolean;
	last_name: boolean;
	id_ident_type: boolean;
	ident_num: boolean;
	phone1: boolean;
	phone2: boolean;
	checkPhones: boolean,
}
