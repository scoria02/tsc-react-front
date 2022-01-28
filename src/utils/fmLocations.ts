export const newEstado = (data: any, location: any, state: any) => {
	let newLocation = {
		...location,
		estado: data,
	};
	let newIdLocation = {
		...state,
		id_estado: data ? data.id : 0,
		id_municipio: 0,
		id_ciudad: 0,
		id_parroquia: 0,
	};
	return { newLocation, newIdLocation };
};

/*
export const setEstado = (data: Estado) => {
		dispatchC({
			type: SET_ESTADO_S,
			payload: data,
		});
	setClient({
		...fmClient,
		id_estado_client: data ? data.id : 0,
		id_municipio_client: 0,
		id_ciudad_client: 0,
		id_parroquia_client: 0,
	});
};

const setMunicipioClient = (data: Municipio) => {
	dispatchC({
		type: SET_MUNICIPIO_S,
		payload: data,
	});
	setClient({
		...fmClient,
		id_municipio_client: data ? data.id : 0,
		id_ciudad_client: 0,
		id_parroquia_client: 0,
	});
};

const setCiudadClient = (data: Ciudad) => {
	dispatchC({
		type: SET_CIUDAD_S,
		payload: data,
	});
	setClient({
		...fmClient,
		id_ciudad_client: data ? data.id : 0,
		id_parroquia_client: 0,
		codigo_postal_client: data ? data.postal_code : '',
	});
};

const setParroquiaClient = (data: Parroquia) => {
	dispatchC({
		type: SET_PARROQUIA_S,
		payload: data,
	});
	setClient({
		...fmClient,
		id_parroquia_client: data ? data.id : 0,
	});
};
*/
