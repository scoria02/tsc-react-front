import { ImagesInt, PathImagesInt } from 'context/FM/fmImages/interface';
import { ReactChild, Dispatch, SetStateAction } from 'react';

export interface PropsAd {
	children: ReactChild;
	value: any;
}

export interface ContextFMD {
	disabled: boolean;
	setDisabled: any;
	fm: any;
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
}
