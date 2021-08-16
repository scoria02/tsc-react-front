export type types =
	| { type: '[ui] Open modal' }
	| { type: '[ui] Close modal' }
	| { type: '[ui] Open modal' }
	| { type: '[ui] Set Error'; payload: string }
	| { type: '[ui] Remove Error' }
	| { type: '[ui] Start loading' }
	| { type: '[ui] Finish loading' }
	| { type: '[Auth] Login' }
	| { type: '[Auth] Logout' };

// {
// 	uiOpenModal: '[ui] Open modal';
// 	uiCloseModal: '[ui] Close modal';

// 	login: '[Auth] Login';
// 	logout: '[Auth] Logout';

// 	uiSetError: '[UI] Set Error';
// 	uiRemoveError: '[UI] Remove Error';

// 	uiStartLoading: '[UI] Start loading';
// 	uiFinishLoading: '[UI] Finish loading';

// 	notesAddNew: '[Notes] New note';
// 	notesActive: '[Notes] Set active note';
// 	notesLoad: '[Notes] Load notes';
// 	notesUpdated: '[Notes] Updated note';
// 	notesFileUrl: '[Notes] Updated image url';
// 	notesDelete: '[Notes] Delete note';
// 	notesLogoutCleaning: '[Notes] Logout Cleaning';
// };
