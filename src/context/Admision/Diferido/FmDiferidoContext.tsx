import { ImagesInt, PathImagesInt } from 'context/FM/fmImages/interface';
import React, { createContext, useEffect, useState } from 'react';
import { errorFile } from 'utils/validFormatFile';
import { ClientDif, ContextFMD, PropsAd } from './interfaces';
import { initialImagesFm, initialImagesPath } from './state';

const baseSteps = [
	'Información Personal del Cliente',
	'Información del Comercio',
	'Dirección del Comercio/POS',
	'Solicitud de POS',
];

const FMDiferidoContext = createContext<ContextFMD>({
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
	codeFM: '',
	listValidated: null,
	stepsFM: baseSteps,
	solic: null,
	client: null,
	commerce: null,
	pos: null,
	locationClient: null,
	locationCommerce: null,
	locationPos: null,
	phones: null,
	handleChangeClientPhone: () => {},
	handleChangeRefClient: () => {},
});

function getSteps(validate: any) {
	const list: string[] = [];
	if (validate.id_typedif_client && !list.includes('Cliente')) list.push('Cliente');
	if (validate.id_typedif_commerce && !list.includes('Comercio')) list.push('Comercio');
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
	const [stepsFM, setStepsFM] = useState(baseSteps);
	const [codeFM, setCodeFM] = useState<string>('');
	const [client, setClient] = useState<ClientDif | null>(null);
	const [commerce, setCommerce] = useState<any>(null);
	const [pos, setPos] = useState<any>(null);
	const [locationClient, setLocationClient] = useState<any>(null);
	const [solic, setSolic] = useState<any>(null);
	const [locationCommerce, setLocationCommerce] = useState<any>(null);
	const [locationPos, setLocationPos] = useState<any>(null);
	const [phones, setPhones] = useState({
		phone1: '',
		phone2: '',
	});

	console.log(fm);
	useEffect(() => {
		console.log(fm);
		if (fm) {
			if (!client || !commerce || !pos || locationClient || !locationCommerce || !locationPos || !stepsFM.length) {
				const { id_client, id_commerce } = fm;
				console.log('cargar data');
				console.log('fm context', fm);
				if (id_client) {
					const { phones, id_location, ref_person_1, ref_person_2, ...clientData } = id_client;
					setClient({
						...clientData,
						ref_person_1: JSON.parse(ref_person_1),
						ref_person_2: JSON.parse(ref_person_2),
					});
					setPhones({
						phone1: fm.id_client.phones[0].phone.slice(2, fm.id_client.phones[0].phone.length),
						phone2:
							fm.id_client.phones[1].phone.length > 10
								? fm.id_client.phones[1].phone.slice(2, fm.id_client.phones[1].phone.length)
								: '',
					});
					setLocationClient(id_location);
				}
				if (id_commerce) {
					const { id_location, ...commerceData } = id_commerce;
					setCommerce(commerce);
					setLocationCommerce(id_commerce.id_location);
				}
				setSolic(fm);
				setPos(fm);
				setLocationPos(fm.pos[0].id_location);
				setCodeFM(fm.code);
				setListValidated(fm.id_valid_request);
				setStepsFM(getSteps(fm.id_valid_request));
			}
		} else {
			resetFm();
		}
	}, [fm]);
	//
	const [imagePlanilla, setImagePlanilla] = useState<FileList | []>([]);
	//
	const [imagesActa, setImagesActa] = useState<FileList | []>([]);
	//const [pathImagesActa, setPathImagesActa] = useState<PathImage[]>([]);
	//
	//
	const [imagesForm, setImagesForm] = useState<ImagesInt>(initialImagesFm);
	const [pathImages, setPathImages] = useState<PathImagesInt>(initialImagesPath);
	//

	const [disabled, setDisabled] = useState<boolean>(false);

	//
	const handleChangeClient = (event: React.ChangeEvent<HTMLInputElement>) => {
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
		console.log(param, value);
		if (client) {
			setClient({
				...client,
				[param]: value,
			});
		}
	};

	//
	const handleChangeCommerce = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name && commerce) {
			setCommerce({
				...commerce,
				[event.target.name]: event.target.value,
			});
		}
	};
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
		//console.log('delete -> ', id);
		const aux = solic['rc_planilla'].filter((item: any) => item.id !== id);
		//console.log(aux);
		setSolic({
			...solic,
			rc_planilla: aux,
		});
	};

	const deleteItemActa = (id: number) => {
		//console.log('delete -> ', id);
		const aux = commerce.rc_constitutive_act.filter((item: any) => item.id !== id);
		//console.log(aux);
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
			//console.log('xd', path2);
			//const path = URL.createObjectURL(newFile);
			//console.log('xd', path);
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
				client,
				commerce,
				pos,
				locationClient,
				locationCommerce,
				locationPos,
				phones,
				handleChangeClientPhone,
				handleChangeRefClient,
			}}>
			{children}
		</FMDiferidoContext.Provider>
	);
};

export default FMDiferidoContext;
