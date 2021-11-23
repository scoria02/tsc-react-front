import { createContext } from 'react';

export interface CobranzaContextProps {
	rowSelected: any;
	setRow: React.Dispatch<React.SetStateAction<{}>>;
}
export const CobranzaContext = createContext<CobranzaContextProps>({
	rowSelected: {},
	setRow: () => {},
});
