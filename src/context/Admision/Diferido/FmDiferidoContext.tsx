import React, { createContext, useEffect, useState } from 'react';
import { errorFile } from 'utils/validFormatFile';
import { ClientDif, fmErrorDif_ClientINT } from './interfaces/client_interface';
import { ContextFMDif, PropsAd } from './interfaces/interfaces';
import {
	fmErrorDifClient,
	fmErrorDifCommerce,
	fmErrorDifSolic,
	initialImagesFm,
	initialImagesPath,
} from './state';
import * as valid from 'context/UpdateData/Commerce/validCommerce';
import { Activity } from 'context/DataList/interface';
//redux
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
//interface
import { PosDif, SolicDif } from './interfaces/pos_interface';
import { fmErrorDif_CommerceINT } from './interfaces/commerce_intercae';
import { ImagesInt, PathImagesInt } from 'context/Admision/CreationFM/fmImages/interface';
import { fmErrorDif_SolicINT } from './interfaces/solic_interface';

const baseSteps = [
	'Información Personal del Cliente',
	'Información del Comercio',
	'Dirección del Comercio/POS',
	'Solicitud de POS',
];

const FMDiferidoContext = createContext<ContextFMDif>({
	activeStep: 0,
	setActiveStep: () => {},
	ready: false,
	disabled: false,
	setDisabled: () => {},
	initFm: () => {},
	resetFm: () => {},
	errorSolic: fmErrorDifSolic,
	//
	handleChange: () => {},
	handleChangeClient: () => {},
	handleChangeCommerce: () => {},
	handleChangePos: () => {},
	handleChangeLocationPos: () => {},
	imagePlanilla: [],
	imagesActa: [],
	imagesForm: initialImagesFm,
	//
	pathImages: initialImagesPath,
	//
	handleChangePlanilla: () => {},
	deleteItemPlanilla: () => {},
	//
	handleChangeImages: () => {},
	handleChangeImagesActa: () => {},
	deleteItemActa: () => {},
	deleteImg: () => {},
	removePlanilla: () => {},
	resetImages: () => {},
	//
	handleChangeIdenType: () => {},
	//
	codeFM: '',
	listValidated: null,
	stepsFM: baseSteps,
	solic: null,
	//
	client: null,
	errorClient: fmErrorDifClient,
	locationClient: null,
	handleChangeActivity: () => {},
	//
	commerce: null,
	errorCommerce: fmErrorDifCommerce,
	locationCommerce: null,
	//
	pos: null,
	locationPos: null,
	errorPos: null,
	//
	phones: null,
	handleChangeClientPhone: () => {},
	handleChangeRefClient: () => {},
	//
	handleParamsPos: () => {},
	handleParamsSolic: () => {},
	//
	//edit
	setLocationClient: () => {},
	setLocationCommerce: () => {},
	setLocationPos: () => {},
	//
	idLocationClient: 0,
	idLocationCommerce: 0,
	idLocationPos: 0,
	setIdLocationClient: () => {},
	setIdLocationCommerce: () => {},
	setIdLocationPos: () => {},
});

function getSteps(validate: any, validateClient: number, validateCommerce: number) {
	const list: string[] = [];
	if (!validateClient && validate.id_typedif_client && !list.includes('Cliente')) list.push('Cliente');
	if (!validateCommerce && validate.id_typedif_commerce && !list.includes('Comercio')) list.push('Comercio');
	if (validate.id_typedif_consitutive_acta && !list.includes('Acta Const.')) list.push('Acta Const.');
	if (validate.id_typedif_special_contributor && !list.includes('Cont. Especial')) list.push('Cont. Especial');
	if (validate.id_typedif_pos && !list.includes('Pos')) list.push('Pos');
	if (validate.id_typedif_planilla && !list.includes('Planilla de Solicitud')) list.push('Planilla de Solicitud');
	if (validate.id_typedif_ref_bank && !list.includes('Referencia Bancaria')) list.push('Referencia Bancaria');
	if (validate.id_typedif_comp_num && !list.includes('Comprobante de Pago')) list.push('Comprobante de Pago');
	//
	return list;
}

export const FMDiferidoContextProvider = ({ children, fm }: PropsAd) => {
	//
	const { errorClientValid, errorCommerceValid }: any = useSelector((state: RootState) => state.fmAdmision);
	const [listValidated, setListValidated] = useState<any>(null);
	//
	//
	const [activeStep, setActiveStep] = useState<number>(0);
	const [ready, setReady] = useState<boolean>(false);
	//
	const [stepsFM, setStepsFM] = useState(baseSteps);
	const [codeFM, setCodeFM] = useState<string>('');
	//
	const [client, setClient] = useState<ClientDif | null>(null);
	const [locationClient, setLocationClient] = useState<any>(null);
	const [idLocationClient, setIdLocationClient] = useState<number>(0);
	const [errorClient, setErrorClient] = useState<fmErrorDif_ClientINT>(fmErrorDifClient);
	//
	const [commerce, setCommerce] = useState<any>(null);
	const [locationCommerce, setLocationCommerce] = useState<any>(null);
	const [idLocationCommerce, setIdLocationCommerce] = useState<number>(0);
	const [errorCommerce, setErrorCommerce] = useState<fmErrorDif_CommerceINT>(fmErrorDifCommerce);
	//
	const [pos, setPos] = useState<PosDif | null>(null);
	const [locationPos, setLocationPos] = useState<any>(null);
	const [idLocationPos, setIdLocationPos] = useState<number>(0);
	const [errorPos, setErrorPos] = useState<any>({});

	//
	const [imagePlanilla, setImagePlanilla] = useState<FileList | []>([]);
	//
	const [imagesActa, setImagesActa] = useState<FileList | []>([]);
	//
	const [imagesForm, setImagesForm] = useState<ImagesInt>(initialImagesFm);
	const [pathImages, setPathImages] = useState<PathImagesInt>(initialImagesPath);
	//
	const [disabled, setDisabled] = useState<boolean>(false);
	//
	const [solic, setSolic] = useState<SolicDif | null>(null);
	const [errorSolic, setErrorSolic] = useState<fmErrorDif_SolicINT>(fmErrorDifSolic);

	const [phones, setPhones] = useState({
		phone1: '',
		phone2: '',
	});

	//Iniciar data
	//console.log('client', client);
	useEffect(() => {
		if (
			fm &&
			(!client || !commerce || !pos || locationClient || !locationCommerce || !locationPos || !stepsFM.length)
		) {
			const { id_client, id_commerce } = fm;
			console.log('Diferido context', fm);
			if (id_client) {
				const { validate, phones, id_location, ref_person_1, ref_person_2, ...clientData } = id_client;
				const { id_direccion } = id_location;
				setClient({
					...clientData,
					ref_person_1: JSON.parse(ref_person_1),
					ref_person_2: JSON.parse(ref_person_2),
					id_direccion: id_direccion.id,
					calle: id_location.calle,
					local: id_location.local,
					id_location: id_location.id,
				});
				setIdLocationClient(id_direccion.id);
				setPhones({
					phone1: id_client.phones[0].phone.slice(3, fm.id_client.phones[0].phone.length),
					phone2:
						id_client.phones[1].phone.length > 10
							? id_client.phones[1].phone.slice(3, fm.id_client.phones[1].phone.length)
							: '',
				});
				setLocationClient(
					!id_direccion
						? null
						: {
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
						  }
				);
			}
			if (id_commerce) {
				const { special_contributor, validate, id_location, ...commerceData } = id_commerce;
				const { id_direccion } = id_location;
				setCommerce({
					...commerceData,
					id_direccion: id_direccion.id,
					calle: id_location.calle,
					local: id_location.local,
					id_location: id_location.id,
				});
				setIdLocationCommerce(id_direccion.id);
				setLocationCommerce(
					!id_direccion
						? null
						: {
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
						  }
				);
			}
			//create pos data
			const { code, nro_comp_dep, discount, pos, ...fmData } = fm;
			const { id_direccion, ...locationData } = pos[0].id_location;
			setPos({
				...fmData,
				id_location: pos[0].id_location.id,
				id_direccion: id_direccion.id,
				calle: locationData.calle,
				local: locationData.local,
			});
			setSolic(fm);
			//setCode
			setIdLocationPos(pos[0].id_location.id_direccion.id);
			setLocationPos(
				!id_direccion
					? null
					: {
							id: pos[0].id_location.id,
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
					  }
			);
			setCodeFM(fm.code);
			setListValidated(fm.id_valid_request);
			setStepsFM(getSteps(fm.id_valid_request, fm.id_client.validate, fm.id_commerce.validate));
		} else {
			resetFm();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fm]);

	//nuevooo
	useEffect(() => {
		const validStep = () => {
			//console.log('step actual', stepsFM[activeStep]);
			switch (stepsFM[activeStep]) {
				case 'Cliente':
					return !valid.validReadyStepBO(client, locationClient, errorClient, errorClientValid);
				case 'Comercio':
					return !valid.validReadyStepBO(commerce, locationCommerce, errorCommerce, errorCommerceValid);
				case 'Pos':
					return !valid.validReadyStepBO(pos, locationPos, errorPos, false);
				case 'Referencia Bancaria':
					return solic?.bank_account_num === '' || errorSolic.bank_account_num;
				case 'Comprobante de Pago':
					return solic?.nro_comp_dep === '' || errorSolic.nro_comp_dep;
				default:
					return false;
			}
		};
		if (solic) {
			//console.log('validar', validStep());
			setReady(validStep()); //true is disabled
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		solic,
		activeStep,
		client,
		phones,
		commerce,
		pos,
		locationClient,
		locationCommerce,
		locationPos,
		errorClient,
		errorCommerce,
		errorPos,
		errorClientValid,
		errorCommerceValid,
		errorSolic,
		activeStep,
	]);

	useEffect(() => {
		if (solic?.id_type_request.id !== 2 && client && commerce) {
			setCommerce({
				...commerce,
				id_ident_type: client.id_ident_type,
				ident_num: client.ident_num,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [client]);

	const handleChangePos = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrorPos(valid.errorObject(pos, errorPos, event.target.name, event.target.value));
		if (event.target.name && pos) {
			setPos({
				...pos,
				[event.target.name]: event.target.value,
			});
		}
	};

	const handleChangeLocationPos = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrorPos(valid.errorObject(pos, errorPos, event.target.name, event.target.value));
		if (event.target.name && pos) {
			setLocationPos({
				...locationPos,
				[event.target.name]: event.target.value,
			});
		}
	};

	const handleChangeCommerce = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrorCommerce(valid.errorObject(commerce, errorCommerce, event.target.name, event.target.value));
		if (event.target.name && commerce) {
			setCommerce({
				...commerce,
				[event.target.name]: event.target.value,
			});
		}
	};

	const handleChangeActivity = (name: string, value: Activity) => {
		setCommerce({
			...commerce,
			id_activity: value,
		});
	};

	const handleChangeIdenType = (event: any) => {
		if (event.target.name === 'client_type') {
			if (client) {
				setClient({
					...client,
					id_ident_type: {
						name: client.id_ident_type.name,
						id: event.target.value,
					},
				});
			}
		} else if (event.target.name === 'commerce_type')
			setCommerce({
				...commerce,
				id_ident_type: {
					...commerce.id_ident_type,
					id: event.target.value,
				},
			});
	};

	//---------------------------------------------------------------
	//Pos
	const handleParamsPos = (name: string, value: any): void => {
		//console.log(name, value);
		if (pos) {
			setPos({
				...pos,
				[name]: value,
			});
		}
	};

	const handleParamsSolic = (name: string, value: any): void => {
		//console.log(name, value);
		if (solic) {
			setSolic({
				...solic,
				[name]: value,
			});
		}
	};
	//

	useEffect(() => {
		if (locationClient?.estado) {
			setErrorClient(valid.errorObject(locationClient, errorClient, 'location', ''));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationClient]);

	useEffect(() => {
		if (locationCommerce?.estado) {
			//console.log('validar commerce');
			setErrorCommerce(valid.errorObject(locationCommerce, errorCommerce, 'location', ''));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationCommerce]);

	useEffect(() => {
		if (locationPos?.estado) {
			setErrorPos(valid.errorObject(locationPos, errorPos, 'location', ''));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationPos]);
	//
	//
	const handleChangeClient = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrorClient(valid.errorObject(client, errorClient, event.target.name, event.target.value));
		if (event.target.name && client) {
			setClient({
				...client,
				[event.target.name]: event.target.value,
			});
		}
	};

	//
	const handleChangeClientPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrorClient(valid.errorObject(phones, errorClient, event.target.name, event.target.value));
		setPhones({
			...phones,
			[event.target.name]: event.target.value,
		});
	};

	const handleChangeRefClient = (param: string, value: any) => {
		if (client) {
			setClient({
				...client,
				[param]: value,
			});
		}
	};

	//
	//
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrorSolic(valid.errorObject(solic, errorSolic, event.target.name, event.target.value));
		if (solic) {
			setSolic({
				...solic,
				[event.target.name]: event.target.value,
			});
		}
	};

	const initFm = (fmData: any): void => {
		//setFm(fmData);
		resetFm();
	};

	const resetFm = (): void => {
		setSolic(null);
		resetImages();
		setListValidated(null);
		setClient(null);
		setCommerce(null);
		setPos(null);
	};

	const resetImages = () => {
		setImagePlanilla([]);
		setImagesActa([]);
		setImagesForm(initialImagesFm);
	};

	const removePlanilla = () => {
		setImagePlanilla([]);
	};

	const deleteItemPlanilla = (id: number) => {
		if (solic) {
			const aux = solic['rc_planilla'].filter((item: any) => item.id !== id);
			setSolic({
				...solic,
				rc_planilla: aux,
			});
		}
	};

	const deleteItemActa = (id: number) => {
		const aux = commerce.rc_constitutive_act.filter((item: any) => item.id !== id);
		setCommerce({
			...commerce,
			rc_constitutive_act: aux,
		});
	};

	const handleChangePlanilla = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			if (!errorFile(event)) {
				let files = event.target.files;
				setImagePlanilla(files);
			} else {
				setImagePlanilla([]);
			}
		}
	};

	const handleChangeImagesActa = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			if (!errorFile(event)) {
				let files = event.target.files;
				setImagesActa(files);
			} else {
				setImagesActa([]);
				//setPathImagesActa([]);
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
				setImagesForm({
					...imagesForm,
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
				setImagesForm({
					...imagesForm,
					[event.target.name]: null,
				});
				setPathImages({
					...pathImages,
					[event.target.name]: '',
				});
			}
		}
	};

	/*
	const deleteImgsActa = () => {
		setImagesActa([]);
	};
	*/

	const deleteImg = (name: string) => {
		setImagesForm({
			...imagesForm,
			[`rc_${name}`]: null,
		});
	};

	return (
		<FMDiferidoContext.Provider
			value={{
				//data
				activeStep,
				codeFM,
				stepsFM,
				ready,
				disabled,
				initFm,
				resetFm,
				listValidated,
				//
				solic,
				client,
				commerce,
				pos,
				//
				//set Data
				setActiveStep,
				setDisabled,
				handleChange,
				handleChangeClient,
				handleChangeCommerce,
				handleChangePos,
				handleChangeActivity,
				//images
				imagePlanilla,
				imagesActa,
				imagesForm,
				pathImages,
				handleChangePlanilla,
				deleteItemPlanilla,
				handleChangeImages,
				handleChangeImagesActa,
				deleteImg,
				deleteItemActa,
				removePlanilla,
				resetImages,
				//
				handleParamsPos,
				//
				handleParamsSolic,
				//
				phones,
				handleChangeClientPhone,
				handleChangeRefClient,
				//
				handleChangeIdenType,
				//
				//location
				locationClient,
				locationCommerce,
				locationPos,
				setLocationClient,
				setLocationCommerce,
				setLocationPos,
				handleChangeLocationPos,
				//
				setIdLocationClient,
				setIdLocationCommerce,
				setIdLocationPos,
				idLocationClient,
				idLocationCommerce,
				idLocationPos,
				//error
				errorSolic,
				errorClient,
				errorPos,
				errorCommerce,
			}}>
			{children}
		</FMDiferidoContext.Provider>
	);
};

export default FMDiferidoContext;
