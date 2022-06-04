// Private Routes
export const baseUrl = '/';
export const urlAdmision = `${baseUrl}admision`;
export const urlFM = `${baseUrl}solicitud`;
export const urlAdministracion = `${baseUrl}administracion`;
export const urlCobr = `${baseUrl}cobranza`;
export const urlTerminales = `${baseUrl}terminales`;
export const urlUpdateCommerce = `${baseUrl}editar_commerce`;
export const urlSeguridad = `${baseUrl}seguridad`;

export const urlPrivate = [
	baseUrl,
	urlAdmision,
	urlFM,
	urlSeguridad,
	urlAdministracion,
	urlCobr,
	urlTerminales,
	urlUpdateCommerce,
];

// Public Routes
export const urlLogin = `${baseUrl}auth/login`;
export const urlRegister = `${baseUrl}auth/register`;
export const urlNewPassword = `${baseUrl}auth/new-password/`;
export const urlRestorePassword = `${baseUrl}auth/restore-password/`;
