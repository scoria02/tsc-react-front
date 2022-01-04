export interface Estado {
	estado: string;
	id: number;
	iso_3166: string;
}

export interface Municipio {
	id: number;
	municipio: string;
}

export interface Ciudad {
	area_code: string;
	ciudad: string;
	id: number;
	postal_code: string;
}

export interface Parroquia {
	id: number;
	parroquia: string;
}

export interface Location {
	estado: Estado | null;
	ciudad: Ciudad | null;
	municipio: Municipio | null;
	parroquia: Parroquia | null;
}

export interface ListLocation {
	estado: Estado[];
	municipio: Municipio[];
	ciudad: Ciudad[];
	parroquia: Parroquia[];
}
