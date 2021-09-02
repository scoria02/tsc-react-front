import { ActionType } from '../types/types';

//show alert
export function showAlertAction(alert: string) {
  return (dispatch: any) => {
    dispatch( showAlert(alert) )
  }
}

const showAlert = (alert: string) => ({
  type: ActionType.showAlert,
  payload: alert 
});

//hidden alert
export function hiddenAlertAction() {
  return (dispatch: any) => {
    dispatch( hiddenAlert() )
  }
}

export const hiddenAlert = () => ({ 
  type: ActionType.hiddenAlert
});
