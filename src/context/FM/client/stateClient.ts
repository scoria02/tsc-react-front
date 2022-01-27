import { fmClient } from '../../../interfaces/fm';

export const initFmClient: fmClient = {
	//step1 Cliente
	email: '',
	name: '',
	last_name: '',
	id_ident_type: 1,
	ident_num: '',
	phone1: '',
	phone2: '',
	id_estado_client: 0,
	id_ciudad_client: 0,
	id_municipio_client: 0,
	id_parroquia_client: 0,
	codigo_postal_client: '',
	sector_client: '',
	calle_client: '',
	local_client: '',
	//Step2 Referencias Personales
	name_ref1: '',
	doc_ident_type_ref1: 'V',
	doc_ident_ref1: '',
	phone_ref1: '',
	name_ref2: '',
	doc_ident_type_ref2: 'V',
	doc_ident_ref2: '',
	phone_ref2: '',
};
