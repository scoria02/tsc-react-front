export interface Estado {
	estado: string;
	//id: number;
}

export interface Municipio {
	//id: number;
	municipio: string;
}

export interface Ciudad {
	//area_code: string;
	ciudad: string;
	//id: number;
	//postal_code: string;
}

export interface Parroquia {
	//id: number;
	parroquia: string;
}

export interface Sector {
	id: number;
	sector: string;
	codigoPostal: string;
}

export interface LocationInt {
	estado: Estado | null;
	ciudad: Ciudad | null;
	municipio: Municipio | null;
	parroquia: Parroquia | null;
	sector: Sector | null;
}

export interface ListLocation {
	estado: Estado[];
	municipio: Municipio[];
	ciudad: Ciudad[];
	parroquia: Parroquia[];
	sector: Sector[];
}
