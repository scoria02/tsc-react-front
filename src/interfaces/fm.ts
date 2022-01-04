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
	days: Days;
	setDays: (data: Days) => void;
}
