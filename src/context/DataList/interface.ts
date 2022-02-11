//IdentType, Payment, TypePay, RequestSource
export interface base {
	id: number;
	name: string;
}

export interface TypeWallet {
	Id: number;
	Cod_Cartera: string;
	Nombre_Org: string;
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

export interface Aci {
	id: number;
	aliApellidos: string;
	aliCelular: string;
	aliCodEstatus: number;
	aliCodModalidadPago: number;
	aliCodZonaAtencion: number;
	aliCodigoCelular: string;
	aliCodigoTelHabitacion: string;
	aliCuentaAbono: string;
	aliDireccion: string;
	aliEmail: string;
	aliFechaNacimiento: string;
	aliIdUsuario: null | any;
	aliIdentificacion: string;
	aliNombres: string;
	aliObservaciones: string;
	aliProfesion: string;
	aliRecaudos: null | any;
	aliSexo: string;
	aliTelefonoHabitacion: string;
	aliTipoIdentificacion: string;
}
