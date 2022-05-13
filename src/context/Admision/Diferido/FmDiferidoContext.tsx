import useAxios from 'config';
import { Aci, Activity, base, Distributor, TeleMarket, TypeWallet } from 'context/DataList/interface';
import { ImagesInt, PathImage, PathImagesInt } from 'context/FM/fmImages/interface';
import { Ciudad, Estado, LocationInt, Municipio, Parroquia } from 'context/FM/Location/interfaces';
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
import { errorFile } from 'utils/validFormatFile';
import { validateFormClient, validateFormCommerce } from 'validation/validFm';

const initialImagesFm: ImagesInt = {
	rc_ident_card: null,
	rc_rif: null,
	rc_special_contributor: null,
	rc_ref_bank: null,
	rc_comp_dep: null,
};

const initialImagesPath: PathImagesInt = {
	rc_ident_card: {
		path: '',
		type: '',
	},
	rc_rif: {
		path: '',
		type: '',
	},
	rc_special_contributor: {
		path: '',
		type: '',
	},
	rc_ref_bank: {
		path: '',
		type: '',
	},
	rc_comp_dep: {
		path: '',
		type: '',
	},
};

interface Props {
	children: ReactChild;
	value: any;
}

interface ContextFMD {
	fm: any;
	initFm(fmData: any): void;
	resetFm(): void;
	handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
	//images
	imagePlanilla: FileList | [];
	imagesActa: FileList | [];
	imagesForm: ImagesInt;
	//paths
	pathImages: PathImagesInt;
	//
	handleChangePlanilla(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeImages(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeImagesMulti(event: React.ChangeEvent<HTMLInputElement>): void;
	deleteImg(name: string): void;
	deleteImgActa(): void;
	removePlanilla(): void;
	resetImages(): void;
}

const FMDiferidoContext = createContext<ContextFMD>({
	fm: null,
	initFm: () => {},
	resetFm: () => {},
	handleChange: () => {},
	imagePlanilla: [],
	imagesActa: [],
	imagesForm: initialImagesFm,
	//
	pathImages: initialImagesPath,
	//
	handleChangePlanilla: () => {},
	handleChangeImages: () => {},
	handleChangeImagesMulti: () => {},
	deleteImg: () => {},
	deleteImgActa: () => {},
	removePlanilla: () => {},
	resetImages: () => {},
});

export const FMDiferidoContextProvider = ({ children, value }: Props) => {
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
	//
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target);
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

	const handleChangeImagesMulti = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			if (!errorFile(event)) {
				let files = event.target.files;
				setImagesActa(files);
			} else deleteImgActa();
		}
	};

	const deleteImgActa = () => {
		setImagesActa([]);
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

	const deleteImg = (name: string) => {
		setImagesForm({
			...imagesForm,
			[`rc_${name}`]: null,
		});
	};

	const copyLocationToCommerce = (stateLocation: LocationInt, state: fmClient | fmCommerce | fmPos): void => {};

	const copyLocationToPos = (stateLocation: LocationInt, state: fmClient | fmCommerce | fmPos): void => {};

	return (
		<FMDiferidoContext.Provider
			value={{
				fm,
				initFm,
				resetFm,
				handleChange,
				//images
				imagePlanilla,
				imagesActa,
				imagesForm,
				//
				pathImages,
				//
				handleChangePlanilla,
				handleChangeImages,
				handleChangeImagesMulti,
				deleteImg,
				deleteImgActa,
				removePlanilla,
				resetImages,
			}}>
			{children}
		</FMDiferidoContext.Provider>
	);
};

export default FMDiferidoContext;
