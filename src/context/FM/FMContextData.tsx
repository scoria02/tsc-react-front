import { createContext, ReactChild, useEffect, useState } from 'react';
import { ClientValid, ContextFMData } from './interface';

interface Props {
	children: ReactChild;
	fm: any;
}
const baseSteps = ['Pos', 'Referencia Bancaria', 'Fuerza de Venta'];
function getSteps(fm: any) {
	const list: string[] = [];
	if (fm) {
		if (fm.id_client.validate || fm.id_commerce.validate)
			if (!list.includes('Informacion del Solicitante')) list.push('Informacion del Solicitante');
		if (fm.rc_planilla.length && !list.includes('Planilla de Solicitud')) list.push('Planilla de Solicitud');
		if (fm.id_client && !fm.id_client.validate && !list.includes('Cliente')) list.push('Cliente');
		if (fm.id_commerce && !fm.id_commerce.validate) {
			if (!list.includes('Comercio')) list.push('Comercio');
			if (fm.id_commerce.rc_constitutive_act.length && !list.includes('Acta Const.')) list.push('Acta Const.');
			if (fm.id_commerce.special_contributor && !list.includes('Cont. Especial')) list.push('Cont. Especial');
		}
		if (fm && !list.includes('Pos')) list.push('Pos');
		if (fm.rc_ref_bank && !list.includes('Referencia Bancaria')) list.push('Referencia Bancaria');
		if (fm.rc_comp_dep && !list.includes('Comprobante de Pago')) list.push('Comprobante de Pago');
	}
	return list;
}

const FMContextData = createContext<ContextFMData>({
	typeSolict: 1,
	client: null,
	commerce: null,
	pos: null,
	locationClient: null,
	locationCommerce: null,
	locationPos: null,
	resetFmValidation: () => {},
	codeFM: '',
	stepsFM: baseSteps,
	solic: null,
});

export const FMContextDataProvider = ({ children, fm }: Props) => {
	const [stepsFM, setStepsFM] = useState(baseSteps);
	const [codeFM, setCodeFM] = useState<string>('');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [typeSolict, setTypeSolict] = useState<number>(1);
	const [client, setClient] = useState<ClientValid | null>(null);
	const [commerce, setCommerce] = useState<any>(null);
	const [pos, setPos] = useState<any>(null);
	const [locationClient, setLocationClient] = useState<any>(null);
	const [solic, setSolic] = useState<any>(null);
	const [locationCommerce, setLocationCommerce] = useState<any>(null);
	const [locationPos, setLocationPos] = useState<any>(null);

	const resetFmValidation = (): void => {
		setSolic(null);
		//setListValidated(initValidado);
		setClient(null);
		setCommerce(null);
		setPos(null);
	};

	useEffect(() => {
		if (fm) {
			if (!client || !commerce || !pos || locationClient || !locationCommerce || !locationPos || !stepsFM.length) {
				const { id_client, id_commerce } = fm;
				//console.log('fm context', fm);
				const { id_location, ref_person_1, ref_person_2, ...clientData } = id_client;
				setClient({
					...clientData,
					ref_person_1: JSON.parse(ref_person_1),
					ref_person_2: JSON.parse(ref_person_2),
				});
				setLocationClient(id_location);
				setCommerce(id_commerce);
				setLocationCommerce(id_commerce.id_location);
				setSolic(fm);
				setPos(fm);
				setLocationPos(fm.pos[0].id_location);
				setCodeFM(fm.code);
				setStepsFM(getSteps(fm));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fm]);

	return (
		<FMContextData.Provider
			value={{
				typeSolict,
				client,
				commerce,
				pos,
				locationClient,
				locationCommerce,
				locationPos,
				resetFmValidation,
				codeFM,
				stepsFM,
				solic,
			}}>
			{children}
		</FMContextData.Provider>
	);
};

export default FMContextData;
