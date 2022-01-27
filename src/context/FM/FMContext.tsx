/* eslint-disable no-unused-vars */
import { ReactChild, ReactChildren } from 'react';
import {
	CHANGE_FM,
	SET_FM,
	//CHANGE_ErrorFM,
	SET_ErrorFM,
	CHANGE_DAYS,
	SET_DAYS,
	SET_ESTADO_S,
	SET_MUNICIPIO_S,
	SET_CIUDAD_S,
	SET_PARROQUIA_S,
	SET_ACTIVITY,
	COPY_LOCATION,
	SET_LOCATION,
	SELECT_TYPE_SOLICT,
} from './type';

import { createContext, useReducer } from 'react';

import FMReducer from './FMReducer';
import FMLocationReducer from '../FMLocation/FMLocationReducer';

import { fm_Interface, fmError_Interface, Days, fmState_Interface } from './interfaces';
import { Activity } from '../DataList/interface';
import { Estado, Municipio, Ciudad, Parroquia, Location } from '../Location/interfaces';

import { fmFormat, fmErrorFormat, daysWork, location } from './states';
import { validateForm } from '../../components/validation/validFm';
import ClientReducer from './client/ClientReducer';
import { validInputString } from '../../utils/fm';

import { initFmClient } from './client/stateClient';
import { initFmCommerce } from './commerce/stateCommerce';
import CommerceReducer from './commerce/CommerceReducer';
import PosReducer from './pos/PosReducer';
import { initFmPos } from './pos/statePos';

export const FMContext = createContext({});

interface Props {
	children: ReactChild | ReactChildren;
}

const FMProvider = ({ children }: Props) => {
	const initialState: fmState_Interface = {
		typeSolict: 0,
		fmData: fmFormat,
		days: daysWork,
		codePhone: '58',
		activity: null,
		fmDataError: fmErrorFormat,
	};

	const [fmState, dispatch] = useReducer(FMReducer, initialState);

	//Prueba divider fm [divide]
	const [fmClient, dispatchFmClient] = useReducer(ClientReducer, initFmClient);
	const [fmCommerce, dispatchFmCommerce] = useReducer(CommerceReducer, initFmCommerce);
	const [fmPos, dispatchFmPos] = useReducer(PosReducer, initFmPos);

	const [locationClient, dispatchC] = useReducer(FMLocationReducer, location);
	const [locationCommerce, dispatchCC] = useReducer(FMLocationReducer, location);
	const [locationPos, dispatchP] = useReducer(FMLocationReducer, location);

	const { fmData, fmDataError } = fmState;

	//Cliente
	const handleChangeNameClient = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (validInputString(event)) {
			handleChangeClient(event);
		}
	};

	const handleChangeClient = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setFmError(validateForm(fmData, fmDataError, event.target.name, event.target.value));
		dispatchFmClient({
			type: CHANGE_FM,
			payload: event.target,
		});
	};

	const setClient = (client: any): void => {
		dispatchFmClient({
			type: SET_FM,
			payload: client,
		});
	};

	////Client location
	const setEstadoClient = (data: Estado) => {
		dispatchC({
			type: SET_ESTADO_S,
			payload: data,
		});
		setClient({
			...fmClient,
			id_estado_client: data ? data.id : 0,
			id_municipio_client: 0,
			id_ciudad_client: 0,
			id_parroquia_client: 0,
		});
	};

	const setMunicipioClient = (data: Municipio) => {
		dispatchC({
			type: SET_MUNICIPIO_S,
			payload: data,
		});
		setClient({
			...fmClient,
			id_municipio_client: data ? data.id : 0,
			id_ciudad_client: 0,
			id_parroquia_client: 0,
		});
	};

	const setCiudadClient = (data: Ciudad) => {
		dispatchC({
			type: SET_CIUDAD_S,
			payload: data,
		});
		setClient({
			...fmClient,
			id_ciudad_client: data ? data.id : 0,
			id_parroquia_client: 0,
			codigo_postal_client: data ? data.postal_code : '',
		});
	};

	const setParroquiaClient = (data: Parroquia) => {
		dispatchC({
			type: SET_PARROQUIA_S,
			payload: data,
		});
		setClient({
			...fmClient,
			id_parroquia_client: data ? data.id : 0,
		});
	};
	//...Cliente

	//Commerce [divide]

	const handleChangeCommerce = (event: React.ChangeEvent<HTMLInputElement>): void => {
		dispatchFmCommerce({
			type: CHANGE_FM,
			payload: event.target,
		});
	};

	const handleParamsCommerce = (name: string, value: string | number | boolean): void => {
		const data = { name, value };
		dispatchFmCommerce({
			type: CHANGE_FM,
			payload: data,
		});
	};

	const setCommerce = (client: any): void => {
		dispatchFmCommerce({
			type: SET_FM,
			payload: client,
		});
	};

	//Commerce location
	const setEstadoCommerce = (data: Estado) => {
		dispatchCC({
			type: SET_ESTADO_S,
			payload: data,
		});
		setCommerce({
			...fmCommerce,
			id_estado: data ? data.id : 0,
			id_municipio: 0,
			id_ciudad: 0,
			id_parroquia: 0,
		});
	};

	const setMunicipioCommerce = (data: Municipio) => {
		dispatchCC({
			type: SET_MUNICIPIO_S,
			payload: data,
		});
		setCommerce({
			...fmCommerce,
			id_municipio: data ? data.id : 0,
			id_ciudad: 0,
			id_parroquia: 0,
		});
	};

	const setCiudadCommerce = (data: Ciudad) => {
		dispatchCC({
			type: SET_CIUDAD_S,
			payload: data,
		});
		setCommerce({
			...fmCommerce,
			id_ciudad: data ? data.id : 0,
			id_parroquia: 0,
			codigo_postal: data ? data.postal_code : '',
		});
	};

	const setParroquiaCommerce = (data: Parroquia) => {
		dispatchCC({
			type: SET_PARROQUIA_S,
			payload: data,
		});
		setCommerce({
			...fmCommerce,
			id_parroquia: data ? data.id : 0,
		});
	};

	//...Commerce

	//Pos [divide]
	const handleChangePos = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setFmError(validateForm(fmData, fmDataError, event.target.name, event.target.value));
		dispatchFmPos({
			type: CHANGE_FM,
			payload: event.target,
		});
	};

	const setPos = (client: any): void => {
		dispatchFmPos({
			type: SET_FM,
			payload: client,
		});
	};

	//Pos location
	const setEstadoPos = (data: Estado) => {
		dispatchP({
			type: SET_ESTADO_S,
			payload: data,
		});
		setPos({
			...fmPos,
			id_estado: data ? data.id : 0,
			id_municipio: 0,
			id_ciudad: 0,
			id_parroquia: 0,
		});
	};

	const setMunicipioPos = (data: Municipio) => {
		dispatchP({
			type: SET_MUNICIPIO_S,
			payload: data,
		});
		setPos({
			...fmPos,
			id_municipio: data ? data.id : 0,
			id_ciudad: 0,
			id_parroquia: 0,
		});
	};

	const setCiudadPos = (data: Ciudad) => {
		dispatchP({
			type: SET_CIUDAD_S,
			payload: data,
		});
		setPos({
			...fmPos,
			id_ciudad: data ? data.id : 0,
			id_parroquia: 0,
			codigo_postal: data ? data.postal_code : '',
		});
	};

	const setParroquiaPos = (data: Parroquia) => {
		dispatchP({
			type: SET_PARROQUIA_S,
			payload: data,
		});
		setPos({
			...fmPos,
			id_parroquia: data ? data.id : 0,
		});
	};

	const setActivity = (data: Activity) => {
		dispatch({
			type: SET_ACTIVITY,
			payload: data,
		});
	};

	//...Pos

	const selectTypeSolict = (value: number): void => {
		dispatch({
			type: SELECT_TYPE_SOLICT,
			payload: value,
		});
	};

	const changeFmData = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const data: { name: string; value: string | number } = {
			name: event.target.name,
			value: event.target.value,
		};

		setFmError(validateForm(fmData, fmDataError, data.name, data.value));

		dispatch({
			type: CHANGE_FM,
			payload: data,
		});
	};

	const changeFmParms = (name: string, value: string | number) => {
		dispatch({
			type: CHANGE_FM,
			payload: { name: name, value: value },
		});
	};

	const setFmData = (fm: fm_Interface) => {
		console.log(fm);
		dispatch({
			type: SET_FM,
			payload: fm,
		});
	};

	const setFmError = (fmError: fmError_Interface) => {
		dispatch({
			type: SET_ErrorFM,
			payload: fmError,
		});
	};

	const changeDays = (event: React.ChangeEvent<HTMLInputElement>) => {
		const data: { name: string; value: boolean } = {
			name: event.target.name,
			value: event.target.checked,
		};
		dispatch({
			type: CHANGE_DAYS,
			payload: data,
		});
	};

	const setDays = (days: Days) => {
		dispatch({
			type: SET_DAYS,
			payload: days,
		});
	};

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

	const setLocationClient = (location: Location) => {
		dispatchC({
			type: SET_LOCATION,
			payload: location,
		});
	};

	const setLocationCommerce = (location: Location) => {
		dispatchCC({
			type: SET_LOCATION,
			payload: location,
		});
	};

	const setLocationPos = (location: Location) => {
		dispatchP({
			type: SET_LOCATION,
			payload: location,
		});
	};

	return (
		<FMContext.Provider
			value={{
				selectTypeSolict,
				//Cliente [divide]
				fmClient,
				handleChangeClient,
				handleChangeNameClient,
				//Cliente location
				setEstadoClient,
				setMunicipioClient,
				setCiudadClient,
				setParroquiaClient,

				//Commerce
				fmCommerce,
				handleChangeCommerce,
				handleParamsCommerce,
				//Commerce Location
				setEstadoCommerce,
				setMunicipioCommerce,
				setCiudadCommerce,
				setParroquiaCommerce,

				//Pos
				fmPos,
				handleChangePos,
				//Commerce Location
				setEstadoPos,
				setMunicipioPos,
				setCiudadPos,
				setParroquiaPos,

				//.........................
				//FM
				...fmState,
				changeFmData,
				changeFmParms,
				setFmData,
				changeDays,
				setDays,
				setActivity,
				//Location Fm
				locationClient,
				locationCommerce,
				locationPos,

				setLocationClient,
				setLocationCommerce,
				setLocationPos,

				copyLocationCToCC,
				copyLocationCToP,
				copyLocationCCToP,
				setFmError,
			}}>
			{children}
		</FMContext.Provider>
	);
};

export default FMProvider;
