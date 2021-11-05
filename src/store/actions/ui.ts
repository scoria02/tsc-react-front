import { ActionType } from '../types/types';

interface startLoading {
	type: ActionType.uiStartLoading;
}
interface finishLoading {
	type: ActionType.uiFinishLoading;
}

interface uiOpenModal {
	type: ActionType.uiOpenModal;
}
interface uiCloseModal {
	type: ActionType.uiCloseModal;
}

interface uiOpenModalDiferido {
	type: ActionType.uiOpenModalDiferido;
}
interface uiCloseModalDiferido {
	type: ActionType.uiCloseModalDiferido;
}

export type Action =  uiCloseModal | 
											uiOpenModal | 
											startLoading |
											finishLoading |
											uiOpenModalDiferido |
											uiCloseModalDiferido;

//Action
export const OpenModal = () => ({ type: ActionType.uiOpenModal });
export const CloseModal = () => ({ type: ActionType.uiCloseModal });
export const FinishLoading = () => ({ type: ActionType.uiFinishLoading });
export const StartLoading = () => ({ type: ActionType.uiStartLoading });

//diferido
export const OpenModalDiferido = () => ({ type: ActionType.uiOpenModalDiferido });
export const CloseModalDiferido = () => ({ type: ActionType.uiCloseModalDiferido });
