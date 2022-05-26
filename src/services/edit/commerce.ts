import { AxiosResponse } from 'axios';
import useAxios from 'config/index';
import { fmCommerce } from 'interfaces/fm';
import Swal from 'sweetalert2';
import { handleError } from 'utils/handleSwal';
//import Router from 'next/router';

export const editCommerce = {
	getAllCommerces,
	updateCommerce,
};

export async function getAllCommerces() {
	try {
		const res: AxiosResponse<any> = await useAxios.get('/edit/listCommerces');
		console.log(res);
		if (res.data.info) return res.data.info;
	} catch (error: any) {
		//console.log(err);
		const data = error.response?.data;
		const resError = {
			type: 'Error',
			message: data?.message || 'Error: Api',
			code: data?.code || error?.response?.status || '400',
		};
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

export async function updateCommerce(commerce: any, imagen: any) {
	const data = formatData(commerce, imagen);
	try {
		const res: AxiosResponse<any> = await useAxios.post('/edit/commerce', data);
		console.log(res);
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Comercio Actulizado',
			showConfirmButton: true,
		});
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
