import { ImagesInt, PathImagesInt } from 'context/FM/fmImages/interface';
import { ReactChild, Dispatch, SetStateAction } from 'react';

export interface PropsAd {
	children: ReactChild;
	fm: any;
}

export interface ContextFMD {
	disabled: boolean;
	setDisabled: any;
	initFm(fmData: any): void;
	resetFm(): void;
	handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeClient(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeCommerce(event: React.ChangeEvent<HTMLInputElement>): void;
	//images
	imagePlanilla: FileList | [];
	imagesActa: FileList | [];
	imagesForm: ImagesInt;
	//setImagenes: Dispatch<SetStateAction<ArrayImagenes>>;
	//paths
	pathImages: PathImagesInt;
	//
	handleChangePlanilla(event: React.ChangeEvent<HTMLInputElement>): void;
	deleteItemPlanilla(id: number): void;
	//
	handleChangeImages(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeImagesActa(event: React.ChangeEvent<HTMLInputElement>): void;
	deleteItemActa(id: number): void;
	//
	deleteImg(name: string): void;
	removePlanilla(): void;
	resetImages(): void;
	//
	codeFM: string;
	listValidated: any;
	stepsFM: any;
	solic: any;
	client: ClientDif | null;
	commerce: any;
	pos: any;
	locationClient: any;
	locationCommerce: any;
	locationPos: any;
	phones: any;
	handleChangeClientPhone(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeRefClient(param: string, value: any): void;
}

export interface ClientDif {
	id: number;
	id_roles: number;
	ident_num: string;
	last_name: string;
	name: string;
	email: string;
	id_ident_type: {
		id: number;
		name: string;
	};
	id_location: {
		id: number;
		sector: string;
		calle: string;
		local: string;
		id_estado: any;
		id_ciudad: any;
		id_municipio: any;
		id_parroquia: any;
	};
	rc_ident_card: any;
	ref_person_1: any;
	ref_person_2: any;
}
