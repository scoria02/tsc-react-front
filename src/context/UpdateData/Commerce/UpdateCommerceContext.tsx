import { PathImagesInt } from 'context/Admision/CreationFM/fmImages/interface';
import React, { createContext, useEffect, useState } from 'react';
import { errorFile } from 'utils/validFormatFile';
import { ContextCommerceUpdata, PropsCommerceContext } from './interfaces';
import { initialImagesFm, initialImagesPath } from './state';

const UpdateCommerceContext = createContext<ContextCommerceUpdata>({
	disabled: false,
	setDisabled: () => {},
	initFm: () => {},
	reset: () => {},
	handleChangeCommerce: () => {},
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
	locationCommerce: null,
});

export const UpdateCommerceContextProvider = ({ children, data }: PropsCommerceContext) => {
	const [commerce, setCommerce] = useState<any>(null);
	const [locationCommerce, setLocationCommerce] = useState<any>(null);
	const [imagesActa, setImagesActa] = useState<FileList | []>([]);
	const [imagen, setImagen] = useState<any>({
		rc_rif: null,
	});

	const [pathImages, setPathImages] = useState<PathImagesInt>(initialImagesPath);
	const [disabled, setDisabled] = useState<boolean>(false);

	console.log('data', data);

	useEffect(() => {
		if (data) {
			const { id_location, ...commerceData } = data;
			setCommerce(commerceData);
			setLocationCommerce(id_location);
		} else {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const handleChangeCommerce = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name && commerce) {
			setCommerce({
				...commerce,
				[event.target.name]: event.target.value,
			});
		}
	};
	const initFm = (): void => {
		reset();
	};

	const reset = (): void => {
		resetImages();
		setCommerce(null);
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

	return (
		<UpdateCommerceContext.Provider
			value={{
				disabled,
				setDisabled,
				initFm,
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
				locationCommerce,
			}}>
			{children}
		</UpdateCommerceContext.Provider>
	);
};

export default UpdateCommerceContext;
