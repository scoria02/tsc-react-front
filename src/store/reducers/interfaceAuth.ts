export interface Pemissions {
	id: number;
	active: number;
	id_action: {
		id: number;
		name: string;
		active: number;
	};
}

export interface Views {
	[key: string]: number;
}

export interface User {
	name: string;
	last_name: string;
	ident_num: string;
	email: string;
	phone: string;
	id_department: {
		name: string;
		id: number;
		active: number;
	};
	id_rol: {
		name: string;
		id: number;
		active: number;
	};
}

export interface AuthUser {
	data: User;
	views: Views | {};
	permiss: Permissions[] | [];
}

export interface inStateAuth {
	user: AuthUser | null;
	error: any[];
	registered: boolean;
	loginError: boolean;
}
