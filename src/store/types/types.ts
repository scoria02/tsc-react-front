export enum ActionType {
	//Auth
	login = '[Auth] Login',
	logout = '[Auth] Logout',
	signup = '[Auth] Login',
	refreshUser = '[Auth] Refresh Login',
	//Register
	registerEmail = '[Auth] RegisterEmail',
	registerEmailError = '[Auth] RegisterEmail Error',
	registerDocIdent = '[Auth] RegisterDocIdent',
	registerDocIdentError = '[Auth] RegisterDocIdent Error',
	registerUser = '[Auth] Register User',
	registerUserError = '[Auth] Register User Error',

	//FM Solicitud
	validClient = '[FM] validation Client',
	validClientError = '[FM] validation Client Error',
	sendClient = '[FM] send Client',
	sendClientError = '[FM] send Client Error',
	validNumBank= '[FM] validation Number Bank',
	validNumBankError = '[FM] validation Number Bank Error',
	sendCommerce = '[FM] send Commerce',
	sendCommerceError = '[FM] send Commerce Error',
	sendImages = '[FM] send Images',
	sendImagesError = '[FM] send Images Error',
	sendFM= '[FM] send FM',
	sendFMError = '[FM] send FM Error',
	cleanFm = '[FM] clear FM',

	//Admision FM
	getDataFM = '[FM] Get FM',
	getDataFMError = '[FM] Get FM Error',
	updateStatusFM = '[FM] update Status FM',
	updateStatusFMError = '[FM] update Status FM Error',
	cleanDataFM= '[FM] CleanDataFM',

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

	//Acceptance
	acceptRec = '[Accept] Valid Collection',
	stepComplete = '[Accept] Step Completed',
	cleanAcceptRec= '[Accept] Clean Accept Rec',
}
