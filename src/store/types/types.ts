export enum ActionType {
	//Auth
	login = '[Auth] Login',
	logout = '[Auth] Logout',
	//Register
	signup = '[Auth] Login',
	validEmail = '[Auth] Email',
	validDocIdent= '[Auth] DocIdent',

	//Modals
	uiOpenModal = '[ui] Open modal',
	uiCloseModal = '[ui] Close modal',

	uiSetError = '[UI] Set Error',
	uiRemoveError = '[UI] Remove Error',

	uiStartLoading = '[UI] Start loading',
	uiFinishLoading = '[UI] Finish loading',
	uiChecking = '[UI] Checking',

	//alert
	showAlert = '[UI] Show Alert',
	hiddenAlert = '[UI] Show Alert',
}
