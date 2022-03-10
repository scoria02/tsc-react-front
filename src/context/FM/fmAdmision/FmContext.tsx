import useAxios from 'config';
import { Aci, Activity, base, TypeWallet } from 'context/DataList/interface';
import {
	fmClient,
	fmCommerce,
	fmError_ClientINT,
	fmError_CommerceINT,
	fmError_Interface,
	fmPos,
	IdClient_CommerceINT,
} from 'interfaces/fm';
import React, { createContext, Dispatch, ReactChild, SetStateAction, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { validateFormClient, validateFormCommerce } from 'validation/validFm';
import { fmErrorClient, initFmClient } from '../initialStates/stateClient';
import { fmErrorCommerce, initFmCommerce } from '../initialStates/stateCommerce';
import { initFmPos } from '../initialStates/statePos';
import { fmErrorFormat, initLocation } from '../initialStates/states';
import { Ciudad, Estado, LocationInt, Municipio, Parroquia } from '../Location/interfaces';
import { ContextFM } from './interface';

interface Props {
	children: ReactChild;
}

const FMDataContext = createContext<ContextFM>({
	typeSolict: 1,
	errorsFm: fmErrorFormat,
	errorsClient: fmErrorClient,
	errorsCommerce: fmErrorCommerce,
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
	//EndPoint
	validClientAndCommerce: () => {},
	idsCAndCc: null,
	aci: null,
	typeWallet: null,
	handleTypeWallet: () => {},
});

export const FMContextProvider = ({ children }: Props) => {
	const [typeSolict, setTypeSolict] = useState<number>(1);
	const [errorsFm, setErrorsFm] = useState<fmError_Interface>(fmErrorFormat);
	const [client, setClient] = useState<fmClient>(initFmClient);
	const [commerce, setCommerce] = useState<fmCommerce>(initFmCommerce);
	const [pos, setPos] = useState<fmPos>(initFmPos);
	const [activity, setActivity] = useState<Activity | null>(null);
	const [locationClient, setLocationClient] = useState<LocationInt>(initLocation);
	const [locationCommerce, setLocationCommerce] = useState<LocationInt>(initLocation);
	const [locationPos, setLocationPos] = useState<LocationInt>(initLocation);

	const [errorsClient, setErrorsClient] = useState<fmError_ClientINT>(fmErrorClient);
	const [errorsCommerce, setErrorsCommerce] = useState<fmError_CommerceINT>(fmErrorCommerce);

	const [idsCAndCc, setIdsCAndCc] = useState<IdClient_CommerceINT | null>(null);
	const [aci, setAci] = useState<Aci | null>(null);

	const [typeWallet, setTypeWallet] = useState<TypeWallet | null>(null);

	//Autocomplete location
	//const [autoCompleteCommerce, setAutoCompleteCommerce] = useState<boolean>(true);
	//const [autoCompletePos, setAutoCompletePos] = useState<boolean>(true);

	const resetFm = (): void => {
		setErrorsFm(fmErrorFormat);
		setErrorsClient(fmErrorClient);
		setErrorsCommerce(fmErrorCommerce);
		setClient(initFmClient);
		setCommerce(initFmCommerce);
		setPos(initFmPos);
		setActivity(null);
		setLocationClient(initLocation);
		setLocationCommerce(initLocation);
		setLocationPos(initLocation);
		setIdsCAndCc(null);
		setAci(null);
	};

	useEffect(() => {
		if (typeSolict === 1 || typeSolict === 3) {
			setCommerce((prevState) => {
				return {
					...prevState,
					id_ident_type: client.id_ident_type,
					ident_num: client.ident_num,
					name: client.name + ' ' + client.last_name,
				};
			});
		} else if (typeSolict === 2) {
			setCommerce((prevState) => {
				return {
					...prevState,
					id_ident_type: 3,
					ident_num: '',
				};
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [typeSolict, client.id_ident_type, client.ident_num, client.name, client.last_name]);

	useEffect(() => {
		if (pos.type_pay) {
			setPos({
				...pos,
				reqSource_docnum: '',
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pos.type_pay]);

	const handleTypeWallet = (event: any, value: TypeWallet | null, name: string): void => {
		if (value) {
			setTypeWallet(value);
		} else {
			setTypeWallet(null);
		}
	};

	const handleTypeSolict = (id: number): void => {
		setTypeSolict(id);
	};

	const handleChangeClient = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setErrorsClient(validateFormClient(client, errorsClient, event.target.name, event.target.value));
		setClient({
			...client,
			[event.target.name]: event.target.value,
		});
	};

	const handleChangeCommerce = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setErrorsCommerce(validateFormCommerce(commerce, errorsCommerce, event.target.name, event.target.value));
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
		//setErrorsFm(validateForm(pos, errorsFm, event.target.name, event.target.value));
		setPos({
			...pos,
			[event.target.name]: event.target.value,
		});
	};

	const handleParamsPos = (name: string, value: base | string | null): void => {
		//console.log(value);
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

	const handleSelectIdentClient = (name: string, value: number | string) => {
		setErrorsClient(validateFormClient(client, errorsClient, name, value));
		setClient({
			...client,
			[name]: value,
		});
	};

	const handleSelectIdentCommerce = (name: string, value: number | string) => {
		setErrorsCommerce(validateFormCommerce(commerce, errorsCommerce, name, value));
		setCommerce({
			...commerce,
			[name]: value,
		});
	};

	const handleSourceAci = (event: any, value: Aci | null, name: string): void => {
		if (value) {
			setAci(value);
		} else {
			setAci(null);
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

	const validClientAndCommerce = async (): Promise<boolean> => {
		const data = {
			id_ident_type: client.id_ident_type,
			ident_num: client.ident_num,
			id_ident_type_commerce: commerce.id_ident_type,
			ident_num_commerce: commerce.ident_num,
		};
		try {
			const res = await useAxios.post(`/FM/valid/extrapos`, data);
			const { nameClient, nameCommerce, emailClient, ...ids } = res.data.info;
			setIdsCAndCc(ids);
			setClient({
				...client,
				email: emailClient,
			});
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Cliente',
				text: ` ${nameClient}`,
				showConfirmButton: false,
				timer: 2000,
			});
			return true;
		} catch (error: any) {
			//console.log(error.response);
			setIdsCAndCc(null);
			Swal.fire('Error', error.response.data.message, 'error');
			return false;
		}
	};

	return (
		<FMDataContext.Provider
			value={{
				typeSolict,
				handleTypeSolict,
				errorsFm,
				errorsClient,
				errorsCommerce,
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

				//Endpoint
				validClientAndCommerce,
				idsCAndCc,
				aci,
				typeWallet,
				handleTypeWallet,
			}}>
			{children}
		</FMDataContext.Provider>
	);
};

export default FMDataContext;
