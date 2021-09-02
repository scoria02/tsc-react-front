export enum ActionType {
	login = '[Auth] Login',
	logout = '[Auth] Logout',

	uiOpenModal = '[ui] Open modal',
	uiCloseModal = '[ui] Close modal',

	uiSetError = '[UI] Set Error',
	uiRemoveError = '[UI] Remove Error',

	uiStartLoading = '[UI] Start loading',
	uiFinishLoading = '[UI] Finish loading',
	uiChecking = '[UI] Checking',

	notesAddNew = '[Notes] New note',
	notesActive = '[Notes] Set active note',
	notesLoad = '[Notes] Load notes',
	notesUpdated = '[Notes] Updated note',
	notesFileUrl = '[Notes] Updated image url',
	notesDelete = '[Notes] Delete note',
	notesLogoutCleaning = '[Notes] Logout Cleaning',
}
