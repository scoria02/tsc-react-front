import Swal from 'sweetalert2';
import './swal.scss';

export const handleLoading = () => {
	Swal.fire({
		icon: 'info',
		title: 'Verificando',
		showConfirmButton: false,
		customClass: { container: 'swal2-validated' },
		allowOutsideClick: false,
		allowEscapeKey: false,
		didOpen: () => {
			Swal.showLoading();
		},
	});
};

export const handleLoadingSave = () => {
	Swal.fire({
		icon: 'info',
		title: 'Guardando...',
		showConfirmButton: false,
		customClass: { container: 'swal2-validated' },
		allowOutsideClick: false,
		allowEscapeKey: false,
		didOpen: () => {
			Swal.showLoading();
		},
	});
};

export const handleLoadingSearch = () => {
	Swal.fire({
		title: 'Cargando...',
		showConfirmButton: false,
		allowOutsideClick: false,
		allowEscapeKey: false,
		customClass: { container: 'swal2-validated' },
		didOpen: () => {
			Swal.showLoading();
		},
	});
};

export const handleError = (error: any) => {
	Swal.fire({
		icon: 'error',
		title: 'Error',
		text: error.response?.data?.message || 'Error Access',
		customClass: { container: 'swal2-validated' },
		showConfirmButton: true,
		//timer: 2500,
	});
};

export const handleComercioUpdated = () => {
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Comercio Actulizado',
		showConfirmButton: true,
		customClass: { container: 'swal2-validated' },
	});
};

export const handleSucessTime = (text: string) => {
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: `Verifica la solicitud`,
		html: `<p>Codigo Solic: <b>${text}</b><p/>`,
		showConfirmButton: true,
		customClass: { container: 'swal2-validated' },
		timer: 1500,
	});
};

export const handleNotAccess = () => {
	Swal.fire({
		icon: 'info',
		title: 'No tienes acceso',
		text: 'Necesitas permisos',
		customClass: { container: 'swal2-validated' },
		showConfirmButton: true,
		//timer: 2500,
	});
};

export const handleInfoText = (title: string, text: string) => {
	Swal.fire({
		icon: 'info',
		title: title,
		text: text || 'Error Access',
		customClass: { container: 'swal2-validated' },
		showConfirmButton: true,
		//timer: 2500,
	});
};

export const handleErrorProvider = (error: any) => {
	const item = error.response?.data?.message.text;
	const item2 = error.response?.data?.message.provider;
	const text = typeof item === 'string' ? item : 'Error Access';
	const provider = typeof item2 === 'string' ? item2 : 'Error Acess';
	const html = `<p><b>${text}</b> </br><small>${provider}</small></p>`;
	Swal.fire({
		icon: 'error',
		title: 'Error',
		text: text,
		html: html,
		customClass: { container: 'swal2-validated' },
		showConfirmButton: true,
	});
};

export const handleLoadingProvider = () => {
	Swal.fire({
		title: 'Por favor Espere',
		html: `Creando en <b>1000Pagos</b>`,
		timerProgressBar: true,
		allowOutsideClick: false,
		allowEscapeKey: false,
		showConfirmButton: true,
		customClass: { container: 'swal2-validated' },
		//timer: 40000,
		didOpen: () => {
			Swal.showLoading();
			const b: any = Swal.getHtmlContainer()!.querySelector('b');
			setInterval(() => {
				b.textContent = b.textContent.trim() === '1000Pagos' ? 'TMS7' : '1000Pagos';
				//console.log('interval');
			}, 3000);
		},
	});
};

export const handleLoadingSendFm = () => {
	Swal.fire({
		icon: 'info',
		title: 'Enviando Solicitud...',
		allowOutsideClick: false,
		allowEscapeKey: false,
		customClass: { container: 'swal2-validated' },
		showConfirmButton: false,
		didOpen: () => {
			Swal.showLoading();
		},
	});
};
