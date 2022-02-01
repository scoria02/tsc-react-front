//IdentType, Payment, TypePay, RequestSource
export interface base {
	id: number;
	name: string;
}

export interface Afiliado {
	id: number;
	bank_account_number: string;
	name: string;
}

export interface Activity {
	id: number;
	id_afiliado: Afiliado;
	name: string;
}

export interface Products {
	description: string;
	id: number;
	name: string;
	photos: any[];
	price: number;
	quota: number;
}
