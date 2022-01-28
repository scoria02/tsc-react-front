import { Dispatch, SetStateAction } from 'react';
import { fmClient, fmCommerce } from '../../interfaces/fm';
import { fmError_Interface } from '../FM/interfaces';
import { Ciudad, Estado, LocationInt, Municipio, Parroquia } from '../Location/interfaces';

export interface ContextFM {
	typeSolict: number;
	errorsFm: fmError_Interface;
	client: fmClient;
	commerce: fmCommerce;
	locationClient: LocationInt;
	setClient: Dispatch<SetStateAction<fmClient>>;
	setLocationClient: Dispatch<SetStateAction<LocationInt>>;
	setEstado(
		data: Estado | null,
		setLocation: Dispatch<SetStateAction<LocationInt>>,
		setState: Dispatch<SetStateAction<fmClient>>
	): void;
	setMunicipio(
		data: Municipio | null,
		setLocation: Dispatch<SetStateAction<LocationInt>>,
		setState: Dispatch<SetStateAction<fmClient>>
	): void;
	setCiudad(
		data: Ciudad | null,
		setLocation: Dispatch<SetStateAction<LocationInt>>,
		setState: Dispatch<SetStateAction<fmClient>>
	): void;
	setParroquia(
		data: Parroquia | null,
		setLocation: Dispatch<SetStateAction<LocationInt>>,
		setState: Dispatch<SetStateAction<fmClient>>
	): void;
	handleChangeClient(event: React.ChangeEvent<HTMLInputElement>): void;
	handleSelectIdentClient(event: React.ChangeEvent<{ name?: string; value: unknown }>): void;
	handleChangeCommerce(event: React.ChangeEvent<HTMLInputElement>): void;
	handleSelectIdentCommerce(event: React.ChangeEvent<{ name?: string; value: unknown }>): void;
}
