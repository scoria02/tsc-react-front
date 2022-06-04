//import { ListLocation } from 'context/Location/interfaces';

/*
export interface Location {
	locationClient?: any;
	locationCommerce?: any;
	locationPos?: any;
}

export interface LocationClient {
	//Location Fm
	setLocationClient?: any;
	setEstadoClient?: any;
	setMunicipioClient?: any;
	setCiudadClient?: any;
	setParroquiaClient?: any;
}

export interface LocationCommerce {
	setLocationCommerce?: any;
	setEstadoCommerce?: any;
	setMunicipioCommerce?: any;
	setCiudadCommerce?: any;
	setParroquiaCommerce?: any;
}

export interface LocationPos {
	setLocationPos?: any;
	setEstadoPos?: any;
	setMunicipioPos?: any;
	setCiudadPos?: any;
	setParroquiaPos?: any;
}

export interface LocationUtilis {
	copyLocationCToCC?: any;
	copyLocationCToP?: any;
	copyLocationCCToP?: any;
}

export interface ListLocationInt {
	listLocationClient: ListLocation;
	listLocationCommerce: ListLocation;
	listLocationPos: ListLocation;
	copyListLocationCToCC: any;
	copyListLocationCCToP: any;
}
*/

export interface ImagesInt {
	rc_ident_card: object | null;
	rc_rif: object | null;
	rc_special_contributor: object | null;
	rc_ref_bank: object | null;
	rc_comp_dep: object | null;
}

export interface NamesImagesInt {
	rc_ident_card: string;
	rc_rif: string;
	rc_special_contributor: string;
	rc_ref_bank: string;
	rc_comp_dep: string;
}
