import { PathImagesInt } from 'context/Admision/CreationFM/fmImages/interface';
import { ReactChild } from 'react';

export interface PropsCommerceContext {
	children: ReactChild;
	data: any;
}

export interface ContextCommerceUpdata {
	disabled: boolean;
	setDisabled: any;
	initFm(): void;
	reset(): void;
	handleChangeCommerce(event: React.ChangeEvent<HTMLInputElement>): void;
	//images
	imagesActa: FileList | [];
	imagen: any;
	//paths
	pathImages: PathImagesInt;
	//
	handleChangeImages(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeImagesActa(event: React.ChangeEvent<HTMLInputElement>): void;
	deleteItemActa(id: number): void;
	deleteImg(name: string): void;
	resetImages(): void;
	//
	commerce: any;
	locationCommerce: any;
}
