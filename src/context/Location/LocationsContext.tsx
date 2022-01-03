/* eslint-disable no-unused-vars */
import { createContext, useReducer, useLayoutEffect, ReactChild, ReactChildren } from 'react';

import axios from '../../config';

import { SET_ESTADO, SET_MUNICIPIO, SET_CIUDAD, SET_PARROQUIA, COPY_LOCATION } from './types';

import ListLocationClientReducer from './ListLocationClientReducer';

import { Estado, Municipio, ListLocation } from './interfaces';

export const LocationsContext = createContext({});

interface Props {
	children: ReactChild | ReactChildren;
}

const LocationsProvider = ({ children }: Props) => {
	const listClient: ListLocation = {
		estado: [],
		municipio: [],
		ciudad: [],
		parroquia: [],
	};

	const listCommerce: ListLocation = {
		estado: [],
		municipio: [],
		ciudad: [],
		parroquia: [],
	};

	const listPos: ListLocation = {
		estado: [],
		municipio: [],
		ciudad: [],
		parroquia: [],
	};

	const [listLocationClient, dispatchC] = useReducer(ListLocationClientReducer, listClient);
	const [listLocationCommerce, dispatchCC] = useReducer(ListLocationClientReducer, listCommerce);
	const [listLocationPos, dispatchP] = useReducer(ListLocationClientReducer, listPos);

	//Estado
	const setListEstadoClient = (estados: Estado[]) => {
		dispatchC({
			type: SET_ESTADO,
			payload: estados,
		});
	};

	const setListEstadoCommerce = (estados: Estado[]) => {
		dispatchCC({
			type: SET_ESTADO,
			payload: estados,
		});
	};

	const setListEstadoPos = (estados: Estado[]) => {
		dispatchP({
			type: SET_ESTADO,
			payload: estados,
		});
	};

	//Municipio
	const setListMunicipioClient = async (value: Municipio | null) => {
		if (value) {
			try {
				await axios.get(`/Location/${value.id}/municipio`).then((res: any) => {
					dispatchC({
						type: SET_MUNICIPIO,
						payload: res.data.info,
					});
				});
			} catch (e) {
				console.log(e);
				return [];
			}
		} else {
			dispatchC({
				type: SET_MUNICIPIO,
				payload: [],
			});
		}
	};

	const setListMunicipioCommerce = async (value: Municipio | null) => {
		if (value) {
			try {
				await axios.get(`/Location/${value.id}/municipio`).then((res: any) => {
					dispatchCC({
						type: SET_MUNICIPIO,
						payload: res.data.info,
					});
				});
			} catch (e) {
				console.log(e);
				return [];
			}
		} else {
			dispatchCC({
				type: SET_MUNICIPIO,
				payload: [],
			});
		}
	};

	const setListMunicipioPos = async (value: Municipio | null) => {
		if (value) {
			try {
				await axios.get(`/Location/${value.id}/municipio`).then((res: any) => {
					dispatchP({
						type: SET_MUNICIPIO,
						payload: res.data.info,
					});
				});
			} catch (e) {
				console.log(e);
				return [];
			}
		} else {
			dispatchP({
				type: SET_MUNICIPIO,
				payload: [],
			});
		}
	};

	//Ciudad
	const setListCiudadClient = async (id: number) => {
		if (id) {
			try {
				await axios.get(`/Location/${id}/ciudad`).then((res: any) => {
					dispatchC({
						type: SET_CIUDAD,
						payload: res.data.info,
					});
				});
			} catch (e) {
				console.log(e);
				return [];
			}
		} else {
			dispatchC({
				type: SET_CIUDAD,
				payload: [],
			});
		}
	};

	const setListCiudadCommerce = async (id: number) => {
		if (id) {
			try {
				await axios.get(`/Location/${id}/ciudad`).then((res: any) => {
					dispatchCC({
						type: SET_CIUDAD,
						payload: res.data.info,
					});
				});
			} catch (e) {
				console.log(e);
				return [];
			}
		} else {
			dispatchCC({
				type: SET_CIUDAD,
				payload: [],
			});
		}
	};

	const setListCiudadPos = async (id: number) => {
		if (id) {
			try {
				await axios.get(`/Location/${id}/ciudad`).then((res: any) => {
					dispatchP({
						type: SET_CIUDAD,
						payload: res.data.info,
					});
				});
			} catch (e) {
				console.log(e);
				return [];
			}
		} else {
			dispatchP({
				type: SET_CIUDAD,
				payload: [],
			});
		}
	};

	//Parroquia
	const setListParroquiaClient = async (id: number) => {
		try {
			await axios.get(`/Location/${id}/parroquia`).then((res: any) => {
				dispatchC({
					type: SET_PARROQUIA,
					payload: res.data.info,
				});
			});
		} catch (e) {
			console.log(e);
			return [];
		}
	};

	const setListParroquiaCommerce = async (id: number) => {
		try {
			await axios.get(`/Location/${id}/parroquia`).then((res: any) => {
				dispatchCC({
					type: SET_PARROQUIA,
					payload: res.data.info,
				});
			});
		} catch (e) {
			console.log(e);
			return [];
		}
	};

	const setListParroquiaPos = async (id: number) => {
		try {
			await axios.get(`/Location/${id}/parroquia`).then((res: any) => {
				dispatchP({
					type: SET_PARROQUIA,
					payload: res.data.info,
				});
			});
		} catch (e) {
			console.log(e);
			return [];
		}
	};

	useLayoutEffect(() => {
		const getEstados = async () => {
			try {
				await axios.get('/Location/estado').then((res: any) => {
					setListEstadoClient(res.data.info);
					setListEstadoCommerce(res.data.info);
					setListEstadoPos(res.data.info);
					return res.data.info;
				});
			} catch (e) {
				console.log(e);
				return [];
			}
		};
		getEstados();
	}, []);

	const copyListLocationCToCC = () => {
		dispatchCC({
			type: COPY_LOCATION,
			payload: listLocationClient,
		});
	};

	const copyListLocationCToP = () => {
		dispatchP({
			type: COPY_LOCATION,
			payload: listLocationClient,
		});
	};

	const copyListLocationCCToP = () => {
		dispatchP({
			type: COPY_LOCATION,
			payload: listLocationCommerce,
		});
	};

	return (
		<LocationsContext.Provider
			value={{
				listLocationClient,
				setListEstadoClient,
				setListMunicipioClient,
				setListCiudadClient,
				setListParroquiaClient,

				listLocationCommerce,
				setListEstadoCommerce,
				setListMunicipioCommerce,
				setListCiudadCommerce,
				setListParroquiaCommerce,

				listLocationPos,
				setListEstadoPos,
				setListMunicipioPos,
				setListCiudadPos,
				setListParroquiaPos,

				copyListLocationCToCC,
				copyListLocationCToP,
				copyListLocationCCToP,
			}}>
			{children}
		</LocationsContext.Provider>
	);
};

export default LocationsProvider;
