import useAxios from '../../config';

export const getEstados = async () => {
	try{
		const resp: string [] = await useAxios.get('/Location/estado').then((res) => {
			localStorage.setItem('token', res.data.token);
			return res.data.info 
		});
		return resp;
	}catch(e){
		console.log(e);
		return [];
	}
}

export const getCiudad = async (id: any) => {
	try{
		const resp: string [] = await useAxios.get(`/Location/${id}/ciudad`).then((res) => {
			localStorage.setItem('token', res.data.token);
			return res.data.info 
		});
		return resp;
	}catch(e){
		console.log(e);
		return [];
	}
}

export const getMunicipio = async (id: any) => {
	try{
		const resp: string [] = await useAxios.get(`/Location/${id}/municipio`).then((res) => {
			localStorage.setItem('token', res.data.token);
			return res.data.info 
		});
		return resp;
	}catch(e){
		console.log(e);
		return [];
	}
}

export const getParroquia = async (id: any) => {
	try{
		const resp: string [] = await useAxios.get(`/Location/${id}/ciudad`).then((res) => {
			localStorage.setItem('token', res.data.token);
			return res.data.info 
		});
		return resp;
	}catch(e){
		console.log(e);
		return [];
	}
}

export const getPayMent = async () => {
	try{
		const resp: string [] = await useAxios.get('payment/all').then((res) => {
			localStorage.setItem('token', res.data.token);
			return res.data.info 
		});
		return resp;
	}catch(e){
		console.log(e);
		return [];
	}
}
