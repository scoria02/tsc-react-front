/* eslint-disable no-unused-vars */
import { createContext, ReactChild, ReactChildren, useState } from 'react';

import { ImagesInt, NamesImagesInt } from './interface';

const initialImagesFm: ImagesInt = {
	rc_ident_card: null,
	rc_rif: null,
	rc_special_contributor: null,
	rc_ref_bank: null,
	rc_comp_dep: null,
};

const initialNamesImagesFm: NamesImagesInt = {
	rc_ident_card: '',
	rc_rif: '',
	rc_special_contributor: '',
	rc_ref_bank: '',
	rc_comp_dep: '',
};

interface ContextImagesFm {
	imagePlanilla: object | null;
	imagesActa: FileList | [];
	namesImages: NamesImagesInt;
	imagesForm: ImagesInt;
	handleChangePlanilla(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeImages(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeImagesMulti(event: React.ChangeEvent<HTMLInputElement>): void;
	deleteImgContributor(name: string): void;
	removePlanilla(): void;
	resetImages(): void;
}

const ImagesFmContext = createContext<ContextImagesFm>({
	imagePlanilla: null,
	imagesActa: [],
	namesImages: initialNamesImagesFm,
	imagesForm: initialImagesFm,
	handleChangePlanilla: () => {},
	handleChangeImages: () => {},
	handleChangeImagesMulti: () => {},
	deleteImgContributor: () => {},
	removePlanilla: () => {},
	resetImages: () => {},
});

interface Props {
	children: ReactChild | ReactChildren;
}

export const ImagesFmProvider = ({ children }: Props) => {
	const [imagePlanilla, setImagePlanilla] = useState<object | null>(null);
	const [imagesActa, setImagesActa] = useState<FileList | []>([]);
	const [namesImages, setNamesImages] = useState<NamesImagesInt>(initialNamesImagesFm);
	const [imagesForm, setImagesForm] = useState<ImagesInt>(initialImagesFm);

	const resetImages = () => {
		setImagePlanilla(null);
		setImagesActa([]);
		setNamesImages(initialNamesImagesFm);
		setImagesForm(initialImagesFm);
	};

	const removePlanilla = () => {
		setImagePlanilla(null);
	};

	const handleChangePlanilla = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event?.target?.files && event.target.files[0]) {
			let file = event.target.files[0];
			let newFile = new File([file], `${event.target.name}.${file.type.split('/')[1]}`, { type: file.type });
			setImagePlanilla({
				[event.target.name]: newFile,
			});
		} else {
			setImagePlanilla({
				[event.target.name]: null,
			});
		}
	};

	const handleChangeImages = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event?.target?.files && event.target.files[0]) {
			let file = event.target.files[0];
			let newFile = new File([file], `${event.target.name}.${file.type.split('/')[1]}`, { type: file.type });
			//Save img
			setImagesForm({
				...imagesForm,
				[event.target.name]: newFile,
			});
			setNamesImages({
				...namesImages,
				[event.target.name]: event.target.files[0].name,
			});
		}
	};

	const handleChangeImagesMulti = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			let files = event.target.files;
			setImagesActa(files);
		}
	};

	const deleteImgContributor = (name: string) => {
		setImagesForm({
			...imagesForm,
			[`rc_${name}`]: null,
		});
		setNamesImages({
			...namesImages,
			[`rc_${name}`]: '',
		});
	};

	return (
		<ImagesFmContext.Provider
			value={{
				imagePlanilla,
				imagesActa,
				namesImages,
				imagesForm,
				handleChangePlanilla,
				handleChangeImages,
				handleChangeImagesMulti,
				deleteImgContributor,
				removePlanilla,
				resetImages,
			}}>
			{children}
		</ImagesFmContext.Provider>
	);
};

export default ImagesFmContext;
