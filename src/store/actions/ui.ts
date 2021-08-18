import { ActionType } from '../types/types';
// export const setError = (err) => ({
// 	type: types.uiSetError,
// 	payload: err,
// });

// export const removeError = () => ({
// 	type: types.uiRemoveError,
// });

// interface startLoading {
// 	type: ActionType.UiStartLoading;
// }
// export const finishLoading = () => ({
// 	type: ActionType.uiFinishLoading,
// });
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

export type Action = uiCloseModal | uiOpenModal | startLoading | finishLoading;

//Action
export const OpenModal = () => ({ type: ActionType.uiOpenModal });
// export const uiCloseModal = () => ({ type: ActionType.uiCloseModal });
