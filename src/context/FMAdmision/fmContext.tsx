import React, { createContext, useState, ReactChild, Dispatch, SetStateAction, useEffect } from 'react';
import { validateForm } from '../../components/validation/validFm';
import { fmClient, fmCommerce } from '../../interfaces/fm';
import { initFmClient } from '../FM/client/stateClient';
import { initFmCommerce } from '../FM/commerce/stateCommerce';
import { fmError_Interface } from '../FM/interfaces';
import { fmErrorFormat, initLocation } from '../FM/states';
import { Ciudad, Estado, LocationInt, Municipio, Parroquia } from '../Location/interfaces';
import { ContextFM } from './interface';

interface Props {
	children: ReactChild;
}

const FMDataContext = createContext<ContextFM>({
	typeSolict: 0,
	errorsFm: fmErrorFormat,
	client: initFmClient,
	commerce: initFmCommerce,
	locationClient: initLocation,
	setClient: () => {},
	setLocationClient: () => {},
	setEstado: () => {},
	setMunicipio: () => {},
	setCiudad: () => {},
	setParroquia: () => {},
	handleChangeClient: () => {},
	handleSelectIdentClient: () => {},
	handleChangeCommerce: () => {},
	handleSelectIdentCommerce: () => {},
});

export const FMContextProvider = ({ children }: Props) => {
	const [typeSolict, setTypeSolict] = useState<number>(0);
	const [errorsFm, setErrorsFm] = useState<fmError_Interface>(fmErrorFormat);
	const [client, setClient] = useState<fmClient>(initFmClient);
	const [commerce, setCommerce] = useState<fmCommerce>(initFmCommerce);
	const [locationClient, setLocationClient] = useState<LocationInt>(initLocation);

	useEffect(() => {
		if (
			(typeSolict === 0 && commerce.ident_num !== client.ident_num) ||
			commerce.name !== client.name + ' ' + client.last_name
		) {
			setCommerce((prevState) => {
				return {
					...prevState,
					id_ident_type: client.id_ident_type,
					ident_num: client.ident_num,
					name: client.name + ' ' + client.last_name,
				};
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [typeSolict, client.name, client.last_name, client.ident_num, client.id_ident_type]);

	const handleChangeClient = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setErrorsFm(validateForm(client, errorsFm, event.target.name, event.target.value));
		setClient({
			...client,
			[event.target.name]: event.target.value,
		});
	};

	const handleChangeCommerce = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setErrorsFm(validateForm(client, errorsFm, event.target.name, event.target.value));
		setCommerce({
			...commerce,
			[event.target.name]: event.target.value,
		});
	};

	const handleSelectIdentClient = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
		if (event.target.name) {
			setErrorsFm(validateForm(client, errorsFm, event.target.name, Number(event.target.value)));
			setClient({
				...client,
				[event.target.name]: Number(event.target.value),
			});
		}
	};

	const handleSelectIdentCommerce = (event: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
		if (event.target.name) {
			setCommerce({
				...commerce,
				[event.target.name]: Number(event.target.value),
			});
		}
	};

	const setEstado = (
		data: Estado | null,
		setLocation: Dispatch<SetStateAction<LocationInt>>,
		setState: Dispatch<SetStateAction<fmClient>>
	) => {
		setLocation({
			estado: data,
			municipio: null,
			ciudad: null,
			parroquia: null,
		});
		setState((prevState) => ({
			...prevState,
			id_estado: data ? data.id : 0,
			id_municipio: 0,
			id_ciudad: 0,
			id_parroquia: 0,
		}));
	};

	const setMunicipio = (
		data: Municipio | null,
		setLocation: Dispatch<SetStateAction<LocationInt>>,
		setState: Dispatch<SetStateAction<fmClient>>
	) => {
		setLocation((prevState) => ({
			...prevState,
			municipio: data,
			ciudad: null,
			parroquia: null,
		}));
		setState((prevState) => ({
			...prevState,
			id_municipio: data ? data.id : 0,
			id_ciudad: 0,
			id_parroquia: 0,
		}));
	};

	const setCiudad = (
		data: Ciudad | null,
		setLocation: Dispatch<SetStateAction<LocationInt>>,
		setState: Dispatch<SetStateAction<fmClient>>
	) => {
		setLocation((prevState) => ({
			...prevState,
			ciudad: data,
			parroquia: null,
		}));
		setState((prevState) => ({
			...prevState,
			id_ciudad: data ? data.id : 0,
			id_parroquia: 0,
			codigo_postal: data ? data.postal_code : '',
		}));
	};

	const setParroquia = (
		data: Parroquia | null,
		setLocation: Dispatch<SetStateAction<LocationInt>>,
		setState: Dispatch<SetStateAction<fmClient>>
	) => {
		setLocation((prevState) => ({
			...prevState,
			parroquia: data,
		}));
		setState((prevState) => ({
			...prevState,
			id_parroquia: data ? data.id : 0,
		}));
	};

	return (
		<FMDataContext.Provider
			value={{
				typeSolict,
				errorsFm,
				//Client
				client,
				locationClient,
				setClient,
				setLocationClient,
				//handles
				handleChangeClient,
				handleSelectIdentClient,

				//Commerce
				commerce,
				//handles
				handleChangeCommerce,
				handleSelectIdentCommerce,

				//Locations
				setEstado,
				setMunicipio,
				setCiudad,
				setParroquia,
			}}>
			{children}
		</FMDataContext.Provider>
	);
};

export default FMDataContext;
