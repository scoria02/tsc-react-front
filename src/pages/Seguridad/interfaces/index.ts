export interface Department {
	id: number;
	name: string;
	active: number;
}

export interface View {
	id: number;
	name: string;
	root: string;
	status: boolean;
}

export interface Roles {
	active: number;
	id: number;
	name: string;
}

export interface Permisos {
	id: number;
	name: string;
	status: boolean;
	view: View;
	description: string;
}
