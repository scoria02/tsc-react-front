// Private Routes
export const baseUrl = '/';
export const urlAdmision = `${baseUrl}Admision`;
export const urlFM = `${baseUrl}Solicitud`;
export const userAdmin = `${baseUrl}GestionUsuarios`;
export const urlAdministracion = `${baseUrl}Administracion`;
export const urlCobr = `${baseUrl}Cobranza`;
export const urlTerminales = `${baseUrl}Terminales`;
export const urlUpdateClient = `${baseUrl}update`;

export const urlPrivate = [
	baseUrl,
	urlAdmision,
	urlFM,
	userAdmin,
	urlAdministracion,
	urlCobr,
	urlTerminales,
	urlUpdateClient,
];

// Public Routes
export const urlLogin = `${baseUrl}auth/login`;
export const urlRegister = `${baseUrl}auth/register`;
