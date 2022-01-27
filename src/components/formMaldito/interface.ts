import { fmError_Interface, fm_Interface } from '../../context/FM/interfaces';
import { ListLocation } from '../../context/Location/interfaces';
import { Days } from '../../interfaces/fm';

export interface FMint extends Location, LocationClient, LocationCommerce, LocationPos, LocationUtilis {
	typeSolict: number;
	fmClient: any;
	fmCommerce: any;
	selectTypeSolict?: (value: number) => void;
	fmData: fm_Interface;
	fmDataError?: fmError_Interface;
	days?: Days;
	codePhone?: string;
	changeFmData?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	changeFmParms?: any;
	setFmData?: any;
	changeDays?: any;
	setDays?: any;
	setActivity?: any;
	setFmError?: any;
}

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

export interface ImagesInt {
	rc_ident_card: any;
	rc_rif: any;
	rc_special_contributor: any;
	rc_ref_bank: any;
	rc_comp_dep: any;
}

export interface NamesImagesInt {
	rc_ident_card: string;
	rc_rif: string;
	rc_special_contributor: string;
	rc_ref_bank: string;
	rc_comp_dep: string;
}
