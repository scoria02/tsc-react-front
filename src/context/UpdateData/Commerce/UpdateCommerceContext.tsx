import axios from 'config';
import { PathImagesInt } from 'context/Admision/CreationFM/fmImages/interface';
import { initLocation } from 'context/Admision/CreationFM/initialStates/states';
import {
	Ciudad,
	Estado,
	ListLocation,
	LocationInt,
	Municipio,
	Parroquia,
	Sector,
} from 'context/Admision/CreationFM/Location/interfaces';
import { initialListLocation } from 'context/Admision/CreationFM/Location/LocationsContext';
import { Activity } from 'context/DataList/interface';
import React, { createContext, useEffect, useState } from 'react';
import { errorFile } from 'utils/validFormatFile';
import { ContextCommerceUpdata, PropsCommerceContext } from './interfaces';
import { ErrorCommerceData, initialImagesFm, initialImagesPath } from './state';
import * as valid from './validCommerce';

const UpdateCommerceContext = createContext<ContextCommerceUpdata>({
	disabled: false,
	ready: true,
	setDisabled: () => {},
	reset: () => {},
	//imagenes
	imagesActa: [],
	imagen: null,
	//
	pathImages: initialImagesPath,
	//
	handleChangeImages: () => {},
	handleChangeImagesActa: () => {},
	deleteItemActa: () => {},
	deleteImg: () => {},
	resetImages: () => {},
	//
	commerce: null,
	error: ErrorCommerceData,
	//
	handleChangeCommerce: () => {},
	handleChange: () => {},
	handleChangeLocation: () => {},
	handleChangeIdenType: () => {},
	//locatin
	location: null,
	setEstado: () => {},
	setMunicipio: () => {},
	setCiudad: () => {},
	setParroquia: () => {},
	setSector: () => {},
	//list location
	listLocations: initialListLocation,
	handleListMunicipio: () => {},
	handleListCiudad: () => {},
	handleListParroquia: () => {},
	handleListSector: () => {},
});

export const UpdateCommerceContextProvider = ({ children, data, closeModal }: PropsCommerceContext) => {
	const [ready, setReady] = useState(false);
	const [commerce, setCommerce] = useState<any>(null);
	const [error, setError] = useState(ErrorCommerceData);
	const [location, setLocation] = useState<LocationInt>(initLocation);
	const [imagesActa, setImagesActa] = useState<FileList | []>([]);
	const [imagen, setImagen] = useState<any>({
		rc_rif: null,
	});
	const [listLocations, setListLocations] = useState<ListLocation>(initialListLocation);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [activeStep, setActiveStep] = useState(0);

	const [pathImages, setPathImages] = useState<PathImagesInt>(initialImagesPath);
	const [disabled, setDisabled] = useState<boolean>(false);

	//console.log('commerces ', commerce);
	//console.log('locationx ', location);

	useEffect(() => {
		if (commerce && location) setReady(!valid.validReadyStep(activeStep, commerce, location, error));
	}, [commerce, error, location, activeStep]);

	useEffect(() => {
		if (!closeModal) {
			reset();
		}
		if (data) {
			const { id_location, special_contributor, days, id_aci, validate, ...commerceData } = data;
			const { id_direccion } = id_location;
			setCommerce({
				...commerceData,
				id_location: {
					id_direccion: id_direccion.id,
					calle: id_location.calle,
					local: id_location.local,
				},
			});
			setLocation({
				estado: {
					estado: id_direccion.estado,
				},
				municipio: {
					municipio: id_direccion.municipio,
				},
				ciudad: {
					ciudad: id_direccion.ciudad,
				},
				parroquia: {
					parroquia: id_direccion.parroquia,
				},
				sector: {
					sector: id_direccion.sector,
					id: id_direccion.id,
					codigoPostal: id_direccion.codigoPostal,
				},
			});
			getListLocations(id_direccion);
		} // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, closeModal]);

	useEffect(() => {
		if (
			listLocations.estado.length &&
			listLocations.municipio.length &&
			listLocations.ciudad.length &&
			listLocations.parroquia &&
			listLocations.sector
		) {
		}
	}, [location, listLocations]);

	/*
	const saveEstados = (estados: Estado[]): void => {
		setListLocations((prevState) => ({
			...prevState,
			estado: estados,
		}));
	};
	*/

	const getters = async (routes: string[]) => {
		try {
			const stop = routes.map(async (route: string) => {
				return await axios.get(route, {
					baseURL: process.env.REACT_APP_API_API,
					headers: { Authorization: `${localStorage.getItem('token')}` },
				});
			});

			const resps = await Promise.all(stop);

			return resps;
		} catch (err) {
			console.error('en getters', err);

			return [];
		}
	};

	const initList = (array: any[]) => {
		setListLocations({
			estado: array[0].data.info,
			municipio: array[1].data.info,
			ciudad: array[2].data.info,
			parroquia: array[3].data.info,
			sector: array[4].data.info,
		});
	};

	const getListLocations = (direccion: any) => {
		const routes = [
			`/direccion/estado`,
			`/direccion/${direccion.estado}/municipio`,
			`/direccion/${direccion.estado}/${direccion.municipio}/ciudad`,
			`/direccion/${direccion.estado}/${direccion.municipio}/${direccion.ciudad}/parroquia`,
			`/direccion/${direccion.estado}/${direccion.municipio}/${direccion.ciudad}/${direccion.parroquia}/sector`,
		];

		if (direccion.estado && direccion.municipio && direccion.ciudad && direccion.ciudad && direccion.sector)
			getters(routes)
				.then((responses) => {
					initList(responses);
				})
				.catch((errors) => {
					console.log('error multi axos', errors);
				});
	};

	const handleChange = (name: string, value: Activity | any) => {
		setCommerce({
			...commerce,
			[name]: value,
		});
	};

	const handleChangeCommerce = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name === 'name') {
			setError(valid.errorObject(commerce, error, 'nameCommerce', event.target.value));
		} else {
			setError(valid.errorObject(commerce, error, event.target.name, event.target.value));
		}
		if (event.target.name) {
			setCommerce({
				...commerce,
				[event.target.name]: event.target.value,
			});
		}
	};

	const handleChangeIdenType = (value: number) => {
		setCommerce({
			...commerce,
			id_ident_type: {
				...commerce.id_ident_type,
				id: value,
			},
		});
	};

	const handleChangeLocation = (name: string, value: number | string) => {
		setError(valid.errorObject(commerce, error, name, value));
		setCommerce({
			...commerce,
			id_location: {
				...commerce.id_location,
				[name]: value,
			},
		});
	};

	const setEstado = (data: Estado | null) => {
		if (data) {
			setLocation({
				estado: data,
				municipio: null,
				ciudad: null,
				parroquia: null,
				sector: null,
			});
		}
	};

	useEffect(() => {
		if (location.estado) {
			//console.log('validarlocaiton');
			setError(valid.errorObject(location, error, 'location', ''));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	const setMunicipio = (data: Municipio | null) => {
		setLocation((prevState) => ({
			...prevState,
			municipio: data,
			ciudad: null,
			parroquia: null,
			sector: null,
		}));
	};

	const setCiudad = (data: Ciudad | null) => {
		setLocation((prevState) => ({
			...prevState,
			ciudad: data,
			parroquia: null,
			sector: null,
		}));
	};

	const setParroquia = (data: Parroquia | null) => {
		setLocation((prevState) => ({
			...prevState,
			parroquia: data,
			sector: null,
		}));
	};

	const setSector = (data: Sector | null) => {
		setLocation((prevState) => ({
			...prevState,
			sector: data,
		}));
	};

	const reset = (): void => {
		console.log('reset data commerce');
		setCommerce(null);
		resetImages();
		resetListLocaitons();
	};

	const resetListLocaitons = (): void => {
		const { estado, ...extra } = initialListLocation;
		setListLocations({
			estado: listLocations.estado,
			...extra,
		});
	};

	const resetImages = () => {
		setImagesActa([]);
		setImagen(initialImagesFm);
	};

	const deleteItemActa = (id: number) => {
		const aux = commerce.rc_constitutive_act.filter((item: any) => item.id !== id);
		setCommerce({
			...commerce,
			rc_constitutive_act: aux,
		});
	};

	const handleChangeImagesActa = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			if (!errorFile(event)) {
				let files = event.target.files;
				setImagesActa(files);
			} else {
				setImagesActa([]);
			}
		}
	};

	const handleChangeImages = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event?.target?.files && event.target.files[0]) {
			let file = event.target.files[0];
			let newFile = new File([file], `${event.target.name}.${file.type.split('/')[1]}`, { type: file.type });
			const path2 = URL.createObjectURL(file);
			//const path = URL.createObjectURL(newFile);
			if (!errorFile(event)) {
				//Save img
				setImagen({
					...imagen,
					[event.target.name]: newFile,
				});
				setPathImages({
					...pathImages,
					[event.target.name]: {
						path: path2,
						type: (file.type as string).split('/')[1],
					},
				});
			} else {
				setImagen({
					...imagen,
					[event.target.name]: null,
				});
				setPathImages({
					...pathImages,
					[event.target.name]: '',
				});
			}
		}
	};

	const deleteImg = (name: string) => {
		setImagen({
			...imagen,
			[`rc_${name}`]: null,
		});
	};

	//list locations
	const handleListMunicipio = async (value: Estado | null) => {
		if (value) {
			try {
				await axios.get(`/direccion/${value.estado}/municipio`).then((res: any) => {
					//console.log(res.data.info);
					setListLocations((prevState) => ({
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
			setListLocations((prevState) => ({
				...prevState,
				municipio: [],
				ciudad: [],
				parroquia: [],
				sector: [],
			}));
		}
	};

	//Ciudad
	const handleListCiudad = async (xEstado: Estado | null, xMunicipio: Municipio | null) => {
		if (xEstado && xMunicipio) {
			try {
				await axios.get(`/direccion/${xEstado.estado}/${xMunicipio.municipio}/ciudad`).then((res: any) => {
					setListLocations((prevState) => ({
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
			setListLocations((prevState) => ({
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
		xCiudad: Ciudad | null
	) => {
		if (xEstado && xMunicpio && xCiudad) {
			try {
				await axios
					.get(`/direccion/${xEstado.estado}/${xMunicpio.municipio}/${xCiudad.ciudad}/parroquia`)
					.then((res: any) => {
						setListLocations((prevState) => ({
							...prevState,
							parroquia: res.data.info,
							sector: [],
						}));
					});
			} catch (e) {
				setListLocations((prevState) => ({
					...prevState,
					parroquia: [],
					sector: [],
				}));
			}
		} else {
			setListLocations((prevState) => ({
				...prevState,
				parroquia: [],
			}));
		}
	};

	const handleListSector = async (
		xEstado: Estado | null,
		xMunicpio: Municipio | null,
		xCiudad: Ciudad | null,
		xParroquia: Parroquia | null
	) => {
		if (xEstado && xMunicpio && xCiudad && xParroquia) {
			try {
				await axios
					.get(
						`/direccion/${xEstado.estado}/${xMunicpio.municipio}/${xCiudad.ciudad}/${xParroquia.parroquia}/sector`
					)
					.then((res: any) => {
						setListLocations((prevState) => ({
							...prevState,
							sector: res.data.info,
						}));
					});
			} catch (e) {
				setListLocations((prevState) => ({
					...prevState,
					sector: [],
				}));
			}
		} else {
			setListLocations((prevState) => ({
				...prevState,
				sector: [],
			}));
		}
	};

	return (
		<UpdateCommerceContext.Provider
			value={{
				disabled,
				ready,
				setDisabled,
				reset,
				handleChangeCommerce,
				//images
				imagesActa,
				imagen,
				//
				pathImages,
				//
				handleChangeImages,
				handleChangeImagesActa,
				deleteImg,
				deleteItemActa,
				resetImages,
				//
				commerce,
				error,
				handleChange,
				handleChangeLocation,
				handleChangeIdenType,
				//location
				location,
				setEstado,
				setMunicipio,
				setCiudad,
				setParroquia,
				setSector,
				//list locations
				listLocations,
				handleListMunicipio,
				handleListCiudad,
				handleListParroquia,
				handleListSector,
			}}>
			{children}
		</UpdateCommerceContext.Provider>
	);
};

export default UpdateCommerceContext;
