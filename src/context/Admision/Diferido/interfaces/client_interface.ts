import { base } from 'context/DataList/interface';
import { Photo, Ref_Personal } from 'interfaces/global';

export interface ClientDif {
	id: number;
	email: string;
	ident_num: string;
	last_name: string;
	id_ident_type: base;
	id_direccion: number;
	local: string;
	calle: string;
	rc_ident_card: Photo;
	ref_person_1: Ref_Personal;
	ref_person_2: Ref_Personal;
}

export interface fmErrorDif_ClientINT {
	email: boolean;
	name: boolean;
	last_name: boolean;
	id_ident_type: boolean;
	ident_num: boolean;
	phone1: boolean;
	phone2: boolean;
	name_ref1: boolean;
	doc_ident_type_ref1: boolean;
	doc_ident_ref1: boolean;
	phone_ref1: boolean;
	name_ref2: boolean;
	doc_ident_type_ref2: boolean;
	doc_ident_ref2: boolean;
	phone_ref2: boolean;
	estado: boolean;
	municipio: boolean;
	ciudad: boolean;
	parroquia: boolean;
	sector: boolean;
	calle: boolean;
	local: boolean;
}
