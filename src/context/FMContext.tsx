import { createContext } from 'react';

export interface Days {
	Lunes: boolean;
	Martes: boolean;
	Miercoles: boolean;
	Jueves: boolean;
	Viernes: boolean;
	Sabado: boolean;
	Domingo: boolean;
}

export interface FMContextProp {
	days: Days | any;
	setDays: React.Dispatch<React.SetStateAction<Days>>;
}
export const FMContext = createContext<FMContextProp>({
	days: { Lunes: true, Martes: true, Miercoles: true, Jueves: true, Viernes: true, Sabado: true, Domingo: true },
	setDays: () => {},
});

export default FMContext;
