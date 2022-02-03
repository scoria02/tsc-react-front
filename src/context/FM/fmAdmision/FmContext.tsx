import React, { createContext, useState, ReactChild, Dispatch, SetStateAction, useEffect } from 'react';
import { validateForm } from '../../../components/validation/validFm';
import { fmClient, fmCommerce, fmError_Interface, fmPos } from '../../../interfaces/fm';

import { initFmPos } from '../initialStates/statePos';
import { initFmClient } from '../initialStates/stateClient';
import { initFmCommerce } from '../initialStates/stateCommerce';

import { fmErrorFormat, initLocation } from '../initialStates/states';
import { Ciudad, Estado, LocationInt, Municipio, Parroquia } from '../Location/interfaces';
import { ContextFM } from './interface';
import { base, Activity, Products, Aci } from '../../DataList/interface';

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
	copyLocationToCommerce: () => {},
	copyLocationToPos: () => {},
	handleChangeClient: () => {},
	handleSelectIdentClient: () => {},
	handleChangeCommerce: () => {},
	handleSelectIdentCommerce: () => {},
	handleChangeCheckedCommerce: () => {},
	handleChangePos: () => {},
	handleParamsPos: () => {},
	handleCheckedPos: () => {},
	handleSourceAci: () => {},
	resetFm: () => {},
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
	//const [autoCompleteCommerce, setAutoCompleteCommerce] = useState<boolean>(true);
	//const [autoCompletePos, setAutoCompletePos] = useState<boolean>(true);

	const resetFm = (): void => {
		setErrorsFm(fmErrorFormat);
		setClient(initFmClient);
		setCommerce(initFmCommerce);
		setPos(initFmPos);
		setActivity(null);
		setLocationClient(initLocation);
		setLocationCommerce(initLocation);
		setLocationPos(initLocation);
	};

	useEffect(() => {
		if (typeSolict === 0) {
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

	useEffect(() => {
		if (pos.type_pay) {
			setPos({
				...pos,
				reqSource_docnum: '',
			});
		}
	}, [pos.request_origin]);

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

	const handleChangeCheckedCommerce = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setCommerce({
			...commerce,
			[event.target.name]: event.target.checked,
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

	const handleParamsPos = (name: string, value: base | string | null): void => {
		console.log(value);
		setPos({
			...pos,
			[name]: value,
		});
	};
	const handleCheckedPos = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setPos({
			...pos,
			[event.target.name]: event.target.checked,
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

	const handleSourceAci = (event: any, value: Aci | null, name: string): void => {
		if (value) {
			setPos({
				...pos,
				reqSource_docnum: value,
			});
		} else {
			setPos({
				...pos,
				reqSource_docnum: '',
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

	const copyLocationToCommerce = (stateLocation: LocationInt, state: fmClient | fmCommerce | fmPos): void => {
		setLocationCommerce(stateLocation);
		setCommerce({
			...commerce,
			sector: state.sector,
			calle: state.calle,
			local: state.calle,
		});
	};

	const copyLocationToPos = (stateLocation: LocationInt, state: fmClient | fmCommerce | fmPos): void => {
		setLocationPos(stateLocation);
		setPos({
			...pos,
			sector: state.sector,
			calle: state.calle,
			local: state.local,
		});
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
				handleChangeCheckedCommerce,

				//Pos
				pos,
				locationPos,
				setLocationPos,
				setPos,
				//handles
				handleChangePos,
				handleParamsPos,
				handleCheckedPos,
				//Locations
				setEstado,
				setMunicipio,
				setCiudad,
				setParroquia,

				copyLocationToCommerce,
				copyLocationToPos,
				handleSourceAci,
				resetFm,
			}}>
			{children}
		</FMDataContext.Provider>
	);
};

export default FMDataContext;
