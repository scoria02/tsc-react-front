import { PathImagesInt } from 'context/Admision/CreationFM/fmImages/interface';
import {
	Ciudad,
	Estado,
	ListLocation,
	Municipio,
	Parroquia,
	Sector,
} from 'context/Admision/CreationFM/Location/interfaces';
import { Activity } from 'context/DataList/interface';
import { ReactChild } from 'react';

export interface PropsCommerceContext {
	children: ReactChild;
	data: any;
	closeModal: boolean;
}

export interface ContextCommerceUpdata {
	disabled: boolean;
	ready: boolean;
	setDisabled: any;
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
	error: any;
	//
	handleChange(name: string, event: Activity | any): void;
	handleChangeLocation(name: string, value: number | string): void;
	handleChangeIdenType(value: number): void;
	//location
	location:
		| any
		| {
				estado: Estado;
		  }
		| any;
	setEstado(data: Estado | null): void;
	setMunicipio(data: Municipio | null): void;
	setCiudad(data: Ciudad | null): void;
	setParroquia(data: Parroquia | null): void;
	setSector(data: Sector | null): void;
	//list location
	listLocations: ListLocation;
	handleListMunicipio(value: Estado | null): void;
	handleListCiudad(xEstado: Estado | null, xMunicpio: Municipio | null): void;
	handleListParroquia(xEstado: Estado | null, xMunicpio: Municipio | null, xCiudad: Ciudad | null): void;
	handleListSector(
		xEstado: Estado | null,
		xMunicpio: Municipio | null,
		xCiudad: Ciudad | null,
		xParroquia: Parroquia | null
	): void;
}
