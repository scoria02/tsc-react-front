import { AxiosResponse } from 'axios';
import useAxios from 'config/index';
import Swal from 'sweetalert2';
import { handleComercioUpdated, handleError } from 'utils/handleSwal';
//import Router from 'next/router';

export const editCommerce = {
	getAllCommerces,
	updateCommerce,
	getDataCommerce,
};

async function getDataCommerce(id_commerce: number) {
	try {
		const res: AxiosResponse<any> = await useAxios.get(`/edit/commerce/${id_commerce}`);
		//console.log(res);
		Swal.fire({
			position: 'center',
			icon: 'info',
			showConfirmButton: false,
			timer: 500,
		});
		return {
			ok: true,
			commerce: res.data.info,
		};
	} catch (error: any) {
		//console.log(err);
		const data = error.response?.data;
		const resError = {
			ok: false,
			type: 'Error',
			message: data?.message || 'Error: Api',
			code: data?.code || error?.response?.status || '400',
		};
		//console.log(resError);
		Swal.fire('Error', error.response.data.message, 'error');
		return resError;
	}
}

export async function getAllCommerces() {
	try {
		const res: AxiosResponse<any> = await useAxios.get('/edit/listCommerces');
		//console.log(res);
		if (res.data.info) return res.data.info;
	} catch (error: any) {
		//console.log(err);
		//const data = error.response?.data;
		/*
		const resError = {
			type: 'Error',
			message: data?.message || 'Error: Api',
			code: data?.code || error?.response?.status || '400',
		};
		*/
		//console.log(resError);
		Swal.fire('Error', error.response.data.message, 'error');
		return [];
	}
}

export interface Imagenes {
	[key: string]: any;
}

export const formatData = (commerce: any, imagenes: Imagenes): FormData => {
	const formData: FormData = new FormData();
	formData.append('commerce', JSON.stringify(commerce));
	for (const item of Object.entries(imagenes)) {
		if (item[1]) {
			formData.append('images', item[1]);
		}
	}
	/*
	for (let i: number = 0; i < imagesActa.length; i++) {
		formData.append('constitutive_act', imagesActa[i]);
	}
	for (let i: number = 0; i < imagePlanilla.length; i++) {
		formData.append('planilla', imagePlanilla[i]);
	}
	*/
	return formData;
};
const dataFormatCommerce = (commerce: any) => ({
	id: commerce.id,
	id_ident_type: commerce.id_ident_type.id,
	ident_num: commerce.ident_num,
	special_contributor: commerce.special_contributor ? 1 : 0,
	name: commerce.name.trim(),
	id_activity: commerce.id_activity.id,
	location: {
		id_direccion: commerce.id_location.id_direccion,
		calle: commerce.id_location.calle,
		local: commerce.id_location.local,
	},
	days: commerce.days || null,
});

export async function updateCommerce(commerce: any, imagen: any) {
	const dataCommerce = dataFormatCommerce(commerce);
	//console.log('creacion', dataCommerce);
	const data = formatData(dataCommerce, imagen);
	try {
		const res: AxiosResponse<any> = await useAxios.post('/edit/commerce', data);
		console.log(res);
		handleComercioUpdated();
		return {
			ok: true,
		};
	} catch (error: any) {
		const data = error.response?.data;
		const resError = {
			type: 'Error',
			message: data?.message || 'Error: Api',
			code: data?.code || error?.response?.status || '400',
		};
		//console.log(resError);
		handleError(error);
		return {
			ok: false,
			error: resError,
		};
	}
}
