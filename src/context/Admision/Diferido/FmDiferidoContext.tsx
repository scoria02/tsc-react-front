import useAxios from 'config';
import { ImagesInt, PathImage, PathImagesInt } from 'context/FM/fmImages/interface';
import { Ciudad, Estado, LocationInt, Municipio, Parroquia } from 'context/FM/Location/interfaces';
import { fmClient, fmCommerce, fmPos } from 'interfaces/fm';
import Completed from 'pages/Cobranza/views/Completed';
import React, { createContext, Dispatch, ReactChild, SetStateAction, useEffect, useState } from 'react';
import { errorFile } from 'utils/validFormatFile';
import { ContextFMD, PropsAd } from './interfaces';
import { initialImagesFm, initialImagesPath } from './state';

const FMDiferidoContext = createContext<ContextFMD>({
	disabled: false,
	setDisabled: () => {},
	fm: null,
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
});

export const FMDiferidoContextProvider = ({ children, value }: PropsAd) => {
	const [fm, setFm] = useState<any>(value);
	//
	const [imagePlanilla, setImagePlanilla] = useState<FileList | []>([]);
	const [pathImagePlanilla, setPathImagePlanilla] = useState<PathImage[]>([]);
	//
	const [imagesActa, setImagesActa] = useState<FileList | []>([]);
	const [pathImagesActa, setPathImagesActa] = useState<PathImage[]>([]);
	//
	//
	const [imagesForm, setImagesForm] = useState<ImagesInt>(initialImagesFm);
	const [pathImages, setPathImages] = useState<PathImagesInt>(initialImagesPath);
	//

	const [disabled, setDisabled] = useState<boolean>(false);

	const handleChangeClient = (event: React.ChangeEvent<HTMLInputElement>) => {
		//console.log(event.target.name, event.target.value);
		setFm({
			...fm,
			id_client: {
				...fm.id_client,
				[event.target.name]: event.target.value,
			},
		});
	};
	//
	const handleChangeCommerce = (event: React.ChangeEvent<HTMLInputElement>) => {
		//console.log(event.target.name, event.target.value);
		setFm({
			...fm,
			id_commerce: {
				...fm.id_commerce,
				[event.target.name]: event.target.value,
			},
		});
	};
	//
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		//console.log(event.target.name, event.target.value);
		setFm({
			...fm,
			[event.target.name]: event.target.value,
		});
	};

	const initFm = (fmData: any): void => {
		setFm(fmData);
	};

	const resetFm = (): void => {
		setFm(null);
		resetImages();
	};

	useEffect(() => {
		setFm(value);
	}, value);

	const resetImages = () => {
		setImagePlanilla([]);
		setImagesActa([]);
		setImagesForm(initialImagesFm);
	};

	const removePlanilla = () => {
		setImagePlanilla([]);
	};

	const deleteItemPlanilla = (id: number) => {
		console.log('delete -> ', id);
		const aux = fm['rc_planilla'].filter((item: any) => item.id !== id);
		console.log(aux);
		setFm({
			...fm,
			rc_planilla: aux,
		});
	};

	const deleteItemActa = (id: number) => {
		console.log('delete -> ', id);
		const aux = fm.id_commerce.rc_constitutive_act.filter((item: any) => item.id !== id);
		console.log(aux);
		setFm({
			...fm,
			id_commerce: {
				...fm.id_commerce,
				rc_constitutive_act: aux,
			},
		});
	};

	const handleChangePlanilla = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			if (!errorFile(event)) {
				let files = event.target.files;
				setImagePlanilla(files);
				for (let i: number = 0; i < files.length; i++) {
					setPathImagePlanilla([
						...pathImagePlanilla,
						{
							path: URL.createObjectURL(files[i]),
							type: files[i].type,
						},
					]);
				}
			} else {
				setImagePlanilla([]);
				setPathImagePlanilla([]);
			}
		}
	};

	const handleChangeImagesActa = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			if (!errorFile(event)) {
				let files = event.target.files;
				setImagesActa(files);
				for (let i: number = 0; i < files.length; i++) {
					setPathImagesActa([
						...pathImagePlanilla,
						{
							path: URL.createObjectURL(files[i]),
							type: files[i].type,
						},
					]);
				}
			} else {
				setImagesActa([]);
				setPathImagesActa([]);
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

	const deleteImgsActa = () => {
		setImagesActa([]);
	};

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
				fm,
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
			}}>
			{children}
		</FMDiferidoContext.Provider>
	);
};

export default FMDiferidoContext;
