import React, { createContext, useState, ReactChild, Dispatch, SetStateAction, useEffect } from 'react';
import { validateForm } from '../../components/validation/validFm';
import { fmClient, fmCommerce, fmError_Interface, fmPos } from '../../interfaces/fm';

import { initFmPos } from './statePos';
import { initFmClient } from './stateClient';
import { initFmCommerce } from './stateCommerce';

import { fmErrorFormat, initLocation } from './states';
import { Ciudad, Estado, LocationInt, Municipio, Parroquia } from '../Location/interfaces';
import { ContextFM } from './interface';
import { Activity } from '../DataList/interface';

interface Props {
	children: ReactChild;
}

const FMDataContext = createContext<ContextFM>({
	typeSolict: 0,
	errorsFm: fmErrorFormat,
	client: initFmClient,
	commerce: initFmCommerce,
	activity: null,
	setActivity: () => {},
	pos: initFmPos,
	locationClient: initLocation,
	locationCommerce: initLocation,
	locationPos: initLocation,
	handleChangeDay: () => {},
	handleTypeSolict: () => {},
	setClient: () => {},
	setCommerce: () => {},
	setPos: () => {},
	setLocationClient: () => {},
	setLocationCommerce: () => {},
	setLocationPos: () => {},
	setEstado: () => {},
	setMunicipio: () => {},
	setCiudad: () => {},
	setParroquia: () => {},
	handleChangeClient: () => {},
	handleSelectIdentClient: () => {},
	handleChangeCommerce: () => {},
	handleSelectIdentCommerce: () => {},
	handleChangePos: () => {},
});

export const FMContextProvider = ({ children }: Props) => {
	const [typeSolict, setTypeSolict] = useState<number>(0);
	const [errorsFm, setErrorsFm] = useState<fmError_Interface>(fmErrorFormat);
	const [client, setClient] = useState<fmClient>(initFmClient);
	const [commerce, setCommerce] = useState<fmCommerce>(initFmCommerce);
	const [pos, setPos] = useState<fmPos>(initFmPos);
	const [activity, setActivity] = useState<Activity | null>(null);
	const [locationClient, setLocationClient] = useState<LocationInt>(initLocation);
	const [locationCommerce, setLocationCommerce] = useState<LocationInt>(initLocation);
	const [locationPos, setLocationPos] = useState<LocationInt>(initLocation);

	//Autocomplete location
	const [autoCompleteCommerce, setAutoCompleteCommerce] = useState<boolean>(true);
	const [autoCompletePos, setAutoCompletePos] = useState<boolean>(true);

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

	const handleTypeSolict = (id: number): void => {
		setTypeSolict(id);
	};

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

	const handleChangeDay = (event: React.ChangeEvent<HTMLInputElement>): void => {
		//validar que los dias no todos sean vacios
		setCommerce({
			...commerce,
			days: {
				...commerce.days,
				[event.target.name]: event.target.checked,
			},
		});
	};

	const handleChangePos = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setErrorsFm(validateForm(pos, errorsFm, event.target.name, event.target.value));
		setPos({
			...pos,
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

	const setEstado = (data: Estado | null, setLocation: Dispatch<SetStateAction<LocationInt>>) => {
		setLocation({
			estado: data,
			municipio: null,
			ciudad: null,
			parroquia: null,
		});
	};

	const setMunicipio = (data: Municipio | null, setLocation: Dispatch<SetStateAction<LocationInt>>) => {
		setLocation((prevState) => ({
			...prevState,
			municipio: data,
			ciudad: null,
			parroquia: null,
		}));
	};

	const setCiudad = (data: Ciudad | null, setLocation: Dispatch<SetStateAction<LocationInt>>) => {
		setLocation((prevState) => ({
			...prevState,
			ciudad: data,
			parroquia: null,
		}));
	};

	const setParroquia = (data: Parroquia | null, setLocation: Dispatch<SetStateAction<LocationInt>>) => {
		setLocation((prevState) => ({
			...prevState,
			parroquia: data,
		}));
	};

	return (
		<FMDataContext.Provider
			value={{
				typeSolict,
				handleTypeSolict,
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
				setCommerce,
				activity,
				setActivity,
				locationCommerce,
				setLocationCommerce,
				//handles
				handleChangeDay,
				handleChangeCommerce,
				handleSelectIdentCommerce,

				//Pos
				pos,
				locationPos,
				setLocationPos,
				setPos,
				//handles
				handleChangePos,

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

/*
	const copyLocationCToCC = () => {
		dispatchCC({
			type: COPY_LOCATION,
			payload: locationClient,
		});
		dispatchFmCommerce({
			type: SET_FM,
			payload: {
				...fmCommerce,
				id_estado: fmClient.id_estado_client,
				id_ciudad: fmClient.id_ciudad_client,
				id_municipio: fmClient.id_municipio_client,
				id_parroquia: fmClient.id_parroquia_client,
				sector: fmClient.sector_client,
				calle: fmClient.calle_client,
				local: fmClient.local_client,
				codigo_postal: fmClient.codigo_postal_client,
			},
		});
	};

	const copyLocationCCToP = () => {
		dispatchP({
			type: COPY_LOCATION,
			payload: locationCommerce,
		});
		dispatchFmPos({
			type: SET_FM,
			payload: {
				...fmPos,
				id_estado: fmCommerce.id_estado,
				id_ciudad: fmCommerce.id_ciudad,
				id_municipio: fmCommerce.id_municipio,
				id_parroquia: fmCommerce.id_parroquia,
				sector: fmCommerce.sector,
				calle: fmCommerce.calle,
				local: fmCommerce.local,
				codigo_postal: fmCommerce.codigo_postal,
			},
		});
	};

	//[delete]
	const copyLocationCToP = () => {
		dispatchP({
			type: COPY_LOCATION,
			payload: locationClient,
		});
		dispatch({
			type: SET_FM,
			payload: {
				...fmData,
				id_estado_pos: fmData.id_estado_client,
				id_ciudad_pos: fmData.id_ciudad_client,
				id_municipio_pos: fmData.id_municipio_client,
				id_parroquia_pos: fmData.id_parroquia_client,
				sector_pos: fmData.sector_client,
				calle_pos: fmData.calle_client,
				local_pos: fmData.local_client,
				codigo_postal_pos: fmData.codigo_postal_client,
			},
		});
	};
	//
*/
