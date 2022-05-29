import { ImagesInt, PathImagesInt } from 'context/Admision/CreationFM/fmImages/interface';
import { Activity } from 'context/DataList/interface';
import { ReactChild, Dispatch, SetStateAction } from 'react';
import { LocationInt } from '../../CreationFM/Location/interfaces';
import { fmErrorDif_ClientINT } from './client_interface';
import { fmErrorDif_CommerceINT } from './commerce_intercae';
import { PosDif, SolicDif } from './pos_interface';

export interface PropsAd {
	children: ReactChild;
	fm: any;
}

export interface ContextFMDif {
	activeStep: number;
	setActiveStep: any;
	ready: boolean;
	disabled: boolean;
	setDisabled: any;
	initFm(fmData: any): void;
	resetFm(): void;
	handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeClient(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeCommerce(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangePos(event: React.ChangeEvent<HTMLInputElement>): void;
	//images
	imagePlanilla: FileList | [];
	imagesActa: FileList | [];
	imagesForm: ImagesInt;
	//paths
	pathImages: PathImagesInt;
	//
	handleChangePlanilla(event: React.ChangeEvent<HTMLInputElement>): void;
	deleteItemPlanilla(id: number): void;
	//
	handleChangeIdenType(event: any): void;
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
	solic: SolicDif | null;
	//
	client: any;
	errorClient: fmErrorDif_ClientINT;
	locationClient: any;
	//
	commerce: any;
	errorCommerce: fmErrorDif_CommerceINT;
	locationCommerce: any;
	handleChangeActivity(name: string, value: Activity): void;
	//
	pos: PosDif | null;
	locationPos: any;
	errorPos: any;
	handleParamsPos(name: string, value: any): void;
	//
	phones: any;
	handleChangeClientPhone(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeRefClient(param: string, value: any): void;
	//locations
	setLocationClient: Dispatch<SetStateAction<LocationInt>>;
	setLocationCommerce: Dispatch<SetStateAction<LocationInt>>;
	setLocationPos: Dispatch<SetStateAction<LocationInt>>;
	//
	setIdLocationClient: Dispatch<SetStateAction<number>>;
	setIdLocationCommerce: Dispatch<SetStateAction<number>>;
	setIdLocationPos: Dispatch<SetStateAction<number>>;
	idLocationClient: number;
	idLocationCommerce: number;
	idLocationPos: number;
}
