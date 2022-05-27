/* eslint-disable no-unused-vars */
import axios from 'config';
import { gettersAxios } from 'context/utilitis/multiPromisesAxios';
import {
	createContext,
	Dispatch,
	ReactChild,
	ReactChildren,
	SetStateAction,
	useLayoutEffect,
	useState,
} from 'react';
import { Ciudad, Estado, ListLocation, Municipio, Parroquia } from './interfaces';

interface Props {
	children: ReactChild | ReactChildren;
}

export const initialListLocation: ListLocation = {
	estado: [],
	municipio: [],
	ciudad: [],
	parroquia: [],
	sector: [],
};

interface ContextLocations {
	listLocationClient: ListLocation;
	listLocationCommerce: ListLocation;
	listLocationPos: ListLocation;
	setListLocationClient: Dispatch<SetStateAction<ListLocation>>;
	setListLocationCommerce: Dispatch<SetStateAction<ListLocation>>;
	setListLocationPos: Dispatch<SetStateAction<ListLocation>>;
	handleListMunicipio(value: Estado | null, setListLocation: Dispatch<SetStateAction<ListLocation>>): void;
	handleListCiudad(
		xEstado: Estado | null,
		xMunicpio: Municipio | null,
		setListLocation: Dispatch<SetStateAction<ListLocation>>
	): void;
	handleListParroquia(
		xEstado: Estado | null,
		xMunicpio: Municipio | null,
		xCiudad: Ciudad | null,
		setListLocation: Dispatch<SetStateAction<ListLocation>>
	): void;
	handleListSector(
		xEstado: Estado | null,
		xMunicpio: Municipio | null,
		xCiudad: Ciudad | null,
		xParroquia: Parroquia | null,
		setListLocation: Dispatch<SetStateAction<ListLocation>>
	): void;
	copyListLocationToCommerce(stateListLocation: ListLocation): void;
	copyListLocationToPos(stateListLocation: ListLocation): void;
	resetListLocaitons(): void;
	initListLocation(direccion: any, setListLocation: Dispatch<SetStateAction<ListLocation>>): void;
}

const LocationsContext = createContext<ContextLocations>({
	listLocationClient: initialListLocation,
	listLocationCommerce: initialListLocation,
	listLocationPos: initialListLocation,
	setListLocationClient: () => {},
	setListLocationCommerce: () => {},
	setListLocationPos: () => {},
	handleListMunicipio: () => {},
	handleListCiudad: () => {},
	handleListParroquia: () => {},
	handleListSector: () => {},
	copyListLocationToCommerce: () => {},
	copyListLocationToPos: () => {},
	resetListLocaitons: () => {},
	initListLocation: () => {},
});

export const LocationsProvider = ({ children }: Props) => {
	const [listLocationClient, setListLocationClient] = useState<ListLocation>(initialListLocation);
	const [listLocationCommerce, setListLocationCommerce] = useState<ListLocation>(initialListLocation);
	const [listLocationPos, setListLocationPos] = useState<ListLocation>(initialListLocation);

	const resetListLocaitons = (): void => {
		const { estado, ...extra } = initialListLocation;
		setListLocationClient({
			estado: listLocationClient.estado,
			...extra,
		});
		setListLocationPos({
			estado: listLocationPos.estado,
			...extra,
		});
		setListLocationCommerce({
			estado: listLocationCommerce.estado,
			...extra,
		});
	};

	const initList = (array: any[], setListLocation: Dispatch<SetStateAction<ListLocation>>) => {
		console.log('array', array);
		setListLocation((prevState: any) => ({
			...prevState,
			municipio: array[0].data.info,
			ciudad: array[1].data.info,
			parroquia: array[2].data.info,
			sector: array[3].data.info,
		}));
	};

	const initListLocation = (direccion: any, setListLocation: Dispatch<SetStateAction<ListLocation>>) => {
		console.log('buscar paraxd', direccion);
		const routes = [
			`/direccion/${direccion.estado}/municipio`,
			`/direccion/${direccion.estado}/${direccion.municipio}/ciudad`,
			`/direccion/${direccion.estado}/${direccion.municipio}/${direccion.ciudad}/parroquia`,
			`/direccion/${direccion.estado}/${direccion.municipio}/${direccion.ciudad}/${direccion.parroquia}/sector`,
		];

		if (direccion.estado && direccion.municipio && direccion.ciudad && direccion.ciudad)
			gettersAxios(routes)
				.then((responses) => {
					initList(responses, setListLocation);
				})
				.catch((errors) => {
					console.log('error multi axos', errors);
				});
	};
	//-------------Init lIstas

	//Estado
	const setListEstado = (estados: Estado[], setListLocation: Dispatch<SetStateAction<ListLocation>>) => {
		setListLocation((prevState) => ({
			...prevState,
			estado: estados,
		}));
	};

	//Municipio
	const handleListMunicipio = async (
		value: Estado | null,
		setListLocation: Dispatch<SetStateAction<ListLocation>>
	) => {
		//console.log('Buscar', value);
		if (value) {
			try {
				await axios.get(`/direccion/${value.estado}/municipio`).then((res: any) => {
					//console.log(res.data.info);
					setListLocation((prevState) => ({
						...prevState,
						municipio: res.data.info,
						ciudad: [],
						parroquia: [],
						sector: [],
					}));
				});
			} catch (e) {
				console.log(e);
				return [];
			}
		} else {
			setListLocation((prevState) => ({
				...prevState,
				municipio: [],
				ciudad: [],
				parroquia: [],
				sector: [],
			}));
		}
	};

	//Ciudad
	const handleListCiudad = async (
		xEstado: Estado | null,
		xMunicpio: Municipio | null,
		setListLocation: Dispatch<SetStateAction<ListLocation>>
	) => {
		if (xEstado && xMunicpio) {
			try {
				await axios.get(`/direccion/${xEstado.estado}/${xMunicpio.municipio}/ciudad`).then((res: any) => {
					setListLocation((prevState) => ({
						...prevState,
						ciudad: res.data.info,
						parroquia: [],
						sector: [],
					}));
				});
			} catch (e) {
				return [];
			}
		} else {
			setListLocation((prevState) => ({
				...prevState,
				ciudad: [],
				parroquia: [],
				sector: [],
			}));
		}
	};

	//Parroquia
	const handleListParroquia = async (
		xEstado: Estado | null,
		xMunicpio: Municipio | null,
		xCiudad: Ciudad | null,
		setListLocation: Dispatch<SetStateAction<ListLocation>>
	) => {
		if (xEstado && xMunicpio && xCiudad) {
			try {
				await axios
					.get(`/direccion/${xEstado.estado}/${xMunicpio.municipio}/${xCiudad.ciudad}/parroquia`)
					.then((res: any) => {
						setListLocation((prevState) => ({
							...prevState,
							parroquia: res.data.info,
							sector: [],
						}));
					});
			} catch (e) {
				setListLocation((prevState) => ({
					...prevState,
					parroquia: [],
					sector: [],
				}));
			}
		} else {
			setListLocation((prevState) => ({
				...prevState,
				parroquia: [],
			}));
		}
	};

	const handleListSector = async (
		xEstado: Estado | null,
		xMunicpio: Municipio | null,
		xCiudad: Ciudad | null,
		xParroquia: Parroquia | null,
		setListLocation: Dispatch<SetStateAction<ListLocation>>
	) => {
		if (xEstado && xMunicpio && xCiudad && xParroquia) {
			try {
				await axios
					.get(
						`/direccion/${xEstado.estado}/${xMunicpio.municipio}/${xCiudad.ciudad}/${xParroquia.parroquia}/sector`
					)
					.then((res: any) => {
						setListLocation((prevState) => ({
							...prevState,
							sector: res.data.info,
						}));
					});
			} catch (e) {
				setListLocation((prevState) => ({
					...prevState,
					sector: [],
				}));
			}
		} else {
			setListLocation((prevState) => ({
				...prevState,
				sector: [],
			}));
		}
	};

	const saveEstados = (estados: Estado[]): void => {
		setListEstado(estados, setListLocationClient);
		setListEstado(estados, setListLocationCommerce);
		setListEstado(estados, setListLocationPos);
	};

	useLayoutEffect(() => {
		const getDirecciones = async () => {
			try {
				await axios.get('/direccion/estado').then((res: any) => {
					saveEstados(res.data.info);
				});
			} catch (e) {
				console.log(e);
			}
		};
		getDirecciones();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const copyListLocationToCommerce = (stateListLocation: ListLocation) => {
		setListLocationCommerce(stateListLocation);
	};

	const copyListLocationToPos = (stateListLocation: ListLocation) => {
		setListLocationPos(stateListLocation);
	};

	return (
		<LocationsContext.Provider
			value={{
				listLocationClient,
				listLocationCommerce,
				listLocationPos,

				setListLocationClient,
				setListLocationCommerce,
				setListLocationPos,

				//handles
				handleListMunicipio,
				handleListCiudad,
				handleListParroquia,
				handleListSector,

				//Copy List Locations
				copyListLocationToCommerce,
				copyListLocationToPos,

				resetListLocaitons,
				initListLocation,
			}}>
			{children}
		</LocationsContext.Provider>
	);
};

export default LocationsContext;
