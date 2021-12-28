import React, { Dispatch } from 'react';

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
};

/*
export interface FMContextProp {
	days: Days | any;
	setDays: React.Dispatch<React.SetStateAction<Days>>;
}
*/
