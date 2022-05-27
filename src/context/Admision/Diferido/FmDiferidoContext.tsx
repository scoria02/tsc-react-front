import { ImagesInt, PathImagesInt } from 'context/Admision/CreationFM/fmImages/interface';
import { fmError_ClientINT } from 'interfaces/fm';
import React, { createContext, useEffect, useState } from 'react';
import { errorFile } from 'utils/validFormatFile';
import { ClientDif, fmErrorDif_ClientINT } from './interfaces/client_interface';
import { ContextFMDif, PropsAd } from './interfaces';
import { fmErrorDifClient, fmErrorDifCommerce, initialImagesFm, initialImagesPath } from './state';
import { fmErrorClient } from 'context/Admision/CreationFM/initialStates/stateClient';
import { fmErrorCommerce } from '../CreationFM/initialStates/stateCommerce';
import * as valid from 'context/UpdateData/Commerce/validCommerce';
import { fmErrorDif_CommerceINT } from './interfaces/commerce_intercae';
import { Activity } from 'context/DataList/interface';

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
	handleChange: () => {},
	handleChangeClient: () => {},
	handleChangeCommerce: () => {},
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
	errorCommerce: fmErrorDifCommerce,
	locationClient: null,
	handleChangeActivity: () => {},
	//
	commerce: null,
	pos: null,
	locationCommerce: null,
	locationPos: null,
	phones: null,
	handleChangeClientPhone: () => {},
	handleChangeRefClient: () => {},
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
	const [listValidated, setListValidated] = useState<any>(null);
	const [solic, setSolic] = useState<any>(null);
	//
	const [activeStep, setActiveStep] = useState<number>(0);
	const [ready, setReady] = useState<boolean>(false);
	//
	const [stepsFM, setStepsFM] = useState(baseSteps);
	const [codeFM, setCodeFM] = useState<string>('');
	//
	const [client, setClient] = useState<any>(null);
	const [locationClient, setLocationClient] = useState<any>(null);
	const [idLocationClient, setIdLocationClient] = useState<number>(0);
	const [errorClient, setErrorClient] = useState<fmErrorDif_ClientINT>(fmErrorDifClient);
	//
	const [commerce, setCommerce] = useState<any>(null);
	const [locationCommerce, setLocationCommerce] = useState<any>(null);
	const [idLocationCommerce, setIdLocationCommerce] = useState<number>(0);
	const [errorCommerce, setErrorCommerce] = useState<fmErrorDif_CommerceINT>(fmErrorDifCommerce);
	//
	const [pos, setPos] = useState<any>(null);
	const [locationPos, setLocationPos] = useState<any>(null);
	const [idLocationPos, setIdLocationPos] = useState<number>(0);
	//
	const [imagePlanilla, setImagePlanilla] = useState<FileList | []>([]);
	//
	const [imagesActa, setImagesActa] = useState<FileList | []>([]);
	//
	const [imagesForm, setImagesForm] = useState<ImagesInt>(initialImagesFm);
	const [pathImages, setPathImages] = useState<PathImagesInt>(initialImagesPath);
	//
	const [disabled, setDisabled] = useState<boolean>(false);

	const [phones, setPhones] = useState({
		phone1: '',
		phone2: '',
	});

	//nuevooo
	useEffect(() => {
		const validStep = () => {
			console.log('step actual', stepsFM[activeStep]);
			switch (stepsFM[activeStep]) {
				case 'Cliente':
					return !valid.validReadyStepBO(client, locationClient, errorClient);
				case 'Comercio':
					return !valid.validReadyStepBO(commerce, locationCommerce, errorCommerce);
				default:
					return false;
			}
		};
		if (fm) {
			console.log('validar', validStep());
			setReady(validStep());
		}
	}, [activeStep, client, errorClient, commerce, locationClient, locationCommerce, errorCommerce]);

	const handleChangeCommerce = (event: React.ChangeEvent<HTMLInputElement>) => {
		setErrorClient(valid.errorObject(commerce, errorCommerce, event.target.name, event.target.value));
		if (event.target.name && commerce) {
			//setError(valid.errorObject(commerce, error, name, value));
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
			setClient({
				...client,
				id_ident_type: {
					...client.id_ident_type,
					id: event.target.value,
				},
			});
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
				});
				setIdLocationClient(id_direccion.id);
				setPhones({
					phone1: fm.id_client.phones[0].phone.slice(3, fm.id_client.phones[0].phone.length),
					phone2:
						fm.id_client.phones[1].phone.length > 10
							? fm.id_client.phones[1].phone.slice(3, fm.id_client.phones[1].phone.length)
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
			setPos(fm);
			setSolic(fm);
			setLocationPos(fm.pos[0].id_location);
			setCodeFM(fm.code);
			setListValidated(fm.id_valid_request);
			setStepsFM(getSteps(fm.id_valid_request, fm.id_client.validate, fm.id_commerce.validate));
		} else {
			resetFm();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fm]);

	useEffect(() => {
		if (locationClient?.estado) {
			setErrorClient(valid.errorObject(locationClient, errorClient, 'location', ''));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationClient]);

	useEffect(() => {
		if (locationCommerce?.estado) {
			console.log('validar commerce');
			setErrorCommerce(valid.errorObject(locationCommerce, errorCommerce, 'location', ''));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationCommerce]);
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
		setSolic({
			...solic,
			[event.target.name]: event.target.value,
		});
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
		const aux = solic['rc_planilla'].filter((item: any) => item.id !== id);
		setSolic({
			...solic,
			rc_planilla: aux,
		});
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
				activeStep,
				setActiveStep,
				ready,
				disabled,
				setDisabled,
				initFm,
				resetFm,
				handleChange,
				handleChangeClient,
				handleChangeCommerce,
				//images
				imagePlanilla,
				imagesActa,
				imagesForm,
				//
				pathImages,
				//
				handleChangePlanilla,
				deleteItemPlanilla,
				//
				handleChangeImages,
				handleChangeImagesActa,
				deleteImg,
				deleteItemActa,
				removePlanilla,
				resetImages,
				//
				codeFM,
				listValidated,
				stepsFM,
				solic,
				//
				client,
				locationClient,
				errorClient,
				//
				commerce,
				locationCommerce,
				errorCommerce,
				handleChangeActivity,
				//
				pos,
				locationPos,
				phones,
				handleChangeClientPhone,
				handleChangeRefClient,
				//
				handleChangeIdenType,
				//
				//location
				setLocationClient,
				setLocationCommerce,
				setLocationPos,
				//
				setIdLocationClient,
				setIdLocationCommerce,
				setIdLocationPos,
				idLocationClient,
				idLocationCommerce,
				idLocationPos,
			}}>
			{children}
		</FMDiferidoContext.Provider>
	);
};

export default FMDiferidoContext;
