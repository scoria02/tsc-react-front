import { ActionType } from '../types/types';

export const stepComplete = (step: any) => ({
	type: ActionType.stepComplete,
	payload: step,
});

export const Valid = (valid: any) => ({
	type: ActionType.acceptRec,
	payload: valid,
});
