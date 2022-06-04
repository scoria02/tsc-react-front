import { ActionType } from '../../types/types';

export const stepComplete = (step: any) => ({
	type: ActionType.stepComplete,
	payload: step,
});

export const Valid = (valid: any) => ({
	type: ActionType.acceptRec,
	payload: valid,
});

export const cleanRec = () => ({
	type: ActionType.cleanAcceptRec,
});

export const selectAci = (state: boolean) => ({
	type: ActionType.acceptAci,
	payload: state,
});
