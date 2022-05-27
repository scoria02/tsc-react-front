import {
	Estado,
	Municipio,
	Ciudad,
	Parroquia,
	Sector,
	LocationInt,
} from 'context/Admision/CreationFM/Location/interfaces';
import React, { Dispatch, SetStateAction } from 'react';

export const setEstado = (data: Estado | null, setLocation: Dispatch<SetStateAction<LocationInt>>) => {
	setLocation({
		estado: data,
		municipio: null,
		ciudad: null,
		parroquia: null,
		sector: null,
	});
};

export const setMunicipio = (data: Municipio | null, setLocation: Dispatch<SetStateAction<LocationInt>>) => {
	setLocation((prevState: any) => ({
		...prevState,
		municipio: data,
		ciudad: null,
		parroquia: null,
		sector: null,
	}));
};

export const setCiudad = (data: Ciudad | null, setLocation: Dispatch<SetStateAction<LocationInt>>) => {
	setLocation((prevState: any) => ({
		...prevState,
		ciudad: data,
		parroquia: null,
		sector: null,
	}));
};

export const setParroquia = (data: Parroquia | null, setLocation: Dispatch<SetStateAction<LocationInt>>) => {
	setLocation((prevState: any) => ({
		...prevState,
		parroquia: data,
		sector: null,
	}));
};

export const setSector = (data: Sector | null, setLocation: Dispatch<SetStateAction<LocationInt>>) => {
	setLocation((prevState: any) => ({
		...prevState,
		sector: data,
	}));
};
